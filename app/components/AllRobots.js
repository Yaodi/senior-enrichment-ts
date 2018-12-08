import React, { Component } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchRobots, deleteRobot } from "../redux/robots";

class AllRobots extends Component {
  componentDidMount() {
    this.props.fetchRobots("createdAt");
  }
  render() {
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
              <option value="createdAt">Created At</option>
              <option value="fuelLevel">Fuel Level</option>
            </select>
          </form>
          {this.props.robots.map(robot => (
            <React.Fragment>
              <span className="robot">
                <button
                  type="button"
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
      <React.Fragment>
        <Navbar />
        <h1> NO ROBOTS </h1>
      </React.Fragment>
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
