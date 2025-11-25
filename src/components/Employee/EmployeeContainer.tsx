import { useEffect, useState } from "react";
import type { Employee } from "../../modules/Employee";
import { employeeService } from "../../services/employeeService";
import { getAge } from "../../utils/dateUtils";
import { EmployeeCard } from "./EmployeeCard";
import "./Employee.css";

export const EmployeeContainer = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  useEffect(() => {
    employeeService
      .getEmployees()
      .then(setEmployees)
      .catch((err) => console.error(err));
  }, []);

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
