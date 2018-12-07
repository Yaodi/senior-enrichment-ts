import React, { Component } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchRobots, deleteRobot } from "../redux/robots";

class AllRobots extends Component {
  componentDidMount() {
    this.props.fetchRobots("name");
  }
  render() {
    console.log(this.props.loading);
    return this.props.loading ? (
      <h1>loading</h1>
    ) : this.props.robots.length ? (
      <React.Fragment>
        <Navbar />
        <div className="allRobots">
          <form>
            Sort By{" "}
            <select
              name="sortBy"
              onChange={event => {
                this.props.fetchRobots(event.target.value);
              }}
            >
              <option value="name">-----------------</option>
              <option value="createdAt">Created At</option>
              <option value="fuelLevel">Fuel Level</option>
            </select>
          </form>
          {this.props.robots.map(robot => (
            <React.Fragment>
              <span className="robot">
                <button
                  type="salami"
                  onClick={() => {
                    this.props.deleteRobot(robot.id);
                  }}
                >
                  x
                </button>
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
        <h1> NO ROBOTS </h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { robots: state.robots.robotsList, loading: state.robots.loading };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRobots: sortBy => dispatch(fetchRobots(sortBy)),
    deleteRobot: id => dispatch(deleteRobot(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllRobots);

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
// export default connect(mapState)(AllRobots)
