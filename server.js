const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

/* =========================
   ENV
========================= */

dotenv.config();

/* =========================
   ASTROLOGY IMPORTS
========================= */

const {

    calculatePlanets,
    calculateLagna,
    calculateNakshatra,
    calculateMoonSign,
    calculateSunSign,
    calculateManglik,
    calculatePredictions

} = require("./astrology/calculations");

/* =========================
   APP
========================= */

const app = express();

const PORT =
process.env.PORT || 3000;

/* =========================
   SECURITY + PERFORMANCE
========================= */

app.disable("x-powered-by");

app.use(cors({

    origin:"*",

    methods:[
        "GET",
        "POST"
    ]

}));

app.use(express.json({

    limit:"10mb"

}));

app.use(express.urlencoded({

    extended:true,

    limit:"10mb"

}));

/* =========================
   REQUEST LOGGER
========================= */

app.use((req,res,next)=>{

    console.log(`

========================================
🌍 ${req.method}
📍 ${req.url}
🕒 ${new Date().toLocaleString()}
========================================

`);

    next();

});

/* =========================
   STATIC FILES
========================= */

app.use(

    express.static(

        path.join(
            __dirname,
            "public"
        ),

        {

            maxAge:"1d",

            etag:true

        }

    )

);

/* =========================
   HOME
========================= */

app.get("/",(req,res)=>{

    res.sendFile(

        path.join(

            __dirname,
            "public",
            "index.html"

        )

    );

});

/* =========================
   KUNDLI PAGE
========================= */

app.get("/kundli",(req,res)=>{

    res.sendFile(

        path.join(

            __dirname,
            "public",
            "kundli.html"

        )

    );

});

/* =========================
   STATUS API
========================= */

app.get("/api/status",(req,res)=>{

    res.status(200).json({

        success:true,

        app:"AstroKundli AI",

        status:"RUNNING",

        version:"5.0",

        platform:
        process.platform,

        node:
        process.version,

        uptime:
        process.uptime(),

        timestamp:
        new Date().toISOString()

    });

});

/* =========================
   HEALTH API
========================= */

app.get("/api/health",(req,res)=>{

    res.status(200).json({

        success:true,

        health:"GOOD",

        server:"ONLINE",

        astrologyEngine:"ACTIVE",

        vercel:
        process.env.VERCEL
        ? true
        : false

    });

});

/* =========================
   GENERATE KUNDLI
========================= */

app.post(

    "/submit",

    async (req,res)=>{

        try{

            console.log(
                "Incoming Body:"
            );

            console.log(req.body);

            /* =========================
               BODY
            ========================== */

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

            } = req.body;

            /* =========================
               VALIDATION
            ========================== */

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

            /* =========================
               USER DATA
            ========================== */

            const userData = {

                name,

                gender,

                day:
                parseInt(day),

                month:
                parseInt(month),

                year:
                parseInt(year),

                hour:
                parseInt(hour),

                minute:
                parseInt(minute),

                second:
                parseInt(second || 0),

                place

            };

            console.log(
                "Processed User:"
            );

            console.log(userData);

            /* =========================
               PLANETS
            ========================== */

            const planets =

            calculatePlanets(
                userData
            );

            /* =========================
               CORE ASTROLOGY
            ========================== */

            const lagna =

            calculateLagna(
                userData
            );

            const nakshatra =

            calculateNakshatra(
                planets
            );

            const moonSign =

            calculateMoonSign(
                planets
            );

            const sunSign =

            calculateSunSign(
                planets
            );

            const manglik =

            calculateManglik(
                planets
            );

            /* =========================
               AI PREDICTIONS
            ========================== */

            const predictions =

            calculatePredictions({

                planets,
                lagna,
                moonSign,
                sunSign,
                manglik,
                nakshatra

            });

            /* =========================
               RESPONSE
            ========================== */

            const response = {

                success:true,

                generatedAt:
                new Date().toISOString(),

                kundli:{

                    basic:{

                        name,

                        gender,

                        dob:
                        `${day}/${month}/${year}`,

                        tob:
                        `${hour}:${minute}:${second || "00"}`,

                        place

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

            };

            console.log(
                "KUNDLI GENERATED"
            );

            res.status(200).json(
                response
            );

        }

        catch(error){

            console.log(
                "SERVER ERROR:"
            );

            console.log(error);

            res.status(500).json({

                success:false,

                error:
                error.message,

                stack:
                process.env.NODE_ENV
                !== "production"

                ? error.stack

                : undefined

            });

        }

    }

);

/* =========================
   404
========================= */

app.use((req,res)=>{

    res.status(404).json({

        success:false,

        message:"Route Not Found"

    });

});

/* =========================
   GLOBAL ERROR HANDLER
========================= */

app.use(

    (error,req,res,next)=>{

        console.log(
            "GLOBAL ERROR:"
        );

        console.log(error);

        res.status(500).json({

            success:false,

            message:
            "Internal Server Error"

        });

    }

);

/* =========================
   PROCESS ERRORS
========================= */

process.on(

    "uncaughtException",

    (error)=>{

        console.log(
            "UNCAUGHT EXCEPTION:"
        );

        console.log(error);

    }

);

process.on(

    "unhandledRejection",

    (reason)=>{

        console.log(
            "UNHANDLED REJECTION:"
        );

        console.log(reason);

    }

);

/* =========================
   VERCEL EXPORT
========================= */

module.exports = app;

/* =========================
   LOCAL SERVER ONLY
========================= */

if(

    process.env.NODE_ENV !==
    "production"

){

    app.listen(

        PORT,

        ()=>{

            console.log(`

========================================

🚀 AstroKundli AI LIVE

🌐 URL:
http://localhost:${PORT}

⚡ Astrology Engine Active

========================================

`);

        }

    );

}