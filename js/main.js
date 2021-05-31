const modalWindow = {
    _block: null,
    _win: null,
    initBlock: function(callback) {
        // Получаем наш блокирующий фон по ID
        // Если он не определен, то создадим его
        _block = document.getElementById('blockscreen');

        if (!_block) {
            var parent = document.getElementsByTagName('body')[0]; // Первый элемент тега body
            var obj = parent.firstChild; // Чтобы вставить наш блокирующий фон в самое начало тега body
            _block = document.createElement('div'); // Создаем элемент div
            _block.id = 'blockscreen'; // Присваиваем ему наш ID
            parent.insertBefore(_block, obj); // Вставляем в начало
            _block.onclick = function() { modalWindow.close(); } // Добавим обработчик события по нажатию на блокирующий экран - закрыть модальное окно.
        }

        _block.style.opacity = "0";
        _block.style.display = 'inline';
        _block.classList.add("trans3e");

        setTimeout(() => {
            _block.style.opacity = "1";
            if (callback){
                callback();
            }
        }, 300);
    },
    initWin: function(width, html, callback) {
        // Получаем наше диалоговое окно по ID
        // Если оно не определено, то также создадим его по аналогии
        _win = document.getElementById('modalwindow');

        if (!_win) {
            var parent = document.getElementsByTagName('body')[0];
            var obj = parent.firstChild;
            _win = document.createElement('div');
            _win.id = 'modalwindow';
            _win.style.padding = '0 0 5px 0';
            parent.insertBefore(_win, obj);
        }

        _win.style.width = width + 'px'; // Установим ширину окна        
        _win.innerHTML = html; // Добавим нужный HTML-текст в наше диалоговое окно
        
        // Установим позицию по центру экрана
        _win.style.left = '50%'; // Позиция по горизонтали
        _win.style.top = '50%'; // Позиция по вертикали

        // Выравнивание по центру путем задания отрицательных отступов
        _win.style.marginTop = -(_win.offsetHeight / 2) + 'px'; 
        _win.style.marginLeft = -(width / 2) + 'px';
        _win.style.opacity = "0";
        _win.style.display = 'inline';
        _win.classList.add("trans3e");
        _win.style.transitionProperty = "opacity";
        _win.style.opacity = "1";
        
        if (callback) {
            callback();
        }
    },
    close: function() {
        document.getElementById('blockscreen').style.opacity = "0";
        document.getElementById('modalwindow').style.opacity = "0";
        setTimeout(() => {
            document.getElementById('blockscreen').style.display = "none";
            document.getElementById('modalwindow').style.display = "none";
        }, 300);
    },
    show: function(width, html, callback) {
        modalWindow.initBlock(() => {
            modalWindow.initWin(width, html, callback);
        });
    },
    newDialogue: function(header, content, onAllow, onDeny) {
        if (onAllow && onDeny) {
            modalWindow.show(500, `
            <p class="modalHeader">${header}</p>
            <div class="modalContent">
                <p>${content}</p>
                <a id="mbtn_allow" class="modalButton">Лады</a>
                <a id="mbtn_deny" class="modalButton MBRed"">Нее</a>
            </div>`,
            () => {
                document.getElementById("mbtn_allow").addEventListener('click', onAllow);
                document.getElementById("mbtn_deny").addEventListener('click', onDeny);
            });
        } else {
            throw new Error("onAllow or onDeny callback not provided.");
        }
    }
}



setTimeout(() => {
    modalWindow.newDialogue("Вопрос:", "Хотите запустить чилл музяку? А? М?", 
    () => {
        document.getElementById("aplayer").play();
        modalWindow.close();
    }, 
    () => {
        document.getElementById("aplayer").pause();
        modalWindow.close();
    });
}, 500);
