import React, { Component } from "react";
import Axios from "axios";
import Navbar from "./Navbar";

class AllRobots extends Component {
  constructor() {
    super();
    this.state = { robots: [] };
  }
  async componentDidMount() {
    const robots = await Axios.get("/api/robots");
    this.setState({ robots: robots.data });
  }
  render() {
    return (
      <div>
        <Navbar />
        {this.state.robots.map(robot => (
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

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
// export default connect(mapState)(AllRobots)
export default AllRobots;
