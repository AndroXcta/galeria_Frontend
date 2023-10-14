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

const d = document;
const link_form = document.querySelector(".crear_cuadro");
const btn_form = document.querySelector(".form");
const botones = document.querySelectorAll(".containerCard");
botones.forEach((boton) => {
  link_form.addEventListener("click", () => {
    btn_form.classList.toggle("in_active");
  });

  boton.addEventListener("click", (event) => {
    event.stopPropagation();
    const carta = document.querySelector(".card-edit");
    carta.classList.toggle("card-edit-in-actvie");
  });
});

const btn_cancele = d.querySelector("#cancele-edit");
btn_cancele.addEventListener("click", () => {
  const carta = document.querySelector(".card-edit");
  carta.classList.add("card-edit-in-actvie");
});

const btn_create = d.querySelector("#cancele-create");
btn_create.addEventListener("click", () => {
  const btn_form = d.querySelector(".form");
  btn_form.classList.toggle("in_active");
});

const btn_submit = d.querySelector("#btn-submit");

btn_submit.addEventListener("click", () => {
  const seccionCartas = d.getElementById("cartas");
  const formulario = d.getElementById("create");
  const inputs = formulario.querySelectorAll("input");

  let valor = "";
  inputs.forEach((input) => {
    valor += input.value + " ";
  });

  const container = d.createElement("div");
  container.classList = "containerCard";
  console.log(inputs, valor);
  container.innerHTML = `
          <div class="btn-card">
              <button id="btn-card">x</button>
          </div>
          <img src="./public/dragon_ball.jpg" alt="" />
          <div class="content">
              <p>${valor}</p>
              <p>aqui iria el estudio</p>
              <p>aqui iria la besto waifu</p>
          </div>
      `;
  seccionCartas.appendChild(container);
});

const btn_delete = d.querySelector("#delete-card");
btn_delete.addEventListener("click", () => {
  const selector = d.querySelector("main");
  const delete_card = d.querySelector(".delete-card");
  delete_card.innerHTML = `<p>¿estas seguro de eliminar el cuadro seleccionado?</p>
  <div class="options">
    <div class="yes">
      <button>si</button>
    </div>
    <div class="no">no</div>
</div>`;

  selector.appendChild(delete_card);
});


function cambiaContenido() {
  const miElemento = document.getElementById('delete-card');
  const width = window.innerWidth;

  if (width <= 600) {
    miElemento.textContent = '🗑';
  } else {
    miElemento.textContent = 'delete';
  }
}

window.addEventListener('resize', cambiaContenido);
cambiaContenido();
