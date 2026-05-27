const swisseph =
require("swisseph");

/* =========================
   PATH
========================= */

swisseph.swe_set_ephe_path(
    "./ephe"
);

/* =========================
   JULIAN DAY
========================= */

function getJulianDay(

    year,
    month,
    day,
    hour

){

    return swisseph.swe_julday(

        year,
        month,
        day,
        hour,

        swisseph.SE_GREG_CAL

    );

}

/* =========================
   PLANET LONGITUDE
========================= */

function getPlanetPosition(

    planet,
    jd

){

    try{

        const result =

        swisseph.swe_calc_ut(

            jd,

            planet,

            swisseph.SEFLG_SPEED

        );

        if(

            result.error

        ){

            console.log(
                result.error
            );

            return null;

        }

        return {

            longitude:
            result.data[0],

            latitude:
            result.data[1],

            distance:
            result.data[2],

            speed:
            result.data[3],

            retrograde:
            result.data[3] < 0

        };

    }

    catch(error){

        console.log(
            "SwissEph Error:",
            error
        );

        return null;

    }

}

/* =========================
   ASCENDANT
========================= */

function calculateAscendant(

    jd,
    latitude,
    longitude

){

    try{

        const houses =

        swisseph.swe_houses(

            jd,

            latitude,

            longitude,

            'P'

        );

        return {

            ascendant:
            houses.ascendant,

            mc:
            houses.mc,

            houses:
            houses.house

        };

    }

    catch(error){

        console.log(
            error
        );

        return null;

    }

}

/* =========================
   EXPORTS
========================= */

module.exports = {

    getJulianDay,

    getPlanetPosition,

    calculateAscendant,

    planets:{

        SUN:
        swisseph.SE_SUN,

        MOON:
        swisseph.SE_MOON,

        MERCURY:
        swisseph.SE_MERCURY,

        VENUS:
        swisseph.SE_VENUS,

        MARS:
        swisseph.SE_MARS,

        JUPITER:
        swisseph.SE_JUPITER,

        SATURN:
        swisseph.SE_SATURN,

        RAHU:
        swisseph.SE_MEAN_NODE

    }

};