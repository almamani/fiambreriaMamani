// DECLARACIONES
const IVA = 1.21;

const contenedorArt = document.getElementById("articulos");
const tablaCompras = document.getElementById("tablaCompras");

class Articulo {
  constructor(cod, nom, pre, porc, des, img) {
    this.codigo = cod;
    this.nombre = nom;
    this.precio = pre;
    this.porcentaje = porc;
    this.descuento = des;
    this.imagen = img;
  }
}

class Compra {
  constructor(nom, pre, des, can, img) {
    this.nombre = nom;
    this.precio = pre;
    this.descuento = des;
    this.cantidad = can;
    this.subtotal = 0;
    this.imagen = img;
  }
  calcSubtotal() {
    this.subtotal =
      (this.precio - this.precio * this.descuento) * IVA * this.cantidad;
  }
}

const articulos = [];
const compras = [];

//FUNCIONES
//--- Generación de cada artículo apartir de los artículos del storage para luego agregarlos al DOM
const crearArticulo = ({ imagen, nombre, precio, porcentaje, codigo }) => {
  return `
<div class="card" style="width: 18rem;">
  <img src="${imagen}" class="card-img-top" alt="${nombre}">
  <div class="card-body">
    <h4 class="card-title">${nombre}</h4>
    <p class="card-text">Precio: $${precio}</p>
    <p class="card-text">Descuento: ${porcentaje}</p>
    <b>Cantidad: <input type="number" class="cantidad w-25" min="0"/></b>
     <a href="#" onclick="agregarCarrito(${codigo})"  class="btn btn-primary">Agregar</a><p><h5 class="subtotal"></h5></p>
  </div>
</div>
`;
};

//--- Generación de cada compra  a partir de las transacciones guardadas en el array compras
const crearCompra = ({ cantidad, nombre, subtotal, imagen }) => {
  return `
 <tr>
      <td class=text-center>${cantidad}</td>
      <td>${nombre}</td>
      <td>$${subtotal}</td>
      <td><img style="width: 40px" src="${imagen}" alt="imagen"></td>
    </tr>
`;
};

//--- Carga de los artículos en el DOM
const agregarArticulos = (datos, nodo) => {
  let acumulador = "";
  datos.forEach((el) => {
    acumulador += crearArticulo(el);
  });
  nodo.innerHTML = acumulador;
  mensajePromocion();
};

//--- Carga el total en la ventana modal
const agregarTotal = () => {
  let muestraTotal = document.getElementById("total");
  muestraTotal.innerHTML = "Total: $" + total;
};

//--- Carga de las compras a una ventana modal para mostrar el resumen de las compras realizadas y el total de la compra
const agregarCompras = (datos, nodo) => {
  let acumulador = "";
  datos.forEach((elemento) => {
    acumulador += crearCompra(elemento);
  });
  nodo.innerHTML = acumulador;
  total = compras.reduce((acum, elem) => acum + elem.subtotal, 0);
  total > 0 && agregarTotal();
};

// --- Genera la compra que se agrega en el carrito, para lo cual previamente calcula el subtotal de acuerdo a los datos del artículo seleccionado (precio, descuento) y la cantidad ingresada

const generarCompra = (id, cantidad) => {
  const filtrado = articulos.find((item) => item.codigo == id);

  compras.push(
    new Compra(
      filtrado.nombre,
      filtrado.precio,
      filtrado.descuento,
      cantidad,
      filtrado.imagen
    )
  );
  compras[id].calcSubtotal();

  let subtotal = document.getElementsByClassName("subtotal");
  subtotal[id].innerHTML = "Subtotal: $" + compras[id].subtotal;
  agregarCompras(compras, tablaCompras);
};

//--- Emite mensaje cuando falta la cantidad
const mensajeFaltaCantidad = () => {
  Swal.fire({
    icon: "warning",
    title: "No pudimos agregar el artículo",
    text: "Ingresá la Cantidad",
    confirmButtonText: "Aceptar",
  });
};

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

//SCRIPT PRINCIPAL
//--- Carga de los artículos en el array artículos y luego en el storage
articulos.push(
  new Articulo("0", "Sandwich Docena", 900, "10%", 0.1, "img/img1.jpg")
);
articulos.push(
  new Articulo("1", "Bandeja de Picada", 1000, "15%", 0.15, "img/img2.jpg")
);
articulos.push(
  new Articulo("2", "Pizza Completa", 1100, "20%", 0.2, "img/img3.jpg")
);

localStorage.setItem("articulosStorage", JSON.stringify(articulos));

//--- Carga  de los artículos en el Dom a partir del Storage
const storageArticulos = JSON.parse(localStorage.getItem("articulosStorage"));
agregarArticulos(storageArticulos, contenedorArt);

//--- Carga las compras al array de compras, en caso de que la cantidad sea = 0 o un campo vacío muestra un mensaje de error
const agregarCarrito = (id) => {
  let cantidad = document.getElementsByClassName("cantidad")[id].value;
  (cantidad == "0" || cantidad == "") > 0
    ? mensajeFaltaCantidad()
    : generarCompra(id, cantidad);
};

//--- Boton Finalizar: permite mostrar la ventana modal con el resumen de la compra y el total
