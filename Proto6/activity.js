var questionData = {

    0: {
        "keyword": "aptitudes",
        "classification": 2,
        "hint": "",

    },
    1: {
        "keyword": "connaissances",
        "classification": 1,
        "hint": "",

    },
    2: {
        "keyword": "soins",
        "classification": 5,
        "hint": "",

    },
    3: {
        "keyword": "synergique",
        "classification": 4,
        "hint": "",

    },
    4: {
        "keyword": "interprofessionnel",
        "classification": 0,
        "hint": "",

    },
    5: {
        "keyword": "partagées",
        "classification": 3,
        "hint": "",

    }


};

var dndQuestion;
window.onload = initQuizz();



function initQuizz() {

    dndQuestion = new DNDQuestion(questionData, "keywords");
    dndQuestion.initQuestion();


}