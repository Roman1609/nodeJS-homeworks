import readline from 'readline'
import { argv } from 'process';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const argsString = process.argv.slice(2).join('&');
const args = new URLSearchParams(argsString);
const age = args.get('--pension');

if (age) {
    if (+age >= 60) {
        console.log("Ти пенсіонер");
    } else {
        console.log("Ти не пенсіонер");
    }
} else {
    rl.question('Скільки тобі років? ', (age) => {
    
        if (+age >= 60) {
            console.log("Ти пенсіонер");
        } else {
            console.log("Ти не пенсіонер");
        }
        rl.close();
    });
}


