function calcularArea() {
    var forma = prompt("Ingrese una forma geometrica( cuadrado, triangulo, rectangulo):");
    var base = parseFloat(prompt("Ingrese la base:"));
    var altura = parseFloat(prompt("Ingrese la altura:"));

    switch (forma.toLowerCase()) {
        case "cuadrado":
            area = base * base;
            console.log("El area del cuadrado es:" + area);
            break;

        case "triangulo":
           area = (base * altura)/2;
           console.log("El area del triangulo es:" + area);
           break;

        case "rectangulo":
           area = base * altura;
           console.log("El area del rectangulo es:" + area);
           break;
    
        default:
            console.log("Forma geometrica invalida");
            break;
    }

}

calcularArea();