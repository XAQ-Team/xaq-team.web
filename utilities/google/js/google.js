// xaq-team

// const wait = (i, ms) => new Promise(resolve => setTimeout(() => resolve(i), ms));

const script = [
    step_1 = "Введите запрос в поле ввода.",
    step_2 = "Нажмите кнопку поиска.",
    step_3 = 'Надеюсь ты запомнил эти шаги.'
];

var urlParams = new URLSearchParams(window.location.search);

async function onPageLoaded() {
    if (urlParams.has('q')) {
        $('#mouse-pointer').show();
        $('#mouse-pointer').css({position: "absolute"});

        $("#search").click(redirectSearch);
        $("#lucky").click(redirectLuck);

        startAnim();  // меня в играх так не бомбило, как я пытался реализовать код по парадигме функциональщины.
                      // это блять настолько тупорылый язык, что у меня нет слов.
                      // попробовал я значит сделать функцию перемещения фейк курсора. как итог - курсор идет сразу к итоговой позиции
                      // вместо поочерёдного выполнения функций (Псевдо код говна, о котором говорю:
                      //   ПереместитьКурсор(поле ввода); НабиратьТекстСПериодом("text"); ПереместитьКурсор("кнопка подтвержд.)

    } else {
        $("#search").html("Создать ссылку");
        $("#search").click(createLink);
        $("#lucky").html("Что это такое?");
        $("#lucky").click(getAbout);
    }
}

function createLink() {
    let link = window.location.toString();//.charAt(17);
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
    alert("Если ты видишь это - я забыл добавить...");
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

}

// function mouseToButton() {
//     fakeMouse.animate({
//         top: (button.position().top + 20).px(),
//         left: (button.position().left + 30).px()
//     }, 2000, 'swing', function () {
//         var key = $.getQueryString({id: "l"}) == 1 ? "play.nice" : "play.pwnage";
//         instruct(key);
//         button.focus();
//         setTimeout(redirect, 6000);
//     });
// }
//
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

function DecodeURLlink(string) {
    return decodeURIComponent ? decodeURIComponent(string) : unescape(string);
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

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

window.onload = onPageLoaded;