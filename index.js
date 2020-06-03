var indexContainer;
var linksContainer;
var activityContainer
var activityType;

var currentIndex;
var originalLink = {

    1: {

        link: "https://ateliers-staging.azurewebsites.net/assets/atelierscnfs/explorer-divers-modeles-de-supervision/medias/Video/unite5_4.html",
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

        link: "https://ateliers-staging.azurewebsites.net/assets/atelierscnfs/l-approche-et-la-supervision-interprofessionnelles/pages/unite4/unite4_1-activite.html",
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
        activityContainer.classList.remove("fade");



    }
    //Switch to index view
    else {
        activityContainer.querySelectorAll("iframe")[0].src = "";
        activityContainer.querySelectorAll("button")[0].querySelectorAll("a")[0].href = "";

        activityContainer.classList.add("fade");
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


    var prefix = "./Proto" + index

    var screenShotString = "./screenshots/Proto" + index + ".gif";
    switch (i) {

        case 0:
            var protoLinkString = prefix + "/activity.html";

            frameContainer.src = protoLinkString
            activityContainer.querySelectorAll("button")[0].querySelectorAll("a")[0].href = protoLinkString;
            activityContainer.classList.remove("fade");

            break;
        case 1:
            var integrationLinkString = prefix + "/Integration Example/Activity.html";

            frameContainer.src = integrationLinkString
            activityContainer.querySelectorAll("button")[0].querySelectorAll("a")[0].href = integrationLinkString;
            activityContainer.classList.remove("fade");

            break;
        case 2:
            activityContainer.classList.add("fade");
            break;
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