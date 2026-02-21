import { useState } from "react";
import PortalLayout from "@/layouts/PortalLayout";
import { farmers } from "@/data/seedData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, QrCode, CheckCircle, XCircle, AlertTriangle, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Decision = "eligible" | "review" | "not_eligible" | null;

export default function EligibilityCheck() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<typeof farmers[0] | null>(null);
  const [decision, setDecision] = useState<Decision>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const found = farmers.find(f =>
      f.agriId.toLowerCase() === query.toLowerCase() ||
      f.phone.replace(/\s/g, "").includes(query.replace(/\s/g, ""))
    );
    setResult(found || null);
    setSearched(true);
    if (found) {
      // Simulate decision
      if (found.status === "active" && found.landSizeHa >= 1 && found.seasons.length >= 1) {
        setDecision("eligible");
      } else if (found.status === "pending") {
        setDecision("review");
      } else {
        setDecision("not_eligible");
      }
    } else {
      setDecision(null);
    }
  };

  return (
    <PortalLayout>
      <div className="animate-fade-in max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Eligibility Check</h1>
        <p className="text-muted-foreground mb-6">Verify farmer identity and check program eligibility using minimal disclosure</p>

        <div className="agri-card p-5 mb-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Enter Agri-ID (e.g. AGR-SN-10000) or phone number"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
            <Button variant="outline" className="flex-shrink-0">
              <QrCode className="w-4 h-4 mr-1" /> Scan QR
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Try: AGR-SN-10000, AGR-SN-10137, or AGR-SN-10274</p>
        </div>

        <AnimatePresence>
          {searched && result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Decision Banner */}
              <div className={`p-5 rounded-lg flex items-center gap-4 ${
                decision === "eligible" ? "bg-success/10 border border-success/30" :
                decision === "review" ? "bg-warning/10 border border-warning/30" :
                "bg-destructive/10 border border-destructive/30"
              }`}>
                {decision === "eligible" && <CheckCircle className="w-8 h-8 text-success" />}
                {decision === "review" && <AlertTriangle className="w-8 h-8 text-warning" />}
                {decision === "not_eligible" && <XCircle className="w-8 h-8 text-destructive" />}
                <div>
                  <p className="font-bold text-lg">
                    {decision === "eligible" ? "Eligible" : decision === "review" ? "Needs Review" : "Not Eligible"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {decision === "eligible" ? "Farmer meets all criteria for Microcredit Agricole" :
                     decision === "review" ? "Farmer identity verification pending — manual review required" :
                     "Farmer does not meet minimum requirements"}
                  </p>
                </div>
              </div>

              {/* Minimal Disclosure Card */}
              <div className="agri-card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold">Verified Information (Minimal Disclosure)</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Identity Status</span>
                    <span className={`font-medium ${result.status === "active" ? "text-success" : "text-warning"}`}>
                      {result.status === "active" ? "Verified ✓" : "Pending"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Region</span>
                    <span className="font-medium">{result.region}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Crop Category</span>
                    <span className="font-medium">{result.crops[0]}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Land Size Band</span>
                    <span className="font-medium">
                      {result.landSizeHa < 2 ? "Small (< 2 ha)" : result.landSizeHa < 5 ? "Medium (2–5 ha)" : "Large (> 5 ha)"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Season History</span>
                    <span className="font-medium">{result.seasons.length} season(s) recorded</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 p-3 bg-muted/50 rounded">
                  ℹ Only the minimum necessary data is shown. Full details require explicit farmer consent.
                </p>
              </div>
            </motion.div>
          )}

          {searched && !result && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="agri-card p-8 text-center">
              <XCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium">No farmer found</p>
              <p className="text-sm text-muted-foreground">Check the Agri-ID or phone number and try again</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PortalLayout>
  );
}
