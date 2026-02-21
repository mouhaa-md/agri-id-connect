import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Leaf, Shield, Users, QrCode, ArrowRight, CheckCircle, ChevronRight, Globe,
  Fingerprint, Lock, Eye, Smartphone, Zap, Mail, Phone, MessageCircle,
  Sparkles, TrendingUp, Award, Heart
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const steps = [
  { icon: Users, title: "Enroll", desc: "Agent registers farmer with basic identity and farming profile", color: "bg-primary/10 text-primary" },
  { icon: QrCode, title: "Agri-ID Issued", desc: "Unique digital ID with QR code generated instantly", color: "bg-accent/10 text-accent" },
  { icon: Shield, title: "Farmer Controls Data", desc: "Farmer approves or denies every data access request", color: "bg-info/10 text-info" },
  { icon: CheckCircle, title: "Services Delivered", desc: "Banks, insurers, and programs verify eligibility securely", color: "bg-success/10 text-success" },
];

const stats = [
  { value: "2.4M+", label: "Farmers across Africa", icon: Users },
  { value: "98%", label: "Verification accuracy", icon: Award },
  { value: "<3s", label: "Identity check time", icon: Zap },
  { value: "100%", label: "Farmer-owned data", icon: Lock },
];

const trustFeatures = [
  { icon: Fingerprint, title: "Consent-First", desc: "Farmers approve every single data request with clear scope descriptions" },
  { icon: Eye, title: "Minimal Disclosure", desc: "Service providers see only what is needed, never the full profile" },
  { icon: Lock, title: "Full Audit Trail", desc: "Every data access is logged with timestamp, actor, and purpose" },
];

const partners = [
  "MOSIP Foundation", "African Union", "ECOWAS", "World Bank", "CGIAR"
];

export default function Landing() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Nav */}
      <motion.nav
        className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="agri-container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div
              className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center"
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </motion.div>
            <span className="font-bold text-xl tracking-tight">Agri-ID</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link to="/how-it-works" className="hover:text-foreground transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">How It Works</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">Privacy</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button size="sm" onClick={() => navigate("/login")}>
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        {/* Animated background particles */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-accent/10 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-10 right-[15%] w-96 h-96 rounded-full bg-primary-foreground/5 blur-3xl"
            animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-accent/5 blur-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="agri-container relative py-24 md:py-36">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium mb-8 backdrop-blur-sm border border-accent/20">
              <Sparkles className="w-3.5 h-3.5" />
              Digital Identity for African Farmers
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-[1.1] mb-6">
              Every farmer deserves a{" "}
              <motion.span
                className="text-accent inline-block"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                verified identity
              </motion.span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl leading-relaxed">
              Agri-ID gives smallholder farmers a secure, portable digital identity,
              enabling access to credit, insurance, and government programs while keeping
              farmers in full control of their data.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 shadow-lg shadow-accent/25"
                  onClick={() => navigate("/login")}
                >
                  Enroll a Farmer
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="font-semibold shadow-lg"
                  onClick={() => navigate("/demo")}
                >
                  <Globe className="mr-2 w-4 h-4" />
                  View Guided Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust line */}
            <motion.div variants={fadeUp} custom={4} className="flex items-center gap-6 mt-12 pt-8 border-t border-primary-foreground/10">
              <div className="flex -space-x-2">
                {["M", "F", "A", "O"].map((letter, i) => (
                  <motion.div
                    key={letter}
                    className="w-8 h-8 rounded-full bg-accent/80 border-2 border-primary flex items-center justify-center text-xs font-bold text-accent-foreground"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    {letter}
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-primary-foreground/60">
                Trusted by <span className="text-accent font-semibold">2.4M+</span> farmers across the continent
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="border-b bg-card relative">
        <div className="agri-container py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center group"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3"
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <s.icon className="w-5 h-5 text-primary" />
                </motion.div>
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
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Smartphone className="w-3 h-3" />
              Simple Process
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Agri-ID Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A simple, four-step process designed for rural contexts. Works on smartphones and basic phones alike.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="relative text-center group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                custom={i}
              >
                <motion.div
                  className={`w-16 h-16 rounded-2xl ${step.color.split(" ")[0]} flex items-center justify-center mx-auto mb-4`}
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <step.icon className={`w-7 h-7 ${step.color.split(" ")[1]}`} />
                </motion.div>
                {/* Connector line */}
                {i < 3 && (
                  <motion.div
                    className="absolute top-8 left-[60%] w-[80%] h-px bg-border hidden md:block"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 + 0.3, duration: 0.5 }}
                    style={{ originX: 0 }}
                  />
                )}
                <motion.div
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold mb-2"
                  whileHover={{ scale: 1.2 }}
                >
                  {i + 1}
                </motion.div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-muted/50 agri-section overflow-hidden">
        <div className="agri-container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Farmer-Owned Data
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              No data is shared without explicit farmer consent. Every access is logged,
              every permission is revocable, and only the minimum necessary data is disclosed.
            </motion.p>
            <div className="grid sm:grid-cols-3 gap-6 text-left">
              {trustFeatures.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="agri-card p-6 group cursor-default"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Ticker */}
      <section className="border-y bg-card py-8 overflow-hidden">
        <div className="agri-container">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground text-center mb-6">Conceptual Integration Partners</p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {partners.map((p, i) => (
              <motion.span
                key={p}
                className="text-sm font-semibold text-muted-foreground/60 hover:text-foreground transition-colors duration-300 cursor-default"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {p}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="agri-section relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="agri-container text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-6">
              <Heart className="w-3 h-3" />
              Try it now
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to see Agri-ID in action?</h2>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
              Experience the full enrollment-to-verification journey in under 3 minutes.
            </p>
            <div className="flex justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" className="shadow-lg shadow-primary/20" onClick={() => navigate("/demo")}>
                  <Sparkles className="mr-2 w-4 h-4" />
                  Start Guided Demo
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="agri-container py-12">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">Agri-ID</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed">
                Digital identity infrastructure for smallholder farmers. Built for Africa, designed for scale.
              </p>
              <div className="space-y-2.5">
                <a href="mailto:mmdiagne@ept.sn" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  mmdiagne@ept.sn
                </a>
                <a href="https://wa.me/221769481773" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
                    <MessageCircle className="w-4 h-4 text-success" />
                  </div>
                  +221 76 948 17 73
                </a>
              </div>
            </div>

            {/* Platform */}
            <div>
              <p className="font-semibold mb-4">Platform</p>
              <div className="space-y-2.5 text-sm text-muted-foreground">
                <Link to="/how-it-works" className="block hover:text-foreground transition-colors">How It Works</Link>
                <Link to="/privacy" className="block hover:text-foreground transition-colors">Privacy</Link>
                <Link to="/demo" className="block hover:text-foreground transition-colors">Guided Demo</Link>
                <Link to="/login" className="block hover:text-foreground transition-colors">Sign In</Link>
              </div>
            </div>

            {/* Technical */}
            <div>
              <p className="font-semibold mb-4">Technical</p>
              <div className="space-y-2.5 text-sm text-muted-foreground">
                <p className="cursor-default">MOSIP Integration</p>
                <p className="cursor-default">Open Standards</p>
                <p className="cursor-default">API Documentation</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Agri-ID. All rights reserved.</p>
            <p className="px-3 py-1.5 bg-warning/10 text-warning rounded-full text-xs font-medium">
              Prototype / Demo data only
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
