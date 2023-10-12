import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector("aside");
  const navbarToggle = document.querySelector(".containerOne");
  const menuBtn = document.querySelector(".hamburger");

  menuBtn.addEventListener("click", () => {
    overlay.classList.toggle("is-open");
    navbarToggle.classList.toggle("is-active");
    menuBtn.classList.toggle("is-active");
  });
});

const link_form = document.querySelector(".crear_cuadro");
const btn_form = document.querySelector(".form");

link_form.addEventListener("click", () => {
  btn_form.classList.toggle("in_active");
});

const d = document;
const botones = document.querySelectorAll(".containerCard");
const btn_edit = document.querySelectorAll(".edit");

botones.forEach((boton) => {
  boton.addEventListener("click", (event) => {
    event.stopPropagation();

    const instancias = document.querySelectorAll(".click");
    instancias.forEach((instancia) => {
      if (!instancia) {
        instancia.classList.remove("click");
      }
    });

    btn_edit.forEach((editButton) => {
      editButton.classList.remove("off");
    });

    boton.classList.toggle("click");
  });
});
