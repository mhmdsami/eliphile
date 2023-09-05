import { Link, useLocation } from "@remix-run/react";
import type { User as UserType } from "~/types";

interface NavbarProps {
  user?: UserType;
}

const Navbar = ({ user }: NavbarProps) => {
  const { pathname } = useLocation();

  const links: {
    [key: string]: {
      to: string;
      text: string;
    };
  } = {
    "/": {
      text: "Dashboard",
      to: "/dashboard",
    },
    "/dashboard": {
      text: "Upload Image",
      to: "/dashboard/upload",
    },
    "/dashboard/upload": {
      text: "Dashboard",
      to: "/dashboard",
    },
    "/auth/signin": {
      text: "Sign Up",
      to: "/auth/signup",
    },
    "/auth/signup": {
      text: "Sign In",
      to: "/auth/signin",
    },
  };

  const { text, to } = links[pathname in links ? pathname : "/"];

  return (
    <nav className="flex justify-between items-center px-20 mt-10">
      <Link to="/" className="text-4xl text-primary font-bold">
        Eliphile
      </Link>
      {user ? (
        <div className="flex gap-2">
          <Link to={to} className="btn">
            {text}
          </Link>
          <form action="/auth/signout" method="post">
            <button type="submit" className="btn">
              Sign Out
            </button>
          </form>
        </div>
      ) : (
        <Link to={to} className="btn">
          {text}
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
