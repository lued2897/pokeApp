//JavaScript

//Atributos poke rival
const imgRival = document.querySelector('#pokeRival'); //querySelectroAll('div')
const nombreRival = document.querySelector('#nombreRival');
const nombreRivalStats = document.querySelector('#nombreRivalStats');
const nombreRivalTxt = document.querySelector('#nombreRivalTxt');
const idRival = document.querySelector('#rival-num');

const tipo1Rival = document.querySelector('#tipo1Rival');
const tipo2Rival = document.querySelector('#tipo2Rival');
const atkFisRival = document.querySelector('#ataqueFisRival'); 
const atkEspRival = document.querySelector('#ataqueEspRival');
const vidaRival = document.querySelector('#vidaRival');
const vidaRivalStats = document.querySelector('#vidaRivalStats')
const defensaEspRival = document.querySelector('#defensaEspRival');
const defensaFisRival = document.querySelector('#defensaFisRival');
const velocidadRival = document.querySelector('#velocidadRival');

//Atributos poke propio
const imgPropio = document.querySelector('#pokePropio'); //querySelectroAll('div')
const nombrePropio = document.querySelector('#nombrePropio');
const nombrePropioStats = document.querySelector('#nombrePropioStats');
const idPropio = document.querySelector('#propio-num');


const tipo1Propio = document.querySelector('#tipo1Propio');
const tipo2Propio = document.querySelector('#tipo2Propio');
const atkFisPropio = document.querySelector('#ataqueFisPropio'); 
const atkEspPropio = document.querySelector('#ataqueEspPropio');
const vidaPropio = document.querySelector('#vidaPropio');
const vidaPropioStats = document.querySelector('#vidaPropioStats');
const defensaEspPropio = document.querySelector('#defensaEspPropio');
const defensaFisPropio = document.querySelector('#defensaFisPropio');
const velocidadPropio = document.querySelector('#velocidadPropio');

const maxStat = 255; 

imgPropio.src='https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png'

// Referencia al elemento donde aparecerán los mensajes
const dialogTxt = document.querySelector('#dialogTxt');

//Variables numericas

//Atributos poke rival
//const tipo1RivalNum = document.querySelector('#tipo1Rival');
//const tipo2RivalNum = document.querySelector('#tipo2Rival');
let atkFisRivalNum;
let atkEspRivalNum;
let vidaRivalNum ;
let defensaEspRivalNum ;
let defensaFisRivalNum ;

//Atributos poke propio
//let tipo1PropioNum = document.querySelector('#tipo1Propio');
//let tipo2PropioNum = document.querySelector('#tipo2Propio');
let atkFisPropioNum ;
let atkEspPropioNum ;
let vidaPropioNum ;
let defensaEspPropioNum ;
let defensaFisPropioNum ;

let velocidadPropioNum;
let velocidadRivalNum ;
//Interfaz de usuario

const input = document.querySelector('#input');
const btnElegir = document.querySelector('#btn-poke');
const btnAtkFis  = document.querySelector('#btn-atk-fis');
const btnAtkEsp  = document.querySelector('#btn-atk-esp');
const btnCombate = document.querySelector('#btn-iniciar-combate');
const btnJugarDeNuevo = document.querySelector('#btn-jugar-de-nuevo');

//Método de número random
const getNumRandom = () => {
    let min = Math.ceil(0);
    let max = Math.floor(1001);

    return Math.floor(Math.random() * (max - min) + min);
  }

