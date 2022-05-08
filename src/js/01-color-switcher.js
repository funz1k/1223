const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]')
}

let timeoutID = null;

refs.stopBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartSwitchColor);
refs.stopBtn.addEventListener('click', onStopSwitchColor);

function onStartSwitchColor(e) {
    timeoutID = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor()
    }, 1000);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
}


function onStopSwitchColor(e) {
    clearInterval(timeoutID)
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
