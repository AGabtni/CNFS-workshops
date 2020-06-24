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
//Slider functions 

var slideIndex = 1;
showSlides(slideIndex);

function initQuizz() {


    //create question here

    for (var q = 1; q < Object.keys(quizzData).length + 1; q++) {
        var newQuestion = new Question("slide_" + q, quizzData[q - 1])
        var newInteractiveVideo = new InteractiveVideo(newQuestion);
        quizz.push(newQuestion);
        interactiveVideos.push(newInteractiveVideo);


    }


    quizz.forEach((element, index) => {
        element.updateQuizzList();
        element.titleElement.textContent = "Situation  " + (index + 1) + "/" + quizz.length;

    });



}

function resetQuestions() {

    quizz.forEach((element, index) => {
        element.updateQuizzList();
    });



}





// Next/previous controls
function next(n) {
    showSlides(slideIndex += n);

    var oldCurrentSlide = document.getElementsByClassName("current");
    var currentSlide = document.getElementById("slide_" + slideIndex);

    oldCurrentSlide = oldCurrentSlide[0];

    oldCurrentSlide.classList.remove("moved-left");
    oldCurrentSlide.classList.remove("moved-right");
    oldCurrentSlide.classList.remove("current");

    currentSlide.classList.add("moved-right");
    currentSlide.classList.add("current");



}

function prev(n) {

    showSlides(slideIndex += n);

    var oldCurrentSlide = document.getElementsByClassName("current");
    var currentSlide = document.getElementById("slide_" + slideIndex);

    oldCurrentSlide = oldCurrentSlide[0];


    oldCurrentSlide.classList.remove("moved-left");
    oldCurrentSlide.classList.remove("moved-right");
    oldCurrentSlide.classList.remove("current");


    currentSlide.classList.add("moved-left");
    currentSlide.classList.add("current");

}


// Thumbnail image controls
function currentSlide(n) {


    if (slideIndex > n) {
        while (slideIndex > n)
            prev(-1)
    }
    if (slideIndex < n)
        while (slideIndex < n)
            next(1)
}


//Update slide show
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}