var questionData = {


    0: {
        "keyword": "Définir",
        "feedback": "Définir les attentes et les indicateurs de rendement.<br>Ce sont des valeurs de référence. Quels sont les résultats attendus ? Qu'est-ce que le stagiaire doit maîtriser pour atteindre les objectifs ?<br>Exemples d'indicateurs : créer une relation professionnelle, mener une entrevue d'évaluation, exécuter telle ou telle procédure, etc.<br>Exemple d'attendre en matière de savoir-être : comportement qui dénote de la chaleur humaine, une relation professionnelle (distanciation professionnelle, respect, vouvoiement).",
        "classification": 0

    },
    1: {
        "keyword": "Corriger",
        "feedback": "Corriger en proposant un plan d’amélioration.<br>De quelle façon doit-il s’y prendre pour réussir ou améliorer le savoir requis ? Que peut lui offrir le superviseur comme aide ou soutien ?",
        "classification": 0

    },
    2: {
        "keyword": "Planifier",
        "feedback": "Cette action, bien que nécessaire au processus de l’évaluation de rendement, ne joue pas un rôle central .",
        "classification": 1

    },
    3: {
        "keyword": "Diriger",
        "feedback": "Cette action, bien que nécessaire au processus de l’évaluation de rendement, ne joue pas un rôle central.",
        "classification": 1

    },
    4: {
        "keyword": "Comparer",
        "feedback": "Comparer les comportements aux objectifs de stage.<br>Qu’est-ce que le stagiaire réussit ? Est-ce qu’il a acquis les savoirs, savoir-faire et savoir être attends d’après les objectifs, les normes ?",
        "classification": 0

    },
    5: {
        "keyword": "Mesurer",
        "feedback": "Mesurer les acquis du stagiaire (connaissances, habiletés, attitudes)<br>Qu’est-ce que le stagiaire a comme connaissances et qu’est-ce qu’il démontre comme attitude ou comme maîtrise d’une activité ou intervention ? Que veut-il apprendre ?",
        "classification": 0

    },
    6: {
        "keyword": "Analyser",
        "feedback": "Analyser et porter un jugement sur l’écart entre les résultats et les objectifs.<br>Où en est-il par rapport à l’atteinte des objectifs fixés ? A-t-il réussi ou doit-il encore pratiquer ? ",
        "classification": 0

    },
    7: {
        "keyword": "Discuter",
        "feedback": "Cette action, bien que nécessaire au processus de l’évaluation de rendement, ne joue pas un rôle central .",
        "classification": 1

    },
    8: {
        "keyword": "Organiser",
        "feedback": "Cette action, bien que nécessaire au processus de l’évaluation de rendement, ne joue pas un rôle central .",
        "classification": 1

    },
    9: {
        "keyword": "Surveiller",
        "feedback": "Cette action, bien que nécessaire au processus de l’évaluation de rendement, ne joue pas un rôle central.",
        "classification": 1

    }





};
var dndQuestion;
window.onload = initQuizz();

window.addEventListener('touchmove', function() {})

function initQuizz() {
    dndQuestion = new DNDQuestion("keywords");
    dndQuestion.initQuestion(questionData);

}