var quizz = [];

window.onload = initQuizz();

function initQuizz() {


    //create question here
    quizz.push(new Question("slide_1", ["Daily irritant", "Decision-making challenge", "Crisis or fight"], [0]));
    quizz.push(new Question("slide_2", ["Daily irritant", "Decision-making challenge", "Crisis or fight"], [2]));
    quizz.push(new Question("slide_3", ["Daily irritant", "Decision-making challenge", "Crisis or fight"], [1]));

    quizz.push(new Question("slide_4", ["Daily irritant", "Decision-making challenge", "Crisis or fight"], [1, 2]));
    quizz.push(new Question("slide_5", ["Daily irritant", "Decision-making challenge", "Crisis or fight"], [2]));
    quizz.push(new Question("slide_6", ["Daily irritant", "Decision-making challenge", "Crisis or fight"], [0]));


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