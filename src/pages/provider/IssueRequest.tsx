import { useState } from "react";
import PortalLayout from "@/layouts/PortalLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { scopeDescriptions, farmers } from "@/data/seedData";
import { Send, CheckCircle } from "lucide-react";

const scopeKeys = Object.keys(scopeDescriptions);

export default function IssueRequest() {
  const [sent, setSent] = useState(false);
  const [farmerId, setFarmerId] = useState("");
  const [purpose, setPurpose] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);

  const toggleScope = (scope: string) => {
    setSelectedScopes(prev =>
      prev.includes(scope) ? prev.filter(s => s !== scope) : [...prev, scope]
    );
  };

  if (sent) {
    return (
      <PortalLayout>
        <div className="animate-fade-in max-w-lg mx-auto text-center py-16">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-xl font-bold mb-2">Request Sent</h2>
          <p className="text-muted-foreground mb-6">The farmer will receive this request in their Consent Center and can approve or deny it.</p>
          <Button variant="outline" onClick={() => setSent(false)}>Send Another</Button>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="animate-fade-in max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Issue Data Request</h1>
        <p className="text-muted-foreground mb-6">Request access to farmer data. The farmer must approve before any data is shared.</p>

        <div className="agri-card p-6 space-y-5">
          <div>
            <Label>Farmer Agri-ID or Phone</Label>
            <Input value={farmerId} onChange={e => setFarmerId(e.target.value)} placeholder="AGR-SN-10000" />
          </div>

          <div>
            <Label>Purpose</Label>
            <Textarea value={purpose} onChange={e => setPurpose(e.target.value)} placeholder="Describe why you need this data..." rows={3} />
          </div>

          <div>
            <Label className="mb-3 block">Data Scopes Requested</Label>
            <div className="space-y-3">
              {scopeKeys.map(scope => (
                <label key={scope} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/30 cursor-pointer transition-colors">
                  <Checkbox
                    checked={selectedScopes.includes(scope)}
                    onCheckedChange={() => toggleScope(scope)}
                    className="mt-0.5"
                  />
                  <div>
                    <p className="font-medium text-sm capitalize">{scope.replace(/_/g, " ")}</p>
                    <p className="text-xs text-muted-foreground">{scopeDescriptions[scope]}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <Button
            className="w-full"
            disabled={!farmerId || !purpose || selectedScopes.length === 0}
            onClick={() => setSent(true)}
          >
            <Send className="w-4 h-4 mr-2" /> Send Request to Farmer
          </Button>
        </div>
      </div>
    </PortalLayout>
  );
}
