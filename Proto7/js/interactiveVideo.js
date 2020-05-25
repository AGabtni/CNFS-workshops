class InteractiveVideo {

    quizzQuestion;
    questionComponent;
    videoComponent;
    videoHeader;
    timeOut;

    currentSlideIndex;


    constructor(quizzQuestion) {
        this.currentSlideIndex = Number(quizzQuestion.parentContainer.id.substring(quizzQuestion.parentContainer.id.length - 1))

        console.log(this.currentSlideIndex);
        this.quizzQuestion = quizzQuestion;
        this.quizzQuestion.initQuestion();


        this.videoHeader = this.quizzQuestion.parentContainer.querySelectorAll("h3")[0];
        this.videoHeader.innerHTML = "Étape " + this.quizzQuestion.parentContainer.id.substring(this.quizzQuestion.parentContainer.id.length - 1);
        this.videoComponent = this.quizzQuestion.parentContainer.querySelectorAll("video")[0];
        this.questionComponent = this.quizzQuestion.parentContainer.getElementsByClassName("questionContainer")[0];



        this.toggleVideoPreview();
    }


    toggleVideoPreview() {

        this.questionComponent.style.transform = "scale(0)"
        this.questionComponent.style.height = 0

        this.videoComponent.parentNode.style.transform = "translateY(20px)"
        this.videoComponent.width = "640"
        this.videoComponent.height = "480"


    }

    // Handler for when the video ends
    videoHandler() {

        this.questionComponent.style.height = "100%"
        this.questionComponent.style.transform = "scale(1)"

        this.questionComponent.style.opacity = 1.0;



        this.videoComponent.parentNode.style.transform = "translateY(0px)"

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

        if (this.timeOut !== undefined) {
            return;
        }
        this.timeOut = setTimeout(() => {
            //this.questionComponent.style.visibility = "hidden"
            this.videoComponent.pause()
            this.quizzQuestion.updateQuizzList();
            this.toggleVideoPreview();
            this.videoComponent.load();
            this.timeOut = undefined;


            //Scroll to next question if no scroll was detected by the user
            var currentScroll = window.pageYOffset
            setTimeout(() => {
                if (window.pageYOffset != currentScroll)
                    return;

                this.scrollToSlide(this.currentSlideIndex);

            }, 2000)

        }, 5000)

    }

    //Scroll to next slide 
    scrollToSlide(index) {

        var slides = document.getElementsByClassName("slide");
        var nextSlideId = index + 1;
        var nextSlide;
        console.log(index)
        console.log(nextSlideId)
        if (index === slides.length)
            nextSlide = document.querySelector("#slide_1")
        else
            nextSlide = document.querySelector("#slide_" + nextSlideId)


        console.log(nextSlide.offsetTop)

        window.scrollTo({
            top: nextSlide.offsetTop,
            left: 0,
            behavior: 'smooth'
        })

    }

}