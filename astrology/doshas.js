function calculateDoshas(planets){

    return {

        manglik:

        planets.mars.sign ===
        "Aries"
        ? "Yes"
        : "No",

        kaalSarp:

        planets.rahu
        ? "Possible"
        : "No"

    };

}

module.exports = {

    calculateDoshas

};