import './style.css'
import { createIcons, icons } from 'lucide';

// Initialize Lucide icons
createIcons({
  icons
});

// Automatic Theme Detection (follows system preference)
const html = document.documentElement;

// Function to set theme based on system preference
function setThemeFromSystem() {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  html.setAttribute('data-theme', systemTheme);
}

// Set initial theme
setThemeFromSystem();

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setThemeFromSystem);

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
// Hero Background Slideshow
// Hero Background Slideshow
const heroBgContainer = document.getElementById('hero-background');
if (heroBgContainer) {
  const imagesGlob = import.meta.glob('./assets/hero-images/*.{avif,jpg,jpeg,png,webp}', { eager: true });
  const bgImages = Object.values(imagesGlob).map(module => module.default);

  if (bgImages.length > 0) {
    const shuffledImages = [...bgImages];
    for (let i = shuffledImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
    }

    shuffledImages.forEach((src) => {
      const img = document.createElement('img');
      img.src = src;
      img.className = 'hero-bg-image';
      img.alt = "City background";
      heroBgContainer.appendChild(img);
    });

    const images = heroBgContainer.querySelectorAll('.hero-bg-image');
    let currentBgIndex = Math.floor(Math.random() * images.length);
    images[currentBgIndex].classList.add('active');

    if (images.length > 1) {
      setInterval(() => {
        images[currentBgIndex].classList.remove('active');
        currentBgIndex = (currentBgIndex + 1) % images.length;
        images[currentBgIndex].classList.add('active');
      }, 5000); // Change background every 5 seconds
    }
  }
}

// Hero Phone Slideshow Logic
const heroImg = document.getElementById('hero-slideshow-img');
if (heroImg) {
  const heroImages = [
    "home2.PNG",
    "new home.PNG",
    "meetupresultsview.PNG",
    "meetupmidpoint.PNG",
    "meetuppage_events.PNG"
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

// Contact Form Logic (EmailJS)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = 'Sending...';
    submitBtn.disabled = true;

    // Initialize EmailJS with Public Key
    emailjs.init("G92X441mmhsqPPcV2");

    const serviceID = 'service_899my3a';
    const templateID = 'template_2aeothc';

    // Get form values
    const name = contactForm.querySelector('input[name="name"]').value;
    const email = contactForm.querySelector('input[name="email"]').value;
    const subject = contactForm.querySelector('select[name="subject"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value;

    // Combine subject and message
    const fullMessage = `Subject: ${subject}\n\n${message}`;

    const templateParams = {
      name: name,
      email: email,
      message: fullMessage
    };

    emailjs.send(serviceID, templateID, templateParams)
      .then(() => {
        submitBtn.innerText = 'Message Sent!';
        submitBtn.classList.add('btn-success'); // Optional: Add success style
        contactForm.reset();
        setTimeout(() => {
          submitBtn.innerText = originalBtnText;
          submitBtn.disabled = false;
          submitBtn.classList.remove('btn-success');
        }, 3000);
      }, (err) => {
        submitBtn.innerText = 'Failed to Send';
        submitBtn.disabled = false;
        alert('Failed to send message. Please try again later.');
        console.error('EmailJS Error:', err);
        setTimeout(() => {
          submitBtn.innerText = originalBtnText;
        }, 3000);
      });
  });
}
