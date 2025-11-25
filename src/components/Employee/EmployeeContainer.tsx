import { useEffect, useState } from "react";
import axios from "axios";
import "./Employee.css";
import { EmployeeCard } from "./EmployeeCard";

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

export const EmployeeContainer  = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  useEffect(() => {
    axios
      .get("http://localhost:3030/api/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, []);

  function getAge(birthDate: string) {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <div className="page-content">
      <h2>Employees</h2>
      <div className="employee-grid">
        {employees.map((e) => (
          <EmployeeCard key={e.id} employee={e} onClick={setSelectedEmployee} />
        ))}
      </div>

      {selectedEmployee && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedEmployee(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedEmployee(null)}
            >
              X
            </button>
            <img
              src={selectedEmployee.imageUrl}
              alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
              className="employee-photo modal-photo"
            />
            <h2>
              {selectedEmployee.firstName} {selectedEmployee.lastName}
            </h2>
            <p>
              <strong>Job:</strong> {selectedEmployee.title}
            </p>
            <p>
              <strong>City:</strong> {selectedEmployee.city}
            </p>
            <p>
              <strong>Country:</strong> {selectedEmployee.country}
            </p>
            <p>
              <strong>Age:</strong> {getAge(selectedEmployee.birthDate)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
