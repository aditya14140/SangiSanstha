const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const closeBtn = document.getElementById('closeBtn');

    function openMenu() {
      mobileSidebar.classList.add('active');
      sidebarOverlay.classList.add('active');
      hamburger.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      mobileSidebar.classList.remove('active');
      sidebarOverlay.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    sidebarOverlay.addEventListener('click', closeMenu);

    // Close menu on link click
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    let currentSlide = 0;
    let slideInterval;

    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      currentSlide = index;
    }

    function nextSlide() {
      let next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }

    function prevSlide() {
      let prev = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prev);
    }

    function goToSlide(index) {
      showSlide(index);
      resetInterval();
    }

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    }

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });

    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });

    slideInterval = setInterval(nextSlide, 5000);

    // Intersection Observer for sections
    const sections = document.querySelectorAll('section');
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });

    // Make hero visible immediately
    document.querySelector('.hero').classList.add('visible');

    // Form validation
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const contactInput = document.getElementById('contactField');
    const subjectSelect = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    function showError(input, errorId, message) {
      const errorDiv = document.getElementById(errorId);
      errorDiv.textContent = message;
      errorDiv.style.display = 'block';
      input.style.borderColor = 'var(--red-accent)';
    }

    function clearError(input, errorId) {
      const errorDiv = document.getElementById(errorId);
      errorDiv.style.display = 'none';
      input.style.borderColor = '#e8e8e8';
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
      return /^[\d\s\-\+\(\)]{10,}$/.test(phone);
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate name
      if (nameInput.value.trim() === '') {
        showError(nameInput, 'nameError', 'Please enter your name');
        isValid = false;
      } else {
        clearError(nameInput, 'nameError');
      }

      // Validate email or phone
      const contactValue = contactInput.value.trim();
      if (contactValue === '') {
        showError(contactInput, 'contactError', 'Please enter your email or phone');
        isValid = false;
      } else if (!validateEmail(contactValue) && !validatePhone(contactValue)) {
        showError(contactInput, 'contactError', 'Please enter a valid email or phone number');
        isValid = false;
      } else {
        clearError(contactInput, 'contactError');
      }

      // Validate subject
      if (subjectSelect.value === '') {
        showError(subjectSelect, 'subjectError', 'Please select a subject');
        isValid = false;
      } else {
        clearError(subjectSelect, 'subjectError');
      }

      // Validate message
      if (messageInput.value.trim() === '') {
        showError(messageInput, 'messageError', 'Please enter your message');
        isValid = false;
      } else {
        clearError(messageInput, 'messageError');
      }

      if (isValid) {
        // Show success toast
        const toast = document.getElementById('toast');
        toast.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
        toast.classList.add('show');
        
        // Reset form
        contactForm.reset();
        
        // Hide toast after 5 seconds
        setTimeout(() => {
          toast.classList.remove('show');
        }, 5000);
      }
    });

    // Mobile video overlay (if exists)
    const videoOverlay = document.getElementById('videoOverlay');
    const introVideo = document.getElementById('introVideo');
    const skipBtn = document.getElementById('skipBtn');
    const tapPlay = document.getElementById('tapPlay');

    function isMobile() {
      return window.innerWidth <= 768;
    }

    if (isMobile() && introVideo.src) {
      videoOverlay.style.display = 'flex';
      tapPlay.style.display = 'block';

      tapPlay.addEventListener('click', () => {
        tapPlay.style.display = 'none';
        introVideo.play();
      });

      introVideo.addEventListener('ended', () => {
        videoOverlay.style.display = 'none';
      });

      skipBtn.addEventListener('click', () => {
        videoOverlay.style.display = 'none';
      });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

  
