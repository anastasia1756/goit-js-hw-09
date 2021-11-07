import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const firstDelay = Number(refs.form.elements.delay.value);
  const delayStep = Number(refs.form.elements.step.value);
  const amount = Number(refs.form.elements.amount.value);

  let delay = firstDelay;

  for (let i = 1; i <= amount; i += 1) {   
    createPromise(i, delay)
 .then(result => {
  Notify.success(`✅ ${result}`);
}).catch(error => {
  Notify.failure(`❌ ${error}`);
})
  delay += delayStep;  
  }

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Fulfilled promise ${position} in ${delay}ms`);
      }
      else {
        reject(`Rejected promise ${position} in ${delay}ms`)
      }
    }, delay);
    
    });
    }
  } 

