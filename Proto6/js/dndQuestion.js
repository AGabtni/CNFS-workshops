class DNDQuestion {

    keywordsBank = [];

    bankContainer;
    dropAreas = [];

    dragAndDrop = {


        init: function() {
            this.dragula();
            this.drake();
        },

        drake: function() {
            this.dragula.on('drop', this.dropped.bind(this));
        },

        dragula: function() {
            this.dragula = dragula([document.querySelector('#keywords')],
                //Dragula options here
                {
                    revertOnSpill: true,
                    accepts: function(el, target, source, sibling) {

                        if (source.classList.contains("full"))
                            source.classList.remove("full");
                        return !target.classList.contains("full"); // elements can be dropped in any of the `containers` by default
                    },
                });
        },

        canMove: function() {


        },

        dropped: function(el) {

            if (el.parentNode.id != "keywords")
                el.parentNode.classList.add("full")

            console.log("Dropped in area " + el.parentNode.id)
        },


    };


    constructor(data, bankContainerId) {

        this.dropAreas = document.getElementsByClassName("drop-area");
        this.bankContainer = document.querySelector("#" + bankContainerId)


        for (var d = 0; d < Object.keys(data).length; d++) {
            this.keywordsBank.push(data[d].keyword)
            var newKeyword = document.createElement("span");
            newKeyword.innerHTML = data[d].keyword;
            newKeyword.classList.add("keyword")
            this.bankContainer.appendChild(newKeyword)



        }
        this.dragAndDrop.init();
        for (var a = 0; a < this.dropAreas.length; a++) {
            this.dragAndDrop.dragula.containers.push(this.dropAreas[a])

        }


    }


    initQuestion() {
        console.log("here")

    }





}