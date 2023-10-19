import "./style.css";
const d = document;
const cardEdit = d.querySelector(".card-edit");

function pintarCuadros(cuadros) {
  const contenedor = d.querySelector("#cartas");

  cuadros.forEach((cuadro) => {
    if (!cuadro.imagen) {
      cuadro.imagen =
        "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png";
    }
    const containerCard = d.createElement("div");
    containerCard.classList.add("containerCard");
    containerCard.dataset.id = cuadro.id_cuadro;
    containerCard.innerHTML = `
        <div class="btn-card">
        </div>
        <img src="${cuadro.imagen}" />
        <div class="content">
            <p>${cuadro.nombre}</p>
            <p>${cuadro.estudio}</p>
            <p>${cuadro.best_waifu}</p>
        </div>
    `;
    contenedor.appendChild(containerCard);
  });
}

async function obtenerCuadros(api) {
  try {
    const res = await fetch(api);
    if (!res.ok) {
      throw new Error("Error al obtener los cuadros");
    }
    const cuadros = await res.json();
    pintarCuadros(cuadros);
  } catch (err) {
    console.error(err);
    alert("Error al obtener los cuadros");
  }
}

function crearCuadro() {
  const form = d.querySelector("#create");
  const containerForm = d.querySelector(".form");

  const espacio = d.querySelector("#cartas");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const { nombre, estudio, sinopsis, linkAnime, bestWaifu, codigo, imagen } =
      e.target.elements;

    try {
      const res = await fetch(
        "https://galeria-androxcta.1.ie-1.fl0.io/cuadros",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: nombre.value,
            estudio: estudio.value,
            sinopsis: sinopsis.value || "Aun no hay sinopsis",
            link_anime: linkAnime.value || "Aun no hay link",
            best_waifu: bestWaifu.value,
            codigo_obra: codigo.value || null,
            imagen: imagen.value || null,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Error al crear un cuadro");
      }

      const cuadro = await res.json();

      const nuevoCuadro = d.createElement("div");
      nuevoCuadro.classList.add("containerCard");
      nuevoCuadro.id = cuadro.id_cuadro;
      nuevoCuadro.innerHTML = `
              <div class="btn-card">
              </div>
              <img src="${cuadro.imagen}" />
              <div class="content">
                  <p>${cuadro.nombre}</p>
                  <p>${cuadro.estudio}</p>
                  <p>${cuadro.bestWaifu}</p>
              </div>
          `;
      espacio.appendChild(nuevoCuadro);
      nombre.value = "";
      estudio.value = "";
      sinopsis.value = "";
      linkAnime.value = "";
      bestWaifu.value = "";
      codigo.value = "";
      imagen.value = "";
      containerForm.classList.add("form-close");
      alert("Cuadro creado con exito");
    } catch (error) {
      console.log(error);
      alert("Error al enviar los datos, no se pudo crear el cuadro");
    }
  });
}

function menuHamburguesa() {
  const menuBtn = d.querySelector(".hamburger");
  const navbarToggle = d.querySelector(".containerOne");
  const overlay = d.querySelector("aside");
  menuBtn.addEventListener("click", () => {
    overlay.classList.toggle("is-open");
    navbarToggle.classList.toggle("is-active");
    menuBtn.classList.toggle("is-active");
  });
}

function abrirFormularioCrearCuadro() {
  const link_form = d.querySelector(".crear_cuadro");
  const btn_form = d.querySelector(".form");
  link_form.addEventListener("click", () => {
    btn_form.classList.remove("form-close");
  });
}

function cerrarFormularioCrearCuadro() {
  const btn_cancele = d.querySelector("#cancele-create");
  const btn_form = d.querySelector(".form");
  btn_cancele.addEventListener("click", () => {
    btn_form.classList.add("form-close");
  });
}

