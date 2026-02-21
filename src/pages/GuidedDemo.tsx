import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const demoSteps = [
  {
    title: "Agent enrolls a farmer",
    description: "An enrollment agent captures the farmer's identity, farming profile, and issues an Agri-ID with a QR code.",
    role: "agent" as const,
    name: "Agent Diallo",
    target: "/agent/enroll",
  },
  {
    title: "Farmer reviews consent request",
    description: "The farmer logs in to see their Agri-ID and finds a pending data request from the bank. They can approve or deny with full transparency.",
    role: "farmer" as const,
    name: "Mamadou Diallo",
    target: "/farmer/consent",
  },
  {
    title: "Bank verifies eligibility",
    description: "The bank uses minimal disclosure to check the farmer's eligibility for microcredit, only seeing what is necessary.",
    role: "provider" as const,
    name: "Banque Agricole",
    target: "/provider/eligibility",
  },
];

export default function GuidedDemo() {
  const [step, setStep] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();

  const current = demoSteps[step];

  const handleGo = () => {
    login(current.role, current.name);
    navigate(current.target);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Guided Demo</h1>
          <p className="text-muted-foreground">Experience the Agri-ID journey in 3 steps</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {demoSteps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i <= step ? "bg-primary w-12" : "bg-border w-8"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="agri-card p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Step {step + 1} of 3</span>
            </div>
            <h2 className="text-xl font-bold mb-3">{current.title}</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">{current.description}</p>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                disabled={step === 0}
                onClick={() => setStep(step - 1)}
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button onClick={handleGo}>
                Open as {current.name}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 space-y-2">
          {demoSteps.map((s, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left text-sm transition-colors ${
                i === step ? "bg-primary/5 border border-primary/20" : "hover:bg-muted"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                i < step ? "bg-success text-success-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              <span className={i === step ? "font-medium" : "text-muted-foreground"}>{s.title}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
