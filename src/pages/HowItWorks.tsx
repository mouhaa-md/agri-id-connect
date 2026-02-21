import { Link } from "react-router-dom";
import { Leaf, Users, QrCode, Shield, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Users,
    step: "01",
    title: "Farmer Enrollment",
    desc: "An enrollment agent (cooperative, NGO, or government worker) registers the farmer using a smartphone. Basic identity, farming profile, and optional photo are captured.",
    details: ["Name, gender, year of birth, phone", "Village, region, cooperative", "Crops, land size, season info", "Optional biometric (farmer's choice)"],
  },
  {
    icon: QrCode,
    step: "02",
    title: "Agri-ID Issued",
    desc: "A unique Agri-ID number and QR code are generated instantly. The farmer receives a printable card and a digital version accessible via USSD or smartphone.",
    details: ["Unique identifier: AGR-XX-XXXXX", "QR code for instant verification", "Printable card (front/back)", "Works offline with cached validity"],
  },
  {
    icon: Shield,
    step: "03",
    title: "Farmer Controls Data",
    desc: "When a bank, insurer, or government program wants to access farmer data, the farmer receives a clear consent request showing exactly what data will be shared.",
    details: ["Fine-grained data scopes", "Clear purpose description", "Approve or deny with one tap", "Revoke access anytime"],
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Services Delivered",
    desc: "Service providers verify identity and check eligibility using minimal disclosure. Farmers get access to credit, insurance, and subsidies they previously couldn't reach.",
    details: ["Minimal disclosure verification", "Eligibility check in seconds", "Full audit trail", "Fraud detection built in"],
  },
];

export default function HowItWorks() {
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

      <div className="agri-container py-16">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">How Agri-ID Works</h1>
          <p className="text-lg text-muted-foreground">
            From enrollment to service delivery — a seamless journey designed for rural contexts across West Africa.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-12">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              className="flex gap-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                {i < steps.length - 1 && <div className="w-px flex-1 bg-border mt-3" />}
              </div>
              <div className="pb-8">
                <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">Step {s.step}</p>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-muted-foreground mb-4">{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-3.5 h-3.5 text-success flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/demo">
              See It in Action <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
