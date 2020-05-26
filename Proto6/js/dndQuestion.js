class DNDQuestion {

    keywordsBank = [];

    bankContainer;
    dropAreas = [];
    jsonData;
    dragAndDrop = {




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

            el.parentNode.style.width = "250px"


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


        },






    };


    constructor(bankContainerId) {

        this.dropAreas = document.getElementsByClassName("drop-area");
        this.bankContainer = document.querySelector("#" + bankContainerId)

        this.dragAndDrop.init();
        for (var a = 0; a < this.dropAreas.length; a++) {
            this.dragAndDrop.dragula.containers.push(this.dropAreas[a])

        }


    }

    resetAllContainers() {

        //Reset verification classes from all items

        for (var a = 0; a < this.keywordsBank.length; a++) {

            this.keywordsBank[a].classList.remove("correct")
            this.keywordsBank[a].classList.remove("incorrect")
                //remove feedback image if there is any attached to the keyword div


            if (this.keywordsBank[a].querySelector("img") != undefined) {
                this.keywordsBank[a].removeChild(this.keywordsBank[a].querySelector("img"))


            }


        }
    }


    //Verify if placed items are in their correct 
    // drop area classification
    verifyItems() {


        this.resetAllContainers();

        var dropAreas = document.getElementsByClassName("full");


        for (var a = 0; a < dropAreas.length; a++) {


            var keyword = dropAreas[a].querySelector(".keyword");
            var placeHolderId = dropAreas[a].id.substring(dropAreas[a].id.length - 1)



            //Append feedback img inside keyword
            var feedBackImg = document.createElement("img");
            feedBackImg.classList.add("feedbackImg");
            keyword.parentNode.style.width = "250px"
            keyword.appendChild(feedBackImg)


            var keywordId = Number(keyword.id.substring(keyword.id.length - 1))
            if (this.jsonData[keywordId].classification == Number(placeHolderId)) {

                keyword.classList.add("correct")
                feedBackImg.src = "./img/tick.png"

                //Adjust the drop container to fit the the dragged keyword
                var yOffset = 20;
                var adjustedWidth = Math.ceil(keyword.parentNode.clientWidth * (keyword.offsetWidth / keyword.parentNode.clientWidth)) + yOffset;
                keyword.parentNode.style.width = adjustedWidth + "px";

            } else {


                keyword.classList.add("incorrect")
                feedBackImg.src = "./img/cross.png"

            }


        }



    }


    showSolution() {



        for (var k = 0; k < Object.keys(this.jsonData).length; k++) {


            var correctDropArea = document.querySelector("#dropArea" + this.jsonData[k].classification);
            if (correctDropArea.getElementsByClassName("keyword").length > 0)
                continue;

            var keyword = document.querySelector("#keyword" + k);

            correctDropArea.appendChild(keyword);
            correctDropArea.classList.add("full");
        }


    }
    initQuestion(data) {

        this.jsonData = data;
        //Create keywords dynamicly and append them to wrapping container
        for (var d = 0; d < Object.keys(data).length; d++) {
            var newKeyword = document.createElement("span");
            newKeyword.innerHTML = data[d].keyword;
            newKeyword.classList.add("keyword")
            newKeyword.id = "keyword" + d;

            this.bankContainer.appendChild(newKeyword)
            this.keywordsBank.push(newKeyword)



        }
    }





}