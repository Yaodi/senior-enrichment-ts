import React, { Component } from "react";
import Axios from "axios";
import Navbar from "./Navbar";

class AllProjects extends Component {
  constructor() {
    super();
    this.state = { projects: [] };
  }
  async componentDidMount() {
    const projects = await Axios.get("/api/projects");
    this.setState({ projects: projects.data });
  }
  render() {
    return (
      <div>
        <Navbar />
        {this.state.projects.map(project => (
          <div>
            <h4>Project Name: {project.name}</h4>
            <p>Project Deadline: {project.deadline}</p>
          </div>
        ))}
        )
      </div>
    );
  }
}

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
// export default connect(mapState)(AllProjects)
export default AllProjects;
