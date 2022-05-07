// Imports ========================
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";
// Imports ========================

let formData = {};

const refs = {
  form: document.querySelector('.form'),
}

const createPromise = (position, delay) => {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    position += 1
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

const onCSubmitreatePromisses = (e) => {
  e.preventDefault();

  for (let i = 0; i < formData.amount; i += 1) {
    const idInterval = setInterval(() => {
      createPromise(i, formData.delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
      formData.delay += formData.step
      clearInterval(idInterval);
    }, formData.step);
  };

  // e.currentTarget.reset()
}

refs.form.addEventListener('input', onFormData)
refs.form.addEventListener('submit', onCSubmitreatePromisses)
