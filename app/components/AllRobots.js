import React, { Component } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchRobots, deleteRobot } from "../redux/robots";

class AllRobots extends Component {
  componentDidMount() {
    this.props.fetchRobots();
  }
  render() {
    return this.props.robots.length ? (
      <React.Fragment>
        <Navbar />
        <div className="allRobots">
          {this.props.robots.map(robot => (
            <React.Fragment>
              {/* <button
                type="salami"
                onClick={() => {
                  console.log("safe");
                  // this.props.deleteRobot(robot);
                }}
              >
                x
              </button> */}
              <span className="robot">
                <Link className="linkText" to={`/robots/${robot.id}`}>
                  {" "}
                  {robot.name}
                  <br />
                  <img src={robot.imageUrl} />
                </Link>
              </span>
            </React.Fragment>
          ))}
        </div>
      </React.Fragment>
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
  return {
    fetchRobots: () => dispatch(fetchRobots()),
    deleteRobot: obj => dispatch(deleteRobot(obj))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllRobots);

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
// export default connect(mapState)(AllRobots)
