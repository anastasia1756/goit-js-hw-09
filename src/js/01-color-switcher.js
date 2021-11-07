const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')
}

refs.startBtn.addEventListener('click', changeColorOnClick);

function changeColorOnClick () {
    const changeColor = () => refs.body.style.backgroundColor = getRandomHexColor(); 
    const timerId = setInterval(changeColor, 1000);
    refs.startBtn.setAttribute('disabled', 'disabled');
    refs.stopBtn.removeAttribute('disabled');
    
    refs.stopBtn.addEventListener('click', () => {
        clearInterval(timerId);
        refs.startBtn.removeAttribute('disabled');
        refs.stopBtn.setAttribute('disabled', 'disabled');
    });
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }