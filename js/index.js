//Declaraciones
const contenedorArticulos = document.querySelector("#contenedor-articulos");
const templateArticulos = document.querySelector("#template-articulos").content;
const contenedorCarrito = document.querySelector("#contenedor-carrito");
const templateCarrito = document.querySelector(
  "#template-articulos-carrito"
).content;
const contenedorTotal = document.querySelector("#contenedor-total");
const templateTotal = document.querySelector("#template-total").content;
fragment = document.createDocumentFragment();
let arrayCarrito = [];

// Tomando los datos del json de artículos una vez que se carga el Dom
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  if (localStorage.getItem("carritoFiambreria")) {
    arrayCarrito = JSON.parse(localStorage.getItem("carritoFiambreria"));
    mostrarCarrito();
  }
});
const fetchData = async () => {
  try {
    const res = await fetch("./json/data.json");
    const data = await res.json();
    cargarArticulos(data);
  } catch (error) {
    console.log(error);
  }
  mensajePromocion();
};

//Cargando artículos en el Dom
const cargarArticulos = (data) => {
  data.forEach((articulo) => {
    const clone = templateArticulos.cloneNode(true);
    clone.querySelector("img").setAttribute("src", articulo.imagen);
    clone.querySelector("h4").textContent = articulo.nombre;
    clone.querySelector("p span").textContent = articulo.precio;
    clone.querySelector("button").dataset.codigo = articulo.codigo;
    fragment.appendChild(clone);
  });
  contenedorArticulos.appendChild(fragment);
};

//Mostrando el total de la compra
mostrarTotal = () => {
  contenedorTotal.textContent = " ";

  if (arrayCarrito.length === 0) {
    contenedorTotal.textContent = " Carrito Vacio - Comience su compra";
  } else {
    const total = arrayCarrito.reduce(
      (acc, current) => acc + current.cantidad * current.precio,
      0
    );
    const clone = templateTotal.cloneNode(true);
    clone.querySelector("span").textContent = total;
    contenedorTotal.appendChild(clone);
  }
};

//Mostrando los artículos cargados en el Carrito
const mostrarCarrito = () => {
  contenedorCarrito.textContent = " ";
  arrayCarrito.forEach((articulo) => {
    const clone = templateCarrito.cloneNode(true);
    clone.querySelector(".nombre").textContent = articulo.nombre;
    clone.querySelector(".cantidad").textContent = articulo.cantidad;
    clone.querySelector(".subtotal span").textContent =
      articulo.cantidad * articulo.precio;
    clone.querySelector(".button-agregar").dataset.codigo = articulo.codigo;
    clone.querySelector(".button-quitar").dataset.codigo = articulo.codigo;
    clone.querySelector(".button-eliminar").dataset.codigo = articulo.codigo;

    fragment.appendChild(clone);
  });
  contenedorCarrito.appendChild(fragment);
  mostrarTotal();
  localStorage.setItem("carritoFiambreria", JSON.stringify(arrayCarrito));
};

//Agregando artículos al Carrito
const agregarAlCarrito = (objeto) => {
  const articulo = {
    codigo: objeto.querySelector(".button-card").dataset.codigo,
    nombre: objeto.querySelector("h4").textContent,
    precio: parseInt(objeto.querySelector("p span").textContent),
    cantidad: 1,
  };
  const indice = arrayCarrito.findIndex(
    (item) => item.codigo === articulo.codigo
  );

  indice === -1 ? arrayCarrito.push(articulo) : arrayCarrito[indice].cantidad++;

  mostrarCarrito();
};

//Aumentar la cantidad de un artículo determinado del  carrito
const btnAumentar = (e) => {
  arrayCarrito = arrayCarrito.map((item) => {
    if (item.codigo === e.target.dataset.codigo) {
      item.cantidad++;
    }
    return item;
  });
  mostrarCarrito();
};

//Quitar la cantidad de un artículo determinado del  carrito
const btnQuitar = (e) => {
  arrayCarrito = arrayCarrito.filter((item) => {
    if (item.codigo === e.target.dataset.codigo) {
      if (item.cantidad > 0) {
        item.cantidad--;
        if (item.cantidad === 0) return;
        return item;
      }
    } else {
      return item;
    }
  });
  mostrarCarrito();
};

const btnEliminar = (e) => {
  arrayCarrito = arrayCarrito.filter(
    (item) => item.codigo != e.target.dataset.codigo
  );
  mostrarCarrito();
};

//Limpiar todo el carrito
const btnLimpiar = () => {
  arrayCarrito = [];
  mostrarCarrito();
};

//Finalizar compra
const btnFinalizar = () => {
  location.href = "compra.html";
};

//Tomando dinámicamente el Evento Click de los Botones
document.addEventListener("click", (e) => {
  if (e.target.matches(".button-card")) {
    agregarAlCarrito(e.target.parentElement);
  }

  if (e.target.matches(".button-agregar")) {
    btnAumentar(e);
  }

  if (e.target.matches(".button-quitar")) {
    btnQuitar(e);
  }

  if (e.target.matches(".button-eliminar")) {
    btnEliminar(e);
  }

  if (e.target.matches(".button-limpiar")) {
    btnLimpiar();
  }

  if (e.target.matches(".button-finalizar")) {
    btnFinalizar();
  }
});

//--- Emite mensaje con promocion
const mensajePromocion = () => {
  Toastify({
    text: "*** PROMOCIÓN ESPECIAL MES ANIVERSARIO 😊🎉 SI TU COMPRA ES MAYOR A $2000 🚚 ENTREGA GRATIS ***",
    duration: 6500,
    node: "",
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    className: "toastify",
  }).showToast();
};
