class AI {
  minPlayer = 1;  // minimizing player
  maxPlayer = 2;  // maximizing player


  // starts with maximizing
  search(board) {
    let bestMove = -Infinity;
    let move = 0;

    for (let i = 0; i < board.length; i++) {
      let newBoard = this.move(i, this.maxPlayer, board);
      if (newBoard) {
        let nextMove = this.minimize(newBoard);
        if (nextMove > bestMove) {
          bestMove = nextMove;
          move = i;
        }
      }
    }
    return move;
  }

  minimize(board) {
    if (this.isWinner(this.maxPlayer, board)) return Infinity;
    if (this.isWinner(this.minPlayer, board)) return -Infinity;
    if (this.isTie(board)) return 0;

    let bestMove = Infinity;

    for (let i = 0; i < board.length; i++) {
      let newBoard = this.move(i, this.minPlayer, board);
      if (newBoard) {
        let nextMove = this.maximize(newBoard);
        if (nextMove < bestMove) {
          bestMove = nextMove;
        }
      }
    }
    return bestMove;
  }

  maximize(board) {
    if (this.isWinner(this.maxPlayer, board)) return Infinity;
    if (this.isWinner(this.minPlayer, board)) return -Infinity;
    if (this.isTie(board)) return 0;

    let bestMove = -Infinity;

    for (let i = 0; i < board.length; i++) {
      let newBoard = this.move(i, this.maxPlayer, board);
      if (newBoard) {
        let nextMove = this.minimize(newBoard);
        if (nextMove > bestMove) {
          bestMove = nextMove;
        }
      }
    }
    return bestMove;
  }

  // makes move in an new board to go deeper
  move(move, player, board) {
    let newBoard = board.slice(0);

    if (newBoard[move] === 0) {
      newBoard[move] = player;
      return newBoard;
    }
    return;
  }

  //checks if 3 equal signs are in a row
  isWinner(player, board) {
    return (
      (board[0] === player && board[1] === player && board[2] === player) ||
      (board[3] === player && board[4] === player && board[5] === player) ||
      (board[6] === player && board[7] === player && board[8] === player) ||
      (board[0] === player && board[3] === player && board[6] === player) ||
      (board[1] === player && board[4] === player && board[7] === player) ||
      (board[2] === player && board[5] === player && board[8] === player) ||
      (board[0] === player && board[4] === player && board[8] === player) ||
      (board[2] === player && board[4] === player && board[6] === player)
    );
  }
  // cehcks if the board is full and there is no winner
  isTie(board) {
    return !board.some((x) => x === 0);
  }
}

export default AI;