//Se elegirá un pokemon pero solo del tipo fantasma, el tipo de elección del pokemon queda a criterio del desarrollador, que sea divertido.
const obtenerPokePropio = ()=>{
    
    const num = input.value;
    console.log(num);

    axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`).then((res)=>{   // THEN si se cumple lo de antes
        console.log(res.data);
        return res.data
    }).then((res)=>{
        console.log(res);
        imgPropio.src = res.sprites.back_default;
        if(res.sprites.back_default==null){
            imgPropio.src = res.sprites.front_default;
        }
        console.log('img:')
        console.log(imgPropio.src)
        nombrePropio.innerHTML = res.name.toUpperCase();
        nombrePropioStats.innerHTML = res.name.toUpperCase();

        const tipoSpritesContainer = document.getElementById('tipoPropioSprite');
        tipoSpritesContainer.innerHTML = '';

        idPropio.textContent = res.id;

        vidaPropio.innerHTML = res.stats[0].base_stat;
        vidaPropioStats.innerHTML = res.stats[0].base_stat;
        atkFisPropio.innerHTML = res.stats[1].base_stat;
        defensaFisPropio.innerHTML = res.stats[2].base_stat;
        atkEspPropio.innerHTML = res.stats[3].base_stat;
        defensaEspPropio.innerHTML = res.stats[4].base_stat;
        velocidadPropio.innerHTML = res.stats[5].base_stat;
        
        vidaPropioNum = res.stats[0].base_stat;
        atkFisPropioNum = res.stats[1].base_stat;
        defensaFisPropioNum = res.stats[2].base_stat;
        atkEspPropioNum = res.stats[3].base_stat;
        defensaEspPropioNum = res.stats[4].base_stat;
        velocidadPropioNum = res.stats[5].base_stat;


        document.querySelector("#vidaPropio .stat-bar-inner").style.width = `${(res.stats[0].base_stat / maxStat) * 100}%`;
        document.querySelector("#vidaPropioStats .stat-bar-inner").style.width = `${(res.stats[0].base_stat / maxStat) * 100}%`;
        document.querySelector("#ataqueFisPropio .stat-bar-inner").style.width = `${(res.stats[1].base_stat / maxStat) * 100}%`;
        document.querySelector("#defensaFisPropio .stat-bar-inner").style.width = `${(res.stats[2].base_stat / maxStat) * 100}%`;
        document.querySelector("#ataqueEspPropio .stat-bar-inner").style.width = `${(res.stats[3].base_stat / maxStat) * 100}%`;
        document.querySelector("#defensaEspPropio .stat-bar-inner").style.width = `${(res.stats[4].base_stat / maxStat) * 100}%`;
        document.querySelector("#velocidadPropio .stat-bar-inner").style.width = `${(res.stats[5].base_stat / maxStat) * 100}%`;
    

        res.types.forEach(typeInfo => {
            axios.get(typeInfo.type.url).then(typeRes => {
                const typeData = typeRes.data;
                const typeSpriteUrl = typeData.sprites['generation-vi']['omega-ruby-alpha-sapphire'].name_icon; 
                const imgElement = document.createElement('img');
                imgElement.src = typeSpriteUrl;
                imgElement.alt = typeInfo.type.name;
                document.getElementById('tipoPropioSprite').appendChild(imgElement);
            }).catch(err => {
                console.error("Error fetching type data:", err);
            });
        });
    }).catch((error) => {
        console.error('Error al obtener el Pokémon:', error);
    });
};
//Se generará un pokemon rival aleatorio 
/*const obtenerPokeRival = () =>{

    const numPokeRival = getNumRandom();
    console.log(numPokeRival);
    
    axios.get(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`).then((res)=>{
        console.log(res.data);
        return res.data
    }).then((res)=>{
        console.log(res);
        imgRival.src = res.sprites.front_default;
        nombreRival.innerHTML = res.name;
        tipo1Rival.innerHTML = res.types[0].type.name;

        if(res.types[1].type.name == undefined){
            tipo2Rival.innerHTML = '';
        }else{
            tipo2Rival.innerHTML = res.types[1].type.name;
        }
        vidaRival.innerHTML = res.stats[0].base_stat;
        atkFisRival.innerHTML = res.stats[1].base_stat;
        defensaFisRival.innerHTML = res.stats[2].base_stat;
        atkEspRival.innerHTML = res.stats[3].base_stat;
        defensaEspRival.innerHTML = res.stats[4].base_stat;
        velocidadRival.innerHTML = res.stats[5].base_stat;
        console.log(res)
    })
}*/
const obtenerPokeRival = () => {
    const numPokeRival = getNumRandom();
    console.log(numPokeRival);

    axios.get(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`).then((res) => {
        console.log(res.data);
        return res.data;
    }).then((res) => {
        console.log(res);

        imgRival.src = res.sprites.front_default;
        idRival.textContent = res.id;
        
        nombreRival.innerHTML = res.name.toUpperCase();;
        nombreRivalStats.innerHTML = res.name.toUpperCase();;
        nombreRivalTxt.innerHTML = res.name;
        
        const tipoSpritesContainer2 = document.getElementById('tipoRivalSprite');
        tipoSpritesContainer2.innerHTML = '';


        // Stats
        //const maxStat = 255; // Maximum possible Pokémon stat value
        vidaRival.innerHTML = res.stats[0].base_stat;
        vidaRivalStats.innerHTML = res.stats[0].base_stat;
        atkFisRival.innerHTML = res.stats[1].base_stat;
        defensaFisRival.innerHTML = res.stats[2].base_stat;
        atkEspRival.innerHTML = res.stats[3].base_stat;
        defensaEspRival.innerHTML = res.stats[4].base_stat;
        velocidadRival.innerHTML = res.stats[5].base_stat;

        //Stats Operables
        vidaRivalNum = res.stats[0].base_stat;
        atkFisRivalNum = res.stats[1].base_stat;
        defensaFisRivalNum = res.stats[2].base_stat;
        atkEspRivalNum = res.stats[3].base_stat;
        defensaEspRivalNum = res.stats[4].base_stat;
        velocidadRivalNum = res.stats[5].base_stat;

        // Update stat bars dynamically
        document.querySelector("#vidaRival .stat-bar-inner").style.width = `${(res.stats[0].base_stat / maxStat) * 100}%`;
        document.querySelector("#vidaRivalStats .stat-bar-inner").style.width = `${(res.stats[0].base_stat / maxStat) * 100}%`;
        document.querySelector("#ataqueFisRival .stat-bar-inner").style.width = `${(res.stats[1].base_stat / maxStat) * 100}%`;
        document.querySelector("#defensaFisRival .stat-bar-inner").style.width = `${(res.stats[2].base_stat / maxStat) * 100}%`;
        document.querySelector("#ataqueEspRival .stat-bar-inner").style.width = `${(res.stats[3].base_stat / maxStat) * 100}%`;
        document.querySelector("#defensaEspRival .stat-bar-inner").style.width = `${(res.stats[4].base_stat / maxStat) * 100}%`;
        document.querySelector("#velocidadRival .stat-bar-inner").style.width = `${(res.stats[5].base_stat / maxStat) * 100}%`;
    
        res.types.forEach(typeInfo => {
            axios.get(typeInfo.type.url).then(typeRes => {
                const typeData = typeRes.data;
                const typeSpriteUrl = typeData.sprites['generation-vi']['omega-ruby-alpha-sapphire'].name_icon; 
                const imgElement = document.createElement('img');
                imgElement.src = typeSpriteUrl;
                imgElement.alt = typeInfo.type.name;
                document.getElementById('tipoRivalSprite').appendChild(imgElement);
            }).catch(err => {
                console.error("Error fetching type data:", err);
            });
        });
    }).catch(err => {
        console.error("Error fetching Pokémon data:", err);
    });
};


const updateStatBar = (elementId, value, maxValue) => {
    const percentage = (value / maxValue) * 100;
     document.querySelector(`#${elementId} .stat-bar-inner`).style.width = `${percentage}%`;
 };
 
 const applyTypeColors = (element, type) => {
     element.className = `type ${type}`; // Add appropriate type class
 };


document.addEventListener('DOMContentLoaded', ()=> {

    function elegirFondoAleatorio() {
        const indice = Math.floor(Math.random()*8);
        const rutaFondo = `./BGS/battlebg_${indice + 1}.png`; // Generar ruta
        return rutaFondo;
    }

    const arena = document.getElementById('arena');
    
    const nuevoFondo = elegirFondoAleatorio();
    arena.style.backgroundImage = `url('${nuevoFondo}')`; // Cambiar fondo
    //arena.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('${nuevoFondo}')`;
    console.log('Fondo aplicado correctamente');
    
})


window.addEventListener('load', obtenerPokeRival);

function showError(message) {
    // Eliminar mensaje de error anterior si existe
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
  
    // Crear nuevo mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.querySelector('#UI').appendChild(errorDiv);
  
    // Eliminar mensaje después de 3 segundos
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
  }
  
  input.addEventListener('input', (e) => {
    // Eliminar cualquier carácter que no sea número
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  
    const num = parseInt(e.target.value);
  
    if (num > 1025) {
        showError('¡El número debe ser menor o igual a 1025!');
        e.target.value = '1025';
    }
  });
  
  btnElegir.addEventListener('click', () => {
    if (!input.value) {
        showError('¡Solo se aceptan números!');
        return;
    }
    obtenerPokePropio();
  });

// Función que gestiona el ataque del rival
const rivalAtaque = () => {
    // Deshabilitar botones de ataque del jugador para garantizar turnos
    btnAtkFis.disabled = true;
    btnAtkEsp.disabled = true;

    // Decidir el tipo de ataque del rival (físico o especial)
    if (Math.round(Math.random()) === 1) {
        // Ataque físico del rival
        vidaPropioNum = vidaPropioNum - Math.max((atkFisRivalNum - defensaFisPropioNum), 1);
        console.log('Vida del propio después del ataque físico: ', vidaPropioNum);
        actualizarMensaje(nombreRivalTxt.textContent+' realiza ataque fisico');
    } else {
        // Ataque especial del rival
        vidaPropioNum = vidaPropioNum - Math.max((atkEspRivalNum - defensaEspPropioNum), 1);
        console.log('Vida del propio después del ataque especial: ', vidaPropioNum);
        actualizarMensaje(nombreRivalTxt.textContent+' realiza ataque especial');
    }
    setTimeout(() => {
        console.log('Espera ataque rival');
        // Verificar si el propio Pokémon ha perdido
        if (vidaPropioNum <= 0) {
            if(vidaPropioNum < 0){
                vidaPropioNum=0;
            }
            console.log('¡El Pokémon propio ha perdido!');
            actualizarValores();
            jugarDeNuevo();
            actualizarMensaje('El pokemon '+nombreRivalTxt.textContent+' te ha derrotado');
            btnAtkFis.style.display = 'none'
            btnAtkEsp.style.display = 'none'
            return; // Termina el juego
        }

        // Actualizar valores en la interfaz
        actualizarValores();

        // Habilitar botones de ataque del jugador para su turno
        btnAtkFis.disabled = false;
        btnAtkEsp.disabled = false;
        actualizarMensaje('Tú turno');
        setTimeout(() => {
            console.log('Espera mi turno');
            propioAtaque();
        }, 1000);
    }, 2000);
};

// Función que gestiona el ataque del jugador
const propioAtaque = () => {
    // Agregar un único listener para el ataque físico
    btnAtkFis.addEventListener('click', () => {
        // Ataque físico del jugador
        vidaRivalNum = vidaRivalNum - Math.max((atkFisPropioNum - defensaFisRivalNum), 1);
        console.log('Vida del rival después del ataque físico: ', vidaRivalNum);
        actualizarMensaje(nombrePropio.textContent+' realiza ataque fisico');
        setTimeout(() => {
            console.log('Espera ataque mio');
            // Verificar si el rival ha perdido
            if (vidaRivalNum <= 0) {
                if(vidaRivalNum < 0){
                    vidaRivalNum=0;
                }
                console.log('¡El Pokémon rival ha perdido!');
                actualizarValores();
                jugarDeNuevo();
                actualizarMensaje('El pokemon '+nombreRivalTxt.textContent+' ha sido derrotado');
                btnAtkFis.style.display = 'none'
                btnAtkEsp.style.display = 'none'
                return; // Termina el juego
            }

            // Actualizar valores y pasar el turno al rival
            actualizarValores();
            actualizarMensaje('Turno del Rival');
            setTimeout(() => {
                console.log('Espera turno rival');
                rivalAtaque();
            }, 1000);
        }, 2000);
    }, { once: true }); // Agregar el listener solo una vez

    // Agregar un único listener para el ataque especial
    btnAtkEsp.addEventListener('click', () => {
        // Ataque especial del jugador
        vidaRivalNum = vidaRivalNum - Math.max((atkEspPropioNum - defensaEspRivalNum), 1);
        console.log('Vida del rival después del ataque especial: ', vidaRivalNum);
        actualizarMensaje(nombrePropio.textContent+' realiza ataque especial');
        setTimeout(() => {
            console.log('Espera ataque esp mio');
            // Verificar si el rival ha perdido
            if (vidaRivalNum <= 0) {
                if(vidaRivalNum < 0){
                    vidaRivalNum=0;
                }
                console.log('¡El Pokémon rival ha perdido!');
                actualizarValores();
                jugarDeNuevo();
                actualizarMensaje('El pokemon '+nombreRivalTxt.textContent+' ha sido derrotado');
                btnAtkFis.style.display = 'none'
                btnAtkEsp.style.display = 'none'
                return; // Termina el juego
            }

            // Actualizar valores y pasar el turno al rival
            actualizarValores();
            actualizarMensaje('Turno del Rival');
            setTimeout(() => {
                console.log('Espera turno rival');
                rivalAtaque();
            }, 1000);
        }, 2000);
    }, { once: true }); // Agregar el listener solo una vez
};


// Función para actualizar los valores en el DOM después de cada ataque
const actualizarValores = () => {
    // Actualizamos la vida de los Pokémon
    vidaRival.innerHTML = vidaRivalNum;
    vidaPropio.innerHTML = vidaPropioNum;
    
    // Actualizamos las barras de estado (stat bars)
    document.getElementById("vidaPropioStats").innerHTML=vidaPropioNum;
    document.querySelector("#vidaRival .stat-bar-inner").style.width = '${(vidaRivalNum / maxStat) * 100}%';
    document.querySelector("#vidaRivalStats .stat-bar-inner").style.width = '${(vidaRivalNum / maxStat) * 100}%';

    document.getElementById("vidaRivalStats").innerHTML=vidaRivalNum;
    document.querySelector("#vidaPropio .stat-bar-inner").style.width = '${(vidaPropioNum / maxStat) * 100}%';
    document.querySelector("#vidaPropioStats .stat-bar-inner").style.width = '${(vidaPropioNum / maxStat) * 100}%';
};

//Desde aqui funciona al 100 o a lo esperado 

const combate = () => {
    const turno = primerTurno();  // Determina el primer turno
    setTimeout(() => {
        console.log('Espera primer turno');
        if (turno === 1) { // Si el primer turno es del jugador, comienza su ataque
            propioAtaque();
        } else { // Si el primer turno es del rival, comienza su ataque
            rivalAtaque();
        }
    }, 1000);
};

const primerTurno = () => {
    if ((velocidadPropioNum-velocidadRivalNum>=0)) {
        console.log(velocidadPropioNum-velocidadRivalNum);
        actualizarMensaje('Inicias tú');
        return 1;
    } else {
        console.log(velocidadPropioNum-velocidadRivalNum);
        actualizarMensaje('Inicia el rival');
        return 0;
    }
};  

const jugarDeNuevo = () => {
    // Asegurar que el botón se muestre correctamente
    btnJugarDeNuevo.style.display = 'block';

    // Agregar el evento para recargar la página al hacer clic
    btnJugarDeNuevo.addEventListener('click', function () {
        location.reload(); // Recarga la página
    }, { once: true }); // Aseguramos que solo se ejecute una vez
};


const actualizarMensaje = (mensaje) => {
    dialogTxt.textContent = mensaje; // Cambia el contenido del texto
};

window.addEventListener('load', obtenerPokeRival);
window.addEventListener('load', () => {
    input.value = '';
});

btnElegir.addEventListener('click', obtenerPokePropio);
btnElegir.addEventListener('click', () => {
    btnCombate.style.display = 'block';
});

btnCombate.addEventListener('click',combate)
btnCombate.addEventListener('click', () => {
    btnCombate.style.display = 'none';
    input.style.display = 'none';
    btnElegir.style.display = 'none';
    btnAtkFis.style.display = 'block'
    btnAtkEsp.style.display = 'block'
});