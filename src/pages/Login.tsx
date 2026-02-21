import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { demoAccounts } from "@/data/seedData";
import { Leaf, User, Users, Building2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const roleConfig = {
  agent: { icon: Users, label: "Enrollment Agent", color: "bg-primary" },
  farmer: { icon: User, label: "Farmer", color: "bg-success" },
  provider: { icon: Building2, label: "Service Provider", color: "bg-info" },
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  const handleDemo = (account: typeof demoAccounts[0]) => {
    login(account.role, account.name);
    navigate(account.role === "agent" ? "/agent" : account.role === "farmer" ? "/farmer" : "/provider");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-md text-primary-foreground">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <Leaf className="w-7 h-7 text-accent-foreground" />
            </div>
            <span className="font-bold text-3xl">Agri-ID</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Empowering farmers with digital identity</h2>
          <p className="text-primary-foreground/70 leading-relaxed">
            Secure, portable, and farmer-controlled. Access your dashboard to enroll farmers, 
            manage consent, or verify eligibility.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-background">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Agri-ID</span>
          </div>

          <h1 className="text-2xl font-bold mb-2">Sign in to Agri-ID</h1>
          <p className="text-muted-foreground mb-8">Select your role to access the platform</p>

          <div className="space-y-3 mb-8">
            {demoAccounts.map((account) => {
              const config = roleConfig[account.role];
              const Icon = config.icon;
              const isSelected = selected === account.role;
              return (
                <button
                  key={account.role}
                  onClick={() => setSelected(account.role)}
                  className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30 hover:bg-muted/50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{config.label}</p>
                    <p className="text-xs text-muted-foreground">{account.name} — {account.email}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? "border-primary" : "border-border"
                  }`}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                </button>
              );
            })}
          </div>

          <Button
            className="w-full"
            size="lg"
            disabled={!selected}
            onClick={() => {
              const account = demoAccounts.find((a) => a.role === selected);
              if (account) handleDemo(account);
            }}
          >
            Sign In as Demo User
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-6">
            This is a prototype. No real authentication is performed.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
