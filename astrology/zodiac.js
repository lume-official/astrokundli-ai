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
   LONGITUDE → SIGN
========================= */

function longitudeToSign(

    longitude

){

    try{

        const index =

        Math.floor(
            longitude / 30
        );

        return zodiac[index]
        || "Aries";

    }

    catch(error){

        console.log(

            "ZODIAC ERROR:",
            error

        );

        return "Aries";

    }

}

module.exports = {

    longitudeToSign

};