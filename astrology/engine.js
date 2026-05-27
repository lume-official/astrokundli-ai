const Astronomy =
require("astronomy-engine");

/* =========================
   REAL PLANET LONGITUDE
========================= */

function getPlanetLongitude(

    body,
    date

){

    try{

        const vector =

        Astronomy.GeoVector(

            body,
            date,
            false

        );

        const ecliptic =

        Astronomy.Ecliptic(
            vector
        );

        let longitude =

        ecliptic.elon;

        if(longitude < 0){

            longitude += 360;

        }

        return longitude;

    }

    catch(error){

        console.log(

            "ENGINE ERROR:",
            error

        );

        return 0;

    }

}

module.exports = {

    getPlanetLongitude

};