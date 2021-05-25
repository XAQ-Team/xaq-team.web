// xaq-team

// const wait = (i, ms) => new Promise(resolve => setTimeout(() => resolve(i), ms));

var urlParams = new URLSearchParams(window.location.search);

function onPageLoaded() {
    if (urlParams.has('q')) {  // если в get запросе передан аргумент q - начать анимацию
        $("#search").click(redirectSearch);
        $("#lucky").click(redirectLuck);

        $("#instruction").show();
        $("#mouse-pointer").show();
        $("#mouse-pointer").css({position: "absolute"});

        setTimeout(startAnim, 250);  // меня в играх так не бомбило, как я пытался реализовать код по парадигме функциональщины.

    } else {  // иначе показать меню создания ссылки
        $("#search").html("Создать ссылку");
        $("#search").click(createLink);
        $("#lucky").html("Что это такое?");
        $("#lucky").click(getAbout);
    }
}

function createLink() {
    let link = window.location.toString();
    link += (link.indexOf('?') !== -1 ? "&" : "?");
    link += "q=";

    link += EncodeURLlink($('#inputPlace').val());
    $('#inputPlace').val(link);

    $("#search").html("Сократить");
    $('#search').unbind('click');
    $("#search").click(makeShorter);

    $("#lucky").html("Скопировать");
    $('#lucky').unbind('click');
    $("#lucky").click(copyLink);
}

function getAbout() {
    $("#about").show();
}

function makeShorter() {
    $.getJSON("https://api-ssl.bitly.com/v3/shorten?format=json&login=zennoposter11&apiKey=R_fdb5a0a92fbb426486000faf8294d5a7&longUrl=" + EncodeURLlink($("#inputPlace").val()), function(e) {
        if(e.data.url) { // success
            $("#inputPlace").val(e.data.url);
            $("#success").html("shorted successfully");
        } else {
            $("#error").html("couldn't be shorten");
        }
    });

    $("#search").html("Перейти");
    $('#search').unbind('click');
    $("#search").click(() => {window.location = $("#inputPlace").val()});
    return false;
}

function copyLink () {
    if(copyToClipboard($("#inputPlace").val()))
        $("#success").html("copied successfully");
    else
        $("#error").html("couldn't be copied");
}

function startAnim() {
    let pointer = $("#mouse-pointer");
    let elem = $("#inputPlace");
    $("#instruction-text-1").removeClass('transpend-text');

    var offset = elem.offset();
    var posY = offset.top - $(window).scrollTop() + elem.height() / 2;
    var posX = offset.left - $(window).scrollLeft() + elem.width() / 2;
    pointer.css({transition: "all 3s cubic-bezier(.65,.05,.36,1) 0s"}); // animation
    pointer.css("padding-left", posX);
    pointer.css("padding-top", posY);
    setTimeout(() => {typeQuery(urlParams.get('q'), 0) }, 3000);
}

function typeQuery(string, index) {
    $("#inputPlace").val(string.substr(0, index + 1));
    if (index < string.length) {
        setTimeout(function () {
            typeQuery(string, index + 1);
        }, Math.random() * 240);
    } else {
        $("#instruction-text-2").removeClass('transpend-text');
        moveToButton();
    }
}
function moveToButton() {
    let pointer = $("#mouse-pointer");
    let elem = $("#search");

    var offset = elem.offset();
    var posY = offset.top - $(window).scrollTop() + elem.height() / 2;
    var posX = offset.left - $(window).scrollLeft() + elem.width() / 2;
    pointer.css({transition: "all 3s cubic-bezier(.65,.05,.36,1) 0s"}); // animation
    pointer.css("padding-left", posX);
    pointer.css("padding-top", posY);
    setTimeout(showComm, 1000);
}
function showComm() {
    $("#instruction-comment").removeClass('transpend-text');
    setTimeout(showTip, 1000);
}
function showTip() {
    $("#instruction-tip").removeClass('transpend-text');
}
function redirectSearch() {
    var google = "https://www.google.ru/search?&rls=ru&q=";
    window.location = google + EncodeURLlink(urlParams.get('q'));
}
function redirectLuck() {
    var google = "https://www.google.ru/search?hl=ru&btnI=I%27m+Feeling+Lucky&q=";
    window.location = google + EncodeURLlink(urlParams.get('q'));

}
function EncodeURLlink(string) {
    return ( encodeURIComponent
        ? encodeURIComponent(string).replace(/%20(\D)?/g, "+$1").replace(/'/g, escape("'"))
        : escape(string).replace(/\+/g, "%2B").replace(/%20/g, "+") );
}

// function DecodeURLlink(string) {
//     return decodeURIComponent ? decodeURIComponent(string) : unescape(string);
// }

// function sleep(milliseconds) {
//     const date = Date.now();
//     let currentDate = null;
//     do {
//         currentDate = Date.now();
//     } while (currentDate - date < milliseconds);
// }

function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData("Text", text);

    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        }
        catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        }
        finally {
            document.body.removeChild(textarea);
        }
    }
}

document.addEventListener("DOMContentLoaded", onPageLoaded);