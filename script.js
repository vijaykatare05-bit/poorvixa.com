/* ==========================================================================
   POORVIXA GLOBAL EXIM - PREMIUM INTERACTIVE SCRIPTS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  
  /* ==========================================
     1. PRELOADER DISMISSAL
     ========================================== */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    // Add small delay to let user enjoy the beautiful growth loader
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
    }, 600);
  });
  
  // Fallback if load event already fired or fails
  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";
  }, 2500);


  /* ==========================================
     2. MOBILE MENU HANDLER
     ========================================== */
  const hamburger = document.querySelector(".hamburger");
  const navMobile = document.querySelector(".nav-mobile");
  const mobileLinks = document.querySelectorAll(".nav-mobile a");

  const toggleMobileNav = () => {
    hamburger.classList.toggle("active");
    navMobile.classList.toggle("active");
  };

  hamburger.addEventListener("click", toggleMobileNav);
  
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      // Close nav when any link is clicked
      if (navMobile.classList.contains("active")) {
        toggleMobileNav();
      }
    });
  });


  /* ==========================================
     3. HEADER SCROLL & ACTIVE INDICATOR
     ========================================== */
  const header = document.querySelector("header");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-desktop a:not(.btn-cta-nav)");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;

    // Header transparency morph
    if (scrollPos > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Scroll active link highlight
    let activeId = "";
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120; // accounting for sticky header height
      const secHeight = sec.offsetHeight;
      if (scrollPos >= secTop && scrollPos < secTop + secHeight) {
        activeId = sec.getAttribute("id");
      }
    });

    if (activeId) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${activeId}`) {
          link.classList.add("active");
        }
      });
    }
  });


  /* ==========================================
     4. SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================== */
  const revealElements = document.querySelectorAll(".reveal");
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ==========================================
     5. FLOATING CANVAS PARTICLES ANIMATION
     ========================================== */
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  
  let particlesArray = [];
  
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 6 + 2; // Particle sizes
      this.speedX = Math.random() * 0.4 - 0.2; // Slow floating left/right
      this.speedY = Math.random() * 0.6 + 0.2; // Drifting downwards
      
      // Select particle type: 0 = pollen dust, 1 = orange petal flake, 2 = soft leaf outline
      this.type = Math.floor(Math.random() * 3);
      
      // Random rotation speeds
      this.angle = Math.random() * Math.PI * 2;
      this.rotationSpeed = Math.random() * 0.01 - 0.005;
      
      // Color matching HSL variables
      if (this.type === 0) {
        this.color = `hsla(45, 100%, 75%, ${Math.random() * 0.3 + 0.1})`; // Gold pollen
      } else if (this.type === 1) {
        this.color = `hsla(24, 98%, 55%, ${Math.random() * 0.2 + 0.05})`; // Orange segment outline
      } else {
        this.color = `hsla(142, 60%, 40%, ${Math.random() * 0.2 + 0.05})`; // Leaf outline
      }
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.angle += this.rotationSpeed;
      
      // Reset if offscreen
      if (this.y > canvas.height) {
        this.y = 0 - 20;
        this.x = Math.random() * canvas.width;
      }
      if (this.x > canvas.width) {
        this.x = 0;
      } else if (this.x < 0) {
        this.x = canvas.width;
      }
    }
    
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = this.color;
      
      if (this.type === 0) {
        // Draw standard soft circle (pollen)
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.type === 1) {
        // Draw crescent orange segment
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI, true);
        ctx.closePath();
        ctx.fill();
      } else {
        // Draw tiny leaf shape
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.quadraticCurveTo(this.size, 0, 0, this.size);
        ctx.quadraticCurveTo(-this.size, 0, 0, -this.size);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
  }
  
  const initParticles = () => {
    particlesArray = [];
    const numberOfParticles = Math.floor((canvas.width * canvas.height) / 16000); // Responsive density
    // Cap particles at 100 to save CPU
    const limit = Math.min(numberOfParticles, 80);
    for (let i = 0; i < limit; i++) {
      particlesArray.push(new Particle());
    }
  };
  
  const animateParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  };
  
  initParticles();
  animateParticles();
  
  // Re-init on screen resize to keep correct particle density
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initParticles, 300);
  });


  /* ==========================================
     6. FAQ ACCORDION TRANSITIONS
     ========================================== */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const headerEl = item.querySelector(".faq-header");
    const bodyEl = item.querySelector(".faq-body");
    
    headerEl.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      
      // Close all other accordions
      faqItems.forEach(otherItem => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".faq-body").style.maxHeight = "0px";
      });
      
      if (!isActive) {
        item.classList.add("active");
        bodyEl.style.maxHeight = `${bodyEl.scrollHeight}px`;
      }
    });
  });


  /* ==========================================
     7. TESTIMONIALS SLIDER
     ========================================== */
  const slider = document.querySelector(".testimonials-slider");
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");
  
  let currentSlide = 0;
  const slideCount = slides.length;
  let autoSlideTimer;
  
  const updateSlider = () => {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  };
  
  const handleNextSlide = () => {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
    resetAutoSlide();
  };
  
  const handlePrevSlide = () => {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateSlider();
    resetAutoSlide();
  };
  
  nextBtn.addEventListener("click", handleNextSlide);
  prevBtn.addEventListener("click", handlePrevSlide);
  
  const startAutoSlide = () => {
    autoSlideTimer = setInterval(handleNextSlide, 7000); // 7 seconds per slide
  };
  
  const resetAutoSlide = () => {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  };
  
  startAutoSlide();


  /* ==========================================
     8. FLOATING WHATSAPP / BACK TO TOP SCROLL
     ========================================== */
  const btnScrolltop = document.getElementById("btn-scrolltop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btnScrolltop.classList.add("show");
    } else {
      btnScrolltop.classList.remove("show");
    }
  });

  btnScrolltop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });


  /* ==========================================
     9. RFQ FORM HANDLING & STORAGE VALIDATOR
     ========================================== */
  const rfqForm = document.getElementById("rfq-form");
  const toastSuccess = document.getElementById("toast-success");
  const productsSection = document.getElementById("products");

  // Catch product inquiry click buttons
  const inquiryButtons = document.querySelectorAll(".btn-card-inquiry");
  const productSelect = document.getElementById("productInterest");
  const rfqSection = document.getElementById("inquiry");

  inquiryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedProductName = btn.getAttribute("data-product");
      
      // Set dropdown option
      if (productSelect) {
        productSelect.value = selectedProductName;
      }
      
      // Smooth scroll to inquiry form
      rfqSection.scrollIntoView({ behavior: "smooth" });
      
      // Blink form wrapper border to draw attention
      const formCard = document.querySelector(".inquiry-form-card");
      formCard.style.outline = "3px solid var(--secondary-brand)";
      formCard.style.transition = "outline 0.3s ease";
      setTimeout(() => {
        formCard.style.outline = "none";
      }, 1500);
    });
  });

  rfqForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Capture values
    const inquiryData = {
      fullName: document.getElementById("fullName").value,
      companyName: document.getElementById("companyName").value,
      emailAddress: document.getElementById("emailAddress").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      countryName: document.getElementById("countryName").value,
      productInterest: document.getElementById("productInterest").value,
      quantityRequired: document.getElementById("quantityRequired").value,
      messageText: document.getElementById("messageText").value,
      submittedAt: new Date().toISOString()
    };
    
    // Hybrid submission logic: tries GoDaddy PHP first, falls back to Netlify Forms if not available
    fetch("contact.php", {
      method: "POST",
      body: new FormData(rfqForm)
    })
    .then(response => {
      if (response.ok && response.headers.get("content-type")?.includes("application/json")) {
        return response.json().then(data => {
          if (data.success) {
            console.log("Form successfully submitted via GoDaddy PHP Mailer");
            triggerSuccess();
          } else {
            console.warn("GoDaddy PHP Mailer validation error:", data.message);
            alert(data.message || "Form submission failed. Please try again.");
          }
        });
      } else {
        throw new Error("GoDaddy PHP mailer not active, falling back to Netlify.");
      }
    })
    .catch((error) => {
      console.log(error.message);
      // Fallback: Submit to Netlify via AJAX
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(rfqForm)).toString()
      })
      .then(() => {
        console.log("Form successfully submitted via Netlify Forms");
        triggerSuccess();
      })
      .catch((err) => {
        console.error("Form submission failed in both hosting environments:", err);
        alert("Submission error. Please reach us directly via WhatsApp or Email.");
      });
    });

    function triggerSuccess() {
      // Store in LocalStorage (perfect backup proof)
      let inquiries = JSON.parse(localStorage.getItem("poorvixa_inquiries") || "[]");
      inquiries.push(inquiryData);
      localStorage.setItem("poorvixa_inquiries", JSON.stringify(inquiries));
      
      // Trigger Success Toast
      toastSuccess.classList.add("active");
      
      // Reset Form
      rfqForm.reset();
      
      // Hide toast after 4.5 seconds
      setTimeout(() => {
        toastSuccess.classList.remove("active");
      }, 4500);
    }
  });


  /* ==========================================
     10. CERTIFICATION VERIFICATION LIGHTBOX
     ========================================== */
  const certModal = document.getElementById("cert-modal-overlay");
  const certCloseBtn = document.getElementById("cert-modal-close");
  const certOkBtn = document.getElementById("cert-modal-ok");
  const certVerifyBtns = document.querySelectorAll(".btn-cert-verify");
  
  const modalCertTitle = document.getElementById("modal-cert-title");
  const modalCertNum = document.getElementById("modal-cert-num");
  const modalCertAgency = document.getElementById("modal-cert-agency");
  const modalCertTerm = document.getElementById("modal-cert-term");

  const certData = {
    APEDA: {
      title: "APEDA Registration Certificate",
      number: "License Code: RCMC/APEDA/29766/2026-2027",
      agency: "Agricultural and Processed Food Products Export Development Authority (Ministry of Commerce & Industry, Govt of India)",
      term: "2026 - 2027 (Fully Audited Renewal Cycle)"
    },
    IEC: {
      title: "Import Export Code (IEC)",
      number: "Registration Code: DQJPK8597N",
      agency: "Directorate General of Foreign Trade (DGFT, Ministry of Commerce, Government of India)",
      term: "Lifetime Validity (Verified Active for current fiscal year)"
    },
    GST: {
      title: "GST Registration Certificate",
      number: "Tax Identification: 27DQJPK8597N1ZN",
      agency: "Department of Revenue, Ministry of Finance, Government of India",
      term: "Continuous Validity under state code 27 (Maharashtra)"
    }
  };

  certVerifyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedCert = btn.getAttribute("data-cert");
      const data = certData[selectedCert];
      
      if (data) {
        modalCertTitle.innerText = data.title;
        modalCertNum.innerText = data.number;
        modalCertAgency.innerText = data.agency;
        modalCertTerm.innerText = data.term;
        
        certModal.classList.add("active");
        document.body.style.overflow = "hidden"; // block scroll
      }
    });
  });

  const closeCertModal = () => {
    certModal.classList.remove("active");
    document.body.style.overflow = ""; // restore scroll
  };

  certCloseBtn.addEventListener("click", closeCertModal);
  certOkBtn.addEventListener("click", closeCertModal);
  certModal.addEventListener("click", (e) => {
    if (e.target === certModal) {
      closeCertModal();
    }
  });


});
