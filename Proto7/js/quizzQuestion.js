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
    //  @data : json object containing the question data (choices, solutions, feedback, ..)

    constructor(targetHtmlId, data) {
        this.parseQuizzData(data)
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
        this.choices = data.choices;



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
        this.parentContainer.querySelector("ul").style.transform = "translateY(" + -this.feedbackElement.style.height + "px)"
        this.feedbackElement.querySelectorAll("p")[0].innerHTML = this.feedback;
        this.statementElement.querySelectorAll("p")[0].innerHTML = this.statement;



        this.verifyButton = this.parentContainer.querySelector("#verifyButton");
        /*
                if (this.verifyButton != undefined)
                    this.verifyButton.setAttribute("disabled", "disabled");
                */
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

        //If there is no verfication btn 
        // in the slide/question verify the
        // answers when a choice is selected
        if (this.verifyButton == undefined)
            this.verifySelection();
    }


    //  update view when new items
    //  are selected or verification button is hit
    updateQuizzList() {

        //Reset all modifications 
        // applied to the elements related to this question
        for (var c = 0; c < this.choiceListElements.length; c++) {

            this.choiceListElements[c].classList.remove("selected")
            this.choiceListElements[c].parentNode.querySelectorAll("i")[0].style.opacity = "0"
            this.choiceListElements[c].parentNode.querySelectorAll("i")[0].classList.remove("fa-times-circle-o")
            this.choiceListElements[c].parentNode.querySelectorAll("i")[0].classList.remove("fa-check-circle-o")

            this.choiceListElements[c].querySelector("input").checked = false;

            this.feedbackElement.classList.remove("feedbackReveal");
            this.parentContainer.querySelector("ul").style.transform = "translateY(" + -this.feedbackElement.style.height + "px)";
            /*
            if (this.verifyButton != undefined)
                this.verifyButton.removeAttribute("disabled");

            */
        }


        if (this.selectedChoices.length > 0) {
            for (var c = 0; c < this.selectedChoices.length; c++) {
                //Check the input button when one of the choices is selected
                this.choiceListElements[this.selectedChoices[c]].querySelector("input").checked = true;

            }
        }

        for (var c = 0; c < this.incorrectChoices.length; c++) {
            //Add a feedback icon next to the incorrect choices
            this.choiceListElements[this.incorrectChoices[c]].parentNode.querySelectorAll("i")[0].style.opacity = "1"
            this.choiceListElements[this.incorrectChoices[c]].parentNode.querySelectorAll("i")[0].classList.add("fa-times-circle-o")
            this.choiceListElements[this.incorrectChoices[c]].parentNode.querySelectorAll("i")[0].style.color = "#CC2200";

        }
        for (var c = 0; c < this.correctChoices.length; c++) {

            //Add a feedback icon next to the correct choices
            this.choiceListElements[this.correctChoices[c]].parentNode.querySelectorAll("i")[0].style.opacity = "1"
            this.choiceListElements[this.correctChoices[c]].parentNode.querySelectorAll("i")[0].classList.add("fa-check-circle-o")
            this.choiceListElements[this.correctChoices[c]].parentNode.querySelectorAll("i")[0].style.color = "#408000";

            this.choiceListElements[this.correctChoices[c]].classList.add("selected")

            //Reveal the feedback after revealing the correct choices
            if (this.feedbackElement.querySelectorAll("p")[0].innerHTML != "") {

                this.feedbackElement.classList.add("feedbackReveal");
                this.parentContainer.querySelector("ul").style.transform = "translateY(0px)"
            }
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

        this.statementElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        this.updateQuizzList()

        //  empty selected and incorrect
        //  choices after a verification
        //  after the visual update
        this.selectedChoices = [];
        this.incorrectChoices = [];
        this.correctChoices = [];



        /*
        if (this.verifyButton != undefined)
            this.verifyButton.setAttribute("disabled", "disabled");
        */
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