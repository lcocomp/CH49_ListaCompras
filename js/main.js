const btnAgregar = document.getElementById("btnAgregar");
const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");
const contadorProductos = document.getElementById("contadorProductos");
const btnClear = document.getElementById("btnClear");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody")[0];
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

let cont = 0; // Contador de productos agregados
let costoTotal = 0; // Precio total
let totalEnProductos = 0; // Total de unidades de productos

// Función para validar la cantidad ingresada
function validarCantidad() {
    if (txtNumber.value.length <= 0) return false; // No vacío
    if (isNaN(txtNumber.value)) return false; // Es un número
    if (Number(txtNumber.value) <= 0) return false; // Mayor a cero
    return true;
}

// Función para generar un precio aleatorio
function getPrecio() {
    return Math.round(Math.random() * 10000) / 100; // Precio con 2 decimales
}

// Evento para agregar un producto a la lista
btnAgregar.addEventListener("click", function (event) {
    event.preventDefault(); // Evita que el formulario recargue la página

    // Reiniciar estilos y mensajes de alerta
    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

    // Bandera de validación
    let isValid = true;

    // Validar nombre del producto
    if (txtName.value.trim().length < 3) {
        txtName.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML += "<strong>El nombre del producto no es correcto</strong><br/>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }

    // Validar cantidad
    if (!validarCantidad()) {
        txtNumber.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML += "<strong>La cantidad no es correcta</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }

    // Si las validaciones son correctas, agregar el producto
    if (isValid) {
        cont++;
        const precio = getPrecio();
        const cantidad = Number(txtNumber.value);

        // Crear nueva fila para la tabla
        let row = `
            <tr>
                <td>${cont}</td>
                <td>${txtName.value.trim()}</td>
                <td>${cantidad}</td>
                <td>$${precio.toFixed(2)}</td>
            </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);

        // Actualizar totales
        costoTotal += precio * cantidad;
        totalEnProductos += cantidad;

        // Mostrar los totales en la interfaz
        precioTotal.innerText = `$${costoTotal.toFixed(2)}`;
        contadorProductos.innerText = cont;
        productosTotal.innerText = totalEnProductos;

        //almacenar datos en local storage
        localStorage.setItem("costoTotal",costoTotal);
        localStorage.setItem("totalenProductos",totalEnProductos);
        localStorage.setItem("cont",cont);

        // Limpiar campos del formulario
        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }
});

// Evento para limpiar la tabla y reiniciar los valores
btnClear.addEventListener("click", function (event) {
    event.preventDefault(); // Evita recargar la página

    // Reiniciar variables
    cont = 0;
    costoTotal = 0;
    totalEnProductos = 0;

    // Limpiar interfaz
    txtName.value = "";
    txtNumber.value = "";
    precioTotal.innerText = `$${costoTotal.toFixed(2)}`;
    contadorProductos.innerText = cont;
    productosTotal.innerText = totalEnProductos;
    cuerpoTabla.innerHTML = ""; // Eliminar todas las filas de la tabla
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
});//btnClear

window.addEventListener("load",function(event){
    if(this.localStorage.getItem("costoTotal")!=null){
        costoTotal= Number(this.localStorage.getItem("costoTotal"))
    }//null
    if(this.localStorage.getItem("totalEnProductos")!=null){
        totalEnProductos= Number(this.localStorage.getItem("totalEnProductos"))
    }//null
    if(this.localStorage.getItem("cont")!=null){
        cont= Number(this.localStorage.getItem("cont"))
    }//null

    precioTotal.innerText ="$ "+costoTotal.toFixed(2);
    contadorProductos.innerText = cont;
    totalEnProductos.innerText = totalEnProductos;

})//window load
