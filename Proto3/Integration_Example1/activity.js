var quizz = [];
var quizzData = {

    0: {
        "statement": "Overestimating the trainee’s performance.",
        "choices": ["Halo effect", "Error by leniency", "Error by severity", "Error of the central tendency", "Effect of the first or last impression", "Contrast effect", "Spillover effect", "Similarity effect", "Stereotypes"],
        "feedback": "Error by leniency (complacency) is the second-most common error, and it is often intentionally committed by the supervisor. Also referred to as the error of extremes, it manifests itself by an exaggerated amount of leniency on the part of the supervisor towards his or her trainee. The supervisor often omits to take into consideration important elements of a trainee’s assessment and tends to give a more generous performance assessment to avoid potential conflict. An ill-defined definition of expected outcomes can lead to this type of mistake.",
        "solution": [1]

    },
    1: {
        "statement": "Giving an average assessment, even if performance was variable.",
        "choices": ["Halo effect", "Error by leniency", "Error by severity", "Error of the central tendency", "Effect of the first or last impression", "Contrast effect", "Spillover effect", "Similarity effect", "Stereotypes"],
        "feedback": "Error of the central tendency is often observed in supervisors who want to avoid risk and keep their trainee’s performance assessments average, even when their performance might be below or above average. An average mark is subject to interpretation. This type of error can occur when a supervisor hasn’t observed his or her trainee’s behavior directly or regularly, so he or she gives them an average score somewhere down the middle.",
        "solution": [3]

    },
    2: {
        "statement": "Tendency to make a global judgement from a few events.",
        "choices": ["Halo effect", "Error by leniency", "Error by severity", "Error of the central tendency", "Effect of the first or last impression", "Contrast effect", "Spillover effect", "Similarity effect", "Stereotypes"],
        "feedback": "The Halo effect is without a doubt the most common error when the assessment touches on multiple elements. The evaluator will tend to base his entire assessment on the one or two elements he finds most important. His opinion will then spread to the rest of the performance assessment. The trainee therefore ends up being either under-valued, or over-valued based on only a few elements of his performance assessment.",
        "solution": [0]

    },
    3: {
        "statement": "Nurturing preconceived ideas about the trainee, regardless of his performance.",
        "choices": ["Halo effect", "Error by leniency", "Error by severity", "Error of the central tendency", "Effect of the first or last impression", "Contrast effect", "Spillover effect", "Similarity effect", "Stereotypes"],
        "feedback": "Stereotypes are positive of negative attitudes and pre-conceived notions evaluators will have towards a person or group of people. This can lead to sexism, racism, ageism, etc.",
        "solution": [8]

    },
    4: {
        "statement": "Making an unfavorable judgement, despite performance.",
        "choices": ["Halo effect", "Error by leniency", "Error by severity", "Error of the central tendency", "Effect of the first or last impression", "Contrast effect", "Spillover effect", "Similarity effect", "Stereotypes"],
        "feedback": "Error by severity consists of systematically evaluating a trainee in a negative way, regardless of his or her observed performance (the opposite of the error by leniency). Also known as the error of extremes, this time, the supervisor is too severe. This error is usually seen in inexperienced evaluators, individuals who have low self-esteem, recently-promoted supervisors who are trying to impress their own supervisors, or people who use performance assessment as payback.",
        "solution": [2]

    },
    5: {
        "statement": "Assessing performance by comparing with one’s own standards.",
        "choices": ["Halo effect", "Error by leniency", "Error by severity", "Error of the central tendency", "Effect of the first or last impression", "Contrast effect", "Spillover effect", "Similarity effect", "Stereotypes"],
        "feedback": "The contrast effect occurs when a supervisor assesses his trainee by comparing his performance to his own personal performance. He judges the trainee’s performance based on the difference between how well the trainee performs, versus how he himself would have performed in his shoes. This error also occurs when evaluators compare their trainee to a previous trainee who might have performed better or worse in the past: next to a poorly-performing trainee, a good trainee might seem like an amazing one, whereas next to an amazing trainee, a regular one might seem like he’s performing poorly.<br>Bernatchez (2003) defined the contrast effect differently. The evaluator will always assess his trainee in an excessive manner, and will always associate a strong point with one that requires work, and vice-versa. The trainee does not know what to do, because he’s told his performance is both excellent and terrible, according to different criteria.",
        "solution": [5]

    },
    6: {
        "statement": "Unjustifiably influenced by previous assessments (good or bad).",
        "choices": ["Halo effect", "Error by leniency", "Error by severity", "Error of the central tendency", "Effect of the first or last impression", "Contrast effect", "Spillover effect", "Similarity effect", "Stereotypes"],
        "feedback": "The spillover effect tends to occur when a past performance assessment unfairly influences a current one, both to the trainee’s advantage or disadvantage. This type of error can occur when a trainee’s new supervisor heard about the trainee from his or her previous supervisor.",
        "solution": [6]

    },
    7: {
        "statement": "Overestimating a trainee’s performance because of shared affinities (supervisor).",
        "choices": ["Halo effect", "Error by leniency", "Error by severity", "Error of the central tendency", "Effect of the first or last impression", "Contrast effect", "Spillover effect", "Similarity effect", "Stereotypes"],
        "feedback": "The similarity effect is a tendency for certain evaluators to give better performance evaluations to trainees who share similarities with them.",
        "solution": [7]

    },
    8: {
        "statement": "Basing his opinion solely on data from the beginning of the placement or more recent data.",
        "choices": ["Halo effect", "Error by leniency", "Error by severity", "Error of the central tendency", "Effect of the first or last impression", "Contrast effect", "Spillover effect", "Similarity effect", "Stereotypes"],
        "feedback": "The effect of the first or last impression occurs when an evaluator cannot remember everything that happened throughout the placement (he didn’t take notes). He uses whatever initial information he had at his disposal to categorize his trainee as either good or bad. Afterwards, he seeks out more information, but will have a tendency to search for and lean towards anything that confirms his initial judgement, ignoring those that might contradict his first impression. The same could happen in reserve, where the evaluator will base a trainee’s entire performance on their most recent interactions. It’s a double-edged sword!",
        "solution": [4]

    },




};
window.onload = initQuizz();
window.onerror = function(message, source, lineno, colno, error) {
    alert(message + ": " + source + " : " + lineno + " : " + colno + ": " + error);
}

function initQuizz() {


    //create question here
    for (var q = 1; q < Object.keys(quizzData).length + 1; q++) {
        var questionTag = "slide_" + q
        quizz.push(new Question(questionTag, quizzData[q - 1]));


    }


    quizz.forEach((element, index) => {
        element.initQuestion();
        element.titleElement.textContent = "Definition  " + (index + 1) + "/" + quizz.length;
    });


}

function resetQuestions() {

    quizz.forEach((element, index) => {
        element.updateQuizzList();
    });



}