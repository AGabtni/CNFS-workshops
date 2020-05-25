class DNDQuestion {

    keywordsBank = [];

    bankContainer;
    dropAreas = [];

    dragAndDrop = {

        limit: 2,
        count: 0,

        init: function() {
            this.dragula();
            this.drake();
        },

        drake: function() {
            this.dragula.on('drop', this.dropped.bind(this));
        },

        dragula: function() {
            this.dragula = dragula([document.querySelector('#keywords'), document.querySelector('#right').querySelector("p")], {});
        },

        canMove: function() {
            return this.count < this.limit;
        },

        dropped: function(el) {
            this.count++;
        }

    };


    constructor(data, bankContainerId) {

        this.dropAreas = document.getElementsByClassName("drop-area");
        this.bankContainer = document.querySelector("#" + bankContainerId)
        console.log(this.dropAreas)


        for (var d = 0; d < Object.keys(data).length; d++) {
            this.keywordsBank.push(data[d].keyword)
            var newKeyword = document.createElement("span");
            newKeyword.innerHTML = data[d].keyword;
            newKeyword.classList.add("keyword")
            this.bankContainer.appendChild(newKeyword)



        }


        this.dragAndDrop.init();

    }


    initQuestion() {


    }





}