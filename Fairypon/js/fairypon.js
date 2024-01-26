//variables globales de la funcion iniciar juego
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("Reiniciar")
const botonHadaJugador = document.getElementById("boton-hada")
const botonReiniciar = document.getElementById("boton-reiniciar") 
//variables globales de la funcion seleccionar hada jugador
const sectionSeleccionarHada = document.getElementById("seleccionar-hada")
const spanHadaJugador = document.getElementById("hada-jugador")
//variables globales de la function seleccionar hada enemigo
const spanHadaEnemigo = document.getElementById("hada-enemigo")
//variables globales function combate
let spanVidasJugador = document.getElementById("vidas-jugador")
let spanVidasEnemigo = document.getElementById("vidas-enemigo")
//variables globales function crear mensaje
let sectionMensajes = document.getElementById("resultado")
let ataquesJugador = document.getElementById("ataques-jugador") 
let ataquesEnemigo = document.getElementById("ataques-enemigo")
//varuiables globales para escribir html en js
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let hadas = []
let ataqueJugadores = []
let ataqueEnemigo = []
let opcionDeHadas
let inputAura
let inputFay
let inputPixie
let hadaJugador
let hadaJugadorObjeto
let ataquesHada
let ataquesHadaEnemigo
let botonTierra
let botonFuego
let botonAgua
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src= "./mapa/mokemap.webp" 
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 550

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Hada {
    constructor(nombre, foto, vida, fotoMapa) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = anchoDelMapa * 80 / 800 
        this.alto = alturaQueBuscamos * 80 / 600
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarHada() {
        lienzo.drawImage (
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let Aura = new Hada("Aura", "./personajes/_RJNRQ5P-removebg-preview.png", 5, "./personajes/kbzaAura-removebg-preview.png")

let Fay = new Hada("Fay", "./personajes/_RNDNS34-removebg-preview.png", 5, "./personajes/kbzafAY-removebg-preview.png")

let Pixie = new Hada("Pixie", "./personajes/muchacha-de-la-hada-del-arte-pixel-vector-126082477-removebg-preview.png", 5, "./personajes/KBZApIXIE-removebg-preview.png")

let AuraEnemigo = new Hada("Aura", "./personajes/_RJNRQ5P-removebg-preview.png", 5, "./personajes/kbzaAura-removebg-preview.png")

let FayEnemigo = new Hada("Fay", "./personajes/_RNDNS34-removebg-preview.png", 5, "./personajes/kbzafAY-removebg-preview.png")

let PixieEnemigo = new Hada("Pixie", "./personajes/muchacha-de-la-hada-del-arte-pixel-vector-126082477-removebg-preview.png", 5, "./personajes/KBZApIXIE-removebg-preview.png")


Aura.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌹", id: "boton-tierra"}
)

AuraEnemigo.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌹", id: "boton-tierra"}
)

Fay.ataques.push (
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌹", id: "boton-tierra"}
)

FayEnemigo.ataques.push (
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌹", id: "boton-tierra"}
)

Pixie.ataques.push (
    {nombre: "🌹", id: "boton-tierra"},
    {nombre: "🌹", id: "boton-tierra"},
    {nombre: "🌹", id: "boton-tierra"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"}   
)

PixieEnemigo.ataques.push (
    {nombre: "🌹", id: "boton-tierra"},
    {nombre: "🌹", id: "boton-tierra"},
    {nombre: "🌹", id: "boton-tierra"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"}   
)

hadas.push(Aura,Fay,Pixie)

function iniciarJuego() {
   
    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"

    hadas.forEach ((hada) => {
        opcionDeHadas = `
        <input type="radio" name="hada" id=${hada.nombre} />
        <label class="tarjeta-hada" for=${hada.nombre}>
            <p class=${hada.nombre}></p>
            <img src=${hada.foto} alt=${hada.nombre}> 
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeHadas
        
        inputAura = document.getElementById("Aura")
        inputFay = document.getElementById("Fay")
        inputPixie = document.getElementById("Pixie")
    })
    
    sectionReiniciar.style.display = "none"
 
    botonHadaJugador.addEventListener("click", seleccionarHadaJugador)
    
    botonReiniciar.addEventListener("click", reiniciarJuego)
}

function seleccionarHadaJugador(){
    
    sectionSeleccionarHada.style.display = "none"
    
    window.addEventListener("keydown", sePresionaUnaTecla)

    window.addEventListener("keyup", detenerMovimiento)

    if (inputAura.checked){
        spanHadaJugador.innerHTML = inputAura.id
        hadaJugador = inputAura.id
    }else if (inputFay.checked){
        spanHadaJugador.innerHTML = inputFay.id
        hadaJugador = inputFay.id
    }else if (inputPixie.checked){
        spanHadaJugador.innerHTML = inputPixie.id
        hadaJugador = inputPixie.id
    }else {
        alert("Elegí un hadita otaria/o") 
    }

    extraerAtaques(hadaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
}

function extraerAtaques(hadaJugador) {
    let ataques
    for (let i = 0; i < hadas.length; i++) {
        if (hadaJugador === hadas[i].nombre) {
          ataques = hadas[i].ataques  
        }
        
    }
   
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesHada = `
        <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre} </button>
        `
        contenedorAtaques.innerHTML += ataquesHada
    })

    botonTierra = document.getElementById("boton-tierra")
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botones = document.querySelectorAll(".BAtaque")
  
}

function secuenciaAtaques() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.innerText === "🔥" ) {
                ataqueJugadores.push( "FUEGO" )
                boton.style.background = "#163020"
            }else if (e.target.innerText === "💧" ) { 
                ataqueJugadores.push( "AGUA" )
                boton.style.background = "#163020"
            }else {
                ataqueJugadores.push( "TIERRA" )
                boton.style.background = "#163020"
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarHadaEnemigo(enemigo){
   spanHadaEnemigo.innerHTML = enemigo.nombre 
   ataquesHadaEnemigo = enemigo.ataques
    
    secuenciaAtaques()
}

function ataqueAleatorioEnemigo() {
    console.log("ataques enemigo", ataquesHadaEnemigo);
    let ataqueAleatorio = aleatorio( 0, ataquesHadaEnemigo. length -1)
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push( "FUEGO" )
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push( "AGUA" )
    } else {
        ataqueEnemigo.push( "TIERRA" )
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugadores.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugadores [jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {

    for (let index = 0; index < ataqueJugadores.length; index++) {
        if(ataqueJugadores[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index,index)
            crearMensaje("EMPATE")
        } else if (ataqueJugadores[index] === "FUEGO" && ataqueEnemigo[index] === "TIERRA" || ataqueJugadores[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO" || ataqueJugadores[index] === "TIERRA" && ataqueEnemigo[index] === "AGUA") {
            indexAmbosOponentes(index,index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index,index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
        revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("EMPATE!")
    }else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("GANASTE!")
    } else {
        crearMensajeFinal("PERDISTE!")
    }
}

function crearMensaje(resultado) {

    let nuevoAtaqueJugador = document.createElement("p")
    let nuevoAtaqueEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesJugador.appendChild(nuevoAtaqueJugador)
    ataquesEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal) { 
    
    let parrafo = document.createElement("p")
    parrafo.innerHTML = resultadoFinal

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true

    sectionReiniciar.style.display = "block"
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {

    hadaJugadorObjeto.x = hadaJugadorObjeto.x + hadaJugadorObjeto.velocidadX
    hadaJugadorObjeto.y = hadaJugadorObjeto.y + hadaJugadorObjeto.velocidadY
    
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    hadaJugadorObjeto.pintarHada()
    AuraEnemigo.pintarHada()
    FayEnemigo.pintarHada()
    PixieEnemigo.pintarHada()
    if (hadaJugadorObjeto.velicidadX !== 0 || hadaJugadorObjeto.velocidadY !== 0) {
        revisarColision(AuraEnemigo);
        revisarColision(FayEnemigo);revisarColision(PixieEnemigo)
    }
}

function moverDerecha() {
    hadaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    hadaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    hadaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    hadaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
    hadaJugadorObjeto.velocidadX = 0
    hadaJugadorObjeto.velocidadY = 0

}

function sePresionaUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            moverArriba()
            break
        case 'ArrowDown':
        case 's':
            moverAbajo()
            break
        case 'ArrowLeft':
        case 'a':
            moverIzquierda()
            break
        case 'ArrowRight':
        case 'd' :
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa() {
   // mapa.width = 320
    //mapa.height = 240
    hadaJugadorObjeto = obtenerObjetoHada(hadaJugador)
    intervalo = setInterval(pintarCanvas, 50)

}

function obtenerObjetoHada () { 
    for (let i = 0; i < hadas.length; i++) {
        if( hadaJugador === hadas[i].nombre)
            return hadas[i]
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaHada = 
        hadaJugadorObjeto.y
    const abajoHada = 
        hadaJugadorObjeto.y + hadaJugadorObjeto.alto
    const derechaHada = 
        hadaJugadorObjeto.x + hadaJugadorObjeto.ancho
    const izquierdaHada = 
        hadaJugadorObjeto.x


    if(
        abajoHada < arribaEnemigo ||
        arribaHada  > abajoEnemigo ||
        derechaHada < izquierdaEnemigo ||
        izquierdaHada > derechaEnemigo 
     ) {
        return
     }
     detenerMovimiento()
     clearInterval(intervalo)
     console.log("se detecto una colision");
     sectionSeleccionarAtaque.style.display = "flex"
     sectionVerMapa.style.display = "none"
     seleccionarHadaEnemigo(enemigo)
   
        
}

window.addEventListener("load", iniciarJuego )