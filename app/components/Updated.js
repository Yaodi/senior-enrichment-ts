import React, { Component } from "react";

class Updated extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Updated!</h1>
        <button onClick={() => this.props.history.goBack()}>back</button>
      </React.Fragment>
    );
  }
}
export default Updated;
