//definir carrito en carrito.js
let carrito = [];
//Cargar el carrito desde el localStorage
if(localStorage.getItem("carritoLS") != null){
    carrito = JSON.parse(localStorage.getItem("carritoLS"))
}
//Se seleccionan los diferentes nodos del HTML para incorporar reacción a eventos.
const carritoVacio = document.querySelector(".carrito-vacio");
const carritoDiscos = document.querySelector("#carrito-discos")
const carritoAcciones = document.querySelector("#carrito-acciones")
const carritoVaciar = document.querySelector("#carrito-acciones-vaciar")
const total = document.querySelector("#total")
const comprar = document.querySelector("#comprar")


//condicional para saber qué mostrar en el html carrito
if(carrito.length === 0){
    carritoVacio.classList.remove("disabled");
    carritoAcciones.classList.replace("carrito-acciones","disabled");
    carritoDiscos.innerHTML = "";
}else{
    carritoVacio.classList.add("disabled");
    carritoAcciones.classList.replace("disabled","carrito-acciones");
    mostrarCarrito(carrito);
}

//funciones necesarias
function mostrarCarrito(carrito){

    carritoDiscos.innerHTML = "";

    carrito.forEach(disco => {
        let div = document.createElement("div");
        div.classList.add("carrito-disco");
        div.innerHTML = `
            <img class="carrito-disco-imagen" src="${disco.imagen}" alt="${disco.titulo}">
            <div class="carrito-disco-titulo">
                <small>Título</small>
                <h3>${disco.titulo}</h3>
            </div>
            <div class="carrito-disco-cantidad">
                <small>Cantidad</small>
                <p>${disco.cantidad}</p>
            </div>
            <div class="carrito-disco-precio">
                <small>Precio</small>
                <p>$${disco.precio}</p>
            </div>
            <div class="carrito-disco-subtotal">
                <small>Subtotal</small>
                <p>$${disco.precio * disco.cantidad}</p>
            </div>
            <button class="carrito-disco-eliminar" id="eliminar${carrito.indexOf(disco)+1}"><i class="bi bi-trash3"></i></button>
        `;
        carritoDiscos.appendChild(div);
        document.querySelector(`#eliminar${carrito.indexOf(disco)+1}`).addEventListener("click", ()=> quitarDiscoCarrito(carrito.indexOf(disco)));
        localStorage.setItem("carritoLS", JSON.stringify(carrito))
        calcularTotal();
    })
}

function vaciarCarrito(){
    carritoVacio.classList.remove("disabled");
    carritoAcciones.classList.replace("carrito-acciones","disabled");
    carritoDiscos.innerHTML = "";
    localStorage.setItem("carritoLS", JSON.stringify(carrito))
}

function quitarDiscoCarrito(indiceDisco){
    carrito.splice(indiceDisco, 1);
    console.log(carrito);
    if(carrito.length == 0){
        vaciarCarrito();
    }else{
        mostrarCarrito(carrito);
    }
}

function calcularTotal(){
    let precios = carrito.map(n=>n.precio * n.cantidad);
    let suma = precios.reduce((acc, e) => acc + e, 0) 
    total.innerText = `${suma}`; 
};

//boton vaciar carrito
carritoVaciar.addEventListener("click", ()=>{
    Swal.fire({
        title: '¿Está seguro de vaciar el carrito?',
        text: "Perderá su compra actual",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#404242',
        cancelButtonColor: '#173664',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, vaciar carrito'
      }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            vaciarCarrito();
            Swal.fire(
            'Carrito vaciado',
            'El carrito de compras está vacío',
            'success'
          )
        }
      })
})

//Botón comprar

comprar.addEventListener("click", ()=>{
    Swal.fire(
        '¡Compra exitosa!',
        'El precio total de la compra fue descontada de su tarjeta.',
        'success'
    )
    carrito = [];
    vaciarCarrito();
})








