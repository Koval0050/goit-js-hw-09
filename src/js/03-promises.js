const refs = {
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', createPromiseOnSubmit);

function createPromiseOnSubmit(e) {
  e.preventDefault();
  const amount = parseInt(refs.inputAmount.value, 10);
  const startDelay = parseInt(refs.inputDelay.value, 10);
  const stepDelay = parseInt(refs.inputStep.value, 10);
  let currentDelay = startDelay;

  for (let i = 1; i <= amount; i++) {
    createPromise(i, currentDelay);
    currentDelay += stepDelay;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
