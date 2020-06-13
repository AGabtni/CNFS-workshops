var stopVideo = function(element) {
    var iframe = element.querySelector('iframe');
    var video = element.querySelector('video');
    var iframeSrc = iframe.src;
    iframe.src = iframeSrc;


};
window.onload = document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;


    // Close modal window with 'data-dismiss' attribute or when the backdrop is clicked
    if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {

        var modalWindow = document.getElementsByClassName("modal-window")[0];

        modalWindow.classList.remove("modal-in");
        modalWindow.classList.add("modal-out");
        stopVideo(modalWindow)

        setTimeout(() => {

            var modal = document.querySelector(".modal");
            modal.classList.remove('open');
        }, 500)




        e.preventDefault();
    }



}, false);


function openModel(modal) {

    modal.classList.add('open');

    setTimeout(() => {

        var modalWindow = document.getElementsByClassName("modal-window")[0];
        modalWindow.classList.remove("modal-out");
        modalWindow.classList.add("modal-in");
    }, 100)
}