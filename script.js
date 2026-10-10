/**
 * DR. MAMOUN ALDURRA - OFFICIAL MEDICAL WEBSITE INTERACTIVITY
 * Trilingual System (English Default, Arabic, French) & Logo Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const langPillBtns = document.querySelectorAll('.lang-pill-btn');
  const brandLogoImg = document.getElementById('brandLogoImg');
  const footerLogoImg = document.getElementById('footerLogoImg');
  const brochureModal = document.getElementById('brochureModal');
  const openBrochureBtns = document.querySelectorAll('.open-brochure-btn');
  const closeModalBtns = document.querySelectorAll('.modal-close-btn');
  const bookingForm = document.getElementById('bookingForm');

  // Sticky Navbar On Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // Active Nav Link On Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (activeLink) activeLink.classList.add('active');
      }
    });
  });

  // Lightbox / Brochure Modal Controls
  openBrochureBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (brochureModal) {
        brochureModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close modal when clicking on backdrop
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Keyboard escape to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  });

  // Multilingual Booking Form with WhatsApp Link Generation
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('patientName').value.trim();
      const phone = document.getElementById('patientPhone').value.trim();
      const location = document.getElementById('clinicLocation').value;
      const specialty = document.getElementById('medicalSpecialty').value;
      const preferredDate = document.getElementById('preferredDate').value;
      const notes = document.getElementById('patientNotes').value.trim();

      const lang = document.documentElement.getAttribute('lang') || 'en';

      if (!name || !phone) {
        if (lang === 'ar') alert('يرجى كتابة الاسم ورقم الهاتف للتواصل.');
        else if (lang === 'fr') alert('Veuillez renseigner votre nom et votre numéro de téléphone.');
        else alert('Please enter patient name and contact phone number.');
        return;
      }

      // WhatsApp target selection:
      let whatsappNumber = '218911694229';
      if (location.includes('Syria') || location.includes('سوريا') || location.includes('Syrie') || location.includes('Damascus')) {
        whatsappNumber = '963969127243';
      }

      let messageText = '';
      if (lang === 'ar') {
        messageText = 
`السلام عليكم ورحمة الله،
أود حجز استشارة طبية لدى د. مأمون الدرة:
- الاسم: ${name}
- الهاتف: ${phone}
- العيادة / المركز المفضل: ${location}
- الحالة / التخصص: ${specialty}
- الموعد المقترح: ${preferredDate || 'في أقرب وقت متاح'}
- تفاصيل إضافية: ${notes || 'لا يوجد'}

شكراً جزيلاً.`;
      } else if (lang === 'fr') {
        messageText = 
`Bonjour Dr. Mamoun Aldurra,
Je souhaite demander une consultation médicale spécialisée :
- Nom du patient : ${name}
- Téléphone : ${phone}
- Centre médical choisi : ${location}
- Spécialité / Motif : ${specialty}
- Date souhaitée : ${preferredDate || 'Dès que possible'}
- Informations médicales : ${notes || 'Aucun détail supplémentaire'}

Merci cordialement.`;
      } else {
        messageText = 
`Hello Dr. Mamoun Aldurra,
I would like to request a specialist consultation appointment:
- Patient Name: ${name}
- Phone: ${phone}
- Preferred Clinic/Center: ${location}
- Specialty / Condition: ${specialty}
- Preferred Date: ${preferredDate || 'Earliest available date'}
- Medical Notes: ${notes || 'None'}

Thank you very much.`;
      }

      const encodedMessage = encodeURIComponent(messageText);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
    });
  }

  // Stat Counter Animation
  let animated = false;
  const statsSection = document.querySelector('.hero-stats-grid');
  
  function animateStats() {
    if (!statsSection || animated) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      animated = true;
      const numbers = document.querySelectorAll('.stat-num');
      numbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target') || num.innerText.replace(/[^0-9]/g, ''));
        const prefix = num.innerText.includes('+') ? '+' : '';
        let count = 0;
        const duration = 1500;
        const stepTime = 30;
        const totalSteps = duration / stepTime;
        const stepIncrement = Math.ceil(target / totalSteps);

        const timer = setInterval(() => {
          count += stepIncrement;
          if (count >= target) {
            num.innerText = prefix + target.toLocaleString();
            clearInterval(timer);
          } else {
            num.innerText = prefix + count.toLocaleString();
          }
        }, stepTime);
      });
    }
  }

  window.addEventListener('scroll', animateStats);
  animateStats(); // Run once if already in view

  // =========================================================================
  // TRILINGUAL SYSTEM (ENGLISH DEFAULT, ARABIC, FRENCH) & LOGO SWITCHING
  // =========================================================================

  function setLanguage(lang) {
    const isRtl = (lang === 'ar');
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');

    // Body classes
    document.body.classList.remove('lang-ar', 'lang-en', 'lang-fr');
    document.body.classList.add(`lang-${lang}`);

    // Logo Switching Requirement:
    // English & French use logo-en.png; Arabic uses logo.png
    const isWesternLang = (lang === 'en' || lang === 'fr');
    [brandLogoImg, footerLogoImg].forEach(imgEl => {
      if (!imgEl) return;
      if (isWesternLang) {
        imgEl.src = 'logo-en.png';
        imgEl.classList.add('logo-en');
      } else {
        imgEl.src = 'logo.png';
        imgEl.classList.remove('logo-en');
      }
    });

    // Switch all content matching data-[lang]
    document.querySelectorAll('[data-en]').forEach(el => {
      let content = '';
      if (lang === 'ar') content = el.getAttribute('data-ar');
      else if (lang === 'fr') content = el.getAttribute('data-fr') || el.getAttribute('data-en');
      else content = el.getAttribute('data-en');

      if (content) {
        el.innerHTML = content;
      }
    });

    // Form placeholders
    document.querySelectorAll('[data-en-placeholder]').forEach(el => {
      let ph = '';
      if (lang === 'ar') ph = el.getAttribute('data-ar-placeholder');
      else if (lang === 'fr') ph = el.getAttribute('data-fr-placeholder') || el.getAttribute('data-en-placeholder');
      else ph = el.getAttribute('data-en-placeholder');

      if (ph) el.placeholder = ph;
    });

    // Update active pill button
    langPillBtns.forEach(btn => {
      if (btn.getAttribute('data-lang-target') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Store in localStorage
    try {
      localStorage.setItem('dr_mamoun_lang', lang);
    } catch (e) {
      // ignore
    }
  }

  // Language pill button clicks
  langPillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang-target');
      if (targetLang) {
        setLanguage(targetLang);
      }
    });
  });

  // Default Language is English as explicitly requested:
  // "وأريد منك أن تجعل اللغة الافتراضية للصفحة هي الإنجليزية"
  const savedLang = localStorage.getItem('dr_mamoun_lang') || 'en';
  setLanguage(savedLang);
});
