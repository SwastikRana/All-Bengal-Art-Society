// Navigation scroll and highlight
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  let isUserClick = false;

  function setActiveLink(link) {
    navLinks.forEach(item => item.classList.remove('active'));
    if (link) link.classList.add('active');
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;
      isUserClick = true;
      const headerHeight = (document.querySelector('.society-header')?.offsetHeight ?? 0) +
                         (document.querySelector('.main-nav')?.offsetHeight ?? 0);
      const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY;
      const scrollPos = sectionTop - headerHeight;
      window.scrollTo({
        top: scrollPos,
        behavior: 'smooth'
      });
      setActiveLink(link);
      setTimeout(() => { isUserClick = false; }, 1200);
    });
  });

  function updateActiveLinkOnScroll() {
    if (isUserClick) return;
    let scrollPos = window.scrollY + window.innerHeight / 3;
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelectorAll('section[id]').forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }
  window.addEventListener('scroll', updateActiveLinkOnScroll);
  window.addEventListener('load', updateActiveLinkOnScroll);
});

// Gallery slideshow
document.addEventListener('DOMContentLoaded', () => {
  const galleryImages = document.querySelectorAll('.gallery img');
  if (galleryImages.length === 0) return;
  const slideshowOverlay = document.createElement('div');
  slideshowOverlay.classList.add('slideshow-overlay');
  slideshowOverlay.innerHTML = `
    <span class="slideshow-close">&times;</span>
    <span class="slideshow-arrow prev">&#10094;</span>
    <img class="slideshow-image" src="" alt="Slide Image" />
    <span class="slideshow-arrow next">&#10095;</span>
  `;
  document.body.appendChild(slideshowOverlay);
  const slideImage = slideshowOverlay.querySelector('.slideshow-image');
  const closeBtn = slideshowOverlay.querySelector('.slideshow-close');
  const prevBtn = slideshowOverlay.querySelector('.slideshow-arrow.prev');
  const nextBtn = slideshowOverlay.querySelector('.slideshow-arrow.next');
  let currentIndex = 0;
  function showSlide(index) {
    currentIndex = (index + galleryImages.length) % galleryImages.length;
    slideImage.style.transform = 'translateX(100%)';
    setTimeout(() => {
      slideImage.src = galleryImages[currentIndex].src;
      slideImage.alt = galleryImages[currentIndex].alt || 'Slide Image';
      slideImage.style.transform = 'translateX(0)';
    }, 50);
  }
  function openSlideshow(index) {
    showSlide(index);
    slideshowOverlay.classList.add('active');
  }
  function closeSlideshow() {
    slideshowOverlay.classList.remove('active');
  }
  function showPrev() {
    showSlide(currentIndex - 1);
  }
  function showNext() {
    showSlide(currentIndex + 1);
  }
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => { openSlideshow(index); });
  });
  closeBtn.addEventListener('click', closeSlideshow);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);
  slideshowOverlay.addEventListener('click', (e) => {
    if (e.target === slideshowOverlay) {
      closeSlideshow();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (!slideshowOverlay.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') showPrev();
    else if (e.key === 'ArrowRight') showNext();
    else if (e.key === 'Escape') closeSlideshow();
  });
});

// WhatsApp message sending on membership form submit
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('membership-form');
  if(!form) return;
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect form values
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const address = form.address.value.trim();
    const joinValue = form.join.value;

    // WhatsApp message with aligned, bold fields and a final instruction
    let message = '*Membership Request*%0A';
    message += `*Name:* ${encodeURIComponent(name)}%0A`;
    message += `*Email:* ${encodeURIComponent(email)}%0A`;
    message += `*Phone Number:* ${encodeURIComponent(phone)}%0A`;
    message += `*Address:* ${encodeURIComponent(address)}%0A`;
    message += `*Wants to Join:* ${encodeURIComponent(joinValue)}%0A`;

    // Add request for ID image
    message += `%0A*Thank you for joining! Please share your ID Card picture (Aadhar Card) below in this chat for verification.*`;

    // WhatsApp number
    const whatsappNumber = '918617468498';
    // WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
  });
});

// Show pop-up message after clicking "Yes" radio button in membership form
document.addEventListener('DOMContentLoaded', () => {
  var joinRadios = document.querySelectorAll('input[name="join"]');
  var joinMsg = document.getElementById('join-message');
  if (!joinRadios.length || !joinMsg) return;
  joinRadios.forEach(function(radio) {
    radio.addEventListener('change', function() {
      if (this.value === 'yes' && this.checked) {
        joinMsg.style.display = 'block';
      } else if (this.value === 'no' && this.checked) {
        joinMsg.style.display = 'none';
      }
    });
  });
});



document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('page-visible');

  const links = document.querySelectorAll('a[href]');

  links.forEach(link => {
    const href = link.getAttribute('href');
    // Exclude #home, #about, and #results anchors from transition
    if (
      link.hostname === window.location.hostname &&
      !(href.startsWith('#home') || href.startsWith('#about') || href.startsWith('#results'))
    ) {
      link.addEventListener('click', function(event) {
        if (
          event.button === 0 &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.altKey &&
          !event.shiftKey
        ) {
          event.preventDefault();
          document.body.style.opacity = '0';
          setTimeout(() => {
            window.location.href = this.href;
          }, 50);
        }
      });
    }
  });
});


