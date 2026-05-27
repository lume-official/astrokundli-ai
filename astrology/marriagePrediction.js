function predictMarriage(data){

    const year =

    parseInt(data.year);

    const startYear =

    year + 24;

    const endYear =

    year + 30;

    return {

        marriageWindow:

        `${startYear}-${endYear}`,

        marriageType:

        year % 2 === 0
        ? "Love Marriage"
        : "Arranged Marriage",

        compatibility:

        "High emotional compatibility expected."

    };

}

module.exports = {

    predictMarriage

};