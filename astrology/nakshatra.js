const nakshatras = [

    "Ashwini",
    "Bharani",
    "Krittika",
    "Rohini",
    "Mrigashira",
    "Ardra",
    "Punarvasu",
    "Pushya",
    "Ashlesha",
    "Magha",
    "Purva Phalguni",
    "Uttara Phalguni",
    "Hasta",
    "Chitra",
    "Swati",
    "Vishakha",
    "Anuradha",
    "Jyeshtha",
    "Mula",
    "Purva Ashadha",
    "Uttara Ashadha",
    "Shravana",
    "Dhanishta",
    "Shatabhisha",
    "Purva Bhadrapada",
    "Uttara Bhadrapada",
    "Revati"

];

/* =========================
   LONGITUDE → NAKSHATRA
========================= */

function longitudeToNakshatra(

    longitude

){

    try{

        const size =

        360 / 27;

        const index =

        Math.floor(
            longitude / size
        );

        return nakshatras[index]
        || "Ashwini";

    }

    catch(error){

        console.log(

            "NAKSHATRA ERROR:",
            error

        );

        return "Ashwini";

    }

}

module.exports = {

    longitudeToNakshatra

};