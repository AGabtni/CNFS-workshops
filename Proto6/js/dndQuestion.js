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

        },

        dragula: function() {
            this.dragula = dragula([document.querySelector('#keywords')],
                //Dragula options here
                {
                    revertOnSpill: true,
                    accepts: (el, target, source, sibling) => {
                        if (target.id == "keywords")
                            return true;


                        this.currenSource = source;
                        return !target.classList.contains("full");
                    }
                });
        },

        canMove: function() {


        },



        //On keyword drop handler :
        //Reset old source drop area (if its moved with the classification section)
        //and adjust the target drop area to fit the keyword
        dropped: function(el) {


            if (el.parentNode.id != "keywords") {


                el.parentNode.classList.add("full")
                var yOffset = 20;
                var adjustedWidth = Math.ceil(el.parentNode.clientWidth * (el.offsetWidth / el.parentNode.clientWidth)) + yOffset;
                el.parentNode.style.width = adjustedWidth + "px";
            }


            var dropAreas = document.getElementsByClassName("drop-area");

            for (var a = 0; a < dropAreas.length; a++) {


                if (dropAreas[a].classList.contains("full") && !dropAreas[a].getElementsByClassName("keyword").length) {

                    dropAreas[a].classList.remove("full")

                }
            }


            if (this.currenSource.id != "keywords") {

                this.currenSource.classList.remove("full");
                this.currenSource.style.width = "200px"
                this.currenSource = undefined
            }
        },






    };


    constructor(data, bankContainerId) {

        this.dropAreas = document.getElementsByClassName("drop-area");
        this.bankContainer = document.querySelector("#" + bankContainerId)
        this.jsonData = data;

        for (var d = 0; d < Object.keys(data).length; d++) {
            var newKeyword = document.createElement("span");
            newKeyword.innerHTML = data[d].keyword;
            newKeyword.classList.add("keyword")
            newKeyword.id = d

            this.bankContainer.appendChild(newKeyword)
            this.keywordsBank.push(newKeyword)



        }
        this.dragAndDrop.init();
        for (var a = 0; a < this.dropAreas.length; a++) {
            this.dragAndDrop.dragula.containers.push(this.dropAreas[a])

        }


    }

    verifyItems() {



        //Reset verification classes from all items
        for (var a = 0; a < this.keywordsBank.length; a++) {

            this.keywordsBank[a].classList.remove("correct")
            this.keywordsBank[a].classList.remove("incorrect")


        }


        var dropAreas = document.getElementsByClassName("full");


        //Check if a placeholder already contains
        for (var a = 0; a < dropAreas.length; a++) {


            var keyword = dropAreas[a].querySelector(".keyword");
            var placeHolderId = dropAreas[a].id.substring(dropAreas[a].id.length - 1)
            console.log(this.jsonData[keyword.id].classification)
            console.log(placeHolderId)

            if (this.jsonData[keyword.id].classification == Number(placeHolderId)) {

                keyword.classList.add("correct")


            } else {


                keyword.classList.add("incorrect")
            }


        }


    }
    initQuestion() {

    }





}