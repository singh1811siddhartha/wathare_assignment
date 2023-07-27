const router = require('express').Router();
const Employee = require('../models/employee.model');

router.route('/').get((req, res) => {
  Employee.find()
    .then(employees => res.json(employees))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const empid = req.body.empid;
  const name = req.body.name;
  const age = Number(req.body.age);
  const location = req.body.location;
  const salary = Number(req.body.salary);

  const newEmployee = new Employee({
    empid,
    name,
    age,
    location,
    salary,
  });

  newEmployee.save()
    .then(() => res.json('Employee added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Employee.findById(req.params.id)
    .then(employee => res.json(employee))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Employee.findByIdAndDelete(req.params.id)
    .then(() => res.json('Employee deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Employee.findById(req.params.id)
    .then(employee => {
      employee.empid = req.body.empid;
      employee.name = req.body.name;
      employee.age = Number(req.body.age);
      employee.location = req.body.location;
      employee.salary = Number(req.body.salary);

      employee.save()
        .then(() => res.json('Employee updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
