const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

let isLightTheme = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
    this.color = getColor();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function getColor() {
  return isLightTheme ? 'rgba(50, 50, 50, 0.7)' : 'rgba(255, 255, 255, 0.7)';
}

function getLineColor() {
  return isLightTheme ? 'rgba(50, 50, 50, 0.2)' : 'rgba(255, 255, 255, 0.1)';
}

function createParticles() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}

function drawConnections() {
  ctx.strokeStyle = getLineColor();
  ctx.lineWidth = 1;

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  drawConnections();
  requestAnimationFrame(animate);
}

function toggleTheme() {
  isLightTheme = !isLightTheme;
  document.body.classList.toggle('light-theme', isLightTheme);

  const icon = document.getElementById('themeIcon');
  const text = document.getElementById('themeText');

  if (icon) icon.textContent = isLightTheme ? '☀️' : '🌙';
  if (text) text.textContent = isLightTheme ? 'Light' : 'Dark';

  particles.forEach(p => p.color = getColor());
}

// Eventos
window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});

document.addEventListener('DOMContentLoaded', () => {
  resizeCanvas();
  createParticles();
  animate();

  const themeButton = document.getElementById('toggleTheme');
  if (themeButton) {
    themeButton.addEventListener('click', toggleTheme);
  }

  // Intro fade
  const intro = document.getElementById('intro');
  const container = document.getElementById('container');

  setTimeout(() => {
    intro.classList.add('fade-out');
    setTimeout(() => {
      intro.style.display = 'none';
      container.classList.remove('hidden');
    }, 1000);
  }, 2000);
});
