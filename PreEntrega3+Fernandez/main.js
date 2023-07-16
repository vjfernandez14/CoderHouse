
class Menu {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("platos")) || [];
    console.log(this.items)
  }

  agregarPlato_us() {
    const nombre = prompt("Ingrese el nombre del plato:");
    const precio = parseFloat(prompt("Ingrese el precio del plato:"));
    const ingredientes = prompt("Ingrese los ingredientes del plato (separados por coma):").split(",").map((nombre) => ({
      nombre: nombre.trim()
    }));
    const tipo = prompt("Ingrese el tipo del plato:");
    const plato = new Platos(nombre, precio, ingredientes, tipo);
    this.items.push(plato);
    return plato;
  }

  agregarPlato(nombre, precio, ingredientes, tipo) {
    const plato = new Platos(nombre, precio, ingredientes, tipo);
    this.items.push(plato)
    return plato;
  }

  eliminarPlato(nombre) {
    //utilizamos el metodo filter para crear un nuevo array, que excluya el valor buscado
    this.items = this.items.filter((plato) => plato.nombre !== nombre);
    this.guardarPlatosEnStorage();
  }

  //guardar platos en el storage
  guardarPlatosEnStorage() {
    localStorage.setItem("platos", JSON.stringify(this.items));
  }

  cargarPlatosDesdeStorage() {
    this.items = JSON.parse(localStorage.getItem("platos"))
  }

  clasificacionMenu() {
    const clasificacion = {};

    this.items.forEach((plato) => {
      const tipo = plato.obtenerTipo(); //buscamos el tipo del plato
      if (clasificacion[tipo]) {
        clasificacion[tipo].push(plato);
      } else {
        clasificacion[tipo] = [plato];
      }

    });
    let resultado = "";

    for (const tipo in clasificacion) {
      resultado += `${tipo}:\n`;
      clasificacion[tipo].forEach((plato) => {
        resultado += plato.verDatos() + "\n";
      });
      resultado += "\n";
    }
    return resultado;
  }

  verPlatos() {
    const container = document.getElementById("platos-container");
    container.innerHTML = ""; //Limpio el contenedor

    this.items.forEach((plato) => {
      // Crear la tarjeta
      const card = document.createElement("div");
      card.classList.add("card", "col-md-3", "ms-5", "mb-2", "col-10");

      // Crear el cuerpo de la tarjeta
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      // Crear el botón de eliminar
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.classList.add("btn", "btn-danger");
      deleteButton.addEventListener("click", () => {
        this.eliminarPlato(plato.nombre);
        this.verPlatos(); // Volver a mostrar los platos actualizados en el DOM
      });

      // Crear el título
      const title = document.createElement("h5");
      title.classList.add("card-title");
      title.textContent = plato.nombre;

      // Crear los ingredientes
      const ingredients = document.createElement("p");
      ingredients.classList.add("card-text");
      ingredients.textContent = `Ingredientes: ${plato.ingredientes.map((ingrediente) => ingrediente.nombre).join(", ")}`;


      // Crear el precio
      const price = document.createElement("p");
      price.classList.add("card-text");
      price.textContent = `Precio: $${plato.precio}`;

      // Agregar los elementos al cuerpo de la tarjeta
      cardBody.appendChild(title);
      cardBody.appendChild(ingredients);
      cardBody.appendChild(price);
      //cardBody.appendChild(deleteButton);

      // Agregar el cuerpo de la tarjeta a la tarjeta
      card.appendChild(cardBody);

      // Agregar la tarjeta al contenedor
      container.appendChild(card);
    });
  }

  verPlatos_adm() {
    const container = document.getElementById("platos-container");
    container.innerHTML = ""; //Limpio el contenedor

    this.items.forEach((plato) => {
      // Crear la tarjeta
      const card = document.createElement("div");
      card.classList.add("card", "col-md-3", "ms-5", "mb-2", "col-10");

      // Crear el cuerpo de la tarjeta
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      // Crear el botón de eliminar
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.classList.add("btn", "btn-danger");
      deleteButton.addEventListener("click", () => {
        this.eliminarPlato(plato.nombre);
        this.verPlatos(); // Volver a mostrar los platos actualizados en el DOM
      });

      // Crear el botón Modificar
      const modButton = document.createElement("button");
      modButton.textContent = "Modificar";
      modButton.classList.add("btn", "btn-warning");
      modButton.addEventListener("click", () => {
        const nuevoNombre = prompt("Ingrese el nuevo nombre del plato:");
        const nuevoPrecio = parseFloat(prompt("Ingrese el nuevo precio del plato:"));
        const nuevosIngredientes = prompt("Ingrese los nuevos ingredientes del plato (separados por coma):").split(",").map((nombre) => ({
          nombre: nombre.trim()
        }));
        const nuevoTipo = prompt("Ingrese el nuevo tipo del plato:");
      
        const platoModificado = {
          nombre: nuevoNombre,
          precio: nuevoPrecio,
          ingredientes: nuevosIngredientes,
          tipo: nuevoTipo
        };
      
        this.modificarPlato(plato.nombre, platoModificado);
        this.verPlatos(); // Volver a mostrar los platos actualizados en el DOM
      });

      // Crear el título
      const title = document.createElement("h5");
      title.classList.add("card-title");
      title.textContent = plato.nombre;

      // Crear los ingredientes
      const ingredients = document.createElement("p");
      ingredients.classList.add("card-text");
      ingredients.textContent = `Ingredientes: ${plato.ingredientes.map((ingrediente) => ingrediente.nombre).join(", ")}`;


      // Crear el precio
      const price = document.createElement("p");
      price.classList.add("card-text");
      price.textContent = `Precio: $${plato.precio}`;

      // Agregar los elementos al cuerpo de la tarjeta
      cardBody.appendChild(title);
      cardBody.appendChild(ingredients);
      cardBody.appendChild(price);
      cardBody.appendChild(deleteButton);
      cardBody.appendChild(modButton);

      // Agregar el cuerpo de la tarjeta a la tarjeta
      card.appendChild(cardBody);

      // Agregar la tarjeta al contenedor
      container.appendChild(card);
    });
  }

  modificarPlato(nombre, platoModificado) {
    const platoEncontrado = this.items.find((plato) => plato.nombre === nombre);
  
    if (platoEncontrado) {
      platoEncontrado.nombre = platoModificado.nombre;
      platoEncontrado.precio = platoModificado.precio;
      platoEncontrado.ingredientes = platoModificado.ingredientes;
      platoEncontrado.tipo = platoModificado.tipo;
      this.guardarPlatosEnStorage();
      return platoEncontrado;
    } else {
      return null;
    }
  }

  aplicarDescuentoPromocional() {
    const codigoPromocion = prompt("Ingrese el código de promoción:");

    // Verificar si el código de promoción es válido
    if (codigoPromocion === "DESCUENTO20") {
      this.items.forEach((plato) => {
        const descuento = plato.precio * 0.2;
        plato.precio -= descuento;
      });

      alert("Descuento aplicado correctamente.");
    } else {
      alert("Código de promoción inválido.");
    }
  }


}