async function abrirPanelEditar(id,elemento) {
  try {
    const response = await fetch(
      `https://galeria-androxcta.1.ie-1.fl0.io/cuadros/${id}`
    );
    const cuadro = await response.json();
    const cardEdit = d.querySelector(".card-edit");
    cardEdit.classList = "card-edit";
    if (cardEdit) {
      const propiedades = cuadro[0];
      cardEdit.innerHTML = `<div class="card-edit-description">
        <button id="cancele-edit">x</button>
        <button id="delete-card">Delete</button>
        <div class="card-edit-img">
          <img src="${propiedades.imagen}"  />
        </div>
        <p>
        ${propiedades.sinopsis}
        </p>
      </div>
      <form class="card-edit-form">
        <label for="nombre">Nombre:</label>
        <input
          type="text"
          required
          id="nombre"
          name="nombre"
          value="${propiedades.nombre}"
        />
        <label for="estudio">Estudio:</label>
        <input
          type="text"
          required
          id="estudio"
          name="estudio"
          value="${propiedades.estudio}"
        />
        <label for="sinopsis">Sinopsis:</label>
        <input
          id="sinopsis"
          required
          name="sinopsis"
          rows="4"
          cols="50"
          value="${propiedades.sinopsis}"
        />
        <label for="linkAnime">Link del Anime:</label>
        <input type="text" id="linkAnime" name="linkAnime" value="${propiedades.linkAnime}" />
        <label for="bestWaifu">Best Waifu:</label>
        <input type="text" id="bestWaifu" name="bestWaifu" Value="${propiedades.bestWaifu}" />
        <label for="codigoObra">Código de Obra:</label>
        <input type="text" id="codigoObra" name="codigoObra" value="${propiedades.codigo_obra}" />
        <label for="image">Imagen(url)</label>
        <input type="url" />
        <button type="submit">Guardar</button>
      </form>`;

      function cancelarEliminar() {
        const canceleDelete = d.getElementById("cancele-edit");
        canceleDelete.addEventListener("click", () => {
          cardEdit.classList += " card-edit-in-actvie";
        });
      }
      cancelarEliminar();

      function confirmarEliminarCuadro() {
        const btn_delete = d.getElementById("delete-card");
        btn_delete.addEventListener("click", () => {
          const confirmDelete = d.querySelector(".contaierDelete");
          confirmDelete.classList = "contaierDelete";
        });
      }
      confirmarEliminarCuadro();

      eliminarCuadro(id,elemento);
    } else {
      console.error("no se encontro el cuadro");
    }
  } catch (error) {
    alert("Error: No se reconoce el cuadro. " + error.message);
  }
}

async function abrirFormularioEditarCuadro() {
  const containerCard = document.querySelectorAll(".containerCard");
  containerCard.forEach((sel) => {
    sel.addEventListener("click", (e) => {
      const item = e.target.closest(".containerCard");
      const id = item.dataset.id;
      abrirPanelEditar(id,item);
      console.log(`https://galeria-androxcta.1.ie-1.fl0.io/cuadros/${id}`);
    });
  });
}

function cambiaContenido() {
  const width = window.innerWidth;
  const miElemento = d.querySelector("#delete-card");
  if (width <= 600) {
    miElemento.textContent = "🗑";
  } else {
    miElemento.textContent = "delete";
  }
}

function eliminarCuadro(id,elemento) {
  try {
    const btnConfirm = d.getElementById("confirmDelete");
    btnConfirm.addEventListener("click", async (i) => {
      const chupala = elemento;
      const id_item = elemento.dataset.id;

      const response = fetch(
        `https://galeria-androxcta.1.ie-1.fl0.io/cuadros/${id_item}`,
        {
          method: "DELETE",
        }
      ).then(() => {
        if (!response.ok) {
          throw new Error("Error al eliminar el cuadro");
        }
        location.reload();
        chupala.remove();
      });
    });
  } catch (error) {
    alert("Error: No se pudo eliminar el cuadro. " + error.message);
  }
}

// Evento DOMContentLoaded se dispara cuando el documento HTML ha sido completamente cargado y parseado
d.addEventListener("DOMContentLoaded", async () => {
  menuHamburguesa();
  await obtenerCuadros("https://galeria-androxcta.1.ie-1.fl0.io/cuadros");
  abrirFormularioCrearCuadro();
  cerrarFormularioCrearCuadro();
  crearCuadro();
  abrirFormularioEditarCuadro();
});
