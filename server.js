const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

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
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({

    extended:true

}));

app.use(

    express.static(

        path.join(
            __dirname,
            "public"
        )

    )

);

/* =========================
   HOME PAGE
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
   STATUS API
========================= */

app.get("/api/status",(req,res)=>{

    res.json({

        success:true,

        server:"Running",

        astrologyEngine:
        "Astronomy Engine",

        version:"4.0"

    });

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
   GENERATE KUNDLI
========================= */

app.post(

    "/submit",

    async (req,res)=>{

        try{

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

            console.log(
                "Incoming Request:"
            );

            console.log(req.body);

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
                    "All fields required"

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
               CALCULATIONS
            ========================== */

            const planets =

            calculatePlanets(
                userData
            );

            console.log(
                "PLANETS:"
            );

            console.log(planets);

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
               FINAL RESPONSE
            ========================== */

            const response = {

                success:true,

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
                "KUNDLI SUCCESS"
            );

            res.json(response);

        }

        catch(error){

            console.log(
                "FULL SERVER ERROR:"
            );

            console.log(error);

            res.status(500).json({

                success:false,

                message:
                error.message,

                stack:
                error.stack

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

        message:"Page Not Found"

    });

});

/* =========================
   START SERVER
========================= */

app.listen(PORT,()=>{

    console.log(`

========================================

🚀 AstroKundli AI Running

🌐 URL:
http://localhost:${PORT}

========================================

`);

});