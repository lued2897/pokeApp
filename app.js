//JavaScript

//Atributos poke rival
const imgRival = document.querySelector('#pokeRival'); //querySelectroAll('div')
const nombreRival = document.querySelector('#nombreRival');
const nombreRivalStats = document.querySelector('#nombreRivalStats');
const nombreRivalTxt = document.querySelector('#nombreRivalTxt');

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

//Interfaz de usuario

const input = document.querySelector('#input');
const btnElegir = document.querySelector('#btn-poke');
const btnAtkFis  = document.querySelector('#btn-atk-fis');
const btnAtkEsp  = document.querySelector('#btn-atk-esp');
//const btnCombate =

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

        vidaPropio.innerHTML = res.stats[0].base_stat;
        vidaPropioStats.innerHTML = res.stats[0].base_stat;
        atkFisPropio.innerHTML = res.stats[1].base_stat;
        defensaFisPropio.innerHTML = res.stats[2].base_stat;
        atkEspPropio.innerHTML = res.stats[3].base_stat;
        defensaEspPropio.innerHTML = res.stats[4].base_stat;
        velocidadPropio.innerHTML = res.stats[5].base_stat;
        
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

//Combate, el pokemon perdedor será el que se le acabe primero su vida.
//El usuario deberá elegir si ocupa ataque fisico o especial, según lo elegido los pokemon usarán su defensa especial o defensa fisica para bloquear los ataques
//La defensa especial o fisica del pokemon que recibe el ataque sera restada del ataque especial o fisico del pokemon atacante, la diferencia será restada a la vida del pokemon defensor
//En caso de que el resultado de la resta sea negativo o cero, se va a dejar un 1 como el resultado minimo de la resta
//El pokemon que tenga más velocidad va a pegar primero
//Se debe de aplicar la tabla de tipos al resultado de la resta de defensa y ataque, pero solo en daño, no en resitencias
//Ejemplo poke1AtaqueFisico = 56;
// poke2Defensafisica = 35; poke2vida = 98;
// DañoRecibido = poke1AtaqueFisico - poke2DefensaFisica;
//poke2VidaRestante = poke2Vida - DañoRecibido;
//Se turnarán los pokemon hasta que haya un ganador
//Mostrar el ganador

const updateStatBar = (elementId, value, maxValue) => {
    const percentage = (value / maxValue) * 100;
     document.querySelector(`#${elementId} .stat-bar-inner`).style.width = `${percentage}%`;
 };
 
 const applyTypeColors = (element, type) => {
     element.className = `type ${type}`; // Add appropriate type class
 };

const combate = ()=>{
    console.log('Estan peleando');
    
}

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

btnElegir.addEventListener('click', obtenerPokePropio);

btnAtkFis.addEventListener('click',combate);
