import React from "react";
import type { Employee } from "../../modules/Employee";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface EmployeeCardProps {
  employee: Employee;
  onClick: (e: Employee) => void;
}

export const EmployeeCard = ({ employee, onClick }: EmployeeCardProps) => (
  <Card
    sx={{ maxWidth: 250, cursor: "pointer" }}
    onClick={() => onClick(employee)}
  >
    <CardMedia
      component="img"
      height="140"
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
