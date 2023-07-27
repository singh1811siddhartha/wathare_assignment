import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const EmployeeBarChart = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
  
    axios.get("http://localhost:5000/employee").then((response) => {
      setEmployees(response.data);
    });
  }, []);


  const chartData = {
    labels: employees.map((employee) => employee.name),
    datasets: [
      {
        label: "Salary",
        data: employees.map((employee) => employee.salary),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Employee Salary Bar Chart</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default EmployeeBarChart;
