// Declaraciones de Variables para mostrar la Comra
const contenedorCompra = document.querySelector("#contenedor-compra");
const templateCompra = document.querySelector(
  "#template-articulos-compra"
).content;
const contenedorTotal = document.querySelector("#contenedor-total");
const templateTotal = document.querySelector("#template-total").content;
fragment = document.createDocumentFragment();
let arrayCompra = [];

// Declaraciones de Variables para el manejo del Formulario de envío
const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const errorNombre = document.getElementById("errorNombre");
const errorEmail = document.getElementById("errorEmail");
const errorTelefono = document.getElementById("errorTelefono");
const mensajeExito = document.getElementById("mensajeExito");

// Tomando los datos del json de artículos una vez que se carga el Dom
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carritoFiambreria")) {
    arrayCompra = JSON.parse(localStorage.getItem("carritoFiambreria"));
    mostrarCompra();
  }
});

//Mostrando el total de la compra
mostrarTotal = () => {
  contenedorTotal.textContent = " ";
  const total = arrayCompra.reduce(
    (acc, current) => acc + current.cantidad * current.precio,
    0
  );
  const clone = templateTotal.cloneNode(true);
  clone.querySelector("span").textContent = total;
  contenedorTotal.appendChild(clone);
};

//Mostrando los artículos de la Compra
const mostrarCompra = () => {
  contenedorCompra.textContent = " ";
  arrayCompra.forEach((articulo) => {
    const clone = templateCompra.cloneNode(true);
    clone.querySelector(".codigo").textContent = articulo.codigo;
    clone.querySelector(".nombre").textContent = articulo.nombre;
    clone.querySelector(".cantidad1").textContent = articulo.cantidad;
    clone.querySelector(".precio span").textContent = articulo.precio;
    clone.querySelector(".subtotal span").textContent =
      articulo.cantidad * articulo.precio;

    fragment.appendChild(clone);
  });
  contenedorCompra.appendChild(fragment);
  mostrarTotal();
};

//Control y Validacion del Formulario de envío
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const regNombre = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  const regEmail =
    /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;
  const regTelefono = /[0-9]/;

  if (!regNombre.test(nombre.value)) {
    return (errorNombre.textContent = "Solo ingrese letras");
  } else {
    errorNombre.textContent = "";
  }

  if (!regEmail.test(email.value)) {
    return (errorEmail.textContent = "Formato de Email no válido");
  } else {
    errorEmail.textContent = "";
  }

  if (!regTelefono.test(telefono.value)) {
    return (errorTelefono.textContent = "Solo ingrese números");
  } else {
    errorTelefono.textContent = "";
  }
  errorNombre.textContent = "";
  errorEmail.textContent = "";
  errorTelefono.textContent = "";
  mensajeEnvioExitoso();
});

//Mensaje Exitoso cuando se envió el pedido
const mensajeEnvioExitoso = () => {
  Swal.fire({
    icon: "success",
    title: "Hemos Recibido su pedido Correctamente",
    text: "En breve nos comunicaremos para coordinar entrega y forma de pago",
    confirmButtonText: "Aceptar",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("carritoFiambreria");
      location.href = "index.html";
    }
  });
};
