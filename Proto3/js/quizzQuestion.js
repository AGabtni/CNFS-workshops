class Question {


    choices = [];
    solutions = [];
    statement;
    feedback;
    //parent html container
    parentContainer;

    titleElement;
    feedbackElement;
    statementElement;

    // html list elements found 
    // in the parent container
    choiceListElements = [];

    //Array for the selected choices 
    // by the user
    selectChoices = [];

    // Arrays for  the correct & incorrect
    // choices selected fills up 
    // after hitting the verify button
    incorrectChoices = [];
    correctChoices = [];

    //Creates a question object .
    //  @targetHtmlId : parent container of the question 
    //  @choices : array with the values of the question choices
    //  @solutions : array with the values of the question solutions 
    constructor(targetHtmlId, choices, data) {

        this.parseQuizzData(data)
        this.choices = choices;
        this.parentContainer = document.getElementById(targetHtmlId);
        this.choiceListElements = this.parentContainer.querySelectorAll("li");
        this.titleElement = this.parentContainer.getElementsByClassName("header")[0];
        this.feedbackElement = this.parentContainer.getElementsByClassName("feedback")[0];
        this.statementElement = this.parentContainer.getElementsByClassName("statement")[0];

    }



    //Format quizz data  :


    parseQuizzData(data) {


        this.solutions = data.solution;
        this.statement = data.statement;
        this.feedback = data.feedback;




    }

    //fills the question list with 
    // with the value of the choices 
    initQuestion() {



        for (var i = 0; i < this.choiceListElements.length; i++) {

            this.choiceListElements[i].textContent = this.choices[i];
            this.choiceListElements[i].parentNode.querySelectorAll("img")[0].style.transition = "all 0.2s ease-in"


        }

        this.feedbackElement.querySelectorAll("p")[0].innerHTML = this.feedback;
        this.statementElement.querySelectorAll("p")[0].innerHTML = this.statement;

    }


    // on click of the list element
    // pushes the values of the selected element
    // to selectChoices if its not already present in 
    // the former array
    onChoiceClick(id) {

        if (this.selectChoices.length > 0) {

            var foundChoice = false;


            for (var i = 0; i < this.selectChoices.length; i++) {


                if (this.selectChoices[i] == id) {

                    foundChoice = true;
                    this.selectChoices.splice(i, 1);
                    this.updateQuizzList()

                    return;
                }
            }

            if (!foundChoice)
                this.selectChoices.push(id);

        } else {

            this.selectChoices.push(id);
        }
        this.updateQuizzList()
    }


    //  update view when new items
    // are selected or verification button is hit
    updateQuizzList() {

        //Reset all elements related to the question
        for (var c = 0; c < this.choiceListElements.length; c++) {

            this.choiceListElements[c].classList.remove("selected")
            this.choiceListElements[c].classList.remove("incorrect")
            this.choiceListElements[c].classList.remove("correct")
            this.choiceListElements[c].parentNode.querySelectorAll("img")[0].style.opacity = "0"

            this.feedbackElement.style.opacity = 0;


        }
        for (var c = 0; c < this.selectChoices.length; c++) {

            this.choiceListElements[this.selectChoices[c]].classList.add("selected")
            this.choiceListElements[this.selectChoices[c]].parentNode.querySelectorAll("img")[0].src = "./img/select.png";
            this.choiceListElements[this.selectChoices[c]].parentNode.querySelectorAll("img")[0].style.opacity = "1"

        }

        for (var c = 0; c < this.incorrectChoices.length; c++) {

            this.choiceListElements[this.incorrectChoices[c]].classList.add("incorrect")

            this.choiceListElements[this.incorrectChoices[c]].parentNode.querySelectorAll("img")[0].src = "./img/cross.png";
            this.choiceListElements[this.incorrectChoices[c]].parentNode.querySelectorAll("img")[0].style.opacity = "1"

        }
        for (var c = 0; c < this.correctChoices.length; c++) {

            this.choiceListElements[this.correctChoices[c]].classList.add("correct")

            this.choiceListElements[this.correctChoices[c]].parentNode.querySelectorAll("img")[0].src = "./img/tick.png";
            this.choiceListElements[this.correctChoices[c]].parentNode.querySelectorAll("img")[0].style.opacity = "1"

            this.feedbackElement.style.opacity = 1.0;
        }


    }

    // Verify all selected 
    // choices by user
    verifySelection() {

        // Just an option
        // to reset the quizz if there is no inputs
        /*
        if (this.selectChoices.length == 0) {
            this.updateQuizzList();
            return;
        }
        */

        // Filter the selected choices
        // keep the correct one in the array correctChoices array
        // and the incorrect ones in incorrectChoices array
        for (var s = 0; s < this.selectChoices.length; s++) {


            if (!this.isCorrectChoice(this.selectChoices[s]))
                this.incorrectChoices.push(this.selectChoices[s]);
            else
                this.correctChoices.push(this.selectChoices[s]);

        }


        //Add missed correct choices to the correcChoices array
        if (this.solutions.length != this.correctChoices.length) {

            for (var s = 0; s < this.solutions.length; s++) {

                var solution = this.solutions[s];
                var foundSolution = false;
                for (var c = 0; c < this.correctChoices.length; c++) {
                    if (this.correctChoices[c] == solution) {
                        foundSolution = true;
                        break;
                    }



                }
                if (!foundSolution)
                    this.correctChoices.push(solution);
            }
        }


        this.updateQuizzList()

        //  empty selected and incorrect
        //  choices after a verification
        //  after the visual update
        this.selectChoices = [];
        this.incorrectChoices = [];
        this.correctChoices = [];

    }

    // return true if the selected 
    // choice is a correct one
    // @elem : the position of the 
    // choice selected by user
    isCorrectChoice(elem) {

        for (var c = 0; c < this.solutions.length; c++) {
            if (this.solutions[c] == elem) {

                return true;

            }

        }

        return false;

    }







}