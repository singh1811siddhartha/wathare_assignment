import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import EmployeeBarChart from "./EmployeeBarChart";

import Navbar from "./components/navbar.component"
import EmployeeList from "./components/employee-list.component";
import EditEmployee from "./components/edit-employee.component";
import CreateEmployee from "./components/create-employee.component";

function App() {
  return (

    <Router>
    
      <div className="container">
      <Navbar />
      <br/>
      <Routes>
      <Route path="/" exact component={EmployeeList} />
      <Route path="/edit/:id" component={EditEmployee} />
      <Route path="/create" component={CreateEmployee} />
      </Routes>
      <EmployeeBarChart />
      </div>
    </Router>
  );
}

export default App;
