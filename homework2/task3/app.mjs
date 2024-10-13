// server.mjs
import { createServer } from 'node:http';


const server = createServer((req, res) => {
    try {
        const urlPath = req.url.slice(1);
        const urlPathArr = urlPath.split('/');
        const operation = urlPathArr[0];
        const numbers = urlPathArr[1] ? urlPathArr[1].split('-').map(Number): [];

        function add(numbers) {
            const sum = numbers.reduce((acc, num) => acc + num, 0);
            return sum;
        }
        function substract(numbers) {
            if (numbers.length > 0) {
                // Задаємо перше число як стартове
                let result = numbers[0];
                // Віднімемо всі інші числа
                for (let i = 1; i < numbers.length; i++) {
                    result -= numbers[i];
                }
                return result;
            }
            return 0;
        }
        function multiply(numbers) {
            return numbers.reduce((acc, num) => acc * num, 1);
        }

        if (operation === 'add') {
            const sum = add(numbers);
            console.log(numbers);
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(`Your sum is = ${sum}`);
        } else if (operation === 'substract') {
            const subsResult = substract(numbers);
            console.log(numbers);
            console.log(subsResult);
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(`Your result is = ${subsResult}`);
        } else if (operation === 'multiply') {
            const multResult = multiply(numbers);
            console.log(numbers);
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(`Your multiply is = ${multResult}`);
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Internal Server Error');
    }
    

});
// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});
// run with `node server.mjs`