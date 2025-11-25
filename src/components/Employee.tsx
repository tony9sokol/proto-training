import { useEffect, useState } from "react";
import axios from "axios";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  country: string;
  city: string;
  birthDate: string;
  imageUrl: string;
  coords?: [number, number];

}

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    axios.get("http://localhost:3030/api/employees")
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  }, []);

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-GB"); // DD/MM/YYYY
  }

  return (
    <div className="page-content">
      <h2>Employees</h2>

      <div className="employee-grid">
        {employees.map(e => (
          <div className="employee-card" key={e.id}>
            <img
              src={e.imageUrl} alt={`${e.firstName} ${e.lastName}`}
              className="employee-photo card-photo"
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedEmployee(e)}
            />
            <p><strong>Name:</strong> {e.firstName} {e.lastName}</p>
            <p><strong>Job:</strong> {e.title}</p>
          </div>
        ))}
      </div>

      {selectedEmployee && (
        <div className="modal-overlay" onClick={() => setSelectedEmployee(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedEmployee(null)}>X</button>
            <img
              src={selectedEmployee.imageUrl}
              alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
              className="employee-photo modal-photo"
            />
            <h2>{selectedEmployee.firstName} {selectedEmployee.lastName}</h2>
            <p><strong>Job:</strong> {selectedEmployee.title}</p>
            <p><strong>City:</strong> {selectedEmployee.city}</p>
            <p><strong>Country:</strong> {selectedEmployee.country}</p>
            <p><strong>Birthdate:</strong> {formatDate(selectedEmployee.birthDate)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
