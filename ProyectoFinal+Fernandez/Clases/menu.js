
class Menu {
  constructor() {
    this.items = [];
    this.cargarPlatosDesdeLocalStorageOJSON(); // Cargar los platos desde el almacenamiento local
  }



  agregarPlato(nombre, precio, ingredientes, tipo) {
    const plato = new Platos(nombre, precio, ingredientes, tipo);
    this.items.push(plato);
    this.guardarPlatosEnStorage(); // Guardar el nuevo plato en el almacenamiento local
    return plato;
  }


  eliminarPlato(nombre) {
    // Eliminar el plato del array this.items
    this.items = this.items.filter((plato) => plato.nombre !== nombre);

    // Actualizar el almacenamiento local
    this.guardarPlatosEnStorage();
  }

  //guardar platos en el storage
  guardarPlatosEnStorage() {
    localStorage.setItem("platos", JSON.stringify(this.items));
  }

  cargarPlatosDesdeLocalStorage() { 

    const platosEnStorage = JSON.parse(localStorage.getItem("platos"));
    if (platosEnStorage && Array.isArray(platosEnStorage)) {
      this.items = platosEnStorage;
    }
  }

  cargarPlatosDesdeStorage() {
    const platosStorage = JSON.parse(localStorage.getItem("platos"));
    if (Array.isArray(platosStorage)) {
      this.items = platosStorage;
      console.log("Datos cargados desde el almacenamiento local.");
    } else {
      console.error("Los datos cargados desde el almacenamiento local no son un array válido.");
    }
  }

  async cargarPlatosDesdeJSON() {
    try {
      const response = await fetch("platos.json");
      const platosDefinidos = await response.json();
  
      if (Array.isArray(platosDefinidos)) {
        const platosEnStorage = JSON.parse(localStorage.getItem("platos"));
  
        if (!platosEnStorage || !Array.isArray(platosEnStorage)) {
          localStorage.setItem("platos", JSON.stringify(platosDefinidos));
          console.log("Datos guardados en el almacenamiento local.");
        }
  
        this.items = platosDefinidos;
        console.log("Datos cargados desde el archivo JSON.");
      } else {
        console.error("Los datos cargados desde el archivo JSON no son un array válido.");
      }
    } catch (error) {
      console.error("Error al cargar los datos desde el archivo JSON:", error);
    }
  }

  cargarPlatosDesdeLocalStorageOJSON() {
    const platosEnStorage = JSON.parse(localStorage.getItem("platos"));

    if (platosEnStorage && Array.isArray(platosEnStorage) && platosEnStorage.length > 0) {
      // Si hay platos en el almacenamiento local, cargar desde allí
      this.cargarPlatosDesdeLocalStorage();
    } else {
      // Si no hay platos en el almacenamiento local, cargar desde el JSON
      this.cargarPlatosDesdeJSON();
    }
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
            
            
            Toastify({
              text: "Plato Modificado",
              offset: {
                x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
              },
              className: "toastifyMod", 
            }).showToast();
            this.eliminarPlato(plato.nombre);
            this.agregarPlato(nuevoNombre,nuevoPrecio,nuevosIngredientes,nuevoTipo);
            this.guardarPlatosEnStorage();
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
  
 
  
  
 }
