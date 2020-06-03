var quizz = [];
var interactiveVideos = [];
var quizzData = {

    0: {
        "youtubeVideoId": 'fm2ruTcSePw',
        "statement": "A cette étape de la discussion, que devrait faire la superviseure pour aider les stagiaires à cheminer vers une identité professionnelle collective ?",
        "choices": ["Demander aux stagiaires de revoir l’objectif commun de l’équipe",
            "Demander à chacun de discuter de leur expérience professionnelle avec la patiente",
            "Discuter des tâches qui peuvent être partagées ou non pendant une intervention",
            "Centrer la discussion sur les besoins du patient",
            "Reprendre la discussion sur certains concepts de la collaboration interprofessionnelle"
        ],

        "feedback": "",
        "solution": [0, 3, 4]

    },
    1: {
        "youtubeVideoId": 'T4OiU5sVQ5Y',

        "statement": "A cette étape de la discussion, que devrait faire la superviseure pour aider les stagiaires à cheminer vers une identité professionnelle collective ?",
        "choices": ["Demander à chacun de discuter de leur expérience professionnelle avec la patiente",
            "Demander à chacun de discuter de leur expérience professionnelle avec la patiente",
            "Discuter de la nécessité d’une interaction continue entre les membres de l’équipe",
            "Encourager les stagiaires à prendre une direction commune",
            "Valoriser le travail individuel"
        ],
        "feedback": "",
        "solution": [0, 2]

    },
    2: {
        "youtubeVideoId": 'PRWsoAYJEA4',

        "statement": "A cette étape de la discussion, que devrait faire la superviseure pour aider les stagiaires à cheminer vers une identité professionnelle collective ?",
        "choices": ["Expliquer les avantages de travailler en CIP",
            "Demander à chacun de discuter de leur expérience professionnelle avec la patiente",
            "Discuter des tâches qui peuvent être partagées ou non pendant une intervention",
            "Centrer la discussion sur les besoins du patient",
            "Initier les stagiaires à assumer de nouveaux rôles et responsabilités"
        ],
        "feedback": "",
        "solution": [0, 2, 4]

    },
    3: {
        "youtubeVideoId": 'MJ7lvAiYv_Y',
        "statement": "A cette étape de la discussion, que devrait faire la superviseure pour aider les stagiaires à cheminer vers une identité professionnelle collective ?",
        "choices": ["Expliquer les avantages de travailler en CIP",
            "Demander à chacun de discuter de leur expérience professionnelle avec la patiente",
            "Discuter des tâches qui peuvent être partagées ou non pendant une intervention",
            "Centrer la discussion sur les besoins du patient",
            "Initier les stagiaires à assumer de nouveaux rôles et responsabilités"
        ],
        "feedback": "",
        "solution": [2, 3, 4]

    },



};
window.onload = initQuizz();

function initQuizz() {


    //create question here

    for (var q = 1; q < Object.keys(quizzData).length + 1; q++) {
        var newQuestion = new Question("slide_" + q, quizzData[q - 1].choices, quizzData[q - 1])
        var newInteractiveVideo = new InteractiveVideo(newQuestion);
        quizz.push(newQuestion);
        interactiveVideos.push(newInteractiveVideo);


    }




}

function resetQuestions() {

    quizz.forEach((element, index) => {
        element.updateQuizzList();
    });



}