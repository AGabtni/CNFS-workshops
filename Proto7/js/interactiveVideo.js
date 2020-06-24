class InteractiveVideo {




    constructor(quizzQuestion) {
        this.currentSlideIndex = Number(quizzQuestion.parentContainer.id.substring(quizzQuestion.parentContainer.id.length - 1))

        this.quizzQuestion = quizzQuestion;
        this.quizzQuestion.initQuestion();


        this.videoHeader = this.quizzQuestion.parentContainer.querySelectorAll("h3")[0];
        this.videoHeader.innerHTML = "Étape " + this.quizzQuestion.parentContainer.id.substring(this.quizzQuestion.parentContainer.id.length - 1);
        this.videoComponent = this.quizzQuestion.parentContainer.querySelectorAll(".interactive-video")[0];
        this.questionComponent = this.quizzQuestion.parentContainer.getElementsByClassName("questionContainer")[0];



    }

    //On video ready
    toggleVideoPreview(YTPlayer) {

        this.questionComponent.style.transform = "scale(0)"
        this.questionComponent.style.height = 0

        YTPlayer.f.style.transform = "translateY(20px)"
        YTPlayer.f.width = "640"
        YTPlayer.f.height = "480"


    }

    // Handler for when the video ends
    videoHandler(YTPlayer) {

        this.questionComponent.style.height = "100%"
        this.questionComponent.style.transform = "scale(1)"
        this.questionComponent.style.opacity = 1.0;


        YTPlayer.f.style.transform = "translateY(0px)"
        YTPlayer.f.width = "320"
        YTPlayer.f.height = "240"



    }





    //Move to next slide after 2s 
    //Called when verification button is hit
    //Resets the question too 
    moveToNextClip() {

        if (this.timeOut !== undefined) {
            return;
        }
        this.timeOut = setTimeout(() => {
            this.quizzQuestion.updateQuizzList();
            //this.toggleVideoPreview();
            this.timeOut = undefined;




        }, 5000)

    }

}