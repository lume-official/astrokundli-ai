/* =========================
   VIMSHOTTARI DASHA
========================= */

const dashaSequence = [

    {
        lord:"Ketu",
        years:7
    },

    {
        lord:"Venus",
        years:20
    },

    {
        lord:"Sun",
        years:6
    },

    {
        lord:"Moon",
        years:10
    },

    {
        lord:"Mars",
        years:7
    },

    {
        lord:"Rahu",
        years:18
    },

    {
        lord:"Jupiter",
        years:16
    },

    {
        lord:"Saturn",
        years:19
    },

    {
        lord:"Mercury",
        years:17
    }

];

/* =========================
   NAKSHATRA LORDS
========================= */

const nakshatraLords = {

    Ashwini:"Ketu",
    Bharani:"Venus",
    Krittika:"Sun",
    Rohini:"Moon",
    Mrigashira:"Mars",
    Ardra:"Rahu",
    Punarvasu:"Jupiter",
    Pushya:"Saturn",
    Ashlesha:"Mercury",

    Magha:"Ketu",
    PurvaPhalguni:"Venus",
    UttaraPhalguni:"Sun",
    Hasta:"Moon",
    Chitra:"Mars",
    Swati:"Rahu",
    Vishakha:"Jupiter",
    Anuradha:"Saturn",
    Jyeshtha:"Mercury",

    Mula:"Ketu",
    PurvaAshadha:"Venus",
    UttaraAshadha:"Sun",
    Shravana:"Moon",
    Dhanishta:"Mars",
    Shatabhisha:"Rahu",
    PurvaBhadrapada:"Jupiter",
    UttaraBhadrapada:"Saturn",
    Revati:"Mercury"

};

/* =========================
   GET DASHA INDEX
========================= */

function getDashaIndex(

    lord

){

    return dashaSequence.findIndex(

        d => d.lord === lord

    );

}

/* =========================
   CALCULATE MAHADASHA
========================= */

function calculateMahadasha(

    nakshatra,
    birthYear

){

    try{

        const lord =

        nakshatraLords[
            nakshatra
        ];

        const startIndex =

        getDashaIndex(
            lord
        );

        let currentYear =
        parseInt(birthYear);

        const dashas = [];

        for(

            let i = 0;

            i < dashaSequence.length;

            i++

        ){

            const index =

            (startIndex + i)

            %

            dashaSequence.length;

            const dasha =

            dashaSequence[index];

            const start =
            currentYear;

            const end =

            currentYear +
            dasha.years;

            dashas.push({

                lord:
                dasha.lord,

                start,

                end,

                duration:
                dasha.years

            });

            currentYear = end;

        }

        return dashas;

    }

    catch(error){

        console.log(
            "DASHA ERROR:",
            error
        );

        return [];

    }

}

/* =========================
   CURRENT DASHAS
========================= */

function getCurrentDasha(

    dashas

){

    const currentYear =

    new Date().getFullYear();

    return dashas.find(

        d =>

        currentYear >= d.start

        &&

        currentYear <= d.end

    );

}

/* =========================
   EXPORTS
========================= */

module.exports = {

    calculateMahadasha,
    getCurrentDasha

};