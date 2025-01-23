const scratchCard = document.querySelector('.scratch-card');
const numberGrid = document.querySelector('.number-grid');
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');

// Dynamiskt sätta canvasens dimensioner
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Fyll canvasen med grå färg
ctx.fillStyle = '#00a2ff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Generera siffror
function generateRiggedNumbers() {
  const possibleValues = [100, 200, 500, 1000, 5000, 10000, 50000];
  const numbers = [];
  const count = {};

  // Initiera räkning för varje värde
  possibleValues.forEach((value) => (count[value] = 0));

  // Fyll griden med max 2 av varje nummer
  while (numbers.length < 9) {
    const randomValue = possibleValues[Math.floor(Math.random() * possibleValues.length)];
    if (count[randomValue] < 2) {
      numbers.push(randomValue);
      count[randomValue]++;
    }
  }

  return numbers;
}

// Visa siffror i griden
function populateGrid(numbers) {
  numberGrid.innerHTML = ''; // Töm gridden först

  numbers.forEach((number) => {
    const cell = document.createElement('div');
    cell.textContent = number; // Lägg till numret som text
    numberGrid.appendChild(cell); // Lägg till cellen i numberGrid
  });
}


// Generera och visa siffror
const riggedNumbers = generateRiggedNumbers();
populateGrid(riggedNumbers);

// Skrapningslogik
let isScratching = false;

canvas.addEventListener('mousedown', () => {
  isScratching = true;
});

canvas.addEventListener('mouseup', () => {
  isScratching = false;
});

canvas.addEventListener('mousemove', (e) => {
  if (!isScratching) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Gör området transparent
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
});

// Kontrollera om tillräckligt mycket har skrapats
function checkCompletion() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let transparentPixels = 0;

  for (let i = 0; i < imageData.data.length; i += 4) {
    if (imageData.data[i + 3] === 0) transparentPixels++;
  }

  if (transparentPixels > imageData.data.length / 4) {
    canvas.remove();
  }
}

canvas.addEventListener('mousemove', checkCompletion);
