//Slider functions 

var slideIndex = 1;
showSlides(slideIndex);


// Next/previous controls
function next(n) {
    showSlides(slideIndex += n);

    var oldCurrentSlide = document.getElementsByClassName("current");
    var currentSlide = document.getElementById("slide_" + slideIndex);

    oldCurrentSlide = oldCurrentSlide[0];

    oldCurrentSlide.classList.remove("moved-left");
    oldCurrentSlide.classList.remove("moved-right");
    oldCurrentSlide.classList.remove("current");

    currentSlide.classList.add("moved-right");
    currentSlide.classList.add("current");



}

function prev(n) {

    showSlides(slideIndex += n);

    var oldCurrentSlide = document.getElementsByClassName("current");
    var currentSlide = document.getElementById("slide_" + slideIndex);

    oldCurrentSlide = oldCurrentSlide[0];


    oldCurrentSlide.classList.remove("moved-left");
    oldCurrentSlide.classList.remove("moved-right");
    oldCurrentSlide.classList.remove("current");


    currentSlide.classList.add("moved-left");
    currentSlide.classList.add("current");

}


// Thumbnail image controls
function currentSlide(n) {
    if (slideIndex > n)
        prev(-1)
    if (slideIndex < n)
        next(1)
}


//Update slide show
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
}