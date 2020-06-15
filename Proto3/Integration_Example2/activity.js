var quizz = [];
var quizzData = {

    0: {
        "statement": "Learning contract",
        "choices": ["Reflector", "Theorist ", "Pragmatist", "Activist"],
        "feedback": "",
        "solution": [0, 1, 2]

    },
    1: {
        "statement": "Demonstration",
        "choices": ["Reflector", "Theorist ", "Pragmatist", "Activist"],
        "feedback": "",
        "solution": [0, 1, 2, 3]

    },
    2: {
        "statement": "Case study",
        "choices": ["Reflector", "Theorist ", "Pragmatist", "Activist"],
        "feedback": "",
        "solution": [0, 1, 2, 3]

    },
    3: {
        "statement": "Observation grid",
        "choices": ["Reflector", "Theorist ", "Pragmatist", "Activist"],
        "feedback": "",
        "solution": [0, 1, 2]

    },
    4: {
        "statement": "Knowledge mapping",
        "choices": ["Reflector", "Theorist ", "Pragmatist", "Activist"],
        "feedback": "",
        "solution": [1]

    },
    5: {
        "statement": "Role play",
        "choices": ["Reflector", "Theorist ", "Pragmatist", "Activist"],
        "feedback": "",
        "solution": [0, 1, 3]

    },
    6: {
        "statement": "Logbook",
        "choices": ["Reflector", "Theorist ", "Pragmatist", "Activist"],
        "feedback": "",
        "solution": [0, 1]

    },
    7: {
        "statement": "PQRST method (time management)",
        "choices": ["Reflector", "Theorist ", "Pragmatist", "Activist"],
        "feedback": "",
        "solution": [2]

    },

    8: {
        "statement": "ABCDE/SMART objectives",
        "choices": ["Reflector", "Theorist ", "Pragmatist", "Activist"],
        "feedback": "",
        "solution": [0, 1, 2]

    },

    9: {
        "statement": "Relaxation",
        "choices": ["Reflector", "Theorist ", "Pragmatist", "Activist"],
        "feedback": "",
        "solution": [0]

    },

    10: {
        "statement": "Verbatim",
        "choices": ["Reflector", "Theorist ", "Pragmatist", "Activist"],
        "feedback": "",
        "solution": [0]

    },

    11: {
        "statement": "Videoscopy",
        "choices": ["Reflector", "Theorist ", "Pragmatist", "Activist"],
        "feedback": "",
        "solution": [0, 1, 2, 3]

    },

    12: {
        "statement": "Visualization",
        "choices": ["Reflector", "Theorist ", "Pragmatist", "Activist"],
        "feedback": "",
        "solution": [0]

    },




};
window.onload = initQuizz();
/* Dev test
window.onerror = function(message, source, lineno, colno, error) {
    alert(message + ": " + source + " : " + lineno + " : " + colno + ": " + error);
}

*/

function initQuizz() {


    //create question here
    for (var q = 1; q < Object.keys(quizzData).length + 1; q++) {
        var questionTag = "slide_" + q
        quizz.push(new Question(questionTag, quizzData[q - 1]));


    }


    quizz.forEach((element, index) => {
        element.initQuestion();
        element.titleElement.textContent = "Strategy  " + (index + 1) + "/" + quizz.length;
    });


}

function resetQuestions() {

    quizz.forEach((element, index) => {
        element.updateQuizzList();
    });



}