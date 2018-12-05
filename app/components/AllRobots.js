import React, { Component } from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { fetchRobots } from "../redux/robots";

class AllRobots extends Component {
  componentDidMount() {
    this.props.fetchRobots();
  }
  render() {
    return (
      <div>
        <Navbar />
        {this.props.robots.map(robot => (
          <div>
            <h4>
              Robot Name: {robot.name} <img src={robot.imageUrl} />
            </h4>
          </div>
        ))}
        )
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { robots: state.robots };
};

const mapDispatchToProps = dispatch => {
  return { fetchRobots: () => dispatch(fetchRobots()) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllRobots);

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
// export default connect(mapState)(AllRobots)
