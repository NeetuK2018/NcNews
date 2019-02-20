import React, { Component } from "react";
import * as api from "../api";

class voter extends Component {
  state = {
    voteChange: 0
  };
  render() {
    const { votes } = this.props;
    const { voteChange } = this.props;
    return (
      <div>
        <button onClick={() => this.addVote(1)} disabled={voteChange === 1}>
          Vote up
        </button>
        <p>Votes:{votes + voteChange}</p>
        <button onCick={() => this.addVote(-1)} disabled={voteChange === -1}>
          Vote down
        </button>
      </div>
    );
  }
  addVote = direction => {
    const { article_id } = this.props;
    api.voteOnArticle(article_id, direction);
    this.setState(state => ({
      voteChange: state.voteChange + direction
    }));
  };
}

export default voter;
