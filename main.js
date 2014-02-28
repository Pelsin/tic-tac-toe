var TicTacToe = (function() {
	"use strict";
	var board = []; // Entire board, will be 2d array
	var boardHolder = document.getElementById('boardHolder'); // Element for the where we will append cells
	var playerAnnouncer = document.getElementById('currentPlayer'); // Element for who the current player is

	return {
		config: {
			players: 2, // Number or players
			boardSize: 3, // Size of the board in cells
			numberToWin: 3, // How many in a row to win
			currentPlayer: 1, // Defines who can do the next move
			playerColors: ['red', 'blue'] // Player colors
		},
		start: function() {
			setPlayerAnnouncer();
			generate2DBoard(this.config.boardSize);
		}
	};

	function playerMove() {
		this.style.backgroundColor = TicTacToe.config.playerColors[TicTacToe.config.currentPlayer-1];
		board[this.dataset.row][this.dataset.col] = TicTacToe.config.currentPlayer;
		this.removeEventListener("click", playerMove);
		checkWinner();
		nextPlayer();
	}

	function checkWinner() {
		// TODO Check winner logic
	}

	function nextPlayer() {
		if(TicTacToe.config.currentPlayer++ >= TicTacToe.config.players) {
			TicTacToe.config.currentPlayer = 1;
		}
		setPlayerAnnouncer();
	}

	function setPlayerAnnouncer() {
		playerAnnouncer.innerHTML = TicTacToe.config.currentPlayer;
		playerAnnouncer.style.color = TicTacToe.config.playerColors[TicTacToe.config.currentPlayer-1];
	}

	function generate2DBoard() {
		var mapRows = []; // Row holder data to generate mapResults
		for (var i=0;i<TicTacToe.config.boardSize;i++) {
			mapRows = [];
			for (var b=0;b<TicTacToe.config.boardSize;b++) {
				renderCell(i,b);
				mapRows.push(0);
			}
			board.push(mapRows);
		}
	}

	function renderCell(row,col) {
		var cell = document.createElement('div'); // Create cell
		cell.className = 'boardCell';
		cell.dataset.row = row;
		cell.dataset.col = col;
		cell.style.width = Math.floor(boardHolder.offsetWidth/TicTacToe.config.boardSize)+'px';
		cell.style.height = Math.floor(boardHolder.offsetHeight/TicTacToe.config.boardSize)+'px';
		boardHolder.appendChild(cell);
		cell.addEventListener("click", playerMove);
	}
})();

TicTacToe.start();