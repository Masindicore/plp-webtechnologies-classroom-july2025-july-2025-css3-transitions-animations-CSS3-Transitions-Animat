let heartCount = 0; // Global scope: tracks total hearts
let activeHearts = 0; // Global scope: tracks currently active hearts

// Function: Create & animate a single heart (param: position)
function createHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '❤️';
  heart.style.left = x + 'px';
  heart.style.top = y + 'px';
  
  // Add random size and color variation
  const size = 20 + Math.random() * 30;
  heart.style.fontSize = size + 'px';
  
  const colorVariation = Math.floor(Math.random() * 50);
  heart.style.color = `rgb(231, ${76 - colorVariation}, ${60 - colorVariation})`;
  
  document.getElementById('love-container').appendChild(heart);

  // Update active hearts count
  activeHearts++;
  document.getElementById('active-hearts').textContent = `Active Hearts: ${activeHearts}`;

  // Remove after animation ends to prevent memory leak
  setTimeout(() => {
    heart.remove();
    activeHearts--;
    document.getElementById('active-hearts').textContent = `Active Hearts: ${activeHearts}`;
  }, 3000);

  heartCount++; // Update global counter
  document.getElementById('hearts-created').textContent = `Hearts Created: ${heartCount}`;
  
  return heartCount; // Return current count (demonstrates return value)
}

// Function: Generate random position between 0 and container width
function getRandomPosition(max) {
  return Math.floor(Math.random() * max); // Local scope only
}

// Function: Trigger love burst (reusable logic)
function burstLove(count = 5) {
  const container = document.getElementById('love-container');
  const width = container.offsetWidth;

  // Create hearts at once
  for (let i = 0; i < count; i++) {
    const x = getRandomPosition(width - 40);
    const y = container.offsetHeight - 50; // Start from bottom
    createHeart(x, y);
  }

  return `💖 ${heartCount} hearts flown so far!`; // Returns status message
}

// JS triggers CSS animations on click
document.getElementById('love-btn').addEventListener('click', () => {
  const message = burstLove(5);
  const joy = document.createElement('div');
  joy.textContent = message;
  joy.style.position = 'absolute';
  joy.style.top = '20px';
  joy.style.left = '50%';
  joy.style.transform = 'translateX(-50%)';
  joy.style.background = 'rgba(255, 255, 255, 0.8)';
  joy.style.padding = '10px 20px';
  joy.style.borderRadius = '20px';
  joy.style.zIndex = '100';
  document.body.appendChild(joy);
  
  setTimeout(() => {
    joy.remove();
  }, 2000);
});

// Generate many hearts
document.getElementById('generate-many').addEventListener('click', () => {
  burstLove(15);
});

// Bonus: Click anywhere on container to spawn a heart
document.getElementById('love-container').addEventListener('click', (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  createHeart(x, y);
});

// Initialize with some hearts
setTimeout(() => {
  burstLove(3);
}, 500);
