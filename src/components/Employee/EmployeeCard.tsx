import React from "react";
import type {Employee} from './EmployeeContainer';

interface EmployeeCardProps {
  employee: Employee;
  onClick: (e: Employee) => void;
}

export const EmployeeCard = ({ employee, onClick }: EmployeeCardProps) => (
  <div className="employee-card">
    <img
      src={employee.imageUrl}
      alt={`${employee.firstName} ${employee.lastName}`}
      className="employee-photo card-photo"
      style={{ cursor: "pointer" }}
      onClick={() => onClick(employee)}
    />
    <p><strong>Name:</strong> {employee.firstName} {employee.lastName}</p>
    <p><strong>Job:</strong> {employee.title}</p>
  </div>
);
