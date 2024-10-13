// server.mjs
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Читання налаштувань
async function readSettings() {
    const settingsPath = path.join(process.cwd(), 'settings.json');
    const data = await readFile(settingsPath, 'utf8');
    return JSON.parse(data);
}

// Зберігання історії
async function saveHistory(history) {
    const historyPath = path.join(process.cwd(), 'history.json');
    await writeFile(historyPath, JSON.stringify(history, null, 2));
}

// Читання історії
async function readHistory() {
    const historyPath = path.join(process.cwd(), 'history.json');
    const data = await readFile(historyPath, 'utf8');
    return JSON.parse(data);
}

// Створення сервера
const server = createServer(async (req, res) => {
    const settings = await readSettings();
    const { historyRoute, historyFile } = settings;

    if (req.url === '/favicon.ico') {
        res.writeHead(204); // No Content
        res.end();
        return;
    }

    // Отримуємо URL запиту
    const urlPath = req.url || '';
    
    // Обробка запиту на роути
    if (urlPath !== historyRoute) {
        // Зчитуємо історію
        const history = await readHistory();

        // Якщо рут не існує, створюємо його
        if (!history[urlPath]) {
            history[urlPath] = 0;
        }
        // Збільшуємо кількість відвідувань
        history[urlPath]++;

        // Зберігаємо оновлену історію
        await saveHistory(history);

        // Відповідаємо
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`You visited ${urlPath} (${history[urlPath]} times)`);
    } else {
        // Повертаємо історію
        const history = await readHistory();
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(history, null, 2));
    }
});

// Запуск сервера на порту 3000
server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});
