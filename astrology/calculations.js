const {

    calculateCurrentTransits,

    interpretTransits

} = require(
    "./transits"
);

const {

    calculateNavamsa,

    interpretNavamsa

} = require(
    "./navamsa"
);

const {

    calculateYogas

} = require(
    "./yogas"
);

const {

    calculateAspects,

    interpretAspects

} = require(
    "./aspects"
);

const {

    calculateMahadasha,

    getCurrentDasha

} = require(
    "./dasha"
);

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

const {

    longitudeToNakshatra

} = require(
    "./nakshatra"
);

const {

    calculateHouses

} = require(
    "./houses"
);

/* =========================
   DEFAULT LOCATION
========================= */

const DEFAULT_LAT =
8.5241;

const DEFAULT_LON =
76.9366;

/* =========================
   EXALTATION
========================= */

const exaltationSigns = {

    sun:"Aries",
    moon:"Taurus",
    mars:"Capricorn",
    mercury:"Virgo",
    jupiter:"Cancer",
    venus:"Pisces",
    saturn:"Libra"

};

/* =========================
   DEBILITATION
========================= */

const debilitationSigns = {

    sun:"Libra",
    moon:"Scorpio",
    mars:"Cancer",
    mercury:"Pisces",
    jupiter:"Capricorn",
    venus:"Virgo",
    saturn:"Aries"

};

/* =========================
   PLANET HOUSE
========================= */

function getPlanetHouse(

    longitude,

    houses

){

    try{

        for(

            let i = 0;

            i < houses.length;

            i++

        ){

            const current =

            parseFloat(
                houses[i].degree
            );

            const next =

            i === 11

            ?

            parseFloat(
                houses[0].degree
            ) + 360

            :

            parseFloat(
                houses[i + 1].degree
            );

            let degree =
            longitude;

            if(

                degree < current

            ){

                degree += 360;

            }

            if(

                degree >= current

                &&

                degree < next

            ){

                return i + 1;

            }

        }

        return 1;

    }

    catch(error){

        console.log(
            "PLANET HOUSE ERROR:",
            error
        );

        return 1;

    }

}

/* =========================
   PLANET DIGNITY
========================= */

function getPlanetDignity(

    planetName,
    sign

){

    const lower =
    planetName.toLowerCase();

    if(

        exaltationSigns[lower]
        === sign

    ){

        return "Exalted";

    }

    if(

        debilitationSigns[lower]
        === sign

    ){

        return "Debilitated";

    }

    return "Neutral";

}

/* =========================
   FORMAT PLANET
========================= */

function formatPlanet(

    planet,
    name,
    houses

){

    if(!planet){

        return {

            sign:"Unknown",

            degree:"0°",

            longitude:0,

            retrograde:false,

            house:1,

            dignity:"Neutral"

        };

    }

    const sign =

    longitudeToSign(
        planet.longitude
    );

    return {

        sign,

        degree:
        `${planet.longitude.toFixed(2)}°`,

        longitude:
        planet.longitude,

        retrograde:
        planet.retrograde,

        house:

        getPlanetHouse(

            planet.longitude,

            houses

        ),

        dignity:

        getPlanetDignity(
            name,
            sign
        )

    };

}

/* =========================
   PLANETS
========================= */

function calculatePlanets(data){

    try{

        const {

            year,
            month,
            day,
            hour,
            minute

        } = data;

        const decimalHour =

            parseInt(hour)

            +

            parseInt(minute) / 60;

        const jd =

        getJulianDay(

            parseInt(year),
            parseInt(month),
            parseInt(day),
            decimalHour

        );

        /* =========================
           HOUSES
        ========================== */

        const houses =

        calculateHouses(

            jd,
            DEFAULT_LAT,
            DEFAULT_LON

        );

        /* =========================
           PLANETS
        ========================== */

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

        const rahu =
        getPlanetPosition(
            planets.RAHU,
            jd
        );

        /* =========================
           KETU
        ========================== */

        const ketuLongitude =

        rahu.longitude + 180 > 360

        ?

        rahu.longitude - 180

        :

        rahu.longitude + 180;

        const ketu = {

            longitude:
            ketuLongitude,

            retrograde:
            rahu.retrograde

        };

        /* =========================
           RETURN
        ========================== */

        return {

            sun:
            formatPlanet(
                sun,
                "sun",
                houses
            ),

            moon:
            formatPlanet(
                moon,
                "moon",
                houses
            ),

            mercury:
            formatPlanet(
                mercury,
                "mercury",
                houses
            ),

            venus:
            formatPlanet(
                venus,
                "venus",
                houses
            ),

            mars:
            formatPlanet(
                mars,
                "mars",
                houses
            ),

            jupiter:
            formatPlanet(
                jupiter,
                "jupiter",
                houses
            ),

            saturn:
            formatPlanet(
                saturn,
                "saturn",
                houses
            ),

            rahu:
            formatPlanet(
                rahu,
                "rahu",
                houses
            ),

            ketu:
            formatPlanet(
                ketu,
                "ketu",
                houses
            )

        };

    }

    catch(error){

        console.log(
            "PLANET ERROR:",
            error
        );

        return {};

    }

}

