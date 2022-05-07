// Imports ========================
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";
// Imports ========================

let formData = {};
let position = 1;
const refs = {
  form: document.querySelector('.form'),
}

const createPromise = (position, delay) => {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    const idTimeout = setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay)
  })
}

const onFormData = (e) => {
  formData[e.target.name] = Number(e.target.value)
}

const onSubmitСreatePromisses = (e) => {
  e.preventDefault();

  for (let i = 0; i < formData.amount; i += 1) {
    const idInterval = setInterval(() => {
      createPromise(position, formData.delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
      formData.delay += formData.step
      position += 1
      clearInterval(idInterval);
    }, formData.step);
  };

  // e.currentTarget.reset()
  // position = 1
}

refs.form.addEventListener('input', onFormData)
refs.form.addEventListener('submit', onSubmitСreatePromisses)
