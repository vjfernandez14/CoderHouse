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