import React from "react";
import type { Employee } from "../../modules/Employee";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./EmployeeCard.css";

interface EmployeeCardProps {
  employee: Employee;
  onClick: (e: Employee) => void;
}

export const EmployeeCard = ({ employee, onClick }: EmployeeCardProps) => (
  <Card className="employee-card" onClick={() => onClick(employee)}>
    <CardMedia
      component="img"
      className="employee-card-image"
      image={employee.imageUrl}
      alt={`${employee.firstName} ${employee.lastName}`}
    />

    <CardContent>
      <Typography variant="h6">
        {employee.firstName} {employee.lastName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {employee.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {employee.city}, {employee.country}
      </Typography>
    </CardContent>
  </Card>
);
