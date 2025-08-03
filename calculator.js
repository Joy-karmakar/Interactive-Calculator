let display = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let buttonArray = Array.from(buttons);
let string = '';


const clickSound = new Audio("click.mp3");


buttonArray.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleInput(e.target.innerHTML);
        playSoundAndAnimate(btn);
    });
});


document.addEventListener("keydown", (event) => {
    const key = event.key;
    const allowedKeys = ["0","1","2","3","4","5","6","7","8","9",".","+","-","*","/","%"];

    let matchedBtn = [...buttons].find(b => 
        b.innerHTML === key || 
        (key === "Enter" && b.innerHTML === "=") || 
        (key === "Backspace" && b.innerHTML === "DEL") || 
        (key.toLowerCase() === "c" && b.innerHTML === "AC")
    );

    if (matchedBtn) {
        playSoundAndAnimate(matchedBtn);
    }

    if (allowedKeys.includes(key)) {
        string += key;
    } else if (key === "Backspace") {
        string = string.slice(0, -1);
    } else if (key === "Enter" || key === "=") {
        try {
            string = string.replace(/%/g, "/100");
            string = eval(string).toString();
        } catch {
            string = "Error";
        }
    } else if (key.toLowerCase() === "c") {
        string = '';
    } else if (key === "ArrowLeft") {
        display.scrollLeft -= 20; 
    } else if (key === "ArrowRight") {
        display.scrollLeft += 20; 
    }

    display.value = string;
    display.scrollLeft = display.scrollWidth;
});


function playSoundAndAnimate(btn) {
    clickSound.currentTime = 0;
    clickSound.play().catch(err => {
        console.log("Audio play blocked:", err);
    });

    btn.classList.add('button-animate');
    setTimeout(() => {
        btn.classList.remove('button-animate');
    }, 100);
}


function handleInput(value) {
    if (value === 'DEL') {
        string = string.slice(0, -1);
    } else if (value === 'AC') {
        string = '';
    } else if (value === '=') {
        try {
            string = string.replace(/%/g, '/100');
            string = eval(string).toString();
        } catch {
            string = "Error";
        }
    } else {
        string += value;
    }

    display.value = string;
    display.scrollLeft = display.scrollWidth;
}