//Construir los array de objetos que contienen a los discos.
let discos = [];
let carrito = [];

//Llamar los discos desde el archivo json y guardarlos en el array (asincrónico)
fetch("../js/discos.json")
    .then(response => response.json())
    .then(datos => {
        discos = datos;
        cargarDiscos(discos);
    })

//Se seleccionan los diferentes nodos del HTML para incorporar reacción a eventos.
const contenedorDiscos = document.querySelector("#contenedor-discos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloArtistas = document.querySelector(".tmain");
const numCarrito = document.querySelector(".numcarrito")

//Función que carga discos al HTML
function cargarDiscos(categoriaDiscos){

    contenedorDiscos.innerHTML = "";

    categoriaDiscos.forEach(disco => {
        let div = document.createElement("div");
        div.classList.add("disco");
        div.innerHTML = `
            <img class="disco-imagen" src="${disco.imagen}" alt="${disco.titulo}">
            <div class="disco-detalles">
                <h3 class="disco-titulo">${disco.titulo}</h3>
                <p class="disco-precio">$${disco.precio}</p>
                <button class="disco-agregar" id="agregar${categoriaDiscos.indexOf(disco)+1}">Agregar</button>
            </div>
        `;
        contenedorDiscos.appendChild(div);
        document.querySelector(`#agregar${categoriaDiscos.indexOf(disco)+1}`).addEventListener("click", ()=> discoAlCarrito(disco));
    })
    
}    

//Función que agrega discos al carrito y cambia cantidades en los objetos para no repetir disco
function discoAlCarrito(discoAgregado){

    if(carrito.length === 0){
        carrito.push(discoAgregado)
        discoAgregado.cantidad += 1;
        
    }else if(carrito.some(e=>discoAgregado.id === e.id)){
        let carritoMatch = carrito.find(e=>e.id === discoAgregado.id)
        carritoMatch.cantidad += 1;
        
    }else {
        carrito.push(discoAgregado)
        discoAgregado.cantidad += 1;
        
    }
    actualizarNumCarrito();
    localStorage.setItem("carritoLS", JSON.stringify(carrito))       
}

function actualizarNumCarrito(){
    let numerito = carrito.reduce((acc, disco)=> acc + disco.cantidad, 0);
    numCarrito.innerText = numerito;
}

//definición de procesos al hacer click en los botones que filtran por categoria artista
botonesCategorias.forEach(boton =>{
    boton.addEventListener("click", (e)=>{
        let eventoClick = e.currentTarget
        botonesCategorias.forEach(boton=>{boton.classList.remove("boton-select")})
        eventoClick.classList.add("boton-select");
        if(eventoClick.id === "todos"){
            cargarDiscos(discos);
        }else{
            const filtrarDiscos = discos.filter(disco => disco.artista === eventoClick.id)
            cargarDiscos(filtrarDiscos);
        }
        switch(eventoClick.id){
            case "notch":
                tituloArtistas.innerText = "Notch";
                break;
            case "ccc":
                tituloArtistas.innerText = "CCC";
                break;
            case "baho":
                tituloArtistas.innerText = "Baho";
                break;
            case "vasquez-ocampo":
                tituloArtistas.innerText = "Vásquez-Ocampo";
                break;
            case "sergio-cote":
                tituloArtistas.innerText = "Sergio Cote";
                break;
            default:
                tituloArtistas.innerText = "Todos los artistas";
                break;
        }
    })
})

//cargar el localstorage al carrito
if(localStorage.getItem("carritoLS") != null){
    carrito = JSON.parse(localStorage.getItem("carritoLS"))
    actualizarNumCarrito();
}





