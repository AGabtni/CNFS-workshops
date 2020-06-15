var indexContainer;
var linksContainer;
var activityContainer
var activityType;

var originalLink = {


    1: {
        headerNames: ["Explorer divers modèles de supervision - Unite 5.4"],
        listElements: ["Exemple d'intégration", "Lien original"],
        listElementLinks: ["./Proto1/Integration Example/Activity.html", "https://ateliers-staging.azurewebsites.net/assets/atelierscnfs/explorer-divers-modeles-de-supervision/medias/Video/unite5_4.html"],
    },
    2: {

        headerNames: ["Explorer divers modèles de supervision - Unite 5.4"],
        listElements: ["Exemple d'intégratio", "Lien original"],
        listElementLinks: ["./Proto2/Integration Example/Activity.html", "https://ateliers-staging.azurewebsites.net/assets/atelierscnfs/explorer-divers-modeles-de-supervision/medias/Video/unite5_4.html"],

    },
    3: {
        headerNames: [
            "Performance assessment - Unité 3.7 (QCM avec une seule solution)",
            "Integrating learning styles - Unité 3.2 (Q.C.M. avec plusieurs solutions)"
        ],
        listElements: [
            "Exemple d'intégration",
            "Lien original",
            "Exemple d'intégration",
            "Lien original"
        ],
        listElementLinks: [
            "./Proto3/Integration_Example1/Activity.html",
            "https://ateliers-staging.azurewebsites.net/assets/atelierscnfs/performance-assessment/pages/unite3/unite3_7-activite.html",
            "./Proto3/Integration_Example2/Activity.html",
            "https://ateliers-staging.azurewebsites.net/assets/atelierscnfs/integrating-learning-styles/pages/unite3/unite3_2.html",
        ],




    },
    4: {
        headerNames: ["Évaluer le rendement - Unité 1.3"],
        listElements: ["Exemple d'intégration", "Lien original"],
        listElementLinks: ["./Proto4/Integration Example/Activity.html", "https://formation.cnfs.ca/assets/atelierscnfs/evaluer-le-rendement/pages/unite1/unite1_3-activite.html"],

    },
    5: {
        headerNames: ["Évaluer le rendement - Unité 1.4"],
        listElements: ["Exemple d'intégration", "Lien original"],
        listElementLinks: ["./Proto5/Integration Example/Activity.html", "https://formation.cnfs.ca/assets/atelierscnfs/evaluer-le-rendement/pages/unite1/unite1_2-activite.html"],

    },
    6: {
        headerNames: ["L'approche et le supervision interprofessionnelles - Unité 4.1"],
        listElements: ["Exemple d'intégration", "Lien original"],
        listElementLinks: ["./Proto6/Integration Example/Activity.html", "https://ateliers-staging.azurewebsites.net/assets/atelierscnfs/l-approche-et-la-supervision-interprofessionnelles/pages/unite4/unite4_1-activite.html"],

    },
    7: {

        headerNames: ["L'approche et le supervision interprofessionnelles - Unité 6.3"],
        listElements: ["Exemple d'intégration", "Lien original"],
        listElementLinks: ["./Proto7/Integration Example/Activity.html", "https://ateliers-staging.azurewebsites.net/assets/atelierscnfs/l-approche-et-la-supervision-interprofessionnelles/pages/unite6/unite6_3.html"],

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


function onLinkClick(index) {
    linksContainer.querySelector("ul").innerHTML = "";
    for (var e = 0; e < originalLink[index].listElements.length; e++) {


        if (e % 2 == 0) {
            console.log("gg")
            var newHeader = document.createElement("h5");
            newHeader.innerHTML = originalLink[index].headerNames[e / 2]
            newHeader.classList.add("listHeader")
            linksContainer.querySelector("ul").append(newHeader);

        }
        var newListElement = document.createElement("li");
        newListElement.classList.add("hvr-grow");
        newListElement.classList.add("list-group-item")
        newListElement.id = e;
        newListElement.innerHTML = originalLink[index].listElements[e]


        newListElement.addEventListener('click', (e) => {

            var frameContainer = activityContainer.querySelectorAll("iframe")[0];


            var link = originalLink[index].listElementLinks[Number(e.target.id)];
            activityContainer.querySelectorAll("button")[0].querySelectorAll("a")[0].href = link
            frameContainer.src = link;
            activityContainer.classList.remove("fade");
        })

        linksContainer.querySelector("ul").append(newListElement);
    }


    togglePanes();

}