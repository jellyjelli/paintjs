// 변수들 선언
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

// 함수
function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

// 그리기 기능
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        //console.log("creating path in ", x, y);
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        //console.log("creating line in ", x, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

// 색 변경 기능
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

// 굵기 변경 기능
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

// Fill/Paint 모드 변경 기능
function handleModeClick() {
    if(filling == true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

// 우클릭 기능을 사용하지 못 하도록 막는 기능
function handleCM(event) {
    event.preventDefault();
}


// Save 기능
function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    //console.log(link);
    link.click();
}


// Events
// canvas event 정의
if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

// color change event 정의
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))


// range change event 정의
if(range) {
    range.addEventListener("input", handleRangeChange)
}

// Fill/Paint Mode event 정의
if(mode) {
    mode.addEventListener("click", handleModeClick);
}

// Save event 정의
if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

