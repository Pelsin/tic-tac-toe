var TicTacToe = (function() {
	"use strict";
	var board = []; // Entire board, will be 2d array
	var turn; // Number of turns
	var boardHolder = document.getElementById('boardHolder'); // Element for the where we will append cells
	var playerAnnouncer = document.getElementById('currentPlayer'); // Element for who the current player is

	return {
		config: {
			players: 2, // Number or players
			boardSize: 3, // Size of the board in cells
			numbersToWin: 3, // How many in a row to win
			currentPlayer: 1, // Define who can do the next move
			playerColors: ['red', 'blue', 'green', 'orange', 'purple', 'black', 'silver'] // Player colors
		},
		start: function() {
			turn = 0;
			cleanBoard();
			setPlayerAnnouncer();
			generate2DBoard(TicTacToe.config.boardSize);
		}
	};

	function playerMove() {
		turn++;
		this.style.backgroundColor = TicTacToe.config.playerColors[TicTacToe.config.currentPlayer-1];
		board[this.dataset.row][this.dataset.col] = TicTacToe.config.currentPlayer;
		this.removeEventListener("click", playerMove);
		if(checkWinner()) {
			endGame("Player "+TicTacToe.config.currentPlayer+" is the winner!\nPlay again?");
		} else if(turn == (TicTacToe.config.boardSize*TicTacToe.config.boardSize)) {
			endGame("Draw!\nPlay again?");
		}
		nextPlayer();
	}

	function checkWinner() {
		for (var i=0;i<TicTacToe.config.boardSize;i++) {
			for (var b=0;b<TicTacToe.config.boardSize;b++) {
				if(board[i][b] == TicTacToe.config.currentPlayer) {
					var right = '', downRight= '', down = '', downLeft = '';
					var winningCombo = ''; // Holder for the winning combo, String(currentPlayer) * numbersToWin

					for (var w=0;w<TicTacToe.config.numbersToWin;w++) {
						winningCombo += TicTacToe.config.currentPlayer;
						right += getCellValue(i,b+w);
						downRight += getCellValue((i+w),b+w);
						down += getCellValue(i+w,b);
						downLeft += getCellValue(i+w,b-w);
					}

					var winnerPaths = {
						right: right,
						downRight: downRight,
						down: down,
						downLeft: downLeft
					};

					return checkWinnerPath(winningCombo, winnerPaths);
				}
			}
		}
	}

	function checkWinnerPath(winningCombo, winnerPaths) {
		for (var path in winnerPaths) {
			if (winningCombo == winnerPaths[path]){
				return true;
			}
		}

		return false;
	}

	function getCellValue(row,col) {
		if(typeof board[row] != 'undefined'){
			if(typeof board[row][col] != 'undefined'){
				return board[row][col];
			}
		}

		return '0';
	}

	function endGame(msg){
		alert(msg);
		TicTacToe.start();
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

	function cleanBoard() {
		board = [];
		boardHolder.innerHTML = '';
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