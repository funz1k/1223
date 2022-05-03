const refs = {
    body: document.querySelector('body'),
    starBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]')
}

let timeoutID = null;

refs.stopBtn.setAttribute('disabled', 'disabled')
refs.starBtn.addEventListener('click', onStartSwitchColor);
refs.stopBtn.addEventListener('click', onStopSwitchColor);

function onStartSwitchColor(e) {
    timeoutID = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor()
    }, 1000);
    refs.starBtn.setAttribute('disabled', 'disabled')
    refs.stopBtn.removeAttribute('disabled', 'disabled')
}


function onStopSwitchColor(e) {
    clearInterval(timeoutID)
    refs.stopBtn.setAttribute('disabled', 'disabled')
    refs.starBtn.removeAttribute('disabled', 'disabled')
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
