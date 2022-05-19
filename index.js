// VARIABLES y CONSTANTES GLOBALES
const IVA = 1.21;
let total = 0;
const contenedorArt = document.getElementById("articulos");
const tablaCompras = document.getElementById("tablaCompras");

const articulos = [];
const compras = [];

// CLASES
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

//Carga de los artículos en el array artículos
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

// Genera cada artículo apartir del array de Articulos para luego agregarlos al DOM
const crearArticulo = (item) => {
  return `
<div class="card" style="width: 18rem;">
  <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}">
  <div class="card-body">
    <h4 class="card-title">${item.nombre}</h4>
    <p class="card-text">Precio: $${item.precio}</p>
    <p class="card-text">Descuento: ${item.porcentaje}</p>
    <b>Cantidad: <input type="number" class="cantidad w-25" min="0"/></b>
     <a href="#" onclick="agregarCarrito(${item.codigo})"  class="btn btn-primary">Agregar</a><p><h5 class="subtotal"></h5></p>
  </div>
</div>
`;
};

// Genera cada compra  a partir de las transacciones guardades en Local Storage para luego mostrarlas en el DOM
const crearCompra = (item) => {
  return `
 <tr>
      <td class=text-center>${item.cantidad}</td>
      <td>${item.nombre}</td>
      <td>$${item.subtotal}</td>
      <td><img style="width: 40px" src="${item.imagen}" alt="imagen"></td>
    </tr>
`;
};

//Agrega los artículos al DOM
const agregarArticulos = (datos, nodo) => {
  let acumulador = "";
  datos.forEach((el) => {
    acumulador += crearArticulo(el);
  });
  nodo.innerHTML = acumulador;
};

// Agrega las compras a una ventana modal para mostrar el resumen de las compras realizadas
const agregarCompras = (datos, nodo) => {
  let acumulador = "";
  datos.forEach((elemento) => {
    acumulador += crearCompra(elemento);
  });
  nodo.innerHTML = acumulador;
};

//Cargar los artículos en el Dom
const storageArticulos = JSON.parse(localStorage.getItem("articulosStorage"));
agregarArticulos(storageArticulos, contenedorArt);

//Por cada click en un artículo calcula subtotal y guarda los datos de la compra en el Local Storage
const agregarCarrito = (id) => {
  let subtotal = document.getElementsByClassName("subtotal");
  const seleccionado = articulos.find((item) => item.codigo == id);
  let cantidad = document.getElementsByClassName("cantidad")[id].value;
  resultado =
    (seleccionado.precio - seleccionado.precio * seleccionado.descuento) *
    IVA *
    cantidad;
  subtotal[id].innerHTML = "Subtotal: $" + resultado;

  compras.push({
    cantidad: cantidad,
    nombre: seleccionado.nombre,
    subtotal: resultado,
    imagen: seleccionado.imagen,
  });

  agregarCompras(compras, tablaCompras);
};
