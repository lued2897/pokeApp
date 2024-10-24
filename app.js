//Atributos poke rival
const imgPoke2 = document.querySelector('#poke2');
const namePoke2 = document.querySelector('#nombrePoke-rival');
const poke2Tipo = document.querySelector('#tipoRival');
const poke2Tipo2 = document.querySelector('#tipoRival2');
const poke2Ataque = document.querySelector('#ataqueRival');
const atkEspRival = document.querySelector('#ataqueEspRival');
const vidaRival = document.querySelector('#vidaRival');
const defensaEspRival = document.querySelector('#defensaEspRival');
const defensaFisRival = document.querySelector('#defensaFisRival');
const velocidadRival = document.querySelector('#velocidadRival');

//Atributos poke propio
const imgPoke = document.querySelector('#poke');
const namePoke = document.querySelector('#nombrePoke-propio');
const pokeTipo = document.querySelector('#tipoPropio');
const pokeTipo2 = document.querySelector('#tipoPropio2');
const pokeAtaque = document.querySelector('#ataquePropio');
const atkEspPropio = document.querySelector('#ataqueEspPropio');
const vidaPropio = document.querySelector('#vidaPropio');

const input = document.querySelector('#input');
const btnElegir = document.querySelector('#btn-poke');
const btnPelear  = document.querySelector('#combate');

const getNumRandom = () => {
    let min = Math.ceil(0);
    let max = Math.floor(1001);

    return Math.floor(Math.random() * (max - min) + min);
  }
//Se elegirá un pokemon pero solo del tipo fantasma, el tipo de elección del pokemon queda a criterio del desarrollador, que sea divertido.
const obtenerPokePropio = ()=>{
    const num = input.value;

    axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`).then((res)=>{
        console.log(res);
        return res.data
    }).then((res)=>{
        console.log(res);
        imgPoke.src = res.sprites.back_default;
        pokeTipo.innerHTML = res.types[0].type.name;
        namePoke.innerHTML = res.name;
        pokeAtaque.innerHTML = res.stats[0].base_stat;
    })
}
//Se generará un pokemon rival aleatorio 
const obtenerPokeRival = () =>{

    const numPokeRival = getNumRandom();

    axios.get(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`).then((res)=>{
        console.log(res);
        return res.data
    }).then((res)=>{
        console.log(res);
        imgPoke2.src = res.sprites.front_default;
        poke2Tipo.innerHTML = res.types[0].type.name;
        namePoke2.innerHTML = res.name;
        poke2Ataque.innerHTML = res.stats[1].base_stat;
        atkEspRival.innerHTML = res.stats[3].base_stat;
        vidaRival.innerHTML = res.stats[0].base_stat;
        poke2Tipo2.innerHTML = res.types[1].type.name;
        defensaEspRival.innerHTML = res.stats[4].base_stat;
        defensaFisRival.innerHTML = res.stats[2].base_stat;
        velocidadRival.innerHTML = res.stats[5].base_stat;
    })

    console.log(imgPoke2);
}
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
const combate = ()=>{
    
    const ataqueRival = parseInt(poke2Ataque.textContent);
    const ataquePropio = parseInt(pokeAtaque.textContent);

    console.log(ataquePropio);
    
}


window.addEventListener('load', obtenerPokeRival);
btnElegir.addEventListener('click', obtenerPokePropio);
btnPelear.addEventListener('click', combate);

