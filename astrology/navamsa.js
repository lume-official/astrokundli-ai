/* =========================
   NAVAMSA SIGNS
========================= */

const zodiac = [

    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces"

];

/* =========================
   GET NAVAMSA SIGN
========================= */

function getNavamsaSign(

    longitude

){

    try{

        const signIndex =

        Math.floor(
            longitude / 30
        );

        const degreeInSign =

        longitude % 30;

        const navamsaPart =

        Math.floor(
            degreeInSign / 3.3333
        );

        const finalIndex =

        (signIndex * 9 + navamsaPart)

        %

        12;

        return zodiac[
            finalIndex
        ];

    }

    catch(error){

        console.log(
            "NAVAMSA ERROR:",
            error
        );

        return "Aries";

    }

}

/* =========================
   CALCULATE NAVAMSA
========================= */

function calculateNavamsa(

    planets

){

    try{

        const result = {};

        Object.entries(planets)

        .forEach(([name,planet])=>{

            result[name] = {

                navamsa:

                getNavamsaSign(
                    planet.longitude
                )

            };

        });

        return result;

    }

    catch(error){

        console.log(error);

        return {};

    }

}

/* =========================
   NAVAMSA INTERPRETATION
========================= */

function interpretNavamsa(

    navamsaData

){

    try{

        const insights = [];

        /* =========================
           VENUS
        ========================== */

        if(

            navamsaData.venus?.navamsa
            === "Libra"

        ){

            insights.push(

                "Strong romantic harmony and marriage compatibility patterns are visible."

            );

        }

        /* =========================
           JUPITER
        ========================== */

        if(

            navamsaData.jupiter?.navamsa
            === "Sagittarius"

        ){

            insights.push(

                "Strong spiritual wisdom and dharmic life path influence are visible."

            );

        }

        /* =========================
           MOON
        ========================== */

        if(

            navamsaData.moon?.navamsa
            === "Cancer"

        ){

            insights.push(

                "Emotional depth and nurturing relationship energy are highly dominant."

            );

        }

        /* =========================
           SATURN
        ========================== */

        if(

            navamsaData.saturn?.navamsa
            === "Capricorn"

        ){

            insights.push(

                "Marriage and karmic responsibilities become major life themes."

            );

        }

        return insights;

    }

    catch(error){

        console.log(error);

        return [];

    }

}

/* =========================
   EXPORTS
========================= */

module.exports = {

    calculateNavamsa,

    interpretNavamsa

};