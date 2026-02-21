import { useState } from "react";
import PortalLayout from "@/layouts/PortalLayout";
import { consentRequests, auditLog, scopeDescriptions } from "@/data/seedData";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, XCircle, Clock, Eye, Building2, Landmark, Heart } from "lucide-react";
import { motion } from "framer-motion";

const typeIcons: Record<string, React.ElementType> = {
  bank: Landmark, insurance: Heart, government: Building2, ngo: Building2,
};

type Tab = "requests" | "audit";

export default function ConsentCenter() {
  const [requests, setRequests] = useState(consentRequests);
  const [tab, setTab] = useState<Tab>("requests");

  const handleAction = (id: string, action: "approved" | "denied" | "revoked") => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action, respondedAt: new Date().toISOString() } : r));
  };

  const pending = requests.filter(r => r.status === "pending");
  const resolved = requests.filter(r => r.status !== "pending");

  return (
    <PortalLayout>
      <div className="animate-fade-in max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Consent Center</h1>
        </div>
        <p className="text-muted-foreground mb-6">Control who accesses your data. Share only what is needed.</p>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-muted rounded-lg p-1">
          <button onClick={() => setTab("requests")} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${tab === "requests" ? "bg-card shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
            Data Requests {pending.length > 0 && <span className="ml-1 px-1.5 py-0.5 bg-warning/20 text-warning rounded-full text-xs">{pending.length}</span>}
          </button>
          <button onClick={() => setTab("audit")} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${tab === "audit" ? "bg-card shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
            Audit Log
          </button>
        </div>

        {tab === "requests" && (
          <div className="space-y-4">
            {pending.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-warning mb-3">Pending Requests</h3>
                {pending.map(r => {
                  const Icon = typeIcons[r.requesterType] || Building2;
                  return (
                    <motion.div key={r.id} className="agri-card p-5 mb-3 border-warning/30 border-2" layout>
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-warning" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{r.requesterName}</p>
                          <p className="text-sm text-muted-foreground">{r.purpose}</p>
                        </div>
                        <span className="agri-badge-warning"><Clock className="w-3 h-3 mr-1" />Pending</span>
                      </div>
                      <div className="mb-4">
                        <p className="text-xs font-medium mb-2">Data they will access:</p>
                        <div className="space-y-1.5">
                          {r.scopes.map(scope => (
                            <div key={scope} className="flex items-center gap-2 text-sm p-2 rounded bg-muted/50">
                              <Eye className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                              <div>
                                <span className="font-medium capitalize">{scope.replace(/_/g, " ")}</span>
                                <span className="text-muted-foreground ml-1">: {scopeDescriptions[scope]}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button className="flex-1" onClick={() => handleAction(r.id, "approved")}>
                          <CheckCircle className="w-4 h-4 mr-1" /> Approve
                        </Button>
                        <Button variant="outline" className="flex-1" onClick={() => handleAction(r.id, "denied")}>
                          <XCircle className="w-4 h-4 mr-1" /> Deny
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {resolved.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Previous Requests</h3>
                {resolved.map(r => {
                  const Icon = typeIcons[r.requesterType] || Building2;
                  return (
                    <div key={r.id} className="agri-card p-5 mb-3">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{r.requesterName}</p>
                          <p className="text-xs text-muted-foreground">{r.purpose}</p>
                        </div>
                        <span className={`agri-badge ${
                          r.status === "approved" ? "agri-badge-success" :
                          r.status === "denied" ? "bg-destructive/10 text-destructive" :
                          "agri-badge-warning"
                        }`}>
                          {r.status === "approved" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {r.status === "denied" && <XCircle className="w-3 h-3 mr-1" />}
                          {r.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 text-xs mb-3">
                        {r.scopes.map(s => <span key={s} className="px-2 py-0.5 rounded bg-muted capitalize">{s.replace(/_/g, " ")}</span>)}
                      </div>
                      {r.status === "approved" && (
                        <Button variant="outline" size="sm" onClick={() => handleAction(r.id, "revoked")} className="text-destructive border-destructive/30 hover:bg-destructive/5">
                          Revoke Access
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === "audit" && (
          <div className="space-y-3">
            {auditLog.map(entry => (
              <div key={entry.id} className="flex gap-3 p-4 rounded-lg border">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-sm">{entry.action}</p>
                    <span className="text-xs text-muted-foreground">{new Date(entry.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{entry.details}</p>
                  <p className="text-xs text-muted-foreground mt-1">By: {entry.actor}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
