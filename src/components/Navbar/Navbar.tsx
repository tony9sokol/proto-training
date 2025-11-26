import "./Navbar.css";
import employeePicture from "../../assets/employee.png";

interface NavLink {
  name: string;
  path: string;
}

const links: NavLink[] = [
  { name: "Home", path: "/" },
  { name: "Employees", path: "/employees" },
  { name: "Map", path: "/map" },
];

export const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={employeePicture} alt="Description" width="48" height="48" />
      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.name}>
            <a href={link.path}>{link.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
