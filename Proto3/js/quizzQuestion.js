class Question {




    // html list elements found 
    // in the parent container

    //Array for the selected choices 
    // by the user

    // Arrays for  the correct & incorrect
    // choices selected fills up 
    // after hitting the verify button


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


        this.selectedChoices = [];

        this.incorrectChoices = [];
        this.correctChoices = [];
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

            this.choiceListElements[i].querySelector("span").innerHTML = this.choices[i];
            this.choiceListElements[i].querySelector("input").checked = false;
            if (this.solutions.length == 1)
                this.choiceListElements[i].querySelector("input").type = "radio"



        }

        this.feedbackElement.querySelectorAll("p")[0].innerHTML = this.feedback;
        this.statementElement.querySelectorAll("p")[0].innerHTML = this.statement;
        this.parentContainer.querySelector("#verifyButton").setAttribute("disabled", "disabled");

    }


    // on click of the list element
    // pushes the values of the selected element
    // to selectedChoices if its not already present in 
    // the former array
    onChoiceClick(id) {

        if (this.selectedChoices.length > 0) {

            var foundChoice = false;


            for (var i = 0; i < this.selectedChoices.length; i++) {


                if (this.selectedChoices[i] == id) {

                    foundChoice = true;
                    this.selectedChoices.splice(i, 1);
                    this.updateQuizzList()

                    return;
                }
            }

            if (!foundChoice) {
                //Since radio buttons are used if only one of the choices
                // Is the solution empty the selectedChoiced array when it 
                // Selecting another/this element
                if (this.solutions.length == 1)
                    this.selectedChoices = []
                this.selectedChoices.push(id);
            }
        } else {

            this.selectedChoices.push(id);
        }
        this.updateQuizzList()
    }


    //  update view when new items
    // are selected or verification button is hit
    updateQuizzList() {

        //Reset all elements related to the question
        for (var c = 0; c < this.choiceListElements.length; c++) {

            this.choiceListElements[c].classList.remove("selected")
            this.choiceListElements[c].parentNode.querySelectorAll("i")[0].style.opacity = "0"
            this.choiceListElements[c].parentNode.querySelectorAll("i")[0].classList.remove("fa-times-circle-o")
            this.choiceListElements[c].parentNode.querySelectorAll("i")[0].classList.remove("fa-check-circle-o")

            this.choiceListElements[c].querySelector("input").checked = false;

            this.feedbackElement.style.opacity = 0;
            this.parentContainer.querySelector("#verifyButton").removeAttribute("disabled");


        }


        if (this.selectedChoices.length > 0) {
            for (var c = 0; c < this.selectedChoices.length; c++) {

                this.choiceListElements[this.selectedChoices[c]].classList.add("selected")
                this.choiceListElements[this.selectedChoices[c]].querySelector("input").checked = true;

            }
        }

        for (var c = 0; c < this.incorrectChoices.length; c++) {
            this.choiceListElements[this.incorrectChoices[c]].parentNode.querySelectorAll("i")[0].style.opacity = "1"
            this.choiceListElements[this.incorrectChoices[c]].parentNode.querySelectorAll("i")[0].classList.add("fa-times-circle-o")
            this.choiceListElements[this.incorrectChoices[c]].parentNode.querySelectorAll("i")[0].style.color = "#CC2200";

        }
        for (var c = 0; c < this.correctChoices.length; c++) {

            this.choiceListElements[this.correctChoices[c]].parentNode.querySelectorAll("i")[0].style.opacity = "1"
            this.choiceListElements[this.correctChoices[c]].parentNode.querySelectorAll("i")[0].classList.add("fa-check-circle-o")
            this.choiceListElements[this.correctChoices[c]].parentNode.querySelectorAll("i")[0].style.color = "#408000";


            if (this.feedbackElement.querySelectorAll("p")[0].innerHTML != "")
                this.feedbackElement.style.opacity = 1.0;
        }


    }

    // Verify all selected 
    // choices by user
    verifySelection() {

        for (var s = 0; s < this.selectedChoices.length; s++) {


            if (!this.isCorrectChoice(this.selectedChoices[s]))
                this.incorrectChoices.push(this.selectedChoices[s]);
            else
                this.correctChoices.push(this.selectedChoices[s]);

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
        this.selectedChoices = [];
        this.incorrectChoices = [];
        this.correctChoices = [];
        this.parentContainer.querySelector("#verifyButton").setAttribute("disabled", "disabled");

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