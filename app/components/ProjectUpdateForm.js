import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import { fetchProject, updateProject } from "../redux/projects";

class ProjectUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.project.title,
      completed: props.project.completed
    };
  }
  componentDidMount() {
    this.props.fetchProject(this.props.match.params.projectId);
  }

  validateTitle(title) {
    let count = 0;
    for (let i = 0; i < title.length; i++) {
      if (title[i] !== " ") count++;
    }
    return !!count;
  }

  render() {
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
                this.setState({
                  title: event.target.value
                });
              }}
            />
          </div>
          <br />
          <input
            onChange={() => this.setState({ completed: true })}
            type="radio"
            name="checkComplete"
            checked={this.state.completed}
          />{" "}
          Complete
          <br />
          <input
            onChange={() => this.setState({ completed: false })}
            type="radio"
            name="checkComplete"
            checked={!this.state.completed}
          />{" "}
          Incomplete
          <br />
          <button
            type="submit"
            disabled={!this.validateTitle(this.state.title)}
          >
            Submit
          </button>
          {!this.validateTitle(this.state.title) > 0 ? (
            <span>{"  "}Title can't be empty</span>
          ) : (
            <span />
          )}
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
