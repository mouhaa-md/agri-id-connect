import PortalLayout from "@/layouts/PortalLayout";
import { serviceProviders, fraudAlerts, farmers } from "@/data/seedData";
import { BarChart3, Users, AlertTriangle, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const activeFarmers = farmers.filter(f => f.status === "active").length;

const programs = [
  { name: "Subvention Engrais 2024", type: "Subsidy", beneficiaries: 1247, budget: "2.4B CFA" },
  { name: "Microcredit Agricole", type: "Credit", beneficiaries: 834, budget: "890M CFA" },
  { name: "Assurance Récolte", type: "Insurance", beneficiaries: 562, budget: "1.1B CFA" },
];

export default function ProviderDashboard() {
  return (
    <PortalLayout>
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Service Provider Dashboard</h1>
            <p className="text-muted-foreground">Banque Agricole du Sénégal</p>
          </div>
          <Button asChild>
            <Link to="/provider/eligibility">Check Eligibility</Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Verified Farmers", value: activeFarmers, icon: Users },
            { label: "Programs Active", value: programs.length, icon: BarChart3 },
            { label: "Fraud Alerts", value: fraudAlerts.length, icon: AlertTriangle },
            { label: "Verification Rate", value: "99.2%", icon: TrendingUp },
          ].map(s => (
            <div key={s.label} className="agri-stat-card">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Programs */}
          <div className="agri-card">
            <div className="p-5 border-b"><h3 className="font-semibold">Active Programs</h3></div>
            <div className="divide-y">
              {programs.map(p => (
                <div key={p.name} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.type} · {p.beneficiaries} beneficiaries</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">{p.budget}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fraud Alerts */}
          <div className="agri-card">
            <div className="p-5 border-b flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <h3 className="font-semibold">Fraud Prevention</h3>
            </div>
            <div className="divide-y">
              {fraudAlerts.map(fa => (
                <div key={fa.id} className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`agri-badge ${fa.severity === "high" ? "bg-destructive/10 text-destructive" : "agri-badge-warning"}`}>
                      {fa.severity}
                    </span>
                    <span className="font-medium text-sm">{fa.type}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{fa.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{fa.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
