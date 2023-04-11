import { useEffect, useState } from 'react';
import './app.css';
import axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = async () => {
    try {
      await axios.post('http://localhost:3001/create', {name, age, country, position, wage});
      console.log('success');
    } catch (err) {
      console.log(err);
    }
  };

  const updateEmployeeWage = async (id) => {
    try {
      await axios.put('http://localhost:3001/update', {id, wage: newWage});
      console.log('update success');
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      console.log('deleted successfully');
      setEmployeeList(employeeList.filter((val) => val.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {

    const getEmployees = async () => {
      try {
        const res = await axios.get('http://localhost:3001/employees');
        console.log(res.data);
        setEmployeeList(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getEmployees();
  }, []);

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Country:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label>Wage (year):</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employees">
        {/* <button onClick={getEmployees}>Show Employees</button> */}

        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Wage: {val.wage}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>   
  )
}

export default App
