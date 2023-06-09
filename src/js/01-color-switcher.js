const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let timerId;

refs.start.addEventListener('click', changeBodyColor);
refs.stop.addEventListener('click', () => {
  clearInterval(timerId);
    console.log('change color stop');
      refs.start.disabled = false;

});

function changeBodyColor() {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  console.log('change color start');
  refs.start.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
