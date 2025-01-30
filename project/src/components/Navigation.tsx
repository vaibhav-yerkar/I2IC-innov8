import React from "react";
import { Link } from "react-router-dom";
import { Users, Calendar, Home, User } from "lucide-react";

export function Navigation() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-indigo-600" />
            <span className="font-bold text-xl">VishwaConnect</span>
          </Link>

          <div className="flex space-x-8">
            <NavLink to="/" icon={<Home className="h-5 w-5" />} text="Home" />
            <NavLink
              to="/groups"
              icon={<Users className="h-5 w-5" />}
              text="Groups"
            />
            <NavLink
              to="/events"
              icon={<Calendar className="h-5 w-5" />}
              text="Events"
            />
            <NavLink
              to="/profile"
              icon={<User className="h-5 w-5" />}
              text="Profile"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  to,
  icon,
  text,
}: {
  to: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 transition-colors"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
