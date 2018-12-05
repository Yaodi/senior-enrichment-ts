import React, { Component } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchRobots } from "../redux/robots";

class AllRobots extends Component {
  componentDidMount() {
    this.props.fetchRobots();
  }
  render() {
    return this.props.robots.length ? (
      <div>
        <Navbar />
        {this.props.robots.map(robot => (
          <div>
            <img src={robot.imageUrl} />
            <h4>
              Robot Name: {robot.name}
              <br />
              <Link to={`/robots/${robot.id}`}>View Robot</Link>
            </h4>
          </div>
        ))}
      </div>
    ) : (
      <div>
        <Navbar />
        <h1>ERROR NO ROBOTS FOUND</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { robots: state.robots.robotsList };
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
