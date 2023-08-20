

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
  
  });

};
const jbg = new Menu();
//jbg.cargarPlatosDesdeLocalStorage();
const crearPlato_us = () => {
  const nombre = document.getElementById("inputNombrePlato").value;
  const precio = parseFloat(document.getElementById("inputPrecioPlato").value);
  const ingredientesTexto = document.getElementById("inputIngredientesPlato").value;
  const ingredientesArray = ingredientesTexto.split(",").map(nombre => nombre.trim());
  const tipo = document.getElementById("seleccionTipoPlato").value;
  
  jbg.agregarPlato(nombre, precio, ingredientesArray, tipo); // Crea un nuevo objeto Platos
  //jbg.guardarPlatosEnStorage();

  // Limpiar los campos del formulario
  document.getElementById("inputNombrePlato").value = "";
  document.getElementById("inputPrecioPlato").value = "";
  document.getElementById("inputIngredientesPlato").value = "";
  document.getElementById("seleccionTipoPlato").value = "";

  // Mostrar mensaje de éxito
  Swal.fire({
    position: 'top',
    icon: 'success',
    title: 'Plato creado exitosamente',
    showConfirmButton: false,
    timer: 1500
  });

  // Volver a mostrar los platos en la Carta Digital
  jbg.verPlatos();
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
    //jbg.cargarPlatosDesdeLocalStorage();
    jbg.cargarPlatosDesdeLocalStorageOJSON();
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
    jbg.cargarPlatosDesdeLocalStorage();
    //jbg.cargarPlatosDesdeLocalStorageOJSON
    jbg.verPlatos_adm();
    
  });


}); 


