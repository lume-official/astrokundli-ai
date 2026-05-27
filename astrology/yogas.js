/* =========================
   RAJ YOGA
========================= */

function detectRajYoga(planets){

    try{

        if(

            planets.jupiter.house === 10

            ||

            planets.sun.house === 10

        ){

            return {

                name:"Raj Yoga",

                effect:
                "Leadership, authority, career rise, and recognition potential."

            };

        }

        return null;

    }

    catch(error){

        return null;

    }

}

/* =========================
   DHAN YOGA
========================= */

function detectDhanYoga(planets){

    try{

        if(

            planets.jupiter.house === 2

            ||

            planets.venus.house === 2

        ){

            return {

                name:"Dhan Yoga",

                effect:
                "Strong wealth accumulation and financial prosperity potential."

            };

        }

        return null;

    }

    catch(error){

        return null;

    }

}

/* =========================
   GAJAKESARI YOGA
========================= */

function detectGajakesariYoga(planets){

    try{

        if(

            planets.jupiter.house ===
            planets.moon.house

        ){

            return {

                name:"Gajakesari Yoga",

                effect:
                "Wisdom, intelligence, fame, respect, and social influence."

            };

        }

        return null;

    }

    catch(error){

        return null;

    }

}

/* =========================
   BUDHADITYA YOGA
========================= */

function detectBudhadityaYoga(planets){

    try{

        if(

            planets.sun.house ===
            planets.mercury.house

        ){

            return {

                name:"Budhaditya Yoga",

                effect:
                "Strong intelligence, communication skills, business ability, and learning power."

            };

        }

        return null;

    }

    catch(error){

        return null;

    }

}

/* =========================
   VIPAREETA YOGA
========================= */

function detectVipareetaYoga(planets){

    try{

        if(

            planets.saturn.house === 8

            ||

            planets.mars.house === 8

        ){

            return {

                name:"Vipareeta Raja Yoga",

                effect:
                "Success after struggle, hidden strength, and overcoming obstacles."

            };

        }

        return null;

    }

    catch(error){

        return null;

    }

}

/* =========================
   KALASARPA
========================= */

function detectKalaSarpa(planets){

    try{

        if(

            planets.rahu.house <
            planets.ketu.house

        ){

            return {

                name:"Kala Sarpa Influence",

                effect:
                "Intense karmic life lessons, psychological pressure, and transformational experiences."

            };

        }

        return null;

    }

    catch(error){

        return null;

    }

}

/* =========================
   MAIN
========================= */

function calculateYogas(planets){

    try{

        const yogas = [];

        const rajYoga =
        detectRajYoga(planets);

        const dhanYoga =
        detectDhanYoga(planets);

        const gajakesariYoga =
        detectGajakesariYoga(planets);

        const budhadityaYoga =
        detectBudhadityaYoga(planets);

        const vipareetaYoga =
        detectVipareetaYoga(planets);

        const kalaSarpa =
        detectKalaSarpa(planets);

        [

            rajYoga,
            dhanYoga,
            gajakesariYoga,
            budhadityaYoga,
            vipareetaYoga,
            kalaSarpa

        ]

        .forEach(yoga=>{

            if(yoga){

                yogas.push(yoga);

            }

        });

        return yogas;

    }

    catch(error){

        console.log(
            "YOGA ERROR:",
            error
        );

        return [];

    }

}

/* =========================
   EXPORTS
========================= */

module.exports = {

    calculateYogas

};