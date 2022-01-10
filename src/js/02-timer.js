// импорт библиотеки
import flatpickr from "flatpickr";
// импорт стилей библиотеки
import "flatpickr/dist/flatpickr.min.css";

const onDays = document.querySelector("[data-days]")
const onHours = document.querySelector("[data-hours]")
const onMinutes = document.querySelector("[data-minutes]")
const onSeconds = document.querySelector("[data-seconds]")
const onBtnStart = document.querySelector("[data-start]")
onBtnStart.setAttribute('disabled', 'disabled')


 

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
       const userTime = selectedDates[0].getTime();
      if (userTime < Date.now()) {
          alert("Please choose a date in the future");
      } else {
          onBtnStart.removeAttribute('disabled')
           startCounting(userTime)
      }
  },
};
// onBtnStart.addEventListener("click", startCounting)
function startCounting(userTime) {
    const ms = userTime - Date.now();
    convertMs(ms)
    setInterval(() => {
        const ms = userTime - Date.now();

        let leftTime = convertMs(ms);
        let a  =  updateTime(leftTime)
      addLeadingZero(a)
       
    }, 1000)
}

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
function addLeadingZero({ days, hours, minutes, seconds}) {
    days.padStart(2, '0');
    hours.padStart(2, '0');
    minutes.padStart(2, '0');
    seconds.padStart(2, '0');
   
 } 
 function updateTime({ days, hours, minutes, seconds }) {
       onDays.innerHTML= days;
       onHours.innerHTML = hours;
       onMinutes.innerHTML = minutes;
       onSeconds.innerHTML = seconds;
    }


// инициализирую библиотеку по id
flatpickr("#datetime-picker",options);

