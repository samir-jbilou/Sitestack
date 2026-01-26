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