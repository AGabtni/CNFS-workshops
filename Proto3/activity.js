var quizz = [];
var quizzData = {

    0: {
        "statement": "The trainee arrives inadequately dressed on the first day of his placement.",
        "feedback": "",
        "solution": [0]

    },
    1: {
        "statement": "The trainee betrayed your trust. You reprimanded him heavily and threatened him with reprisals.",
        "feedback": "",
        "solution": [2]

    },
    2: {
        "statement": "The trainee has been late at least three times this week and you fall behind while waiting for him.",
        "feedback": "",
        "solution": [1]

    },
    3: {
        "statement": "The trainee makes mistakes every day in the treatments he provides and you now have to check everything he does to ensure the patients’ safety.",
        "feedback": "",
        "solution": [1, 2]

    },
    4: {
        "statement": "A trainee that is not very talented receives a “fail” from you. He calls you incompetent and lodges a complaint against you with your professional order.",
        "feedback": "",
        "solution": [2]

    },
    5: {
        "statement": "You asked a trainee to prepare the material required for a treatment and when the patient arrives, the material is still not ready.",
        "feedback": "",
        "solution": [0]

    },




};
window.onload = initQuizz();

function initQuizz() {


    //create question here
    for (var q = 1; q < 7; q++) {
        var questionTag = "slide_" + q
        console.log(questionTag)
        quizz.push(new Question(questionTag, ["Daily irritant", "Decision-making challenge", "Crisis or fight"], quizzData[q - 1]));


    }

    console.log(quizz)

    quizz.forEach((element, index) => {
        element.initQuestion();
        element.titleElement.textContent = "Situation  " + (index + 1) + "/" + quizz.length;
    });


}

function resetQuestions() {

    quizz.forEach((element, index) => {
        element.updateQuizzList();
    });



}