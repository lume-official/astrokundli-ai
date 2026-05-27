function relationshipSuccess(planets){

    let score = 70;

    if(

        planets.venus.sign ===
        "Libra"

    ){

        score += 10;

    }

    if(

        planets.moon.sign ===
        "Cancer"

    ){

        score += 10;

    }

    if(

        planets.mars.sign ===
        "Scorpio"

    ){

        score -= 15;

    }

    if(score > 100){

        score = 100;

    }

    if(score < 0){

        score = 0;

    }

    return `${score}%`;

}

module.exports = {

    relationshipSuccess

};