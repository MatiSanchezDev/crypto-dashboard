"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-yellow-900/10 blur-[100px]" />
      </div>

      <Navbar />

      <main className="relative z-10 flex flex-col items-center justify-center pt-32 pb-20 px-6">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md border-b border-white/5 bg-black/50"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-orange-600 rounded-lg flex items-center justify-center font-bold text-black">
          C
        </div>
        <span className="font-bold text-xl tracking-tight">CryptoDash</span>
      </div>
      <div className="flex items-center gap-6">
        <Link
          href="/dashboard"
          className="px-4 py-2 text-sm font-bold text-black bg-white rounded-full hover:bg-neutral-200 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section className="flex flex-col items-center text-center max-w-4xl mx-auto mb-32 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-yellow-400 mb-8"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
        </span>
        Live Market Data v2.0 is included
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
      >
        Master the Crypto Market <br /> with Precision.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl leading-relaxed"
      >
        Real-time data, advanced analytics, and portfolio tracking in one
        stunning interface. Designed for traders who demand the best.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link
          href="/dashboard"
          className="px-8 py-4 text-base font-bold text-black bg-yellow-500 rounded-full hover:bg-yellow-400 transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(234,179,8,0.5)]"
        >
          Launch Dashboard
        </Link>
        <Link
          href="#features"
          className="px-8 py-4 text-base font-bold text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all"
        >
          Learn More
        </Link>
      </motion.div>

      {/* Hero Visual Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 100, rotateX: 20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, delay: 0.8, type: "spring" }}
        className="mt-20 w-full relative z-10"
        style={{ perspective: "1000px" }}
      >
        <div className="relative rounded-xl border border-white/10 bg-neutral-900/80 p-2 shadow-2xl backdrop-blur-sm">
          {/* Abstract Dashboard Representation via CSS/Divs if no image, or just a placeholder frame */}
          <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-neutral-950 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-yellow-500/10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-700 font-mono text-xl">
              [ DASHBOARD PREVIEW ]
            </div>
            {/* Creating some fake UI elements */}
            <div className="absolute top-4 left-4 right-4 h-12 bg-white/5 rounded flex items-center px-4 gap-4">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500/20" />
            </div>
          </div>
        </div>
        {/* Glow effect behind */}
        <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/20 to-purple-600/20 blur-3xl -z-10 rounded-[3rem]" />
      </motion.div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Real-Time Tracking",
      description:
        "Live price updates from major exchanges with millisecond precision.",
      icon: (
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-yellow-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      ),
    },
    {
      title: "Market Analysis",
      description:
        "Deep dive into market cap, volume, and trends with interactive charts.",
      icon: (
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-purple-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
          />
        </svg>
      ),
    },
    {
      title: "Secure & Private",
      description:
        "Your data stays yours. No tracking, no hidden fees, just pure data.",
      icon: (
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-blue-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="py-24 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="mb-4 inline-flex items-center justify-center p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">
              {feature.title}
            </h3>
            <p className="text-neutral-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 w-full text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-900 to-black border border-white/10 p-12 md:p-24"
      >
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Ready to start trading?
          </h2>
          <p className="text-neutral-400 max-w-lg mb-10 text-lg">
            Join thousands of traders who rely on CryptoDash for their daily
            market insights.
          </p>
          <Link
            href="/dashboard"
            className="px-10 py-5 text-lg font-bold text-black bg-white rounded-full hover:bg-neutral-200 transition-all hover:scale-105"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-500/20 blur-[100px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full" />
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 text-center text-neutral-500 text-sm">
      <p>&copy; {new Date().getFullYear()} CryptoDash. All rights reserved.</p>
    </footer>
  );
}
