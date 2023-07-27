import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Employee = props => (
  <tr>
    <td>{props.employee.empid}</td>
    <td>{props.employee.name}</td>
    <td>{props.employee.age}</td>
    <td>{props.employee.location}</td>
    <td>{props.employee.salary}</td>
    <td>
      <Link to={"/edit/"+props.employee._id}>edit</Link> | <a href="#" onClick={() => { props.deleteEmployee(props.employee._id) }}>delete</a>
    </td>
  </tr>
)

export default class EmployeesList extends Component {
  constructor(props) {
    super(props);

    this.deleteEmployee = this.deleteEmployee.bind(this)

    this.state = {employees: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/employee/')
      .then(response => {
        this.setState({ employees: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteEmployee(id) {
    axios.delete('http://localhost:5000/employee/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      employees: this.state.employees.filter(el => el._id !== id)
    })
  }

  employeeList() {
    return this.state.employees.map(currentEmployee => {
      return <Employee employee={currentEmployee} deleteEmployee={this.deleteEmployee} key={currentEmployee._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Employee List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.employeeList() }
          </tbody>
        </table>
      </div>
    )
  }
}
