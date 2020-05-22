var indexContainer;
var linksContainer;
var activityContainer
var activityType;

var currentIndex;
var originalLink = {

    1: {

        link: "",
        screenshot: "",
    },
    2: {

        link: "",
        screenshot: "",

    },
    3: {

        link: "https://formation.cnfs.ca/assets/atelierscnfs/conflict-management/pages/unite3/unite3_1-activite.html",
        screenshot: "",

    },
    4: {

        link: "https://formation.cnfs.ca/assets/atelierscnfs/evaluer-le-rendement/pages/unite1/unite1_3-activite.html",
        screenshot: "",

    },
    5: {

        link: "https://formation.cnfs.ca/assets/atelierscnfs/evaluer-le-rendement/pages/unite1/unite1_2-activite.html",
        screenshot: "",

    },
    6: {

        link: "",
        screenshot: "",

    },
    7: {

        link: "https://ateliers-staging.azurewebsites.net/assets/atelierscnfs/l-approche-et-la-supervision-interprofessionnelles/pages/unite6/unite6_3.html",
        screenshot: "",

    },


}

function init() {

    indexContainer = document.getElementsByClassName("index")[0];
    linksContainer = document.getElementsByClassName("links")[0];
    activityContainer = document.getElementsByClassName("proto-container")[0];
}

window.onload = init;

function togglePanes() {

    //Switch to prototype view
    if (indexContainer.classList.contains("fade")) {
        linksContainer.classList.add("fade");
        linksContainer.style.visibility = "hidden"

        indexContainer.classList.remove("fade");
        indexContainer.style.visibility = "visible"


    }
    //Switch to index view
    else {
        activityContainer.querySelectorAll("iframe")[0].src = "";
        indexContainer.classList.add("fade");
        indexContainer.style.visibility = "hidden"

        linksContainer.classList.remove("fade");
        linksContainer.style.visibility = "visible"

    }

}

function onActivityClick(i) {

    console.log("Current is : " + currentIndex)
    var frameContainer = activityContainer.querySelectorAll("iframe")[0];

    var linkHTML = linksContainer.querySelectorAll("li")[0].querySelectorAll("a")[0].innerHTML;
    var index = linkHTML.substr(linkHTML.length - 1);


    var prefix = "./Proto" + index

    var protoLinkString = prefix + "/QCM.html";
    var integrationLinkString = prefix + "/Integration Example/Activity.html";
    var screenShotString = "./screenshots/Proto" + index + ".gif";
    switch (i) {

        case 0:
            frameContainer.src = protoLinkString
            frameContainer.hidden = false;

            break;
        case 1:
            frameContainer.src = integrationLinkString
            frameContainer.hidden = false;

            break;
        case 2:

            frameContainer.hidden = true;
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
    document.getElementById("originalLink").href = originalLink[index].link



    protoLink.innerHTML = "Prototype " + index

    integrationLink.innerHTML = "Exemple d'intégration pour le Prototype " + index


    currentIndex = index;
    togglePanes();

}