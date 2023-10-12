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

botones.forEach((boton) => {
  boton.addEventListener("click", (event) => {
    event.stopPropagation();
    const carta = document.querySelector(".card-edit");
    carta.classList.toggle("card-edit-in-actvie")
  });
});

const btn_cancele = d.querySelector ("#cancele-edit")
btn_cancele.addEventListener("click", () =>{
  const carta = document.querySelector(".card-edit");
  carta.classList.add("card-edit-in-actvie")
})

const btn_create =d.querySelector("#cancele-create")
btn_create.addEventListener("click", () => {
  const btn_form = d.querySelector(".form");
  btn_form.classList.toggle("in_active");
})


const btn_sumbit = d.querySelector("#btn-submit")
btn_sumbit.addEventListener("click", () => {
   const formulario = d.getElementById("create")
   const inputs = formulario.querySelectorAll("input")

   inputs.forEach(input => {
    const valor = input.value;
     const container = d.createElement("div")
     container.classList = "container-card"
    container.createElement("p")
    
  });

})

