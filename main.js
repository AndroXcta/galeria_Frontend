import "./style.css";
const d = document;
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
  const botones = document.querySelectorAll(".containerCard");
  d.addEventListener("DOMContentLoaded", () => {
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

    const btn_confirm_delete = d.getElementById("yes")
    btn_confirm_delete.addEventListener("click", () => {
     console.log("esta funcionando")
    })
     const btn_cancele_delete = d.getElementById("no")
     btn_cancele_delete.addEventListener("click", () => {
       console.log("funciona")
     })
  })
  
  const btn_create = d.querySelector("#cancele-create");
  btn_create.addEventListener("click", () => {
    const btn_form = d.querySelector(".form");
    btn_form.classList.toggle("in_active");
  });
  
  const formulario = d.querySelector("#create");
  const espacio = d.querySelector("#cartas");
  espacio.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("containerCard")) {
      const carta = document.querySelector(".card-edit");
      carta.classList.toggle("card-edit-in-actvie");
    }
  })
    
  function crearCuadro(nombre, estudio, bestWaifu, imagen) {
    const containerCard = d.createElement("div");
    containerCard.classList.add("containerCard");
    containerCard.innerHTML = `
        <div class="btn-card">
        </div>
        <img src="${imagen}" />
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
  
    await fetch("https://galeria-androxcta.1.ie-1.fl0.io/cuadros", {
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
  
  async function obtenerCuadros() {
    try {
      const response = await fetch("https://galeria-androxcta.1.ie-1.fl0.io/cuadros");
      const cuadros = await response.json();
  
      cuadros.forEach((cuadro) => {
        const containerCard = document.createElement("div");
        containerCard.classList.add("containerCard");
  
        containerCard.innerHTML = `
          <div class="btn-card">
            <button id="btn-card">x</button>
          </div>
          <img src="${cuadro.imagen}" />
          <div class="content">
            <p>${cuadro.nombre}</p>
            <p>${cuadro.estudio}</p>
            <p>${cuadro.best_waifu}</p>
          </div>
        `;
        console.log(cuadro)
        espacio.appendChild(containerCard);
      });
    } catch (error) {
      console.error("Error al obtener los cuadros:", error);
    }
  }

  obtenerCuadros();

  const buscardor = d.querySelector("#search");
  const inputBusqueda = d.querySelector("#inputBusqueda");
  
  
  const btn_delete = d.querySelector("#delete-card");
  btn_delete.addEventListener("click", () => {
    const selector = d.querySelector("main");
    const contendido = d.createElement("div")
    contendido.classList = "contaierDelete"
    contendido.innerHTML = `<p>¿estas seguro de eliminar el cuadro seleccionado?</p>
    <div class="options">
      <div class="yes">
        <button id="yes">si</button>
      </div>
      <div class="no"> 
      <button id="no">no</button>
      </div>
  </div>`;
  
    selector.appendChild(contendido);
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
  

  buscardor.addEventListener("click", async () => {
    async function obtenerCuadrosPorId(id) {
      try {
        const response = await fetch(
          `https://galeria-androxcta.1.ie-1.fl0.io/cuadros/${id}`
        );
        const cuadro = await response.json();
        console.log(response);
        cuadro.forEach((cuadro) => {
          const cardEdit = d.querySelector(".card-edit")
          cardEdit.classList = "card-edit" 
          cardEdit.innerHTML = `          <div class="card-edit-description">
          <button id="cancele-edit">x</button>
          <button id="delete-card">Delete</button>
          <div class="card-edit-img">
            <img src="${cuadro.imagen}" />
          </div>
          <p>
          ${cuadro.sinopsis}
          </p>
        </div>
        <form class="card-edit-form">
          <label for="nombre">Nombre:</label>
          <input
            type="text"
            required
            id="nombre"
            name="nombre"
            value="${cuadro.nombre}"
          />
          <label for="estudio">Estudio:</label>
          <input
            type="text"
            required
            id="estudio"
            name="estudio"
            value="${cuadro.estudio}"
          />
          <label for="sinopsis">Sinopsis:</label>
          <input
            id="sinopsis"
            required
            name="sinopsis"
            rows="4"
            cols="50"
            value="${cuadro.sinopsis}"
          />
          <label for="linkAnime">Link del Anime:</label>
          <input type="text" id="linkAnime" name="linkAnime" value="${cuadro.linkAnime}" />
          <label for="bestWaifu">Best Waifu:</label>
          <input type="text" id="bestWaifu" name="bestWaifu" Value="${cuadro.bestWaifu}" />
          <label for="codigoObra">Código de Obra:</label>
          <input type="text" id="codigoObra" name="codigoObra" value="${cuadro.codigo_obra}" />
          <label for="image">Imagen(url)</label>
          <input type="url" id= "imagen" />
          <button type="submit">Guardar</button>
        </form>`
        })
    
      } catch (error) {
        alert("Error: No se reconoce el cuadro. " + error.message);
      }
    }
  
    obtenerCuadrosPorId(inputBusqueda.value);
  });
  
  inputBusqueda.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      buscardor.click(); 
    }
  });
  