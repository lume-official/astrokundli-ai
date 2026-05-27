/* =========================
   ASPECT TYPES
========================= */

const aspectDefinitions = [

    {
        name:"Conjunction",
        angle:0,
        orb:8,
        effect:"Powerful energy blending"
    },

    {
        name:"Opposition",
        angle:180,
        orb:8,
        effect:"Tension and balance lessons"
    },

    {
        name:"Trine",
        angle:120,
        orb:7,
        effect:"Natural harmony and flow"
    },

    {
        name:"Square",
        angle:90,
        orb:6,
        effect:"Conflict and growth pressure"
    },

    {
        name:"Sextile",
        angle:60,
        orb:5,
        effect:"Opportunities and support"
    }

];

/* =========================
   PLANET PAIRS
========================= */

function getPlanetEntries(planets){

    return Object.entries(planets);

}

/* =========================
   ANGLE DIFFERENCE
========================= */

function getAngleDifference(a,b){

    let diff =

    Math.abs(a - b);

    if(diff > 180){

        diff = 360 - diff;

    }

    return diff;

}

/* =========================
   DETECT ASPECT
========================= */

function detectAspect(angle){

    for(

        const aspect of aspectDefinitions

    ){

        if(

            Math.abs(
                angle - aspect.angle
            )

            <=

            aspect.orb

        ){

            return aspect;

        }

    }

    return null;

}

/* =========================
   CALCULATE ASPECTS
========================= */

function calculateAspects(planets){

    try{

        const entries =

        getPlanetEntries(
            planets
        );

        const aspects = [];

        for(

            let i = 0;

            i < entries.length;

            i++

        ){

            for(

                let j = i + 1;

                j < entries.length;

                j++

            ){

                const [

                    planetAName,
                    planetA

                ] = entries[i];

                const [

                    planetBName,
                    planetB

                ] = entries[j];

                if(

                    !planetA.longitude

                    ||

                    !planetB.longitude

                ){

                    continue;

                }

                const angle =

                getAngleDifference(

                    planetA.longitude,

                    planetB.longitude

                );

                const aspect =

                detectAspect(
                    angle
                );

                if(aspect){

                    aspects.push({

                        planets:

                        `${planetAName.toUpperCase()} - ${planetBName.toUpperCase()}`,

                        aspect:
                        aspect.name,

                        angle:
                        angle.toFixed(2),

                        effect:
                        aspect.effect

                    });

                }

            }

        }

        return aspects;

    }

    catch(error){

        console.log(
            "ASPECT ERROR:",
            error
        );

        return [];

    }

}

/* =========================
   INTERPRET ASPECTS
========================= */

function interpretAspects(aspects){

    try{

        const interpretations = [];

        aspects.forEach(aspect=>{

            if(

                aspect.aspect ===
                "Conjunction"

            ){

                interpretations.push(

                    `${aspect.planets} creates intense combined planetary influence.`

                );

            }

            if(

                aspect.aspect ===
                "Opposition"

            ){

                interpretations.push(

                    `${aspect.planets} creates karmic tension and emotional balancing lessons.`

                );

            }

            if(

                aspect.aspect ===
                "Trine"

            ){

                interpretations.push(

                    `${aspect.planets} supports natural talent and smooth progress.`

                );

            }

            if(

                aspect.aspect ===
                "Square"

            ){

                interpretations.push(

                    `${aspect.planets} creates internal pressure and transformation challenges.`

                );

            }

            if(

                aspect.aspect ===
                "Sextile"

            ){

                interpretations.push(

                    `${aspect.planets} supports growth opportunities and cooperation.`

                );

            }

        });

        return interpretations;

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

    calculateAspects,
    interpretAspects

};