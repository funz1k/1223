import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import convertMs from './convertMs.js'
const refs = {
    input: document.querySelector('input#datetime-picker'),
    startBtn: document.querySelector('.timer-btn')
}

refs.startBtn.setAttribute('disabled', 'disabled')

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= options.defaultDate) {
            alert('Please choose a date in the future')
        }
        refs.startBtn.removeAttribute('disabled', 'disabled')
    },
};

flatpickr(refs.input, options);

