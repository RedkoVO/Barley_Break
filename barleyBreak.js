var startBtn = document.querySelector(".start-btn")
var blocks = document.getElementsByClassName("block");
var items = document.getElementsByClassName("item");
var playArea = document.querySelector(".play-area");
var win = document.querySelector(".win");
var blocksArr = [];
var itemsArr = [];

// Добавляем элементы в массивы blocksArr и itemsArr
function objToArr(obj, arr) {
    for (var data in obj) {
        if (!obj.hasOwnProperty(data)) continue
        arr.push(obj[data]);
    }
}

// Перемешиваем элементы в массиве
function mix(arr) {
    arr.sort(function() {
        return 0.5 - Math.random();
    });

    for (var i = 0; i < blocksArr.length; i++) {
        itemsArr[i].appendChild(blocksArr[i]);;
    }

    for (var data in itemsArr) {
        playArea.appendChild(itemsArr[data]);
    }
}

// Начинаем игру
startBtn.addEventListener("click", function(event) {
    event.preventDefault();
    mix(blocksArr);
});

// Добавляем в массивы данные
objToArr(items, itemsArr);
objToArr(blocks, blocksArr);

// Получаем номер блока
function getIndex(elem, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (elem == arr[i]) {
            return i;
        }
    }
    return;
}

// Проверяем на победу
function check(arrItems) {
    var flag = true;
    for (var i = 1; i < arrItems.length; i++) {
        if (!arrItems[i].children[0]) continue;
        if (i + 1 != arrItems[i].children[0].textContent) {
            flag = false;
            break;
        }
    }

    if (flag) {
        win.classList.add("show");
    } else {
        win.classList.remove("show");
    }
}

// Событие на нажатие элемента
playArea.addEventListener("click", function(event) {
    event.preventDefault();
    var target = event.target;
    var stroke = [-1, 1, -4, 4];

    if (target.classList.contains("block")) {
        var cell = target.parentNode;
        var ind = getIndex(cell, itemsArr);

        if (!((ind + 1) % 4)) {
            stroke = [-1, 4, -4];
        } else if (!((ind) % 4)) {
            stroke = [1, 4, -4];
        } else {
            stroke = [-1, 1, -4, 4];
        }

        var start = 0;
        var end = 15;
        for (var i = 0; i < stroke.length; i++) {
            var coord = ind + stroke[i]; // Возможная ячейка

            if (coord >= start && coord <= end) { // проверка 0 - 15
                if (!itemsArr[coord].children[0]) {
                    itemsArr[coord].appendChild(itemsArr[ind].children[0]);
                    check(itemsArr);
                }
            }
        }
    }
});
