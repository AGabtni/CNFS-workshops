class InteractiveVideo {

    quizzQuestion;
    questionComponent;
    videoComponent;
    timeOut;


    constructor(quizzQuestion) {

        this.quizzQuestion = quizzQuestion;
        this.quizzQuestion.initQuestion();
        this.videoComponent = this.quizzQuestion.parentContainer.querySelectorAll("video")[0];
        this.questionComponent = this.quizzQuestion.parentContainer.getElementsByClassName("questionContainer")[0];

        this.toggleVideoPreview();
    }


    toggleVideoPreview() {
        this.videoComponent.style.transform = "translateY(100px)"
        this.videoComponent.width = "640"
        this.videoComponent.height = "480"

    }

    // Handler for when the video ends
    videoHandler() {
        console.log("VIDEO ENDED");
        this.questionComponent.style.visibility = "visible"
        this.questionComponent.style.opacity = 1.0;



        this.videoComponent.style.transform = "translateY(0px)"
        this.videoComponent.width = "320"
        this.videoComponent.height = "240"


    }

    //Load clip into video source tag
    loadClip(clipPath) {

        this.videoComponent.querySelectorAll("source")[0].src = clipPath;
        this.videoComponent.load();
        this.videoComponent.addEventListener('ended', event => this.videoHandler(), false);

    }


    //Move to next slide after 2s 
    //Called when verification button is hit
    moveToNextClip() {

        console.log(this.timeOut)
        if (this.timeOut !== undefined) {
            return;
        }
        this.timeOut = setTimeout(() => {
            this.questionComponent.style.visibility = "hidden"
            this.videoComponent.pause()
            next(1);
            this.quizzQuestion.updateQuizzList();
            this.toggleVideoPreview();
            this.timeOut = undefined;


        }, 3000)

    }


}