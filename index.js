// VARIABLES y CONSTANTES GLOBALES
let index = 0;
const IVA = 1.21;

// CLASES
class Articulo {
  constructor(cod, desc, pre, porc, des) {
    this.codigo = cod;
    this.descripcion = desc;
    this.descuento = des;
    this.precio = pre;
    this.porcentaje = porc;
    this.descuento = des;
  }
}

class Venta {
  constructor(desc, pre, des, can) {
    this.descripcion = desc;
    this.precio = pre;
    this.descuento = des;
    this.cantidad = can;
    this.subtotal = 0;
    this.toString = function () {
      return (
        "- " +
        this.descripcion +
        " " +
        "- Cantidad:" +
        " " +
        this.cantidad +
        " - $" +
        this.subtotal
      );
    };
  }
  calcSubtotal() {
    this.subtotal =
      (this.precio - this.precio * this.descuento) * IVA * this.cantidad;
  }
}

// DECLARACION DE ARRAYS
const articulos = [];
const ventas = [];

// FUNCIONES
function validarArt(codArt) {
  while (codArt != "1" && codArt != "2" && codArt != "3" && codArt != "4") {
    codArt = prompt(
      "Código Erroneo, Reeingrese Código de Artículo: \n (1) Sandwich (2) Picada (3) Pizza (4) Salir"
    );
  }
  return codArt;
}

//SCRIPT PRINCIPAL
articulos.push(new Articulo("1", "Sandwich por Docena", 900, "10%", 0.1));
articulos.push(new Articulo("2", "Bandeja de Super Picada", 1000, "15%", 0.15));
articulos.push(new Articulo("3", "Pizza Lista Completa", 1100, "20%", 0.2));

let codigo = prompt(
  "Ingrese Código de Artículo: \n(1) Sandwich (2) Picada (3) Pizza (4) Salir"
);

codigo = validarArt(codigo);

while (codigo != 4) {
  const filtrado = articulos.find((elemento) => elemento.codigo === codigo);
  let cantidad = prompt(
    "ARTÍCULO:" +
      " " +
      filtrado.descripcion +
      " " +
      "Precio: $" +
      filtrado.precio +
      " " +
      "Descuento: " +
      filtrado.porcentaje +
      "\nIngrese Cantidad:"
  );
  ventas.push(
    new Venta(
      filtrado.descripcion,
      filtrado.precio,
      filtrado.descuento,
      cantidad
    )
  );

  ventas[index].calcSubtotal();

  const total = ventas.reduce((acum, elem) => acum + elem.subtotal, 0);

  codigo = prompt(
    "Su compra: \n" +
      ventas.join("\n") +
      "\nTotal c/IVA ------------: $" +
      total +
      "\nIngrese Código de Artículo: | (1) Sandwich (2) Picada (3) Pizza (4) Salir"
  );

  codigo = validarArt(codigo);
  index = index + 1;
}
