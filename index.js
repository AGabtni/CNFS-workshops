var indexContainer;
var linksContainer;
var activityContainer

function init() {

    indexContainer = document.getElementsByClassName("index")[0];
    linksContainer = document.getElementsByClassName("links")[0];
    activityContainer = document.getElementsByClassName("proto-container")[0];
    console.log(activityContainer)
}

window.onload = init;

function togglePanes() {

    if (indexContainer.classList.contains("fade")) {
        linksContainer.classList.add("fade");
        linksContainer.style.visibility = "hidden"

        indexContainer.classList.remove("fade");
        indexContainer.style.visibility = "visible"


    } else {

        indexContainer.classList.add("fade");
        indexContainer.style.visibility = "hidden"

        linksContainer.classList.remove("fade");
        linksContainer.style.visibility = "visible"

    }

}

function onActivityClick(i) {
    var frameContainer = activityContainer.querySelectorAll("iframe")[0];

    var linkHTML = linksContainer.querySelectorAll("li")[0].querySelectorAll("a")[0].innerHTML;
    var index = linkHTML.substr(linkHTML.length - 1);


    console.log(index)
    var prefix = "./Proto" + index
    var protoLinkString = prefix + "/QCM.html";
    var integrationLinkString = prefix + "/Integration Example/Activity.html";

    switch (i) {

        case 0:
            frameContainer.src = protoLinkString
            break;
        case 1:
            frameContainer.src = integrationLinkString
            break;
    }


    if (activityContainer.classList.contains("fade")) {
        activityContainer.classList.remove("fade");


    } else {

        activityContainer.classList.remove("fade");

    }


}

function onLinkClick(index) {


    var protoLink = linksContainer.querySelectorAll("li")[0].querySelectorAll("a")[0];
    var integrationLink = linksContainer.querySelectorAll("li")[1].querySelectorAll("a")[0];



    protoLink.innerHTML = "Prototype " + index

    integrationLink.innerHTML = "Integration example for Prototype " + index

    togglePanes();

}