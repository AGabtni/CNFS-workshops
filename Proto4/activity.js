var quizz = [];
var quizzData = {

    0: {
        "statement": "Nous communiquons l’évaluation du rendement au stagiaire dans le but... de solidifier la relation superviseur-stagiaire.",
        "feedback": "Elle vise plutôt à améliorer l’apprentissage, non pas la relation avec le superviseur (bien que l’évaluation passe par la communication).",
        "solution": [1]

    },
    1: {
        "statement": "Nous communiquons l’évaluation du rendement au stagiaire dans le but... de fournir en un seul temps de la rétroaction sur le rendement du stagiaire.",
        "feedback": "Elle doit être fournie au fur et à mesure tout au long du stage. La rétroaction ainsi fournie permet de réduire le doute et dissiper l’anxiété du stagiaire.",
        "solution": [1]

    },
    2: {
        "statement": "Nous communiquons l’évaluation du rendement au stagiaire dans le but... d’officialiser la réussite ou l’échec.",
        "feedback": "L’évaluation sommative fournit un résultat final, un bilan.",
        "solution": [0]

    },
    3: {
        "statement": "Nous communiquons l’évaluation du rendement au stagiaire dans le but... de faire le bilan des forces et des points à améliorer chez le stagiaire et le soutenir dans son apprentissage.",
        "feedback": "Il s’agit d’un moment pour souligner au stagiaire ce qu’il réussit bien et ce qu’il doit améliorer.",
        "solution": [0]

    },
    4: {
        "statement": "Nous communiquons l’évaluation du rendement au stagiaire dans le but... de présenter les attentes du superviseur",
        "feedback": "Celles-ci sont discutées en même temps que les objectifs, dès le début du stage!",
        "solution": [1]

    },
    5: {
        "statement": "Nous communiquons l’évaluation du rendement au stagiaire dans le but... de présenter les attentes du superviseur",
        "feedback": "Les commentaires portent sur l’écart entre les résultats et les objectifs, donc sur les comportements et non sur la personne.",
        "solution": [1]

    },
    6: {
        "statement": "Nous communiquons l’évaluation du rendement au stagiaire dans le but... d’évaluer les connaissances, les habiletés et les attitudes en relation avec les objectifs fixés.",
        "feedback": "L’évaluation porte sur le savoir, le savoir-faire et le savoir-être acquis. L’évaluation s’intéresse essentiellement à l’apprentissage et à l’atteinte des objectifs. Selon Turgeon (1997), l’évaluation est une activité de contrôle qui permet de déterminer si le stage se déroule comme prévu et si le stagiaire atteint les objectifs fixés.",
        "solution": [0]

    },
    7: {
        "statement": "Nous communiquons l’évaluation du rendement au stagiaire dans le but... de stimuler une réflexion sur l’efficacité des stratégies d’enseignement du superviseur.",
        "feedback": "L’évaluation sert à mesurer ou à déterminer si les stratégies de formation utilisées correspondent aux besoins du stagiaire (Scriven, cité par Nadeau, 1988), ainsi qu’à effectuer des ajustements, au besoin.",
        "solution": [0]

    },
    8: {
        "statement": "Nous communiquons l’évaluation du rendement au stagiaire dans le but d’être en mesure de mieux conseiller le stagiaire.",
        "feedback": "Le superviseur sera en mesure de donner des conseils pertinents par rapport aux difficultés rencontrées ou il pourra répondre aux besoins de formation et de développement du stagiaire (Socosis, 2009).",
        "solution": [0]
    }



};

window.onload = initQuizz();


function initQuizz() {


    //create question here
    for (var q = 1; q < 10; q++) {
        var questionTag = "slide_" + q

        quizz.push(new Question(questionTag, ["Vrai", "Faux"], quizzData[q - 1]));


    }
    quizz.forEach((element, index) => {
        element.initQuestion();
        element.titleElement.textContent = "Situation  " + (index + 1) + "/" + quizz.length;
    });


}

function ondisabled() {

    console.log("NO")
}