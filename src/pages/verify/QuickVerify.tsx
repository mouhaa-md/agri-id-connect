import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QrCode, CheckCircle, Wifi, WifiOff, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { farmers } from "@/data/seedData";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";

export default function QuickVerify() {
  const [scanning, setScanning] = useState(false);
  const [verified, setVerified] = useState(false);
  const farmer = farmers[0];

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setVerified(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b bg-card p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 text-sm text-muted-foreground">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <span className="font-bold">Quick Verify</span>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <WifiOff className="w-3 h-3" /> Offline-ready
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        {!verified ? (
          <motion.div className="text-center max-w-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <QrCode className={`w-10 h-10 text-primary ${scanning ? "animate-pulse" : ""}`} />
            </div>
            <h1 className="text-2xl font-bold mb-2">Scan Farmer QR Code</h1>
            <p className="text-muted-foreground mb-8">Point the camera at the farmer's Agri-ID card or phone</p>
            <Button size="lg" onClick={simulateScan} disabled={scanning}>
              {scanning ? "Scanning..." : "Simulate QR Scan"}
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Cached QR validity: verified results available even without internet
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="text-center max-w-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-2xl font-bold mb-1">Verified Farmer</h1>
            <p className="text-muted-foreground mb-6">Identity confirmed</p>

            <div className="agri-card p-5 text-left mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-bold">{farmer.firstName} {farmer.lastName}</p>
                  <p className="text-sm text-muted-foreground">{farmer.region}, {farmer.country}</p>
                </div>
                <span className="agri-badge-success">Active</span>
              </div>
              <div className="text-sm space-y-2 border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Agri-ID</span>
                  <span className="font-mono text-xs">{farmer.agriId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Verified at</span>
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>

            <Button variant="outline" onClick={() => { setVerified(false); }}>
              Scan Another
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
