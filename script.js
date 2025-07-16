// script.js - extracted from original HTML

window.addEventListener('load', function() {
  setTimeout(() => {
    document.querySelector('.loading').style.display = 'none';
  }, 2000);
});

window.addEventListener('scroll', function() {
  const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  document.querySelector('.scroll-indicator').style.width = scrolled + '%';

  const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
  const hue = Math.floor(scrollPercent * 60) + 200;
  document.body.style.background = `linear-gradient(135deg, hsl(${hue}, 30%, 95%) 0%, hsl(${hue + 20}, 40%, 90%) 100%)`;

  const parallax = document.querySelector('.bg-animation');
  const speed = window.pageYOffset * 0.5;
  parallax.style.transform = `translateY(${speed}px)`;
});

function navigateTo(page) {
  const overlay = document.querySelector('.page-transition');
  overlay.classList.add('active');

  setTimeout(() => {
    document.getElementById('home-content').style.display = 'none';
    document.getElementById('matches-content').style.display = 'none';
    document.getElementById('stats-content').style.display = 'none';

    document.getElementById(page + '-content').style.display = 'block';

    overlay.classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 500);
}

function openModal(img) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  modal.classList.add('active');
  modalImg.src = img.src;
}

function closeModal() {
  document.getElementById('imageModal').classList.remove('active');
}

window.onclick = function(event) {
  const modal = document.getElementById('imageModal');
  if (event.target === modal) {
    closeModal();
  }
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
    }
  });
}, observerOptions);

document.querySelectorAll('#gallery img').forEach(img => {
  observer.observe(img);
});

document.querySelectorAll('nav a, #gallery img').forEach(element => {
  element.addEventListener('mouseenter', function() {
    this.style.transform = this.style.transform || '';
    this.style.transition = 'all 0.3s ease';
  });
});
