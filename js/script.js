document.addEventListener("DOMContentLoaded", onPageLoaded);
function onPageLoaded() {

}

function ddbClick() {
    let x = $('#navigation');
    x.toggleClass("openedNavigation", !(x.hasClass('openedNavigation')))
}
