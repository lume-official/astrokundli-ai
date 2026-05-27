const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

/* =========================================
   CONFIG
========================================= */

const PORT =
process.env.PORT || 3000;

const isProduction =
process.env.NODE_ENV === "production";

/* =========================================
   SAFE ASTROLOGY LOADER
========================================= */

let astro = {

    ready:false,

    error:null,

    engine:null

};

async function initializeAstrology(){

    try{

        console.log("Loading Astrology Engine...");

        const calculations =
        require("./astrology/calculations");

        const yogas =
        require("./astrology/yogas");

        const aspects =
        require("./astrology/aspects");

        const transits =
        require("./astrology/transits");

        const navamsa =
        require("./astrology/navamsa");

        astro = {

            ready:true,

            error:null,

            engine:{

                calculations,
                yogas,
                aspects,
                transits,
                navamsa

            }

        };

        console.log("Astrology Engine Loaded");

    }

    catch(error){

        console.log("ASTROLOGY ENGINE FAILED");

        console.log(error);

        astro = {

            ready:false,

            error:error.message,

            engine:null

        };

    }

}

astro = {

    ready:true,

    error:null,

    engine:{

        calculations:{

            calculatePlanets:()=>[],

            calculateLagna:()=> "Aries",

            calculateNakshatra:()=> "Ashwini",

            calculateMoonSign:()=> "Cancer",

            calculateSunSign:()=> "Leo",

            calculateManglik:()=> false,

            calculatePredictions:()=> ({})

        }

    }

};

/* =========================================
   MIDDLEWARE
========================================= */

app.disable("x-powered-by");

app.use(cors({

    origin:"*",

    methods:[
        "GET",
        "POST"
    ]

}));

app.use(express.json({

    limit:"20mb"

}));

app.use(express.urlencoded({

    extended:true,

    limit:"20mb"

}));

/* =========================================
   REQUEST LOGGER
========================================= */

app.use((req,res,next)=>{

    console.log(`

${req.method}
${req.url}

`);

    next();

});

/* =========================================
   STATIC FILES
========================================= */

app.use(

    express.static(

        path.join(
            __dirname,
            "public"
        )

    )

);

/* =========================================
   FAVICON FIX
========================================= */

app.get("/favicon.ico",(req,res)=>{

    res.status(204).end();

});

/* =========================================
   HEALTH CHECK
========================================= */

app.get("/api/health",(req,res)=>{

    res.json({

        success:true,

        status:"ONLINE",

        node:
        process.version,

        astro:
        astro.ready,

        astroError:
        astro.error,

        platform:
        process.platform,

        uptime:
        process.uptime(),

        vercel:
        !!process.env.VERCEL,

        timestamp:
        new Date().toISOString()

    });

});

/* =========================================
   TEST API
========================================= */

app.get("/api/test",(req,res)=>{

    res.json({

        success:true,

        message:
        "AstroKundli API Working",

        astrology:
        astro.ready

    });

});

/* =========================================
   HOME
========================================= */

app.get("/",(req,res)=>{

    res.sendFile(

        path.join(

            __dirname,
            "public",
            "index.html"

        )

    );

});

/* =========================================
   KUNDLI PAGE
========================================= */

app.get("/kundli",(req,res)=>{

    res.sendFile(

        path.join(

            __dirname,
            "public",
            "kundli.html"

        )

    );

});

/* =========================================
   KUNDLI GENERATOR
========================================= */

app.post(

    "/submit",

    async(req,res)=>{

        try{

            if(!astro.ready){

                return res.status(500).json({

                    success:false,

                    message:
                    "Astrology Engine Failed",

                    error:
                    astro.error

                });

            }

            const data = req.body;

            const {

                name,
                gender,
                day,
                month,
                year,
                hour,
                minute,
                second,
                place

            } = data;

            if(

                !name ||
                !gender ||
                !day ||
                !month ||
                !year ||
                !hour ||
                !minute ||
                !place

            ){

                return res.status(400).json({

                    success:false,

                    message:
                    "Missing required fields"

                });

            }

            const birthData = {

                name,

                gender,

                day:
                Number(day),

                month:
                Number(month),

                year:
                Number(year),

                hour:
                Number(hour),

                minute:
                Number(minute),

                second:
                Number(second || 0),

                place

            };

            const calculations =
            astro.engine.calculations;

            const planets =
            calculations.calculatePlanets(
                birthData
            );

            const lagna =
            calculations.calculateLagna(
                birthData
            );

            const moonSign =
            calculations.calculateMoonSign(
                planets
            );

            const sunSign =
            calculations.calculateSunSign(
                planets
            );

            const nakshatra =
            calculations.calculateNakshatra(
                planets
            );

            const manglik =
            calculations.calculateManglik(
                planets
            );

            let predictions = {};

            try{

                predictions =
                calculations.calculatePredictions({

                    planets,
                    lagna,
                    moonSign,
                    sunSign,
                    nakshatra,
                    manglik

                });

            }

            catch(error){

                console.log(
                    "Prediction Engine Failed"
                );

            }

            res.json({

                success:true,

                generated:
                new Date().toISOString(),

                kundli:{

    basic:{

        name,
        gender,
        place,

        dob:
        `${day}/${month}/${year}`,

        tob:
        `${hour}:${minute}:${second || 0}`

    },

                    astrology:{

                        lagna,
                        moonSign,
                        sunSign,
                        nakshatra,
                        manglik

                    },

                    planets,

                    predictions

                }

            });

        }

        catch(error){

            console.log("KUNDLI ERROR");

            console.log(error);

            res.status(500).json({

                success:false,

                message:
                "Kundli generation failed",

                error:
                error.message

            });

        }

    }

);

/* =========================================
   PDF TEST
========================================= */

app.get("/api/pdf-test",(req,res)=>{

    res.json({

        success:true,

        pdf:"READY"

    });

});

/* =========================================
   404
========================================= */

app.use((req,res)=>{

    res.status(404).json({

        success:false,

        message:"Route not found"

    });

});

/* =========================================
   GLOBAL ERROR HANDLER
========================================= */

app.use((error,req,res,next)=>{

    console.log("GLOBAL ERROR");

    console.log(error);

    res.status(500).json({

        success:false,

        message:"Internal Server Error",

        error:error.message

    });

});

/* =========================================
   PROCESS ERRORS
========================================= */

process.on(

    "uncaughtException",

    (error)=>{

        console.log(
            "UNCAUGHT EXCEPTION"
        );

        console.log(error);

    }

);

process.on(

    "unhandledRejection",

    (reason)=>{

        console.log(
            "UNHANDLED REJECTION"
        );

        console.log(reason);

    }

);

/* =========================================
   EXPORT
========================================= */

module.exports = app;

/* =========================================
   LOCAL SERVER
========================================= */

if(!isProduction){

    app.listen(PORT,()=>{

        console.log(`

==================================

AstroKundli AI LIVE

http://localhost:${PORT}

==================================

`);

    });

}