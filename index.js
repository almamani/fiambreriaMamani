// VARIABLES y CONSTANTES GLOBALES
const IVA = 1.21;
let total = 0;

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

class Venta {
  constructor(desc, pre, des, can) {
    this.descripcion = desc;
    this.precio = pre;
    this.descuento = des;
    this.cantidad = can;
    this.subtotal = 0;
  }
}

// DECLARACION DE ARRAYS
const articulos = [];
const ventas = [];

// FUNCIONES
// Las tres siguientes funciones son en respuesta de los click en "cargar" de cada uno de los productos

function respuestaClickSandwich() {
  let cantidad = document.getElementsByClassName("cantidad")[0].value;
  //Carga el array de ventas
  ventas.push(
    new Venta(
      articulos[0].nombre,
      articulos[0].precio,
      articulos[0].descuento,
      cantidad
    )
  );

  res =
    (articulos[0].precio - articulos[0].precio * articulos[0].descuento) *
    IVA *
    cantidad;
  ventas[0].subtotal = res;
  subtotal[0].innerHTML = "Subtotal: $" + res;
  console.log(ventas[0].subtotal);
}
function respuestaClickPicada() {
  let cantidad = document.getElementsByClassName("cantidad")[1].value;
  //Carga el array de ventas
  ventas.push(
    new Venta(
      articulos[1].nombre,
      articulos[1].precio,
      articulos[1].descuento,
      cantidad
    )
  );

  res =
    (articulos[1].precio - articulos[1].precio * articulos[1].descuento) *
    IVA *
    cantidad;
  ventas[1].subtotal = res;
  subtotal[1].innerHTML = "Subtotal: $" + res;
  console.log(ventas[1].subtotal);
}

function respuestaClickPizza() {
  let cantidad = document.getElementsByClassName("cantidad")[2].value;
  //Carga el array de ventas
  ventas.push(
    new Venta(
      articulos[2].nombre,
      articulos[2].precio,
      articulos[2].descuento,
      cantidad
    )
  );

  res =
    (articulos[2].precio - articulos[2].precio * articulos[2].descuento) *
    IVA *
    cantidad;
  ventas[2].subtotal = res;
  subtotal[2].innerHTML = "Subtotal: $" + res;
  console.log(ventas[2].subtotal);
}

//MUESTRA LA VENTA REALIZADA
function respuestaFinalizarVenta() {
  // Acumula el total
  total = ventas.reduce((acum, elem) => acum + elem.subtotal, 0);

  //Mientras el total sea >0 (Exista una compra) muestra la venta
  if (total > 0) {
    let tituloVent = document.createElement("h3");
    tituloVent.innerHTML =
      "------------------ Su Compra: -----------------------";
    document.body.append(tituloVent);

    // Muestra el array con las venta efectuada
    for (const venta of ventas) {
      let contVenta = document.createElement("div");
      contVenta.innerHTML = `<h4>${venta.descripcion}</h4>
  <p>Cantidad: ${venta.cantidad}</p>
  <p>Subtotal: $${venta.subtotal}</p>`;
      document.body.appendChild(contVenta);
    }

    //Muestra el total de la venta
    let totalFinal = document.createElement("h4");
    totalFinal.innerHTML = `Total Compra: $${total}`;
    document.body.append(totalFinal);
  }
}

//SCRIPT PRINCIPAL
//Carga de los artículos en el array artículos
articulos.push(
  new Articulo("1", "Sandwich por Docena", 900, "10%", 0.1, "img/img1.jpg")
);
articulos.push(
  new Articulo(
    "2",
    "Bandeja de Super Picada",
    1000,
    "15%",
    0.15,
    "img/img2.jpg"
  )
);
articulos.push(
  new Articulo("3", "Pizza Lista Completa", 1100, "20%", 0.2, "img/img3.jpg")
);

// Mostrar los artículos del array en el DOM
for (const articulo of articulos) {
  let contArticulo = document.createElement("div");
  contArticulo.innerHTML = `<img src=${articulo.imagen} />' <h3>${articulo.nombre}</h3><b>$${articulo.precio} - </b><b>Dto: ${articulo.porcentaje} - </b><input class="cantidad" type="number" placeholder="cantidad" size="4"><input type="button" value="Agregar" class="agregar"><h4 class="subtotal"></h4><p>---------------------------------------------------------------------</p>`;
  document.body.appendChild(contArticulo);
}

// Agrega un botón para que el usuario pueda confirmar la venta
let btnFinalizarVenta = document.createElement("button");
btnFinalizarVenta.innerHTML = `Finalizar Compra`;
document.body.append(btnFinalizarVenta);

let subtotal = document.getElementsByClassName("subtotal");

// Toma los click de los botones que se realicen en cada producto para agregar los mismos
let btnArgregar = document.getElementsByClassName("agregar");

btnArgregar[0].addEventListener("click", respuestaClickSandwich);

btnArgregar[1].addEventListener("click", respuestaClickPicada);

btnArgregar[2].addEventListener("click", respuestaClickPizza);

// Toma el click del boton finalizar para mostrar los datos de la venta realizada
btnFinalizarVenta = document.getElementsByTagName("button");
btnFinalizarVenta[0].addEventListener("click", respuestaFinalizarVenta);
