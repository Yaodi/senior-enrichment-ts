import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import { fetchProject, updateProject } from "../redux/projects";

class ProjectUpdateForm extends Component {
  constructor() {
    super();
    this.state = { title: "", completed: null };
  }
  componentDidMount() {
    this.props.fetchProject(this.props.match.params.projectId);
  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <Navbar />
        <h2>Update Project!</h2>
        <form
          onSubmit={event => {
            event.preventDefault();

            this.props.updateProject(this.props.project.id, this.state);
            this.props.history.push(`/projects/${this.props.project.id}`);
          }}
        >
          <div>
            Title:{" "}
            <input
              type="text"
              value={this.state.title}
              onChange={event => {
                this.setState({ title: event.target.value });
              }}
            />
          </div>
          <br />
          <input
            onChange={() => this.setState({ completed: true })}
            type="radio"
            value="Complete"
            name="checkComplete"
          />{" "}
          Complete
          <br />
          <input
            onChange={() => this.setState({ completed: false })}
            type="radio"
            name="checkComplete"
            value="Incomplete"
          />{" "}
          Incomplete
          <br />
          <button type="submit">Submit</button>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    project: state.projects.currentProject
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProject: id => dispatch(fetchProject(id)),
    updateProject: (id, fieldToUpdate) =>
      dispatch(updateProject(id, fieldToUpdate))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectUpdateForm);