class Platos {
  constructor(nombre, precio, ingredientes, tipo) {
    this.nombre = nombre;
    this.precio = precio;
    this.ingredientes = ingredientes;
    this.tipo = tipo;
  }

  obtenerTipo() {
    return this.tipo;
  }

  verDatos() {
    //creo una variable que almacene los datos del array
    let ingredientesTexto = "";
    this.ingredientes.forEach((ingrediente, index) => {
      ingredientesTexto += ingrediente.nombre;
      if (index !== this.ingredientes.length - 1) {
        ingredientesTexto += ", ";
      }
    });

    return `Nombre: ${this.nombre}
        Precio: ${this.precio}
        Ingredientes: ${ingredientesTexto}
        Categoria: ${this.tipo}`;
  }


}

const crearFormulario = () => {
  const formularioContenedor = document.getElementById("form-container");
  formularioContenedor.innerHTML = `<h2 class="titulo2">Agregar Plato</h2>
    <form id="formularioNuevo">
        <div class="row">
            <div class="col-md-5 mt-2 ms-2 mb-2 me-2">
            <input id="inputNombrePlato" type="text" class="form-control" placeholder="Nombre del plato" required>
            </div>
            <div class="col-md-5 mt-2 ms-2 mb-2 me-2">
                <input id="inputIngredientesPlato" type="text" class="form-control" placeholder="Ingredientes (separado por ,)" required>
                </div>
        </div>
        <div class="row">
            <div class="col-md-5 mt-2 ms-2 mb-2 me-2">
                <select id="seleccionTipoPlato" class="form-select" required>
                    <option value="">Seleccione un tipo de plato</option>
                    <option value="entrada">Entrada</option>
                    <option value="principal">Principal</option>
                    <option value="postre">Postre</option>
                  </select>
            </div>
            <div class="col-md-5 mt-2 ms-2 mb-2 me-2">
                <input id="inputPrecioPlato" type="number" class="form-control" placeholder="Precio en ARS" required>
                </div>
        </div>

        <div class="row">
            <div class="col-md-1 mt-2 ms-2 mb-2 me-2">
                <button type="submit" class="btn btn-primary" id="btnGuardar">Guardar</button>
            </div>
            <div class="col-md-1 mt-2 ms-2 mb-2 me-2">
                <button type="submit" class="btn btn-danger" id="btnCancelar">Cancelar</button>
                </div>
        </div>
    </form>
    `;

  document.getElementById("btnGuardar").addEventListener("click", function (event) {
    event.preventDefault();
    crearPlato_us();
  });

};
const jbg = new Menu();
const crearPlato_us = () => {
  const nombre = document.getElementById("inputNombrePlato").value;
  const precio = parseFloat(document.getElementById("inputPrecioPlato").value);
  const ingredientes = document.getElementById("inputIngredientesPlato").value.split(",").map((nombre) => ({
    nombre: nombre.trim()
  }));
  const tipo = document.getElementById("seleccionTipoPlato").value;

  const plato = new Platos(nombre, precio, ingredientes, tipo);
  jbg.agregarPlato(plato);
  // jbg.guardarPlatosEnStorage();

  // Almacenar plato en el almacenamiento local
  const platosGuardados = JSON.parse(localStorage.getItem("platos")) || [];
  platosGuardados.push(plato);
  localStorage.setItem("platos", JSON.stringify(platosGuardados));

  // Limpiar los campos del formulario
  document.getElementById("inputNombrePlato").value = "";
  document.getElementById("inputPrecioPlato").value = "";
  document.getElementById("inputIngredientesPlato").value = "";
  document.getElementById("seleccionTipoPlato").value = "";

  // Mostrar mensaje de éxito
  alert("Plato agregado exitosamente.");


};

