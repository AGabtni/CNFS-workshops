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
            var feedbackImage = document.createElement("IMG");
            this.choiceListElements[i].append(feedbackImage);
            var selectImage = document.createElement("IMG");

            feedbackImage.id = "feedbackImg";
            selectImage.id = "selectImg";
            this.choiceListElements[i].parentNode.append(selectImage);



        }

        this.feedbackElement.querySelectorAll("p")[0].innerHTML = this.feedback;
        this.statementElement.querySelectorAll("p")[0].innerHTML = this.statement;

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

            if (!foundChoice)
                this.selectedChoices.push(id);

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
            this.choiceListElements[c].classList.remove("incorrect")
            this.choiceListElements[c].classList.remove("correct")
            this.choiceListElements[c].querySelectorAll("#feedbackImg")[0].style.opacity = "0"
            this.choiceListElements[c].parentNode.querySelectorAll("#selectImg")[0].style.opacity = "0"

            this.feedbackElement.style.opacity = 0;


        }
        if (this.selectedChoices.length > 0) {
            for (var c = 0; c < this.selectedChoices.length; c++) {

                this.choiceListElements[this.selectedChoices[c]].classList.add("selected")
                this.choiceListElements[this.selectedChoices[c]].parentNode.querySelectorAll("#selectImg")[0].src = "./img/select.png";
                this.choiceListElements[this.selectedChoices[c]].parentNode.querySelectorAll("#selectImg")[0].style.opacity = "1"

            }
        }

        for (var c = 0; c < this.incorrectChoices.length; c++) {

            this.choiceListElements[this.incorrectChoices[c]].classList.add("incorrect")

            this.choiceListElements[this.incorrectChoices[c]].querySelectorAll("#feedbackImg")[0].src = "./img/cross.png";
            this.choiceListElements[this.incorrectChoices[c]].querySelectorAll("#feedbackImg")[0].style.opacity = "1"

        }
        for (var c = 0; c < this.correctChoices.length; c++) {

            this.choiceListElements[this.correctChoices[c]].classList.add("correct")

            this.choiceListElements[this.correctChoices[c]].querySelectorAll("#feedbackImg")[0].src = "./img/tick.png";
            this.choiceListElements[this.correctChoices[c]].querySelectorAll("#feedbackImg")[0].style.opacity = "1"

            this.feedbackElement.style.opacity = 1.0;
        }


    }

    // Verify all selected 
    // choices by user
    verifySelection() {

        // Just an option
        // to reset the quizz if there is no inputs
        /*
        if (this.selectedChoices.length == 0) {
            this.updateQuizzList();
            return;
        }
        */

        // Filter the selected choices
        // keep the correct one in the array correctChoices array
        // and the incorrect ones in incorrectChoices array
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