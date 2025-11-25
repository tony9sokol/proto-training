import { useEffect, useState } from 'react';
import axios from 'axios';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  country: string;
  city: string;
  birthDate: string;
  imageUrl: string;


}

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  

  useEffect(() => {
    axios.get('http://localhost:3030/api/employees')
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page-content">
      <h2>Employees</h2>

      <div className="employee-grid">
        {employees.map(e => (
          <div className="employee-card" key={e.id}>
            <img src={e.imageUrl} alt={`${e.firstName} ${e.lastName}`} className="employee-photo" />
            <p><strong>Name:</strong> {e.firstName+" "+e.lastName}</p>
            <p><strong>Job:</strong> {e.title}</p>
            <p><strong>City:</strong> {e.city}</p>
            <p><strong>Country:</strong> {e.country}</p>
            <p><strong>Birthdate:</strong> {e.birthDate}</p>
          </div>
        ))}
      </div>
    </div>
  );


}
