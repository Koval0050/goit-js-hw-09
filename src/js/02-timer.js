import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  datetime: document.querySelector('#datetime-picker'),
  btn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {},
};

const fp = flatpickr(refs.datetime, options);

let timer = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function changeTimer() {
  const selectedDates = fp.selectedDates;

  if (selectedDates.length > 0) {
    const currentDate = new Date();
    const diff = selectedDates[0] - currentDate;
    timer = convertMs(diff);
    console.log(timer);
  }

  setInterval(() => {
    const currentDate = new Date();
    const diff = selectedDates[0] - currentDate;
    timer = convertMs(diff);
    addLeadingZero(timer);
  }, 1000);
}

refs.btn.addEventListener('click', changeTimer);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  refs.days.textContent = String(days);
  refs.hours.textContent = String(hours).padStart(2, 0);
  refs.minutes.textContent = String(minutes).padStart(2, 0);
  refs.seconds.textContent = String(seconds).padStart(2, 0);
}
