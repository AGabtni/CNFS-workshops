
var indexContainer;
var linksContainer;
function init(){

    indexContainer = document.getElementsByClassName("index")[0];
    linksContainer = document.getElementsByClassName("links")[0];


}

window.onload = init;

function togglePanes(){

    if(indexContainer.classList.contains("fade")){
        linksContainer.classList.add("fade");
        indexContainer.classList.remove("fade");
    

    }else{

        indexContainer.classList.add("fade");
        linksContainer.classList.remove("fade");

    }
        
}

function onLinkClick(index){

    
    var protoLink = linksContainer.querySelectorAll("li")[0].querySelectorAll("a")[0];
    var integrationLink = linksContainer.querySelectorAll("li")[1].querySelectorAll("a")[0];

    console.log(integrationLink)
    var prefix = "./Proto"+index
    var protoLinkString = prefix + "/QCM.html";
    var integrationLinkString = prefix + "/Integration Example/Activity.html";


    protoLink.href = protoLinkString
    protoLink.innerHTML = "Prototype "+index
    
    integrationLink.href = integrationLinkString
    integrationLink.innerHTML = "Integration example for Prototype "+index

    togglePanes();

}