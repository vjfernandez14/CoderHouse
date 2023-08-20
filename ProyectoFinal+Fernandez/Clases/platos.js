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
    const ingredientesTexto = this.ingredientes.map(ingrediente => ingrediente.nombre).join(", ");
    return `Nombre: ${this.nombre}
        Precio: ${this.precio}
        Ingredientes: ${ingredientesTexto}
        Categoria: ${this.tipo}`;
}


}