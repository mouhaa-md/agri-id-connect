import PortalLayout from "@/layouts/PortalLayout";
import { farmers } from "@/data/seedData";
import { Users, UserPlus, ClipboardCheck, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const todayEnrollments = farmers.filter(f => f.enrolledAt.startsWith("2024-11")).length;
const pendingCount = farmers.filter(f => f.status === "pending").length;

const stats = [
  { label: "Total Farmers", value: farmers.length, icon: Users, change: "+3 this week" },
  { label: "Today's Enrollments", value: todayEnrollments, icon: UserPlus, change: "On track" },
  { label: "Pending Verification", value: pendingCount, icon: ClipboardCheck, change: "Review needed" },
  { label: "Active Rate", value: "93%", icon: TrendingUp, change: "+2% vs last month" },
];

const recentFarmers = farmers.slice(0, 5);

export default function AgentDashboard() {
  return (
    <PortalLayout>
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Agent Dashboard</h1>
            <p className="text-muted-foreground">Overview of enrollment activity</p>
          </div>
          <Button asChild>
            <Link to="/agent/enroll">
              <UserPlus className="w-4 h-4 mr-2" /> Enroll Farmer
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="agri-stat-card">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-xs text-success mt-1">{s.change}</p>
            </div>
          ))}
        </div>

        <div className="agri-card">
          <div className="p-5 border-b flex items-center justify-between">
            <h2 className="font-semibold">Recent Enrollments</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/agent/records">View all</Link>
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-4 font-medium text-muted-foreground">Agri-ID</th>
                  <th className="p-4 font-medium text-muted-foreground">Name</th>
                  <th className="p-4 font-medium text-muted-foreground">Region</th>
                  <th className="p-4 font-medium text-muted-foreground">Crops</th>
                  <th className="p-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentFarmers.map((f) => (
                  <tr key={f.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-mono text-xs">{f.agriId}</td>
                    <td className="p-4 font-medium">{f.firstName} {f.lastName}</td>
                    <td className="p-4 text-muted-foreground">{f.region}</td>
                    <td className="p-4 text-muted-foreground">{f.crops.join(", ")}</td>
                    <td className="p-4">
                      <span className={`agri-badge ${
                        f.status === "active" ? "agri-badge-success" :
                        f.status === "pending" ? "agri-badge-warning" : "bg-destructive/10 text-destructive"
                      }`}>
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
