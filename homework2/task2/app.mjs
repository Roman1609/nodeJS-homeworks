import { createServer } from 'node:http';
import { writeFile, appendFile, readFile, unlink } from 'fs/promises';

// Створюємо сервер
const server = createServer(async (req, res) => {
    // Функція для створення файлу
    async function createFileTxt(fileName, content) {
        try {
            await writeFile(fileName, content, 'utf-8');
        } catch (err) {
            console.log('Помилка при створенні файлу:', err);
        }
    }

    // Функція для запису у файл
    async function appendToFile(file, content) {
        try {
            await appendFile(file, content + '\n');
        } catch (err) {
            console.log('Помилка при записі у файл:', err);
        }
    }

    // Функція для читання з файлу
    async function readFromFile(file) {
        try {
            return await readFile(file, 'utf-8');
        } catch (err) {
            console.log('Помилка при читанні файлу:', err);
            return '';
        }
    }

    // Функція для видалення файлу
    async function deleteFile(file) {
        try {
            await unlink(file);
        } catch (err) {
            console.log('Помилка при видаленні файлу:', err);
        }
    }

    // Перевіряємо, чи існує файл, якщо ні, створюємо його
    try {
        await readFile('numbers.txt');
    } catch {
        await createFileTxt('numbers.txt', '');
    }

    // Отримуємо шлях після "/"
    const filePath = req.url.slice(1).split('/');
    const command = filePath[0];
    const num = filePath[1];

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    if (command === 'favicon.ico') {
        res.writeHead(204, { 'Content-Type': 'image/x-icon' });
        res.end();
        return;
    }

    if (command === 'save_num' && num && !isNaN(num)) {
        // Додаємо число до файлу
        await appendToFile('numbers.txt', num);
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`Додано: ${num}`);
    } else if (command === 'sum') {
        const fileContent = await readFromFile('numbers.txt');
        const sum = fileContent
            .split('\n')
            .filter(num => num !== '') // Фільтруємо порожні рядки
            .map(Number)                // Конвертуємо у числа
            .reduce((acc, num) => acc + num, 0); // Підраховуємо суму

        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`Сума: ${sum}`);
    } else if (command === 'mult') {
        const fileContent = await readFromFile('numbers.txt');
        const product = fileContent
            .split('\n')
            .filter(num => num !== '') // Фільтруємо порожні рядки
            .map(Number)                // Конвертуємо у числа
            .reduce((acc, num) => acc * num, 1); // Підраховуємо добуток

        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`Добуток: ${product}`);
    } else if (command === 'remove') {
        await deleteFile('numbers.txt');
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Файл numbers.txt видалено.');
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Некоректна команда або параметри.');
    }
});

// Запускаємо сервер
server.listen(3000, '127.0.0.1', () => {
    console.log('Сервер запущено на http://127.0.0.1:3000');
});
