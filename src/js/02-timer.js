// импорт библиотеки
import flatpickr from "flatpickr";
// импорт стилей библиотеки
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';


const onDays = document.querySelector("[data-days]")
const onHours = document.querySelector("[data-hours]")
const onMinutes = document.querySelector("[data-minutes]")
const onSeconds = document.querySelector("[data-seconds]")
const onBtnStart = document.querySelector("[data-start]")


onBtnStart.setAttribute('disabled', 'disabled')
onBtnStart.style.borderRadius = "50%"
onBtnStart.style.padding = '5px'

const inputWraper = document.querySelector(".timer")
inputWraper.style.display = 'flex'


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

    onClose(selectedDates) {
       const userTime = selectedDates[0].getTime();
      if (userTime < Date.now()) {
        Notify.failure("Please choose a date in the future");
      } else {
          onBtnStart.removeAttribute('disabled')
           startCounting(userTime)
      }
  },
};
// onBtnStart.addEventListener("click", startCounting)
let intervalId = null;
function startCounting(userTime) {
  const ms = userTime - Date.now();
  
  convertMs(ms)
  
  intervalId = setInterval(() => {
      const ms = userTime - Date.now();
    let leftTime = convertMs(ms);
    updateTime(leftTime)
    if (ms <= 1000) return clearInterval(intervalId)
    }, 1000)
};



  
 function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };   
}
function addLeadingZero(value) {
  return value.toString().padStart(2,'0')
} 
 
 function updateTime({ days, hours, minutes, seconds }) {
       onDays.innerHTML= addLeadingZero(days);
       onHours.innerHTML =addLeadingZero(hours); 
       onMinutes.innerHTML =addLeadingZero(minutes); 
       onSeconds.innerHTML =addLeadingZero(seconds); 
    }


// инициализирую библиотеку по id
flatpickr("#datetime-picker",options);

