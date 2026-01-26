// Init AOS
AOS.init({ duration: 1000, once: true, offset: 100 });

// Mobile Menu
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");

burger.addEventListener("click", () => {
  nav.classList.toggle("nav-active");
  burger.classList.toggle("toggle");
  
  if (burger.classList.contains("toggle")) {
    burger.children[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
    burger.children[1].style.opacity = "0";
    burger.children[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
  } else {
    burger.children[0].style.transform = "none";
    burger.children[1].style.opacity = "1";
    burger.children[2].style.transform = "none";
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("nav-active");
    burger.classList.remove("toggle");
    burger.children[0].style.transform = "none";
    burger.children[1].style.opacity = "1";
    burger.children[2].style.transform = "none";
  });
});

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  const logo = document.querySelector(".logo img");
  
  if (window.scrollY > 50) {
    navbar.style.background = "#060912"; 
    navbar.style.padding = "10px 5%";
    navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
    logo.style.height = "65px";
  } else {
    navbar.style.background = "rgba(11, 17, 32, 0.9)"; 
    navbar.style.padding = "15px 5%";
    navbar.style.boxShadow = "none";
    logo.style.height = "85px";
  }
});

// --- FORM SUBMISSION ---
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop page reload

    // 1. Get the button and change text
    const submitBtn = contactForm.querySelector('button');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'Sending...';
    submitBtn.disabled = true;

    // 2. Gather data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    try {
      // 3. Send to Backend
      const response = await fetch('/api/server', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        alert('Message sent! We will contact you soon.');
        contactForm.reset();
      } else {
        alert('Error: ' + (result.error || 'Something went wrong'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      // 4. Restore button
      submitBtn.innerText = originalText;
      submitBtn.disabled = false;
    }
  });
}

// --- SCROLL SPY LOGIC ---
const sections = document.querySelectorAll("section[id]");
const navLinksSpy = document.querySelectorAll(".nav-links li a");

const options = {
    threshold: 0.6 // Trigger when 60% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinksSpy.forEach((link) => {
                link.classList.remove("active");
                // Match the section ID with the link href (e.g., #portfolio)
                if (link.getAttribute("href").includes(entry.target.id)) {
                    link.classList.add("active");
                }
            });
        }
    });
}, options);

sections.forEach((section) => {
    observer.observe(section);
});