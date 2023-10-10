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


const link_form = document.querySelector(".crear_cuadro")
const btn_form = document.querySelector(".form")

link_form.addEventListener("click", () => {
btn_form.classList.toggle("in_active")
})


const api = "https://jsonplaceholder.typicode.com/users"

fetch(api)
  .then (response => response.json())
  .then (data => {

    console.log(data);
  })

  .catch(error => {
    console.error('Error al obtener datos:', error);
  });