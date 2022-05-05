//imports ======================================
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";
import convertMs from './convertMs.js'
//imports ======================================

const refs = {
    input: document.querySelector('input#datetime-picker'),
    startBtn: document.querySelector('.timer-btn'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
}

let isActive = false;
refs.startBtn.setAttribute('disabled', 'disabled')

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
            const { days, hours, minutes, seconds } = convertMs(defaultTime);
            updateInterface({ days, hours, minutes, seconds });
            onStopTimer(Number(seconds), intervalId)
        }, 1000);
    });
}

function onStopTimer(seconds, id) {
    if (seconds === 0) {
        clearInterval(id);
    }
}

function updateInterface({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}

