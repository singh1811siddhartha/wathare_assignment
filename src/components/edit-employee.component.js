import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class EditEmployee extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmpid = this.onChangeEmpid.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      empid: '',
      name: '',
      age: 0,
      location: '',
      salary: 0
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/employee/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          empid: response.data.empid,
          name: response.data.name,
          age: response.data.age,
          location: response.data.location,
          salary: response.data.salary
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeEmpid(e) {
    this.setState({
      empid: e.target.value
    })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value
    })
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    })
  }

  onChangeSalary(e) {
    this.setState({
      salary: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const employee = {
      empid: this.state.empid,
      name: this.state.name,
      age: this.state.age,
      location: this.state.location,
      salary: this.state.salary
    }

    console.log(employee);

    axios.post('http://localhost:5000/employee/update/' + this.props.match.params.id, employee)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Employee Details</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Employee ID: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.empid}
              onChange={this.onChangeEmpid}
              />
        </div>
        <div className="form-group"> 
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              />
        </div>
        <div className="form-group">
          <label>Age: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.age}
              onChange={this.onChangeAge}
              />
        </div>
        <div className="form-group">
          <label>Location: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.location}
              onChange={this.onChangeLocation}
              />
        </div>
        <div className="form-group">
          <label>Salary: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.salary}
              onChange={this.onChangeSalary}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Employee Details" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
