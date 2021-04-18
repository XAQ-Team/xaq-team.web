function random() {
    const el = document.getElementById('form');
    const min = Number(el.from.value);
    const max = Number(el.before.value);
    console.log(min);
    console.log(max);
    console.log(min > max);
    if (min < 0) {
        document.getElementById('h2').innerHTML = "Число ОТ не может быть меньше 0";
    } else if (min > max) {
        document.getElementById('h2').innerHTML = "Число ОТ не может быть больше";
    } else {
        const number = Math.floor(Math.random() * (max - min + 1)) + min;
        document.getElementById('h2').innerHTML = "Рандом число: " + number;
    }
}