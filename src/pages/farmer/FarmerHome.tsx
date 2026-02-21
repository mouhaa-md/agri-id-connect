import PortalLayout from "@/layouts/PortalLayout";
import { farmers } from "@/data/seedData";
import { QRCodeSVG } from "qrcode.react";
import { Shield, Leaf, MapPin, Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const farmer = farmers[0];

export default function FarmerHome() {
  return (
    <PortalLayout>
      <div className="animate-fade-in max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Agri-ID</h1>

        {/* ID Card */}
        <div className="rounded-2xl p-6 mb-6 text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Leaf className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-wider opacity-80">AGRI-ID</p>
              <p className="text-[10px] opacity-60">Digital Farmer Identity</p>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-2xl font-bold mb-1">{farmer.firstName} {farmer.lastName}</p>
              <div className="flex items-center gap-3 text-sm opacity-80 mb-3">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{farmer.village}, {farmer.region}</span>
              </div>
              <p className="font-mono text-lg tracking-wide">{farmer.agriId}</p>
              <div className="flex items-center gap-4 mt-2 text-xs opacity-70">
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{farmer.phone}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Born {farmer.yearOfBirth}</span>
              </div>
            </div>
            <div className="bg-primary-foreground p-2 rounded-lg">
              <QRCodeSVG value={`https://agri-id.app/verify/${farmer.agriId}`} size={80} />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-primary-foreground/20 flex items-center justify-between">
            <span className="agri-badge bg-success/20 text-success-foreground text-xs">● Verified & Active</span>
            <span className="text-xs opacity-60">Enrolled {farmer.enrolledAt}</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="agri-stat-card text-center">
            <p className="text-2xl font-bold text-primary">{farmer.crops.length}</p>
            <p className="text-xs text-muted-foreground">Crops</p>
          </div>
          <div className="agri-stat-card text-center">
            <p className="text-2xl font-bold text-primary">{farmer.landSizeHa} ha</p>
            <p className="text-xs text-muted-foreground">Land Size</p>
          </div>
          <div className="agri-stat-card text-center">
            <p className="text-2xl font-bold text-primary">{farmer.seasons.length}</p>
            <p className="text-xs text-muted-foreground">Seasons</p>
          </div>
        </div>

        {/* Last Season */}
        <div className="agri-card p-5 mb-6">
          <h3 className="font-semibold mb-3">Last Season Summary</h3>
          <div className="text-sm space-y-2">
            <div className="flex justify-between"><span className="text-muted-foreground">Season</span><span>{farmer.seasons[0].year} {farmer.seasons[0].season}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Crops</span><span>{farmer.seasons[0].crops.join(", ")}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Yield</span><span>{farmer.seasons[0].yieldKg} kg</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Inputs</span><span className="text-right max-w-[200px]">{farmer.seasons[0].inputsReceived.join(", ")}</span></div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 gap-3">
          <Button variant="outline" className="justify-start h-auto p-4" asChild>
            <Link to="/farmer/consent">
              <Shield className="w-5 h-5 mr-3 text-primary" />
              <div className="text-left">
                <p className="font-medium text-sm">Consent Center</p>
                <p className="text-xs text-muted-foreground">1 pending request</p>
              </div>
            </Link>
          </Button>
          <Button variant="outline" className="justify-start h-auto p-4" asChild>
            <Link to="/farmer/profile">
              <Leaf className="w-5 h-5 mr-3 text-primary" />
              <div className="text-left">
                <p className="font-medium text-sm">Farm Profile</p>
                <p className="text-xs text-muted-foreground">View full details</p>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </PortalLayout>
  );
}
