import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/triage", label: "Triage" },
  { to: "/evidence", label: "Evidence" },
  { to: "/template", label: "Template" },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-1.5 rounded-md text-sm font-medium transition-colors shrink-0 ${
    isActive
      ? "bg-primary-foreground/15"
      : "hover:bg-primary-foreground/10 opacity-80"
  }`;

const AppNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-primary text-primary-foreground">
      <div className="container flex items-center justify-between py-3">
        <NavLink to="/" className="flex items-center gap-2 font-semibold text-lg shrink-0">
          <Shield className="h-5 w-5" />
          SHIELD
        </NavLink>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden p-1.5 rounded-md hover:bg-primary-foreground/10 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden overflow-hidden border-t border-primary-foreground/10">
          <div className="container flex flex-col gap-1 py-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default AppNav;
