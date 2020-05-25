class InteractiveVideo {

    quizzQuestion;
    questionComponent;
    videoComponent;
    videoHeader;
    timeOut;



    //Just for now 

    prev;
    next;
    constructor(quizzQuestion) {

        this.quizzQuestion = quizzQuestion;
        this.quizzQuestion.initQuestion();
        this.videoComponent = this.quizzQuestion.parentContainer.querySelectorAll("video")[0];
        this.questionComponent = this.quizzQuestion.parentContainer.getElementsByClassName("questionContainer")[0];
        this.videoHeader = this.quizzQuestion.parentContainer.querySelectorAll("h3")[0];
        this.videoHeader.innerHTML = "Étape " + this.quizzQuestion.parentContainer.id.substring(this.quizzQuestion.parentContainer.id.length - 1);



        this.prev = this.videoComponent.parentNode.querySelectorAll("a")[0];
        this.next = this.videoComponent.parentNode.querySelectorAll("a")[1];
        this.prev.style.transition = "all 0.2s ease-in"
        this.next.style.transition = "all 0.2s ease-in"
        this.toggleVideoPreview();
    }


    toggleVideoPreview() {
        this.videoComponent.parentNode.style.transform = "translateY(50px)"
        this.videoComponent.width = "640"
        this.videoComponent.height = "480"
        this.prev.style.left = "-10%";
        this.next.style.right = "-10%";

    }

    // Handler for when the video ends
    videoHandler() {
        console.log("VIDEO ENDED");
        this.questionComponent.style.visibility = "visible"
        this.questionComponent.style.opacity = 1.0;



        this.videoComponent.parentNode.style.transform = "translateY(0px)"

        this.videoComponent.width = "320"
        this.videoComponent.height = "240"
        this.prev.style.left = "10%";
        this.next.style.right = "10%";


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
            //this.questionComponent.style.visibility = "hidden"
            this.videoComponent.pause()
                //next(1);
            this.quizzQuestion.updateQuizzList();
            //this.toggleVideoPreview();
            this.videoComponent.load();

            this.timeOut = undefined;


        }, 5000)

    }


}