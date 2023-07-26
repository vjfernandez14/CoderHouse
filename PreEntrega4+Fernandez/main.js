

const crearFormulario = () => {
  const formularioContenedor = document.getElementById("form-container");
  formularioContenedor.innerHTML = `<h2 class="titulo2">Agregar Plato</h2>
    <form id="formularioNuevo">
        <div class="row">
            <div class="col-md-5 mt-2 ms-2 mb-2 me-2">
            <input id="inputNombrePlato" type="text" class="form-control" placeholder="Nombre del plato" required>
            </div>
            <div class="col-xs-12 col-md-5 mt-2 ms-2 mb-2 me-2">
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
    // Llamar a la función para guardar los datos en el archivo JSON
    guardarPlatosEnJSON(jbg.items);
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
  Swal.fire({
    position: 'top',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })


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

// Cargar los datos del archivo JSON en localStorage
const cargarPlatosDesdeJSON = async () => {
  try {
    const response = await fetch("platos.json");
    const platosDefinidos = await response.json();
    console.log("Datos cargados desde el archivo JSON.");
    return platosDefinidos;
  } catch (error) {
    console.error("Error al cargar los datos desde el archivo JSON:", error);
    return [];
  }
};


// Función para eliminar un plato del archivo JSON
const eliminarPlatoDesdeJSON = async (nombrePlatoAEliminar) => {
  try {
    // Cargar los datos del archivo JSON
    const platos = await cargarPlatosDesdeJSON();

    // Filtrar los platos y excluir el plato a eliminar
    const platosFiltrados = platos.filter((plato) => plato.nombre !== nombrePlatoAEliminar);

    // Guardar los datos actualizados en el archivo JSON
    await guardarPlatosEnJSON(platosFiltrados);

    console.log("Plato eliminado del archivo JSON.");
  } catch (error) {
    console.error("Error al eliminar el plato del archivo JSON:", error);
  }
};

const guardarPlatosEnJSON = async (platos) => {
  try {
    // Guardar los datos en el archivo JSON
    const response = await fetch("platos.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(platos),
    });

    console.log("Platos guardados en el archivo JSON.");
  } catch (error) {
    console.error("Error al guardar los platos en el archivo JSON:", error);
  }
};


// Llamar a la función para cargar los datos al cargar la página
cargarPlatosDesdeJSON();

// interaccion DOM y JS, escucha de eventos
// escuchar click en home
document.addEventListener("DOMContentLoaded",function(){
  const enlacesHome = document.querySelectorAll(".nav-link");
  const tercerEnlace = enlacesHome[0];//Primer enlace

  tercerEnlace.addEventListener("click",function(){
    document.getElementById("platos-container").hidden = false;
    document.getElementById("form-container").hidden = false; 
  });

});
// escuchar click carta digital
document.addEventListener("DOMContentLoaded", function () {
  const enlacesCartaDigital = document.querySelectorAll(".nav-link");
  const segundoEnlace = enlacesCartaDigital[1]; // Segundo elemento (índice 1)

  segundoEnlace.addEventListener("click", function (event) {
    document.getElementById("platos-container").hidden = false;
    document.getElementById("form-container").hidden = true;
    document.getElementById("inicio-container").hidden = true;
    event.preventDefault();
    //jbg.cargarPlatosDesdeJSON();
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
    document.getElementById("inicio-container").hidden = true;
    event.preventDefault();
    crearFormulario();
    jbg.verPlatos_adm();
    
  });


}); 


