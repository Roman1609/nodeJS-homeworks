import express from 'express';
import Time from './time.mjs';
import path from 'path';
import { request } from 'http';

const app = express()
const port = 3000

// Задача 1. Розробити додаток з такими маршрутами:
/*
/season - пора року
/day - день
/time - час
*/

app.get('/season', (req, res) => {
    const newSeason = Time.getSeason();
    res.send(newSeason);
});
app.get('/day', (req, res) => {
    const day = Time.getDay();
    res.send(day);
});
app.get('/time', (req, res) => {
    const time = Time.getTime();
    res.send(time);
});

//============ Задача 2 ===========
/*
Задача 2. Розробити серверну частину додатку, 
який за відповідними маршрутами (“/”, “/coffee”, “/music”) 
повертає створені HTML документи.
*/

const __dirname = path.resolve();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "homework-2-task", "index.html"))
});
app.get('/coff+ee', (req, res) => {
    res.sendFile(path.join(__dirname, "homework-2-task", "coffee.html"))
});
app.get('/musie?c', (req, res) => {
    res.sendFile(path.join(__dirname, "homework-2-task", "music.html"))
});


// ====== Задача №3 ==================
/*
Задача 3. Розробити програму з такими функціональними можливостями:
обробка статичних маршрутів:
Вітання користувача
Ваші цілі

обробка статичних файлів:
містить тему та умову задачі
містить перелік важливі новини (для Вас)

обробка параметрів запитів:
у залежності від значення параметра повертає сторінку з :
«sites» -  адресами улюблених сайтів
«films» -  адреси улюблених онлайн кінотеатрі
«me» - або інформацію про себе
*/

app.use(express.static(path.join(__dirname, "homework-3-task")));

app.get('/greeting', (req, res) => {
    res.send('<h1>Hello User</h1>');
});
app.get('/goals', (req, res) => {
    res.send('<h1>My goals: 1 goal; 2 goal; 3 goal</h1>');
});
app.get('/tasks', (req, res) => {
    res.sendFile(path.join(__dirname, "homework-3-task", "tasks.html"))
})
app.get('/news', (req, res) => {
    res.sendFile(path.join(__dirname, "homework-3-task", "news.html"))
})
app.get('/:pageTheme', (req, res) => {
    let pageTheme = req.params["pageTheme"];
    res.sendFile(path.join(__dirname, "homework-3-task", `${pageTheme}.html`))
})


app.listen(3000)