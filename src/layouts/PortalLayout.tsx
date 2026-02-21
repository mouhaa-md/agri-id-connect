import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, Users, UserPlus, ClipboardCheck, Search,
  FileText, Shield, LogOut, QrCode, Home, Leaf, Menu, X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  to: string;
  icon: React.ElementType;
}

const agentNav: NavItem[] = [
  { label: "Dashboard", to: "/agent", icon: LayoutDashboard },
  { label: "Enroll Farmer", to: "/agent/enroll", icon: UserPlus },
  { label: "Farmer Records", to: "/agent/records", icon: Users },
];

const farmerNav: NavItem[] = [
  { label: "My Agri-ID", to: "/farmer", icon: Home },
  { label: "Farm Profile", to: "/farmer/profile", icon: Leaf },
  { label: "Consent Center", to: "/farmer/consent", icon: Shield },
];

const providerNav: NavItem[] = [
  { label: "Dashboard", to: "/provider", icon: LayoutDashboard },
  { label: "Eligibility Check", to: "/provider/eligibility", icon: Search },
  { label: "Issue Request", to: "/provider/request", icon: FileText },
];

export default function PortalLayout({ children }: { children: ReactNode }) {
  const { role, name, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = role === "agent" ? agentNav : role === "farmer" ? farmerNav : providerNav;
  const portalTitle = role === "agent" ? "Agent Portal" : role === "farmer" ? "Farmer App" : "Service Provider";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-primary text-primary-foreground">
        <div className="p-5 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Leaf className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-bold text-lg">Agri-ID</span>
          </Link>
          <p className="text-xs mt-1 opacity-70">{portalTitle}</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-bold">
              {name.charAt(0)}
            </div>
            <div className="text-sm">
              <p className="font-medium">{name}</p>
              <p className="text-xs opacity-70 capitalize">{role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between p-4 border-b bg-card">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold">Agri-ID</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </header>

        {mobileOpen && (
          <div className="md:hidden bg-card border-b p-3 space-y-1 animate-fade-in">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium ${
                  location.pathname === item.to ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
            <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2.5 text-sm text-destructive">
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        )}

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
