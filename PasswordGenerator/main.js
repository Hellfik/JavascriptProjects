function generate() {
    let password = "";

    let length = document.getElementById('length').value;

    let lowerCase = document.getElementById('lowercase').checked;
    let upperCase = document.getElementById('uppercase').checked;
    let symbol = document.getElementById('symbols').checked;
    let number = document.getElementById('numbers').checked;

    //if none of the options are define (true = 1 and false = 0)
    if (lowerCase + upperCase + symbol + number <= 0) {
        return;
    }

    for (let i = 0; i < length; i++) {
        const random = generator(0, 3);
        if (lowerCase && random === 0) {
            password += generateRandomLowerCase();
        } else if (upperCase && random === 1) {
            password += generateRandomUpperCase();
        } else if (symbol && random === 2) {
            password += generateRandomSymbol();
        } else if (number && random === 3) {
            password += generator(0, 9);
        } else {
            i--;
        }
    }

    document.getElementById('result').textContent = password;
}


function generateRandomLowerCase() {
    return String.fromCharCode(generator(97, 122));
}

function generateRandomUpperCase() {
    return String.fromCharCode(generator(65, 90));
}

function generateRandomSymbol() {
    const symbols = ",.:_-$@#!?+={}()[]<>";
    return symbols[generator(0, symbols.length - 1)];
}

function generator(min = 0, max = 1) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}