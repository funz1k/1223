//imports ======================================
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";
// import convertMs from './convertMs.js'
//imports ======================================

const refs = {
    input: document.querySelector('input#datetime-picker'),
    startBtn: document.querySelector('.timer-btn')
}

let convertTime;
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
            convertTime = selectedDates[0].getTime()
            console.log(convertMs(convertTime));
        }
    },
};

flatpickr(refs.input, options);

refs.startBtn.addEventListener('click', onStartTimer);

function onStartTimer(e) {
    const startTime = Date.now()
    console.log(convertMs(startTime));
    setInterval(() => {
        const defaultTime = convertTime - startTime
        const { days, hours, minutes, seconds } = convertMs(defaultTime)
        console.log({ days, hours, minutes, seconds });
    }, 1000);
}

function pad(value) {
    return String(value).padStart(2, '0')
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
