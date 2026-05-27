function relationshipTransitions(planets){

    const transitions = [];

    if(

        planets.venus.sign ===
        "Libra"

    ){

        transitions.push(

            "High proposal chances in upcoming cycle."

        );

    }

    if(

        planets.mars.sign ===
        "Scorpio"

    ){

        transitions.push(

            "Possible emotional conflicts or breakup tendencies."

        );

    }

    if(

        planets.moon.sign ===
        "Cancer"

    ){

        transitions.push(

            "Strong emotional bonding phase likely."

        );

    }

    return transitions;

}

module.exports = {

    relationshipTransitions

};