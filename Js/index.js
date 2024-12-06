// script.js

const btn_start = document.getElementById('start_game');
const btn_end = document.getElementById('end_game');
const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restart');
const winnerText = document.getElementById('winner');
const timerDisplay = document.getElementById('timer');
const recordsGird = document.getElementById("score-table");

let currentPlayer;
let gameActive = false;
let gameState; // El estado del tablero

let time = 0;
let timerInterval;
let isRunning;

let min = 0; // Estado del contador
let seg = 0;
let inter = 0;

// Reiniciar el juego
const inicialState = () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    min = 0;
    seg = 0;
    winnerText.textContent = '';
    inicialTimer();
    cells.forEach(cell => cell.textContent = '');
    btn_start.style.display = "none";
    btn_end.style.display = "block";
};

// estado final
const finalState = () => {
    gameActive = false;
    pauseTimer();
    // Remueve los eventos de clic a las celdas
    cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
    btn_start.style.display = "block";
    btn_end.style.display = "none";
}

// revisa si el juego ha terminado
const checkwinner = () => {

    const winner = wincondition();
    if (winner){
        finalState();
        winnerText.textContent = `${winner} ha ganado`;
        if (winner === "Player"){
            // registra el record si el jugador gano
            const player = prompt("Ingrese un gamertag");
            const score = (min * 60) + seg;
            PostRecord(player,score);
        }

    }
    else if (!gameState.includes('')) {
        finalState();
        winnerText.textContent = `Empate`;
    }
    else {
        turn(); // cambiar de turno
    }

}

// Comprobar si un jugador ha ganado
const wincondition = () => {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
        [0, 4, 8], [2, 4, 6]             // diagonales
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {

            if (gameState[a] === "X"){
                return "Player";
            }
            else {
                return "CPU";
            }
        }
    }
    return null;
};

// Función para manejar clics en las celdas
const handleCellClick = (e) => {
    const index = Array.from(cells).indexOf(e.target);
    if (gameState[index] || !gameActive) return; // Ignorar si la celda ya está ocupada

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    
    if (gameActive) checkwinner();

};

// inicializa un estado inicial
GetRecords();

// Evento inicializador
btn_start.addEventListener('click',start_game);

btn_end.addEventListener('click',finalState);

function start_game(){
    // Estado inicial del juego
    inicialState();
    // Iniciar el contador del tiempo
    startTimer();
    // Añadir los eventos de clic a las celdas
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

}

// cambiar el turno
function turn(){

    if (currentPlayer === "X"){
        currentPlayer = "0"
        cells.forEach(cell => {cell.disabled = true;}); // deshabilita las casillas
        CPU_movement();
    }
    else{
        currentPlayer = "X";
        cells.forEach(cell => {cell.disabled = false;}); // deshabilita las casillas
    }   

}

// CPU
function CPU_movement(){
    
    const index = Math.floor(Math.random() * 8);
    if (gameState[index] || !gameActive) {CPU_movement(); return;} // Ignorar si la celda ya está ocupada
    gameState[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    checkwinner();

}

// Actulizar el contador en pantalla

function actualize_timer(){
    
    const min_timer = min < 10 ? `0${min}` : min;
    const seg_timer = seg < 10 ? `0${seg}` : seg;
    timerDisplay.textContent = `${min_timer}:${seg_timer}`;

}

// funcion para iniciar el contador
function startTimer(){

    if (timerInterval) return; // Evita que se cree vario intervalos

    if(!isRunning){
        isRunning = true;
        timerInterval = setInterval(() => {
            seg++;
            if (seg === 60){
                seg = 0;
                min++;
            }
            actualize_timer();
        }, 1000);
    }
}

// funcion para pausar el contador
function pauseTimer(){
    if(isRunning){
        isRunning = false;
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// funcion para volver a el tiempo de inicial
function inicialTimer(){
    pauseTimer();
    isRunning = false;
    time = `0${min}:0${seg}`;
    timerDisplay.textContent = time;
}

// Peticiones Ajax

// Obtener records

async function GetRecords(){

    try{

        const response = await fetch(`${APP_ROOT}Controllers/conect_to_primos.php`);
        
        const jsonRes = await response.json();
        
        if (!jsonRes){
            throw new Error("No se ha encontrado respuesta con el servidor");
        }
        else if (jsonRes.Error){
            throw new Error(jsonRes.ErrMessage);
        }

        // añadir los registros a las tablas
        jsonRes.forEach(playerRecord => {
            const tag = `<tr><td>${playerRecord.player}</td>
                             <td>${playerRecord.score}</td></tr>`;
            recordsGird.insertAdjacentHTML("beforeend",tag);             
        });

    } catch(error){
        alert(error.message);
    }

}

// Enviar records
async function PostRecord(player, score) {

    try{
        const record = {
            player: player,
            score: score
        }
        
        const response = await fetch(`${APP_ROOT}Controllers/conect_to_primos.php`,{
            method: "POST",
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(record)
        });

        const jsonRes = await response.json();

        if (!jsonRes){
            throw new Error("No se ha encontrado respuesta con el servidor");
        }
        
        else if (jsonRes.Error){
            throw new Error(jsonRes.ErrMessage);
        }
                

    }catch(error){
        alert(error.message);
    } 
    
}