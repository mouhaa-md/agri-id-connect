import PortalLayout from "@/layouts/PortalLayout";
import { farmers } from "@/data/seedData";

const farmer = farmers[0];

export default function FarmProfile() {
  return (
    <PortalLayout>
      <div className="animate-fade-in max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Farm Profile</h1>
        <p className="text-muted-foreground mb-6">Your farming information and season history</p>

        <div className="agri-card p-5 mb-6">
          <h3 className="font-semibold mb-4">Farm Details</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div><p className="text-muted-foreground text-xs mb-1">Crops Grown</p><div className="flex flex-wrap gap-1.5">{farmer.crops.map(c => <span key={c} className="agri-badge-success">{c}</span>)}</div></div>
            <div><p className="text-muted-foreground text-xs mb-1">Land Size</p><p className="font-medium">{farmer.landSizeHa} hectares</p></div>
            <div><p className="text-muted-foreground text-xs mb-1">Cooperative</p><p className="font-medium">{farmer.cooperative}</p></div>
            <div><p className="text-muted-foreground text-xs mb-1">Region</p><p className="font-medium">{farmer.village}, {farmer.region}</p></div>
          </div>
        </div>

        <div className="agri-card p-5">
          <h3 className="font-semibold mb-4">Season History</h3>
          <div className="space-y-4">
            {farmer.seasons.map((s, i) => (
              <div key={i} className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{s.year} — {s.season}</h4>
                  <span className="agri-badge-success">{s.yieldKg} kg yield</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Crops</p>
                    <p>{s.crops.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Inputs Received</p>
                    <p>{s.inputsReceived.join(", ")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
