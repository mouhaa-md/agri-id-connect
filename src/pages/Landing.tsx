import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Shield, Users, QrCode, ArrowRight, CheckCircle, ChevronRight, Globe } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const steps = [
  { icon: Users, title: "Enroll", desc: "Agent registers farmer with basic identity and farming profile" },
  { icon: QrCode, title: "Agri-ID Issued", desc: "Unique digital ID with QR code generated instantly" },
  { icon: Shield, title: "Farmer Controls Data", desc: "Farmer approves or denies every data access request" },
  { icon: CheckCircle, title: "Services Delivered", desc: "Banks, insurers, and programs verify eligibility securely" },
];

const stats = [
  { value: "2.4M+", label: "Farmers across Africa" },
  { value: "98%", label: "Verification accuracy" },
  { value: "<3s", label: "Identity check time" },
  { value: "100%", label: "Farmer-owned data" },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="agri-container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">Agri-ID</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link to="/how-it-works" className="hover:text-foreground transition-colors">How It Works</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button size="sm" onClick={() => navigate("/login")}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="agri-container relative py-20 md:py-32">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
             <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
              <Globe className="w-3.5 h-3.5" />
              Digital Identity for African Farmers
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
              Every farmer deserves a{" "}
              <span className="text-accent">verified identity</span>
            </motion.h1>
             <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl leading-relaxed">
              Agri-ID gives smallholder farmers a secure, portable digital identity, 
              enabling access to credit, insurance, and government programs while keeping 
              farmers in full control of their data.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8"
                onClick={() => navigate("/login")}
              >
                Enroll a Farmer
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="font-semibold"
                onClick={() => navigate("/demo")}
              >
                View Guided Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-card">
        <div className="agri-container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-3xl md:text-4xl font-extrabold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="agri-section">
        <div className="agri-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Agri-ID Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A simple, four-step process designed for rural contexts. Works on smartphones and basic phones alike.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="absolute top-8 left-[60%] w-[80%] h-px bg-border hidden md:block last:hidden" style={{ display: i === 3 ? "none" : undefined }} />
                <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Step {i + 1}</p>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-muted/50 agri-section">
        <div className="agri-container">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Farmer-Owned Data</h2>
            <p className="text-muted-foreground text-lg mb-8">
             No data is shared without explicit farmer consent. Every access is logged, 
              every permission is revocable, and only the minimum necessary data is disclosed.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 text-left">
              {[
                { title: "Consent-First", desc: "Farmers approve every single data request with clear scope descriptions" },
                { title: "Minimal Disclosure", desc: "Service providers see only what's needed — never the full profile" },
                { title: "Full Audit Trail", desc: "Every data access is logged with timestamp, actor, and purpose" },
              ].map((item) => (
                <div key={item.title} className="agri-card p-5">
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="agri-section">
        <div className="agri-container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to see Agri-ID in action?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Experience the full enrollment-to-verification journey in under 3 minutes.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={() => navigate("/demo")}>
              Start Guided Demo
              <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="agri-container py-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">Agri-ID</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Digital identity infrastructure for smallholder farmers. Built for Africa, designed for scale.
              </p>
            </div>
            <div className="flex gap-12 text-sm">
              <div>
                <p className="font-semibold mb-3">Platform</p>
                <div className="space-y-2 text-muted-foreground">
                  <Link to="/how-it-works" className="block hover:text-foreground transition-colors">How It Works</Link>
                  <Link to="/privacy" className="block hover:text-foreground transition-colors">Privacy</Link>
                  <Link to="/login" className="block hover:text-foreground transition-colors">Sign In</Link>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-3">Technical</p>
                <div className="space-y-2 text-muted-foreground">
                  <p className="cursor-default">MOSIP Integration (conceptual)</p>
                  <p className="cursor-default">Open Standards</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row justify-between text-xs text-muted-foreground">
            <p>© 2024 Agri-ID. All rights reserved.</p>
            <p className="mt-2 sm:mt-0 px-2 py-1 bg-warning/10 text-warning rounded text-xs font-medium">
              ⚠ Prototype — Demo data only
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
