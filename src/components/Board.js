import React, { Component } from "react";
import PropTypes from "prop-types";

class Board extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
  };

  state = {
    squares: [],
  };

  constructor(props) {
    super(props);
    props.game.on("moved", (game) => {
      this.setState({ squares: game.board });
      if (props.game.player === 1) props.game.update({ player: 2 });
    });
  }

  componentDidMount() {
    this.setState({ squares: this.props.game.board });
  }

  // handles the click on one square
  handleSquareClick(pos, id) {
    if (this.props.disabled) return;
    if (pos !== 0) return;

    this.props.game.update({ pos: id, player: 1 });
  }

  render() {
    return (
      <div className="board">
        {this.state.squares.map((pos, id) => (
          <div
            key={id}
            onClick={() => this.handleSquareClick(pos, id)}
            className="board-square"
          >
            {pos === 0 ? (
              ""
            ) : pos === 1 ? (
              <h1 className="pick">X</h1>
            ) : (
              <h1 className="pick">O</h1>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default Board;
