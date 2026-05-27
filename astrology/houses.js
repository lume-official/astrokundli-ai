const {

    calculateAscendant

} = require(
    "./swissephEngine"
);

const {

    longitudeToSign

} = require(
    "./zodiac"
);

/* =========================
   HOUSE NAMES
========================= */

const houseNames = [

    "1st House",
    "2nd House",
    "3rd House",
    "4th House",
    "5th House",
    "6th House",
    "7th House",
    "8th House",
    "9th House",
    "10th House",
    "11th House",
    "12th House"

];

/* =========================
   HOUSE MEANINGS
========================= */

const meanings = [

    "Self / Personality",

    "Money / Speech",

    "Communication / Courage",

    "Home / Mother",

    "Creativity / Children",

    "Health / Enemies",

    "Marriage / Partnerships",

    "Transformation / Secrets",

    "Luck / Dharma",

    "Career / Status",

    "Income / Gains",

    "Spirituality / Loss"

];

/* =========================
   CALCULATE HOUSES
========================= */

function calculateHouses(

    jd,
    latitude,
    longitude

){

    try{

        const ascData =

        calculateAscendant(

            jd,
            latitude,
            longitude

        );

        if(!ascData){

            return [];

        }

        const result = [];

        for(

            let i = 0;

            i < 12;

            i++

        ){

            const degree =

            ascData.houses[i];

            result.push({

                house:
                houseNames[i],

                sign:
                longitudeToSign(
                    degree
                ),

                degree:
                degree.toFixed(2),

                meaning:
                meanings[i]

            });

        }

        return result;

    }

    catch(error){

        console.log(
            "HOUSE ERROR:",
            error
        );

        return [];

    }

}

/* =========================
   EXPORTS
========================= */

module.exports = {

    calculateHouses

};