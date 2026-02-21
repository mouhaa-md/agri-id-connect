import { Link } from "react-router-dom";
import { Leaf, Shield, Eye, FileText, ToggleRight, ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="agri-container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Agri-ID</span>
          </Link>
          <Link to="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>
      </nav>

      <div className="agri-container py-16 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy & Digital Rights</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Agri-ID is built on the principle that farmers own their data. Here's how we protect it.
        </p>

        <div className="space-y-10">
          {[
            { icon: Shield, title: "Farmer-Owned Data", desc: "Your identity data belongs to you. Agri-ID is a custodian, not an owner. You can request deletion of your data at any time." },
            { icon: Eye, title: "Explicit Consent", desc: "No organization can access your data without your explicit, informed consent. Every request clearly describes what data will be shared and why." },
            { icon: ToggleRight, title: "Revoke Anytime", desc: "Changed your mind? Revoke access to any organization at any time through the Consent Center. Revocation is immediate." },
            { icon: FileText, title: "Minimal Data Disclosure", desc: "Service providers receive only the minimum data needed. A bank checking loan eligibility doesn't need your exact birth date — just your verified status and farming profile." },
          ].map((item) => (
            <div key={item.title} className="flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
