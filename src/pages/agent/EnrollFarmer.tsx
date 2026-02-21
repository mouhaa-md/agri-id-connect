import { useState } from "react";
import PortalLayout from "@/layouts/PortalLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CheckCircle, ArrowRight, ArrowLeft, Camera, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";

const stepTitles = ["Basic Identity", "Farming Profile", "Photo & Biometric", "Review", "Agri-ID Issued"];

export default function EnrollFarmer() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: "", lastName: "", gender: "", yearOfBirth: "", phone: "",
    village: "", region: "", crops: [] as string[], landSizeHa: "",
    cooperative: "", season: "Hivernage", photoUploaded: false, biometric: false,
  });

  const agriId = `AGR-SN-${String(Math.floor(10000 + Math.random() * 90000))}`;

  const update = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }));
  const toggleCrop = (crop: string) => {
    setForm(prev => ({
      ...prev,
      crops: prev.crops.includes(crop) ? prev.crops.filter(c => c !== crop) : [...prev.crops, crop],
    }));
  };

  const canNext = () => {
    if (step === 0) return form.firstName && form.lastName && form.gender && form.phone;
    if (step === 1) return form.crops.length > 0 && form.landSizeHa;
    return true;
  };

  return (
    <PortalLayout>
      <div className="max-w-2xl mx-auto animate-fade-in">
        <h1 className="text-2xl font-bold mb-2">Enroll New Farmer</h1>
        <p className="text-muted-foreground mb-8">Complete all steps to issue an Agri-ID</p>

        {/* Stepper */}
        <div className="flex items-center mb-8 overflow-x-auto pb-2">
          {stepTitles.map((title, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center min-w-[80px]">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  i < step ? "bg-success text-success-foreground" :
                  i === step ? "bg-primary text-primary-foreground" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-[10px] mt-1 text-center ${i === step ? "font-medium" : "text-muted-foreground"}`}>
                  {title}
                </span>
              </div>
              {i < stepTitles.length - 1 && (
                <div className={`w-8 h-px mx-1 ${i < step ? "bg-success" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="agri-card p-6"
          >
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-lg">Basic Identity</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label>First Name *</Label><Input value={form.firstName} onChange={e => update("firstName", e.target.value)} placeholder="Mamadou" /></div>
                  <div><Label>Last Name *</Label><Input value={form.lastName} onChange={e => update("lastName", e.target.value)} placeholder="Diallo" /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Gender *</Label>
                    <Select value={form.gender} onValueChange={v => update("gender", v)}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent><SelectItem value="M">Male</SelectItem><SelectItem value="F">Female</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div><Label>Year of Birth</Label><Input value={form.yearOfBirth} onChange={e => update("yearOfBirth", e.target.value)} placeholder="1985" /></div>
                </div>
                <div><Label>Phone Number *</Label><Input value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+221 77 000 0000" /></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label>Village</Label><Input value={form.village} onChange={e => update("village", e.target.value)} placeholder="Nioro du Rip" /></div>
                  <div>
                    <Label>Region</Label>
                    <Select value={form.region} onValueChange={v => update("region", v)}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {["Kaolack", "Thiès", "Saint-Louis", "Ziguinchor", "Tambacounda"].map(r => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-lg">Farming Profile</h2>
                <div>
                  <Label>Crops Grown *</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Groundnut", "Millet", "Rice", "Maize", "Onion"].map(crop => (
                      <button
                        key={crop}
                        onClick={() => toggleCrop(crop)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                          form.crops.includes(crop) ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"
                        }`}
                      >
                        {crop}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label>Land Size (hectares) *</Label><Input type="number" value={form.landSizeHa} onChange={e => update("landSizeHa", e.target.value)} placeholder="2.5" /></div>
                  <div>
                    <Label>Season</Label>
                    <Select value={form.season} onValueChange={v => update("season", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent><SelectItem value="Hivernage">Hivernage (Rainy)</SelectItem><SelectItem value="Contre-saison">Contre-saison (Dry)</SelectItem></SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Cooperative</Label>
                  <Select value={form.cooperative} onValueChange={v => update("cooperative", v)}>
                    <SelectTrigger><SelectValue placeholder="Select cooperative" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="coop1">Coopérative Arachidière de Kaolack</SelectItem>
                      <SelectItem value="coop2">GIE Téranga Thiès</SelectItem>
                      <SelectItem value="coop3">Union des Riziculteurs du Fleuve</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-semibold text-lg">Photo & Biometric</h2>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  {form.photoUploaded ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-success" />
                      </div>
                      <p className="text-sm font-medium">Photo captured</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <Camera className="w-10 h-10 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Capture or upload farmer photo</p>
                      <Button variant="outline" size="sm" onClick={() => update("photoUploaded", true)}>
                        Simulate Photo Capture
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium text-sm">Biometric Enrollment</p>
                    <p className="text-xs text-muted-foreground">Optional — fingerprint capture for additional verification</p>
                  </div>
                  <Switch checked={form.biometric} onCheckedChange={v => update("biometric", v)} />
                </div>
                {form.biometric && (
                  <p className="text-xs text-warning bg-warning/10 p-3 rounded-lg">
                    ⚠ Biometric data is stored securely and used only for identity verification. The farmer can request deletion at any time.
                  </p>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-lg">Review Information</h2>
                <div className="space-y-3">
                  {[
                    ["Name", `${form.firstName} ${form.lastName}`],
                    ["Gender", form.gender === "M" ? "Male" : "Female"],
                    ["Phone", form.phone],
                    ["Region", `${form.village || "-"}, ${form.region || "-"}`],
                    ["Crops", form.crops.join(", ") || "-"],
                    ["Land Size", form.landSizeHa ? `${form.landSizeHa} ha` : "-"],
                    ["Photo", form.photoUploaded ? "Captured ✓" : "Not captured"],
                    ["Biometric", form.biometric ? "Enrolled" : "Skipped (optional)"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between text-sm py-2 border-b last:border-0">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-1">Agri-ID Created!</h2>
                  <p className="text-muted-foreground">Farmer has been successfully enrolled</p>
                </div>
                <div className="inline-block p-6 bg-card border rounded-xl">
                  <p className="text-xs text-muted-foreground mb-2">Agri-ID Number</p>
                  <p className="text-2xl font-bold font-mono mb-4">{agriId}</p>
                  <QRCodeSVG value={`https://agri-id.app/verify/${agriId}`} size={160} className="mx-auto" />
                </div>
                {/* Printable card preview */}
                <div className="agri-card p-5 max-w-sm mx-auto text-left">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">A</div>
                    <div>
                      <p className="text-xs font-bold">AGRI-ID</p>
                      <p className="text-[10px] text-muted-foreground">Digital Farmer Identity</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="text-xs space-y-1">
                      <p className="font-semibold">{form.firstName} {form.lastName}</p>
                      <p className="text-muted-foreground">{form.region || "Senegal"}</p>
                      <p className="font-mono text-muted-foreground">{agriId}</p>
                    </div>
                    <QRCodeSVG value={agriId} size={48} />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button variant="ghost" disabled={step === 0 || step === 4} onClick={() => setStep(step - 1)}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          {step < 3 && (
            <Button disabled={!canNext()} onClick={() => setStep(step + 1)}>
              Next <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          )}
          {step === 3 && (
            <Button onClick={() => setStep(4)}>
              Create Agri-ID <CheckCircle className="ml-1 w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
