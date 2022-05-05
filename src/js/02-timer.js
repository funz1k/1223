//imports ======================================
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";
// import convertMs from './convertMs.js'
//imports ======================================

const refs = {
    input: document.querySelector('input#datetime-picker'),
    startBtn: document.querySelector('.timer-btn'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
}

refs.startBtn.setAttribute('disabled', 'disabled')

let isActive = false;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < options.defaultDate) {
            Notiflix.Notify.warning('Please choose a date in the future');
            refs.startBtn.setAttribute('disabled', 'disabled')
        } else {
            refs.startBtn.removeAttribute('disabled', 'disabled')
            const convertTime = selectedDates[0].getTime()
            onStartTimer(convertTime)
        }
    },
};

flatpickr(refs.input, options);


function onStartTimer(time) {
    refs.startBtn.addEventListener('click', () => {
        if (isActive) {
            return
        }
        const intervalId = setInterval(() => {
            isActive = true;
            const startTime = Date.now();
            const defaultTime = time - startTime;
            console.log(defaultTime);
            const { days, hours, minutes, seconds } = convertMs(defaultTime);
            updateInterface({ days, hours, minutes, seconds });
            console.log(Number(seconds));
            onStopTimer(Number(seconds), intervalId)
        }, 1000);
    });
}

function onStopTimer(seconds, id) {
    if (seconds === 0) {
        clearInterval(id);
    }
}

function pad(value) {
    return String(value).padStart(2, '0')
}

function updateInterface({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}
