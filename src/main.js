import './style.css'
import { createIcons, icons } from 'lucide';

// Initialize Lucide icons
createIcons({
  icons
});

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');
const html = document.documentElement;

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const currentTheme = savedTheme || systemTheme;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  if (theme === 'dark') {
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
  } else {
    moonIcon.style.display = 'block';
    sunIcon.style.display = 'none';
  }
}

setTheme(currentTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Feature Tabs Logic
const tabs = document.querySelectorAll('.feature-tab');
const previewImg = document.getElementById('feature-preview-img');
const previewVideo = document.getElementById('feature-preview-video');
let slideshowInterval;

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Clear any existing slideshow
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      slideshowInterval = null;
    }

    // Remove active class from all tabs
    tabs.forEach(t => t.classList.remove('active'));

    // Add active class to clicked tab
    tab.classList.add('active');

    // Check for video
    const videoSrc = tab.getAttribute('data-video');
    const imagesData = tab.getAttribute('data-images');
    const imageSrc = tab.getAttribute('data-image');

    // Helper to fade out current content
    const fadeOut = () => {
      previewImg.style.opacity = '0';
      previewVideo.style.opacity = '0';
    };

    fadeOut();

    setTimeout(() => {
      if (videoSrc) {
        // Prepare video
        previewImg.style.display = 'none';
        previewVideo.style.display = 'block';
        previewVideo.src = videoSrc;

        // Wait for video to be ready before fading in
        previewVideo.onloadeddata = () => {
          previewVideo.play();
          previewVideo.style.opacity = '1';
        };
        // Fallback if already loaded or cached
        if (previewVideo.readyState >= 3) {
          previewVideo.play();
          previewVideo.style.opacity = '1';
        }
      } else {
        // Show image
        previewVideo.style.display = 'none';
        previewVideo.pause();
        previewImg.style.display = 'block';

        if (imagesData) {
          const images = JSON.parse(imagesData);
          let currentIndex = 0;

          // Function to change image
          const changeImage = (src) => {
            previewImg.style.opacity = '0';
            setTimeout(() => {
              previewImg.src = src;
              previewImg.style.opacity = '1';
            }, 200);
          };

          // Set initial image
          previewImg.src = images[0];
          // Small delay to ensure src is set before fading in
          requestAnimationFrame(() => {
            previewImg.style.opacity = '1';
          });

          // Start slideshow
          slideshowInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            changeImage(images[currentIndex]);
          }, 3000); // Change every 3 seconds

        } else {
          // Single image fallback
          previewImg.src = imageSrc;
          requestAnimationFrame(() => {
            previewImg.style.opacity = '1';
          });
        }
      }
    }, 200); // Wait for fade out
  });
});
// Hero Slideshow Logic
const heroImg = document.getElementById('hero-slideshow-img');
if (heroImg) {
  const heroImages = [
    "meetupresultsview.PNG",
    "meetupmidpoint.PNG",
    "meetuppage_events.PNG",
    "meetuphostview.PNG",
    "meetupcategory.PNG"
  ];
  let currentHeroIndex = 0;

  setInterval(() => {
    currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
    heroImg.style.opacity = '0';
    setTimeout(() => {
      heroImg.src = heroImages[currentHeroIndex];
      heroImg.style.opacity = '1';
    }, 200);
  }, 4000); // Change every 4 seconds
}
