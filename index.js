// VARIABLES y CONSTANTES GLOBALES
let index = 0;
const IVA = 1.21;
let totalVenta = 0;

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
//Función que permite validar el código entre 1 y 4
function validarArt(codArt) {
  while (codArt != "1" && codArt != "2" && codArt != "3" && codArt != "4") {
    codArt = prompt(
      "Código Erroneo, Reeingrese Código de Artículo: \n (1) Sandwich (2) Picada (3) Pizza (4) Salir"
    );
  }
  return codArt;
}

//SCRIPT PRINCIPAL
//Carga de los artículos en el array artículos
articulos.push(new Articulo("1", "Sandwich por Docena", 900, "10%", 0.1));
articulos.push(new Articulo("2", "Bandeja de Super Picada", 1000, "15%", 0.15));
articulos.push(new Articulo("3", "Pizza Lista Completa", 1100, "20%", 0.2));

let codigo = prompt(
  "Ingrese Código de Artículo: \n(1) Sandwich (2) Picada (3) Pizza (4) Salir"
);

//Valida el código (entre 1 y 4)
codigo = validarArt(codigo);

// Busca en el array los artículos correspondientes a los códigos ingresados hasta que se ingresa 4
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
  //Carga el array de ventas
  ventas.push(
    new Venta(
      filtrado.descripcion,
      filtrado.precio,
      filtrado.descuento,
      cantidad
    )
  );
  ventas[index].calcSubtotal();
  // Acumula el total
  const total = ventas.reduce((acum, elem) => acum + elem.subtotal, 0);

  // Muestra el array de ventas
  codigo = prompt(
    "Su compra: \n" +
      ventas.join("\n") +
      "\nTotal c/IVA ------------: $" +
      total +
      "\nIngrese Código de Artículo: | (1) Sandwich (2) Picada (3) Pizza (4) Salir"
  );

  // Guarda el total en una variable global para luego mostrarlo en el html
  totalVenta = total;
  //Valida el nuevo código para reingresar al ciclo
  codigo = validarArt(codigo);
  // Incrementa el indice del vector de ventas para la próxima iteracion
  index = index + 1;
}

// MOSTRAR DATOS DE LA VENTA POR HTML
// Controla que se haya efectuado una venta
if (totalVenta > 0) {
  let tituloVent = document.createElement("h3");
  tituloVent.innerHTML = "---- Confirmar Compra ----";
  document.body.append(tituloVent);

  // Muestra el array con las venta efectuada
  for (const venta of ventas) {
    let contVenta = document.createElement("div");
    contVenta.innerHTML = `<h4>${venta.descripcion}</h4>
  <p>Cantidad: ${venta.cantidad}</p>
  <p>Subtotal: $${venta.subtotal}</p>`;
    document.body.appendChild(contVenta);
  }

  //Calcula el total de la venta y lo muestra
  let totalFinal = document.createElement("h4");
  totalFinal.innerHTML = `Total Compra: $${totalVenta}`;
  document.body.append(totalFinal);

  // Agrega un botón para que el usuario pueda confirmar la venta para agregar la acción cuando veamos eventos
  let confirmar = document.createElement("button");
  confirmar.innerHTML = `Confirmar`;
  document.body.append(confirmar);
}
