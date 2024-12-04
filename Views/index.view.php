<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?=APP_ROOT?>Styles/index.style.css" />
    <title>Tic Tac Toe</title>
    <script src="<?=APP_ROOT?>Js/config.js"></script>
</head>
<body>
    <div class="container">
        <div class="score column">
            <table id="score-table">
                <tr>
                    <th>Player</th>
                    <th>Time</th>
                </tr>
            </table>
        </div>
        <div class="game column">
            <h1>Tic Tac Toe</h1>
            
            <div class="timer-container">
                <p id="timer">00:</p>
            </div>

            <div class="board" id="board">
                <!-- Las celdas del tablero -->
                <div class="cell" data-cell></div>
                <div class="cell" data-cell></div>
                <div class="cell" data-cell></div>
                <div class="cell" data-cell></div>
                <div class="cell" data-cell></div>
                <div class="cell" data-cell></div>
                <div class="cell" data-cell></div>
                <div class="cell" data-cell></div>
                <div class="cell" data-cell></div>
            </div>
            <button id="start_game">Iniciar</button>
            <button id="end_game">Terminiar</button>
            <p id="winner"></p>
        </div>
    </div>    
    <script src="<?=APP_ROOT?>Js/index.js"></script>
</body>
</html>