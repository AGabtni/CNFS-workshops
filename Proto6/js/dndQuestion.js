class DNDQuestion {





    constructor(bankContainerId) {
        this.keywordsBank = [];

        this.dropAreas = document.getElementsByClassName("drop-area");
        this.bankContainer = document.querySelector("#" + bankContainerId)
            //Dragula object

        this.dragAndDrop = {




            init: function() {
                this.dragula();
                this.drake();
                this.currenSource;
            },

            drake: function() {
                this.dragula.on('drop', this.dropped.bind(this));
                this.dragula.on('drag', this.dragged.bind(this));

            },

            dragula: function() {
                this.dragula = dragula([document.querySelector('#keywords')],
                    //Dragula options here
                    {
                        revertOnSpill: true,
                        removeOnSpill: false,
                        accepts: (el, target, source, sibling) => {
                            if (target.id == "keywords")
                                return true;


                            return !target.classList.contains("full");
                        }
                    });
            },

            canMove: function() {


            },

            //On keyword drag handler : 
            dragged: function(el) {

                if (el.parentNode.id == "keywords")
                    return;

                dndQuestion.resetAllContainers()



            },

            //On keyword drop handler 
            dropped: function(el) {

                //Ignore if the drop area is the keywords bank container
                if (el.parentNode.id != "keywords") {
                    //For this prototype (6) only since we don't want more than
                    // 1 item per drop area .
                    el.parentNode.classList.add("full");

                }




                //Remove the css "full" tag from all containers that still has it, but don't contain
                // a keyword in their children
                var dropAreas = document.getElementsByClassName("drop-area");
                for (var a = 0; a < dropAreas.length; a++) {
                    if (dropAreas[a].classList.contains("full") && !dropAreas[a].getElementsByClassName("keyword").length) {
                        dropAreas[a].classList.remove("full")

                    }
                }

                dndQuestion.updateUI();

            },






        };
        this.dragAndDrop.init();

        //Dynamicly add drop containers to dragula
        for (var a = 0; a < this.dropAreas.length; a++) {
            this.dragAndDrop.dragula.containers.push(this.dropAreas[a])

        }


    }


    //Populates the httml containers with keywords 
    // using the json data received at initialisation
    initQuestion(data) {

        this.jsonData = data;
        //Create keywords dynamicly and append them to wrapping container
        for (var d = 0; d < Object.keys(data).length; d++) {
            this.createKeyword(data[d].keyword, d)

        }
    }

    createKeyword(keyword, index) {
        var newKeyword = document.createElement("div");
        newKeyword.innerHTML = keyword;

        newKeyword.classList.add("keyword")
        newKeyword.id = "keyword" + index;


        //Attach feedback icon to keyword

        var feedBackIcon = document.createElement("i");
        feedBackIcon.classList.add("fa");
        newKeyword.appendChild(feedBackIcon);




        this.bankContainer.appendChild(newKeyword)
        this.keywordsBank.push(newKeyword)



    }

    //Remove feedback related classes and html nodes
    //From concerned containers
    resetAllContainers() {


        for (var a = 0; a < this.keywordsBank.length; a++) {

            this.keywordsBank[a].classList.remove("correct")
            this.keywordsBank[a].classList.remove("incorrect")

            //remove feedback icon if there is any attached to the keyword div
            if (this.keywordsBank[a].querySelector("i") != undefined)
                this.keywordsBank[a].querySelector("i").classList = "fa"



        }


    }


    //  Verify if placed items are in their correct 
    // drop area classification (only if they are not correct)
    verifyItems() {



        var dropAreas = document.getElementsByClassName("full");


        for (var a = 0; a < dropAreas.length; a++) {


            var keyword = dropAreas[a].querySelector(".keyword");

            //Ignore this keyword if its already correctly placed
            if (keyword.classList.contains("correct"))
                continue;

            //Reset the keyword feedback class and image 
            //if it was misplaced by the user
            else if (keyword.classList.contains("incorrect")) {

                keyword.classList.remove("incorrect")

            }






            //Reset feedback icon classes
            var feedBackIcon = keyword.querySelector("i");
            feedBackIcon.classList = "fa"

            //Verify in the json data if the keyword is correctly classified in
            // its drop area
            var keywordId = Number(keyword.id.substring(keyword.id.length - 1))


            if (this.jsonData[keywordId].classification == Number(dropAreas[a].id.substring(dropAreas[a].id.length - 1))) {

                keyword.classList.add("correct")
                feedBackIcon.classList.add("fa-check-circle-o")

                // Adjust the drop container to fit the the dragged keyword 
                var xOffset = 30;
                var adjustedWidth = Math.ceil(keyword.parentNode.clientWidth * (keyword.offsetWidth / keyword.parentNode.clientWidth)) + xOffset;
                //keyword.parentNode.style.width = adjustedWidth + "px";

            } else {


                keyword.classList.add("incorrect")
                feedBackIcon.classList.add("fa-times-circle-o")

            }


        }



    }


    //Update the css for the "full" drop areas
    // just to add a visual indication that there is a word placed there
    updateUI() {


        var dropAreas = document.getElementsByClassName("drop-area");

        if (!dropAreas.length)
            return;

        for (var a = 0; a < dropAreas.length; a++) {

            if (dropAreas[a].classList.contains("full"))
                dropAreas[a].style.backgroundColor = "rgba(0,0,0,0)";
            else

                dropAreas[a].style.backgroundColor = "rgb(255,255,255,0.7)";

        }
    }


    //Check if the keyword with keywordId is placed correctly
    // (return true if correct & false if the keyword is still in the bank 
    // or misplaced )
    isCorrectAnswer(keywordId) {

        var keyword = document.querySelector(keywordId);
        if (keyword.parentNode.id == "keywords") {
            return false;
        }

        var keywordId = Number(keyword.id.substring(keyword.id.length - 1));
        var currentDropAreaId = Number(keyword.parentNode.id.substring(keyword.parentNode.id.length - 1))
        var correctDropAreaId = this.jsonData[keywordId].classification
        if (currentDropAreaId == correctDropAreaId)
            return true;


        return false;


    }


    //Place the keywords in their correct drop areas
    // (It moves all the words  that are not correcty placed
    // or still in the bank )
    showSolution() {

        this.resetAllContainers();

        for (var k = 0; k < Object.keys(this.jsonData).length; k++) {





            if (!this.isCorrectAnswer("#keyword" + k)) {
                var keyword = document.querySelector("#keyword" + k);
                var correctDropArea = document.querySelector("#dropArea" + this.jsonData[k].classification);
                correctDropArea.appendChild(keyword);
                correctDropArea.classList.add("full");

            }






        }

        this.updateUI();
        this.verifyItems();
    }








}