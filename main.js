import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector("nav");
  navbarToggle = document.querySelector(".containerOne");
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

  const d = document;
  const botones = d.querySelectorAll(".containerCard");
  const edit = d.querySelectorAll(".btn-card")
  
  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const instancias = d.querySelectorAll(".click");
      instancias.forEach(instancia => {
        if (instancia !== boton) {
          instancia.classList.remove("click");
        }
      });
  
      boton.classList.toggle("click");
    });
  });
 
