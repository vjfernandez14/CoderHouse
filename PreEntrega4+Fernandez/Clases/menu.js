
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
    // Eliminar el plato del archivo JSON
    eliminarPlatoDesdeJSON(nombre);

    // Eliminar el plato del array this.items
    this.items = this.items.filter((plato) => plato.nombre !== nombre);

    // Actualizar el almacenamiento local
    this.guardarPlatosEnStorage();
  }

  //guardar platos en el storage
  guardarPlatosEnStorage() {
    localStorage.setItem("platos", JSON.stringify(this.items));
  }

  cargarPlatosDesdeStorage() {
    this.items = JSON.parse(localStorage.getItem("platos"))
  }

  async cargarPlatosDesdeJSON() {
    try {
      const response = await fetch("platos.json");
      const platosDefinidos = await response.json();

      if (Array.isArray(platosDefinidos)) {
        // Si los datos son un array válido, asignarlos a this.items
        this.items = platosDefinidos;
        console.log("Datos cargados desde el archivo JSON.");
      } else {
        console.error("Los datos cargados desde el archivo JSON no son un array válido.");
      }
    } catch (error) {
      console.error("Error al cargar los datos desde el archivo JSON:", error);
    }
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
    container.innerHTML = ""; // Limpio el contenedor
  
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
        Swal.fire({
          title: '¿Estas seguro?',
          text: "No podras revertir esta accion",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, borrar.'
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarPlato(plato.nombre);
            this.verPlatos(); 
            Toastify({
              text: "Plato eliminado",
              offset: {
                x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
              },
              className: "toastifyDanger", 
            }).showToast();
  
            // Actualizar el archivo JSON después de eliminar el plato
            const platosActualizados = this.items.filter((item) => item.nombre !== plato.nombre);
            guardarPlatosEnJSON(platosActualizados);
          }
        });
      });
  
      // Crear el botón Modificar
      const modButton = document.createElement("button");
      modButton.textContent = "Modificar";
      modButton.classList.add("btn", "btn-warning");
      modButton.addEventListener("click", () => {
        Swal.fire({
          title: 'Modificar plato',
          html: `<input id="swal-input1" class="swal2-input" value="${plato.nombre}" placeholder="Nombre del plato">
                 <input id="swal-input2" class="swal2-input" value="${plato.precio}" placeholder="Precio del plato">
                 <input id="swal-input3" class="swal2-input" value="${plato.ingredientes.map(ing => ing.nombre).join(', ')}" placeholder="Ingredientes (separados por coma)">
                 <input id="swal-input4" class="swal2-input" value="${plato.tipo}" placeholder="Tipo del plato">`,
          focusConfirm: false,
          preConfirm: () => {
            const nuevoNombre = document.getElementById('swal-input1').value;
            const nuevoPrecio = parseFloat(document.getElementById('swal-input2').value);
            const nuevosIngredientes = document.getElementById('swal-input3').value.split(",").map((nombre) => ({
              nombre: nombre.trim()
            }));
            const nuevoTipo = document.getElementById('swal-input4').value;
            
            const platoModificado = {
              nombre: nuevoNombre,
              precio: nuevoPrecio,
              ingredientes: nuevosIngredientes,
              tipo: nuevoTipo
            };
            Toastify({
              text: "Plato Modificado",
              offset: {
                x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
              },
              className: "toastifyMod", 
            }).showToast();
            this.modificarPlato(plato.nombre, platoModificado);
            this.verPlatos(); // Volver a mostrar los platos actualizados en el DOM
          }
        });
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