const cancelarPlato = () => {
  // Limpiar los campos del formulario
  document.getElementById("inputNombrePlato").value = "";
  document.getElementById("inputPrecioPlato").value = "";
  document.getElementById("inputIngredientesPlato").value = "";
  document.getElementById("seleccionTipoPlato").value = "";

  // Eliminar plato del almacenamiento local
  localStorage.removeItem("platos");

  // Mostrar mensaje de éxito
  alert("Plato cancelado.");
};

//Creamos la funcion que administrara el Menu


if(!localStorage.getItem("platos")){
  const plato1 = jbg.agregarPlato("Ensalada de frutas", 900, [
    { nombre: "manzana" },
    { nombre: "naranja" },
    { nombre: "plátano" },
  ],"Postre");

  const plato2 = jbg.agregarPlato("Ribeye", 2800, [
    { nombre: "Ojo de bife" },
    { nombre: "Pure de papa" },
    { nombre: "Coleslaw" },
  ],"Carnes");

  const plato3 = jbg.agregarPlato("Strip", 3500, [
    { nombre: "Bife de chorizo" },
    { nombre: "Pure de papa" },
    { nombre: "Caesar" },
  ],"Carnes");

  const plato4 = jbg.agregarPlato("Bastones de Muzza", 1800, [
    { nombre: "Muzzarela robozada" },
    { nombre: "Dip de BBQ" },
    { nombre: "Dip de aleoli" },
  ],"Entrada");

jbg.guardarPlatosEnStorage()
}





// interaccion DOM y JS, escucha de eventos
// escuchar click carta digital
document.addEventListener("DOMContentLoaded", function () {
  const enlacesCartaDigital = document.querySelectorAll(".nav-link");
  const segundoEnlace = enlacesCartaDigital[1]; // Segundo elemento (índice 1)

  segundoEnlace.addEventListener("click", function (event) {
    document.getElementById("platos-container").hidden = false;
    document.getElementById("form-container").hidden = true;
    event.preventDefault();
    jbg.cargarPlatosDesdeStorage();
    jbg.verPlatos();
  });



});

// escuchar click adm
document.addEventListener("DOMContentLoaded", function () {
  const enlacesAdm = document.querySelectorAll(".nav-link");
  const tercerEnlace = enlacesAdm[2]; // tercer elemento (índice 1)

  tercerEnlace.addEventListener("click", function (event) {
    document.getElementById("platos-container").hidden = false;
    document.getElementById("form-container").hidden = false;
    event.preventDefault();
    crearFormulario();
    jbg.verPlatos_adm();
    
  });


});

