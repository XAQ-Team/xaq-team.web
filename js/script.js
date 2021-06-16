document.addEventListener("DOMContentLoaded", onPageLoaded);
function onPageLoaded() {
    $("#player-button").on("click", () => {
        let aud =  document.getElementById("audio");
        let icon = $("#player-button i");
        if (aud.paused) {
            aud.play();
            aud.paused = false;
            icon.removeClass("fa-play");
            icon.addClass("fa-pause");
        } else {
            aud.pause();
            icon.removeClass("fa-pause");
            icon.addClass("fa-play");
        }
    });
    $("#player-volume-slider").on("change", () => {
        document.getElementById('audio').volume = $("#player-volume-slider").val();
    });

    function ddmClick() {
        let x = $('#navigation');
        x.toggleClass("openedNavigation", !(x.hasClass('openedNavigation')))
    }
}