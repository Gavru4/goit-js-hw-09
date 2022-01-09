const btnStart = document.querySelector("button[data-start]")
const btnStop = document.querySelector("button[data-stop]")

let timerId = null;

const onBtnStartClick = btnStart.addEventListener("click", startChangeColor)

function startChangeColor() {

    timerId = setTimeout(startChangeColor, 1000);
    
    document.body.style.backgroundColor = getRandomHexColor();

     const btnDisable =  btnStart.setAttribute('disabled','disabled')
    
}

const onBtnStopClick = btnStop.addEventListener("click", stopChangeColor)
 
function stopChangeColor() {
    clearTimeout(timerId);
    const removeAttribute = btnStart.removeAttribute("disabled");
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};