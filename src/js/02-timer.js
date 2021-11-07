import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('button[data-start]'),
    field: document.querySelector('.field'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
}

const DELAY = 1000;
let timeSelected;

refs.btnStart.setAttribute('disabled', 'disabled');

flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timeSelected = selectedDates[0];
   if(timeSelected.getTime() < this.config.defaultDate.getTime()) {
    Notify.warning("Please choose a date in the future");
  } else {
    refs.btnStart.removeAttribute('disabled');
    refs.btnStart.addEventListener('click', onBtnClick);
    function onBtnClick () {
    const timer = {
      intervalId: null,

      start() {
      const startTime = timeSelected.getTime();
         
      refs.input.setAttribute('disabled', 'disabled');

      this.intervalId = setInterval(() =>  { 
        if (timeSelected <= new Date()) {
          clearInterval(intervalId);
          refs.btnStart.setAttribute('disabled', 'disabled');
          return;
        }

      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      
      refs.days.textContent = days;
      refs.hours.textContent = hours;
      refs.minutes.textContent = minutes;
      refs.seconds.textContent = seconds;


      
      }, DELAY);
        },
          };
              
      timer.start();
      }
        }
     
    },
  });

function updateCountDown({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}
  function padStart(value) {
    return String(value).padStart(2, '0');
  }

    function convertMs(ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
    
      // Remaining days
      const days = padStart(Math.floor(ms / day));
      // Remaining hours
      const hours = padStart(Math.floor((ms % day) / hour));
      // Remaining minutes
      const minutes = padStart(Math.floor(((ms % day) % hour) / minute));
      // Remaining seconds
      const seconds = padStart(Math.floor((((ms % day) % hour) % minute) / second));
    
      return { days, hours, minutes, seconds };
    }




