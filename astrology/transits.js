const {

    getJulianDay,

    getPlanetPosition,

    planets

} = require(
    "./swissephEngine"
);

const {

    longitudeToSign

} = require(
    "./zodiac"
);

/* =========================
   CURRENT DATE
========================= */

function getCurrentJulianDay(){

    const now =
    new Date();

    const hour =

    now.getUTCHours()

    +

    now.getUTCMinutes() / 60;

    return getJulianDay(

        now.getUTCFullYear(),

        now.getUTCMonth() + 1,

        now.getUTCDate(),

        hour

    );

}

/* =========================
   CURRENT TRANSITS
========================= */

function calculateCurrentTransits(){

    try{

        const jd =
        getCurrentJulianDay();

        const sun =
        getPlanetPosition(
            planets.SUN,
            jd
        );

        const moon =
        getPlanetPosition(
            planets.MOON,
            jd
        );

        const mercury =
        getPlanetPosition(
            planets.MERCURY,
            jd
        );

        const venus =
        getPlanetPosition(
            planets.VENUS,
            jd
        );

        const mars =
        getPlanetPosition(
            planets.MARS,
            jd
        );

        const jupiter =
        getPlanetPosition(
            planets.JUPITER,
            jd
        );

        const saturn =
        getPlanetPosition(
            planets.SATURN,
            jd
        );

        return {

            sun:
            longitudeToSign(
                sun.longitude
            ),

            moon:
            longitudeToSign(
                moon.longitude
            ),

            mercury:
            longitudeToSign(
                mercury.longitude
            ),

            venus:
            longitudeToSign(
                venus.longitude
            ),

            mars:
            longitudeToSign(
                mars.longitude
            ),

            jupiter:
            longitudeToSign(
                jupiter.longitude
            ),

            saturn:
            longitudeToSign(
                saturn.longitude
            )

        };

    }

    catch(error){

        console.log(
            "TRANSIT ERROR:",
            error
        );

        return {};

    }

}

/* =========================
   TRANSIT INTERPRETATION
========================= */

function interpretTransits(

    transits

){

    try{

        const insights = [];

        /* =========================
           JUPITER
        ========================== */

        if(

            transits.jupiter ===
            "Taurus"

        ){

            insights.push(

                "Jupiter transit supports financial stability and practical growth."

            );

        }

        /* =========================
           SATURN
        ========================== */

        if(

            transits.saturn ===
            "Pisces"

        ){

            insights.push(

                "Saturn transit emphasizes emotional maturity and karmic responsibility."

            );

        }

        /* =========================
           VENUS
        ========================== */

        if(

            transits.venus ===
            "Libra"

        ){

            insights.push(

                "Venus transit improves relationships, attraction, and harmony."

            );

        }

        /* =========================
           MARS
        ========================== */

        if(

            transits.mars ===
            "Aries"

        ){

            insights.push(

                "Mars transit increases ambition, aggression, and rapid action tendencies."

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

    calculateCurrentTransits,

    interpretTransits

};