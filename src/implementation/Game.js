import { EventEmitter } from "events";
import AI from "./AI";

class Game extends EventEmitter {
  ai = new AI();
  board = this.init();
  scores = [0, 0];
  player = 0;

  // returns an empty board
  setup() {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  init() {
    this.board = this.setup();
    this.emit("moved", { board: this.board });
  }

  update(msg) {
    this.player = msg.player;

    if (msg.pos) {
      this.board[msg.pos] = msg.player;
    } else {
      const aiPos = this.ai.search(this.board);
      this.board[aiPos] = msg.player;
    }

    if (this.ai.isWinner(msg.player, this.board)) {
      this.scores[msg.player - 1] += 1;
      return this.emit("won", { player: msg.player, scores: this.scores });
    }

    if (this.ai.isTie(this.board)) {
      this.scores[0] += 1;
      this.scores[1] += 1;
      return this.emit("tie", { player: msg.player, scores: this.scores });
    }

    this.emit("moved", { board: this.board });
  }
}

export default Game;
