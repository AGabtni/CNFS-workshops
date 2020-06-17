class DNDQuestion {






    constructor(bankContainerId) {
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
                this.dragula.on('cancel', this.dropped.bind(this));

            },

            dragula: function() {
                this.dragula = dragula([document.querySelector('#keywords')],
                    //Dragula options here
                    {
                        revertOnSpill: true,
                        removeOnSpill: false,
                        accepts: (el, target, source, sibling) => {



                            this.resetHoverContainers()

                            if (target.id != "keywords") {
                                target.classList.add("hovering");
                                //var headerId = target.id.substring(target.id.length - 1)
                                //var header = document.querySelector("#header" + headerId);
                            } else if (target.id == "keywords") {
                                target.classList.add("hovering");
                                var headerId = target.id.substring(target.id.length - 1)
                                    //var header = document.getElementsByClassName("bank-header")[0];
                                    //header.classList.add("header-hover");

                            }
                            return true;
                        }


                    });
            },



            //On keyword drag handler : 
            dragged: function(el) {

                if (el.parentNode.id == "keywords")
                    return;

                dndQuestion.resetAllContainers()

                this.resetHoverContainers();


            },

            //On keyword drop handler 
            dropped: function(el) {


                this.resetHoverContainers();




            },

            resetHoverContainers: function() {
                var currentDropAreas = document.getElementsByClassName("hovering");
                while (currentDropAreas.length > 0) {
                    currentDropAreas[0].classList.remove("hovering")
                }


                var currentHeaders = document.getElementsByClassName("header-hover");
                while (currentHeaders.length > 0) {
                    currentHeaders[0].classList.remove("header-hover")
                }


            }






        };
        this.keywordsBank = [];

        this.dropAreas = document.getElementsByClassName("drop-area");
        this.bankContainer = document.querySelector("#" + bankContainerId)

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
            var newKeyword = document.createElement("div");
            newKeyword.innerHTML = data[d].keyword;

            newKeyword.classList.add("keyword")
            newKeyword.id = "keyword" + d;

            this.bankContainer.appendChild(newKeyword)
            this.keywordsBank.push(newKeyword)



        }
    }

    //Remove feedback related classes and html nodes
    //From concerned containers
    resetAllContainers() {


        for (var a = 0; a < this.keywordsBank.length; a++) {

            this.keywordsBank[a].classList.remove("correct")
            this.keywordsBank[a].classList.remove("incorrect")
                //remove feedback image if there is any attached to the keyword div


            if (this.keywordsBank[a].querySelector("img") != undefined) {
                this.keywordsBank[a].removeChild(this.keywordsBank[a].querySelector("img"))


            }


        }
    }


    //  Verify if placed items are in their correct 
    // drop area classification (only if they are not correct)
    verifyItems() {


        var dropAreas = document.getElementsByClassName("drop-area");


        for (var a = 0; a < dropAreas.length; a++) {


            //Check all words placed in that area
            var keywords = dropAreas[a].getElementsByClassName("keyword");
            for (var k = 0; k < keywords.length; k++) {

                var currentKeyword = keywords[k];
                //Ignore this keyword if its already correctly placed
                if (currentKeyword.classList.contains("correct"))
                    continue;
                //Reset the keyword feedback class and image 
                //if it was misplaced by the user
                else if (currentKeyword.classList.contains("incorrect")) {

                    currentKeyword.classList.remove("incorrect")
                    currentKeyword.removeChild(currentKeyword.querySelector("img"))

                }




                //Append feedback img inside keyword
                var feedBackImg = document.createElement("img");
                feedBackImg.classList.add("feedbackImg");
                currentKeyword.parentNode.style.width = "250px"
                currentKeyword.appendChild(feedBackImg);


                //Verify according to the json data if the keyword is correctly classified in
                // its drop area
                var keywordId = Number(currentKeyword.id.substring(currentKeyword.id.length - 1))


                if (this.jsonData[keywordId].classification == Number(dropAreas[a].id.substring(dropAreas[a].id.length - 1))) {

                    currentKeyword.classList.add("correct")
                    feedBackImg.src = "./img/tick.png"



                } else {


                    currentKeyword.classList.add("incorrect")
                    feedBackImg.src = "./img/cross.png"

                }


            }










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

            }

        }

        this.verifyItems();
    }








}