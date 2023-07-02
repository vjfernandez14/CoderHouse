class Menu {
    constructor(){
        this.items = [];
    }

    agregarPlato_us(){
        const nombre = prompt("Ingrese el nombre del plato:");
        const precio = parseFloat(prompt("Ingrese el precio del plato:"));
        const ingredientes = prompt("Ingrese los ingredientes del plato (separados por coma):").split(",").map((nombre) => ({ nombre: nombre.trim() }));
        const tipo = prompt("Ingrese el tipo del plato:");
        const plato = new Platos(nombre,precio,ingredientes,tipo);
        this.items.push(plato);
        return plato;
    }

    agregarPlato(nombre,precio,ingredientes,tipo){
        
        const plato = new Platos(nombre,precio,ingredientes,tipo);
        this.items.push(plato);
        return plato;
    }

    eliminarPlato(nombre) {
        //utilizamos el metodo filter para crear un nuevo array, que excluya el valor buscado
        this.items = this.items.filter((plato) => plato.nombre !== nombre);
      }

    clasificacionMenu(){
        const clasificacion = {};

        this.items.forEach((plato)=>{
            const tipo = plato.obtenerTipo(); //buscamos el tipo del plato
            if (clasificacion[tipo]) {
                clasificacion[tipo].push(plato);
            }else {
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
        let datosplatos = "";
        this.items.forEach(plato => {
            datosplatos += `${plato.verDatos()} \n`;
        });
        return datosplatos;
    }

    modificarPlato(nombre, nuevoNombre, nuevoPrecio, nuevosIngredientes, nuevoTipo) {
        const platoEncontrado = this.items.find((plato) => plato.nombre === nombre);

        if (platoEncontrado) {
            platoEncontrado.nombre = nuevoNombre;
            platoEncontrado.precio = nuevoPrecio;
            platoEncontrado.ingredientes = nuevosIngredientes;
            platoEncontrado.tipo = nuevoTipo;
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
    constructor(nombre, precio, ingredientes,tipo){
        this.nombre = nombre;
        this.precio = precio;
        this.ingredientes = ingredientes;
        this.tipo = tipo;
    }

    obtenerTipo(){
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

//Creamos la funcion que administrara el Menu

function admMenu(){
    //const jbg = new Menu();
    let opcion = "";
    do {   
        opcion = prompt('Seleccione una opcion:\n1. Ver menu\n2. Agregar plato\n3. Eliminar plato\n4. Modificar plato\n5.Aplicar descuento \n10. Salir');

        switch (opcion) {
            case "1":
                alert(jbg.clasificacionMenu());
                break;

            case "2":
                jbg.agregarPlato_us();
                break;

            case "3":
                nom = prompt("Ingrese el nombre del plato a eliminar:")
                jbg.eliminarPlato(nom);
                break;

            case "4":
                nom = prompt("Ingrese el nombre del plato a modificar:")
                let comparacion = jbg.items.some((plato) => plato.nombre === nom);
                if (comparacion){
                jbg.eliminarPlato(nom);
                jbg.agregarPlato_us()

            
            }else {
                alert("El plato no existe, puede agregarlo en la opcion 2");
            }
                break;

            case "5":
                jbg.aplicarDescuentoPromocional();
                break;

            case "10":
                
                break;
        
            default:
                alert("Opcion invalida.");
                break;
        }
        
    } while (opcion != 10);{
        alert("Te esperamos pronto");
    }
}

const jbg = new Menu();
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


admMenu();