/* =========================
   HOUSES
========================= */

function getHouses(data){

    try{

        const decimalHour =

            parseInt(data.hour)

            +

            parseInt(data.minute) / 60;

        const jd =

        getJulianDay(

            parseInt(data.year),
            parseInt(data.month),
            parseInt(data.day),
            decimalHour

        );

        return calculateHouses(

            jd,
            DEFAULT_LAT,
            DEFAULT_LON

        );

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
   LAGNA
========================= */

function calculateLagna(data){

    try{

        const houses =
        getHouses(data);

        return houses[0]?.sign
        || "Aries";

    }

    catch(error){

        return "Aries";

    }

}

/* =========================
   NAKSHATRA
========================= */

function calculateNakshatra(planets){

    try{

        return longitudeToNakshatra(

            planets.moon.longitude

        );

    }

    catch(error){

        return "Ashwini";

    }

}

/* =========================
   MOON SIGN
========================= */

function calculateMoonSign(planets){

    return planets?.moon?.sign
    || "Cancer";

}

/* =========================
   SUN SIGN
========================= */

function calculateSunSign(planets){

    return planets?.sun?.sign
    || "Leo";

}

/* =========================
   MANGLIK
========================= */

function calculateManglik(planets){

    try{

        const marsHouse =

        planets?.mars?.house;

        if(

            marsHouse === 1 ||

            marsHouse === 4 ||

            marsHouse === 7 ||

            marsHouse === 8 ||

            marsHouse === 12

        ){

            return "Yes";

        }

        return "No";

    }

    catch(error){

        return "No";

    }

}

/* =========================
   STRENGTH
========================= */

function calculateStrength(planets){

    try{

        let score = 70;

        Object.values(planets)

        .forEach(planet=>{

            if(

                planet.dignity ===
                "Exalted"

            ){

                score += 4;

            }

            if(

                planet.dignity ===
                "Debilitated"

            ){

                score -= 4;

            }

            if(

                planet.retrograde

            ){

                score -= 1;

            }

        });

        return Math.min(
            score,
            99
        );

    }

    catch(error){

        return 70;

    }

}

/* =========================
   RELATIONSHIP SCORE
========================= */

function calculateRelationshipScore(planets){

    try{

        let score = 75;

        if(

            planets.venus.dignity ===
            "Exalted"

        ){

            score += 10;

        }

        if(

            planets.mars.house === 7

        ){

            score -= 10;

        }

        return Math.min(
            score,
            99
        );

    }

    catch(error){

        return 70;

    }

}

/* =========================
   PREDICTIONS
========================= */

function calculatePredictions(data){

    try{

        const {

            planets,
            moonSign,
            sunSign,
            manglik,
            nakshatra,
            birthYear

        } = data;

        /* =========================
           DASHA
        ========================== */

        const dashas =

        calculateMahadasha(

            nakshatra,
            birthYear

        );

        const currentDasha =

        getCurrentDasha(
            dashas
        );

        /* =========================
           ASPECTS
        ========================== */

        const aspects =

        calculateAspects(
            planets
        );

        const aspectInterpretations =

        interpretAspects(
            aspects
        );

/* =========================
   YOGAS
========================= */

const yogas =

calculateYogas(
    planets
);

/* =========================
   NAVAMSA
========================= */

const navamsa =

calculateNavamsa(
    planets
);

const navamsaInsights =

interpretNavamsa(
    navamsa
);

/* =========================
   TRANSITS
========================= */

const currentTransits =

calculateCurrentTransits();

const transitInsights =

interpretTransits(
    currentTransits
);

        /* =========================
           VARIABLES
        ========================== */

        let career = "";
        let finance = "";
        let relationship = "";
        let health = "";
        let personality = "";
        let spirituality = "";
        let marriage = "";

        /* =========================
           CAREER
        ========================== */

        if(

            planets.sun.house === 10

        ){

            career =
            "Strong leadership and career recognition combinations are visible.";

        }

        else if(

            planets.saturn.house === 10

        ){

            career =
            "Slow but stable long-term career growth through discipline.";

        }

        else{

            career =
            "Professional growth improves steadily with persistence.";

        }

        /* =========================
           FINANCE
        ========================== */

        if(

            planets.jupiter.house === 2

        ){

            finance =
            "Excellent long-term wealth accumulation potential is visible.";

        }

        else{

            finance =
            "Financial growth improves through planning and stability.";

        }

        /* =========================
           RELATIONSHIP
        ========================== */

        if(manglik === "Yes"){

            relationship =
            "Strong emotional intensity and relationship karma influence personal life.";

        }

        else{

            relationship =
            "Balanced emotional and romantic compatibility patterns are visible.";

        }

        /* =========================
           MARRIAGE
        ========================== */

        if(

            planets.venus.house === 7

        ){

            marriage =
            "Marriage and partnerships become highly significant karmic themes.";

        }

        else{

            marriage =
            "Marriage stability improves through emotional maturity and communication.";

        }

        /* =========================
           HEALTH
        ========================== */

        if(

            moonSign === "Scorpio"

        ){

            health =
            "Mental stress and emotional overthinking should be controlled.";

        }

        else{

            health =
            `${moonSign} influence affects emotional health patterns.`;

        }

        /* =========================
           PERSONALITY
        ========================== */

        personality =

        `${sunSign} solar energy strongly shapes confidence, identity, and self-expression.`;

        /* =========================
           SPIRITUALITY
        ========================== */

        spirituality =

        `${nakshatra} Nakshatra strongly influences karmic evolution and spiritual growth.`;

        /* =========================
           DASHA EFFECT
        ========================== */

        let dashaEffect = "";

        switch(

            currentDasha?.lord

        ){

            case "Saturn":

                dashaEffect =
                "Saturn Mahadasha emphasizes discipline, karmic lessons, and delayed success.";

                break;

            case "Jupiter":

                dashaEffect =
                "Jupiter Mahadasha supports prosperity, wisdom, and expansion.";

                break;

            case "Venus":

                dashaEffect =
                "Venus Mahadasha increases attraction, luxury, creativity, and romance.";

                break;

            default:

                dashaEffect =
                "Current planetary cycle strongly influences major life direction.";

        }

        /* =========================
           RETURN
        ========================== */

        return {

            currentDasha:

            currentDasha?.lord
            || "Unknown",

            dashaPeriod:

            currentDasha

            ?

            `${currentDasha.start} - ${currentDasha.end}`

            :

            "Unknown",

            dashaEffect,

            career,
            finance,
            relationship,
            marriage,
            health,
            personality,
            spirituality,

            successScore:

            calculateStrength(
                planets
            ),

            relationshipScore:

            calculateRelationshipScore(
                planets
            ),

            aspects,

            aspectInterpretations,

            yogas,

            navamsa,

            navamsaInsights,

            currentTransits,

            transitInsights,

            dashas

        };

    }

    catch(error){

        console.log(
            "PREDICTION ERROR:",
            error
        );

        return {

            career:
            "Prediction unavailable",

            finance:
            "Prediction unavailable",

            relationship:
            "Prediction unavailable",

            health:
            "Prediction unavailable"

        };

    }

}

/* =========================
   EXPORTS
========================= */

module.exports = {

    calculatePlanets,
    calculateLagna,
    calculateNakshatra,
    calculateMoonSign,
    calculateSunSign,
    calculateManglik,
    calculatePredictions,
    calculateStrength,
    calculateRelationshipScore,
    getHouses
  };