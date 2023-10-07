import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector("nav");
//   const sidebar = document.querySelector(".is-active");
  const navbarToggle = document.querySelector(".containerOne");
  const menuBtn = document.querySelector(".hamburger-box");

  menuBtn.addEventListener("click", () => {
    overlay.classList.toggle("is-open");
    menuBtn.parentElement.classList.toggle("is-active");
  });
});

