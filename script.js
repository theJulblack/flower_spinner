const wheel       = document.getElementById('wheel');
const spinBtn     = document.getElementById('spin');
const pointer     = document.querySelector('.pointer');
const sectors     = Array.from(document.querySelectorAll('.sector'));
const sectorCount = sectors.length;
const degPer      = 360 / sectorCount;
const spinDuration = 5000;

let currentRotation = 0;
let isSpinning      = false;

const flowerImages = {
  розы: './img/розы.jpg',
  тюльпаны: './img/тюльпаны.jpg',
  пионы: './img/пионы.jpg',
  лилии: './img/лилии.jpg',
  эустомы: './img/Эустомы.jpg',
  гортензии: './img/гортензии.jpg',
  нарциссы: './img/Нарциссы.jpg',
  'с клумбы': './img/склумбы.jpg',
};

spinBtn.addEventListener('click', () => {
  if (isSpinning) return;
  isSpinning = true;
  const fullSpins = 5;
  const tickCount = fullSpins * sectorCount;
  const tickInterval = spinDuration / tickCount; 

  pointer.style.animation = `tick ${tickInterval}ms linear ${tickCount}`;  
  const randSectorIdx = Math.floor(Math.random() * sectorCount);
  const additionalDeg = randSectorIdx * degPer + degPer / 2;

  const newRotation = currentRotation + fullSpins * 360 + additionalDeg;
  wheel.style.transition = `transform ${spinDuration}ms linear`;
  wheel.style.transform  = `rotate(${newRotation}deg)`;

  wheel.addEventListener('transitionend', function handler() {
    pointer.style.animation = '';    
    const finalDeg = newRotation % 360;
    const indexUnderPointer = Math.floor(((360 - finalDeg) % 360) / degPer);
    const flower = sectors[indexUnderPointer].textContent.trim();

    const modal      = document.getElementById('modal');
    const modalText  = document.getElementById('modalText');
    const closeModal = document.getElementById('closeModal');

    const flowerImg = flowerImages[flower] || '';
    modalText.textContent = `Поздравляю! Ты подаришь мне ${flower}!`;
    document.getElementById('modalImg').src = flowerImg;    
    modal.classList.add('show');


    currentRotation = newRotation; 
    isSpinning      = false;
    wheel.removeEventListener('transitionend', handler);
  });

  closeModal.addEventListener('click', () => {
  modal.classList.remove('show');
});

});