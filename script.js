const btn = document.querySelector(".generate");
const inputOne = document.querySelector(".color-value-one");
const inputTwo = document.querySelector(".color-value-two");
const bg = document.querySelector(".bg");
const select = document.querySelector(".select-type");
const decOne = document.querySelector(".dec-one");
const decTwo = document.querySelector(".dec-two");
const colorTwoDiv = document.querySelector(".color-two");
const tostDiv = document.querySelector(".tost");
let type = 1;
const hexArr = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
];
function generateColor() {
    let randomColor = "";
    for (let i = 0; i < 6; i++) {
        let val = hexArr[Math.floor(Math.random() * 16)];
        randomColor += val;
    }
    return randomColor;
}
function generateGradient() {
    let colorOne = generateColor();
    let colorTwo = generateColor();
    bg.style.background = `linear-gradient(45deg, #${colorOne}, #${colorTwo})`;
    colorTwoDiv.style.display = "flex";
    inputOne.innerHTML = `#${colorOne}`;
    inputTwo.innerHTML = `#${colorTwo}`;
    colorOne = hexToRgba(colorOne);
    colorTwo = hexToRgba(colorTwo);
    decOne.innerHTML = colorOne;
    decTwo.innerHTML = colorTwo;
}
let intervel;
window.addEventListener("load", () => {
    generateGradient();
    const clickable = document.querySelectorAll(".clickable");
    clickable.forEach((element) => {
        element.addEventListener("click", () => {
            clearTimeout(intervel);
            copyColor(element);
            tostDiv.dataset.tost = 1;
            intervel = setTimeout(() => {
                tostDiv.dataset.tost = 0;
            }, 2000);
        });
    });
});
select.addEventListener("change", (e) => {
    type = e.target.value;
});
btn.addEventListener("click", () => {
    if (type == 1) {
        generateGradient();
    } else {
        colorTwoDiv.style.display = "none";
        let color = generateColor();
        bg.style.background = `#${color}`;
        inputOne.innerHTML = `#${color}`;
        color = hexToRgba(color);
        decOne.innerHTML = color;
    }
});
let hexChar = [];
function hexToDec(value) {
    if (value == "0") return 0;
    else if (value == "1") return 1;
    else if (value == "2") return 2;
    else if (value == "3") return 3;
    else if (value == "4") return 4;
    else if (value == "5") return 5;
    else if (value == "6") return 6;
    else if (value == "7") return 7;
    else if (value == "8") return 8;
    else if (value == "9") return 9;
    else if (value == "a") return 10;
    else if (value == "b") return 11;
    else if (value == "c") return 12;
    else if (value == "d") return 13;
    else if (value == "e") return 14;
    else if (value == "f") return 15;
}

function hexToRgba(hexvalue) {
    let resultOne = hexvalue.match(/\b[0-9A-F]{6}\b/gi);
    let resultTwo = hexvalue.match(/\b[0-9A-F]{8}\b/gi);
    if (resultOne || resultTwo) {
        hexChar = hexvalue.split("");
        const redValue = hexToDec(hexChar[0]) * 16 + hexToDec(hexChar[1]);
        const greenValue = hexToDec(hexChar[2]) * 16 + hexToDec(hexChar[3]);
        const blueValue = hexToDec(hexChar[4]) * 16 + hexToDec(hexChar[5]);
        let opacity = 1;
        if (hexChar.length == 8) {
            opacity = (hexToDec(hexChar[6]) * 16 + hexToDec(hexChar[7])) / 256;
        }
        return `rgb(${redValue}, ${greenValue}, ${blueValue})`;
    } else {
        console.log("write a proper value");
    }
}

function copyColor(element) {
    const copyText = element;
    const tempValue = copyText.innerHTML;
    const tempInput = document.createElement("input");
    tempInput.value = tempValue;
    tempInput.classList.add("temp-input");
    document.body.appendChild(tempInput);
    tempInput.style.display = "none";
    const tempNode = document.querySelector(".temp-input");
    tempNode.select();
    tempNode.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(tempNode.value);
    tempNode.remove();
}
