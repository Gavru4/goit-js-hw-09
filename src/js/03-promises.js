import { Notify } from 'notiflix/build/notiflix-notify-aio';


const onFirstInput = document.querySelector('[name="delay"]')
const onDeleyInput = document.querySelector('[ name="step"]')
const onAmountInput = document.querySelector('[name="amount"]')
const onBtnSubmit = document.querySelector('.form')
onBtnSubmit.addEventListener("submit",onBtnClick)

function onBtnClick(e) {
e.preventDefault()
let delayTime = +onFirstInput.value;
let step = +onDeleyInput.value;
let amount = +onAmountInput.value;
  
  for (let i = 0; i < amount; i++){
      
  createPromise(delayTime, step)
  .then(({ position, delay }) => {
   Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
   Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    delayTime += step;
  }
}

function createPromise(position, delay) {

  const shouldResolve = Math.random() > 0.3;
  return new Promise ((resolve,reject)=>{
  if (shouldResolve) {
    resolve({position, delay})
  } else {
    reject({position, delay})
  }
  }
  )
};