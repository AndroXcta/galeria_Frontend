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

// const btn_submit = d.querySelector("#btn-submit");

// btn_submit.addEventListener("click", () => {
//   const seccionCartas = d.getElementById("cartas");
//   const formulario = d.getElementById("create");
//   const inputs = formulario.querySelectorAll("input");

//   let valor = "";
//   inputs.forEach((input) => {
//     valor += input.value + " ";
//   });

//   const container = d.createElement("div");
//   container.classList = "containerCard";
//   console.log(inputs, valor);
//   container.innerHTML = `
//           <div class="btn-card">
//               <button id="btn-card">x</button>
//           </div>
//           <img src="./public/dragon_ball.jpg" alt="" />
//           <div class="content">
//               <p>${valor}</p>
//               <p>aqui iria el estudio</p>
//               <p>aqui iria la besto waifu</p>
//           </div>
//       `;
//   seccionCartas.appendChild(container);
// });

const formulario = d.querySelector("#create");
const espacio = d.querySelector("#cartas");

function crearCuadro(nombre, estudio, bestWaifu) {
  const containerCard = d.createElement("div");
  containerCard.classList.add("containerCard");
  containerCard.innerHTML = `
      <div class="btn-card">
          <button id="btn-card">x</button>
      </div>
      <img src="./public/dragon_ball.jpg" alt="" />
      <div class="content">
          <p>${nombre}</p>
          <p>${estudio}</p>
          <p>${bestWaifu}</p>
      </div>
  `;
  return containerCard;
}

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { nombre, estudio, sinopsis, linkAnime, bestWaifu, codigo, imagen } =
    e.target.elements;

  await fetch("https://hobart-redback-xzed.2.ie-1.fl0.io/cuadros", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre.value,
      estudio: estudio.value,
      sinopsis: sinopsis.value || null,
      link_anime: linkAnime.value || null,
      best_waifu: bestWaifu.value || null,
      codigo_obra: codigo.value,
      imagen: imagen.value || null,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error al crear un cuadro");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data)
      const nuevoCuadro = crearCuadro(
        data.nombre,
        data.estudio,
        data.best_waifu
      );
      espacio.appendChild(nuevoCuadro);
      nombre.value = "";
      estudio.value = "";
      sinopsis.value = "";
      linkAnime.value = "";
      bestWaifu.value = "";
      codigo.value = "";
      imagen.value = "";
    })
    .catch((err) => {
      alert("error al enviar los datos");
      console.log(err);
    });
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
  const miElemento = document.getElementById("delete-card");
  const width = window.innerWidth;

  if (width <= 600) {
    miElemento.textContent = "🗑";
  } else {
    miElemento.textContent = "delete";
  }
}

window.addEventListener("resize", cambiaContenido);
cambiaContenido();
