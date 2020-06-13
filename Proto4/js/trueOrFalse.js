class Question {





    //  Creates a question object .
    //  @targetHtmlId : parent container of the question 
    //  @choices : array with the values of the question choices
    //  @solutions : array with the values of the question solutions 
    constructor(targetHtmlId, choices, data) {

        this.parseQuizzData(data);

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
    // as well as the statement
    // and the feedback if there is any 
    initQuestion() {



        for (var i = 0; i < this.choiceListElements.length; i++) {

            this.choiceListElements[i].querySelector("span").innerHTML = this.choices[i];
            this.choiceListElements[i].querySelector("input").checked = false;

        }
        this.statementElement.querySelectorAll("p")[0].innerHTML = this.statement;
        this.parentContainer.querySelector("#verifyButton").setAttribute("disabled", "disabled");


    }

    // on click of the list element
    // pushes the values of the selected element
    // to selectedChoices if its not already present in 
    // the former array
    onChoiceClick(id) {

        if (this.selectedChoice != undefined) {

            var foundChoice = false;

            // remove the selected choice
            // if toggled (double click)


            if (this.selectedChoice == id) {

                foundChoice = true;
                this.selectedChoice = undefined
                this.updateQuizzList()

                return;
            }


            if (!foundChoice) {
                this.selectedChoice = undefined
                this.selectedChoice = id;
            }

        } else {

            this.selectedChoice = id;
        }
        this.updateQuizzList()


    }


    //  update view when new items
    // are selected or verification button is hit (check the correct and incorrect choices selected)
    updateQuizzList() {

        //Reset all elements related to the question
        for (var c = 0; c < this.choiceListElements.length; c++) {

            this.choiceListElements[c].classList.remove("selected")
            this.choiceListElements[c].querySelector("input").checked = false;
            this.choiceListElements[c].parentNode.querySelector("i").style.opacity = "0.0";
            this.feedbackElement.style.opacity = "0.0";

        }

        //Check the status array for the choices and update the classes accordingly
        //if there is selected element add the selected css class to that element
        //Feedback control
        if (this.selectedChoice != undefined) {

            this.choiceListElements[this.selectedChoice].classList.add("selected");
            this.choiceListElements[this.selectedChoice].querySelector("input").checked = true;

            this.parentContainer.querySelector("#verifyButton").removeAttribute("disabled");


        }

        if (this.incorrectChoice != undefined) {
            this.choiceListElements[this.incorrectChoice].parentNode.querySelector("i").style.opacity = 1;
            this.choiceListElements[this.incorrectChoice].parentNode.querySelector("i").classList.remove("fa-check-circle-o");
            this.choiceListElements[this.incorrectChoice].parentNode.querySelector("i").classList.add("fa-times-circle-o");
            this.choiceListElements[this.incorrectChoice].parentNode.querySelector("i").style.color = "#CC2200"

            this.feedbackElement.querySelectorAll("p")[0].innerHTML = this.feedback;
            this.feedbackElement.style.opacity = "1.0";
        }
        if (this.correctChoice != undefined) {

            this.choiceListElements[this.correctChoice].parentNode.querySelector("i").style.opacity = 1;
            this.choiceListElements[this.correctChoice].parentNode.querySelector("i").classList.remove("fa-times-circle-o");
            this.choiceListElements[this.correctChoice].parentNode.querySelector("i").classList.add("fa-check-circle-o");
            this.choiceListElements[this.correctChoice].parentNode.querySelector("i").style.color = "#408000"
            this.feedbackElement.querySelectorAll("p")[0].innerHTML = this.feedback;
            this.feedbackElement.style.opacity = "1.0";

        }
        //Block choices list after first verification when feedback if visible.
        /*
        for (var c = 0; c < this.choiceListElements.length; c++) {

            if (this.feedbackElement.style.opacity > 0) {
                this.choiceListElements[c].style.pointerEvents = "none"
            } else {
                this.choiceListElements[c].style.pointerEvents = "visible"

            }

        }*/

    }




    // Verify all selected 
    // choices by user
    verifySelection() {


        // Filter the selected choices by the user
        // keep the correct one in the array correctChoices array
        // and the incorrect ones in incorrectChoices array
        if (!this.isCorrectChoice(this.selectedChoice))
            this.incorrectChoice = this.selectedChoice;
        else
            this.correctChoice = this.selectedChoice;

        if (this.correctChoice == undefined)
            this.correctChoice = this.solutions[0];





        this.updateQuizzList();

        this.parentContainer.querySelector("#verifyButton").setAttribute("disabled", "disabled");

        this.selectedChoice = undefined;
        this.correctChoice = undefined;
        this.incorrectChoice = undefined;
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