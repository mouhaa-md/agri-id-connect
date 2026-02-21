import { useState } from "react";
import PortalLayout from "@/layouts/PortalLayout";
import { farmers } from "@/data/seedData";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function FarmerRecords() {
  const [search, setSearch] = useState("");
  const filtered = farmers.filter(f =>
    `${f.firstName} ${f.lastName} ${f.agriId} ${f.region} ${f.phone}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PortalLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold mb-2">Farmer Records</h1>
        <p className="text-muted-foreground mb-6">Search and manage all enrolled farmers</p>

        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search by name, Agri-ID, region, or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="agri-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="p-4 font-medium text-muted-foreground">Agri-ID</th>
                <th className="p-4 font-medium text-muted-foreground">Name</th>
                <th className="p-4 font-medium text-muted-foreground">Region</th>
                <th className="p-4 font-medium text-muted-foreground">Village</th>
                <th className="p-4 font-medium text-muted-foreground">Crops</th>
                <th className="p-4 font-medium text-muted-foreground">Land</th>
                <th className="p-4 font-medium text-muted-foreground">Status</th>
                <th className="p-4 font-medium text-muted-foreground">Enrolled</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(f => (
                <tr key={f.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-mono text-xs">{f.agriId}</td>
                  <td className="p-4 font-medium">{f.firstName} {f.lastName}</td>
                  <td className="p-4 text-muted-foreground">{f.region}</td>
                  <td className="p-4 text-muted-foreground">{f.village}</td>
                  <td className="p-4 text-muted-foreground text-xs">{f.crops.join(", ")}</td>
                  <td className="p-4 text-muted-foreground">{f.landSizeHa} ha</td>
                  <td className="p-4">
                    <span className={`agri-badge ${
                      f.status === "active" ? "agri-badge-success" :
                      f.status === "pending" ? "agri-badge-warning" : "bg-destructive/10 text-destructive"
                    }`}>{f.status}</span>
                  </td>
                  <td className="p-4 text-muted-foreground text-xs">{f.enrolledAt}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="p-8 text-center text-muted-foreground">No farmers found matching "{search}"</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-4">{filtered.length} of {farmers.length} records</p>
      </div>
    </PortalLayout>
  );
}
