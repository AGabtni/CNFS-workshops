class DragNDrop {

    parentElement;



    rawData;
    keywords = [

    ]


    constructor(parentClassName, data) {

        this.parentElement = document.getElementsByClassName(parentClassName)[0];
        this.rawData = data;

    }

    quizzInit() {


        //Populate the word bank with the keywords 
        for (var k = 0; k < Object.keys(this.rawData).length; k++) {

            //Create node for each keyword and append it to the container
            var node = document.createElement("div");
            var child = document.createElement("h4");
            child.innerHTML = this.rawData[k].keyword
            node.appendChild(child);
            node.classList.add("keyword");
            node.classList.add("tooltip");
            node.id = "draggable" + k;



            //Apprend keyword node to the keywords bank container
            this.parentElement.appendChild(node);
            $("#draggable" + k).draggable({
                revert: "invalid",
                cursor: "pointer",
                cursorAt: { top: 56, left: 56 },
                connectToSortable: "#droppable, #droppableA, #droppableB",
            });

        }


    }


    //Verify the keywords contained in each category
    // of the droppable area
    verify() {

        this.resetQuizz();

        this.verifyKeywordsInCategory("A", 0);
        this.verifyKeywordsInCategory("B", 1);
    }


    //Verify if the keywords placed in the droppable category
    // belong to it
    verifyKeywordsInCategory(category, classification) {

        var keywords = $("#droppable" + category).children();



        for (var k = 0; k < keywords.length; k++) {

            var keyword = keywords[k];
            var id = keyword.id.substring(keywords[k].id.length - 1);

            if (this.rawData[id].classification === classification) {



                keyword.classList.add("correct")



            } else {


                keyword.classList.add("incorrect")

            }

            //Add the feedback in the tooltip associated to the keyword
            var feedback = document.createElement("span");
            feedback.innerHTML = this.rawData[id].feedback
            feedback.classList.add("tooltiptext");
            //Append tooltip to keyword node
            keyword.appendChild(feedback);
        }

    }

    resetQuizz() {
        var keywords = document.getElementsByClassName("keyword");
        for (var k = 0; k < keywords.length; k++) {

            keywords[k].classList.remove("incorrect");
            keywords[k].classList.remove("correct");
            if (keywords[k].getElementsByClassName("tooltiptext")[0] !== undefined)
                keywords[k].getElementsByClassName("tooltiptext")[0].remove();

        }

    }

}