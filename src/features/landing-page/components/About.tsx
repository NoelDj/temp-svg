"use client"

import { useState } from "react";

const features = [
  {
    icon: "⚡",
    title: "Blazing Fast",
    desc: "Sub-100ms response times backed by edge infrastructure across 40+ global regions.",
  },
  {
    icon: "🔒",
    title: "Zero-Trust Security",
    desc: "End-to-end encryption, SOC 2 Type II certified, with granular role-based access control.",
  },
  {
    icon: "🧩",
    title: "Modular APIs",
    desc: "Plug-and-play REST and GraphQL endpoints designed for teams of any size.",
  },
  {
    icon: "📊",
    title: "Real-Time Analytics",
    desc: "Live dashboards and customizable reports that turn raw data into clear decisions.",
  },
  {
    icon: "🤝",
    title: "Team Collaboration",
    desc: "Shared workspaces, live comments, and version history keep everyone aligned.",
  },
  {
    icon: "🌐",
    title: "Global Scale",
    desc: "Autoscaling infrastructure that grows with you — from 10 users to 10 million.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever free",
    desc: "Perfect for individuals exploring the platform.",
    features: [
      "Up to 3 projects",
      "5 GB storage",
      "Community support",
      "Basic analytics",
      "REST API access",
    ],
    cta: "Get started free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "per month",
    desc: "For growing teams that need more power.",
    features: [
      "Unlimited projects",
      "100 GB storage",
      "Priority email support",
      "Advanced analytics",
      "GraphQL + REST APIs",
      "Team collaboration",
      "Custom domains",
    ],
    cta: "Start free trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    desc: "Tailored solutions for large organizations.",
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "24/7 dedicated support",
      "SLA guarantee",
      "SSO & SAML",
      "Audit logs",
      "Custom contracts",
    ],
    cta: "Talk to sales",
    highlight: false,
  },
];

export default function LandingPage() {
  const [annual, setAnnual] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* FEATURES */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-amber-600 font-sans mb-3">Features</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 mb-5">
            Everything you need,
            <br />
            <span className="italic text-stone-500">nothing you don't.</span>
          </h2>
          <p className="text-stone-500 font-sans max-w-xl mx-auto">
            Carefully considered features that respect your workflow — not a checkbox list.
          </p>
        </div>

        <div className="w-fit flex gap-2" id="move">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white border border-stone-200 rounded-2xl p-7 hover:shadow-md transition-shadow group w-[300px]"
            >
              <span className="text-3xl mb-5 block">{f.icon}</span>
              <h3 className="text-lg font-bold text-stone-900 mb-2 tracking-tight">{f.title}</h3>
              <p className="text-stone-500 font-sans text-sm leading-relaxed">{f.desc}</p>
              <span className="mt-5 inline-block text-xs font-sans text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 bg-stone-900 text-stone-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-stone-800 relative">
              {/* Abstract illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border-2 border-amber-500/30 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-2 border-amber-500/50 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500" />
                  </div>
                </div>
                <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-stone-700 border border-stone-600 flex items-center justify-center text-xl">
                  🏔
                </div>
                <div className="absolute bottom-8 left-8 w-10 h-10 rounded-full bg-stone-700 border border-stone-600 flex items-center justify-center text-lg">
                  ✦
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-5 bg-amber-500 text-stone-900 rounded-2xl p-5 font-sans shadow-xl">
              <p className="text-3xl font-bold">2019</p>
              <p className="text-xs mt-1">Founded in SF</p>
            </div>
          </div>

          {/* Right: text */}
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-400 font-sans mb-4">About Arc</p>
            <h2 className="text-4xl font-bold leading-tight tracking-tight mb-6">
              Built by builders,
              <br />
              <span className="italic text-stone-400">for builders.</span>
            </h2>
            <p className="text-stone-400 font-sans leading-relaxed mb-6">
              We started Arc because we were tired of bloated tools that promised everything
              and delivered friction. Three engineers in a San Francisco apartment with one rule:
              <em className="text-stone-200"> if it doesn't make us faster, it doesn't ship.</em>
            </p>
            <p className="text-stone-400 font-sans leading-relaxed mb-10">
              Today, 12,000+ teams trust Arc to run their most critical workflows. We're
              still the same obsessive builders — just with better coffee and a slightly larger office.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-700">
              {[["12k+", "Teams"], ["99.9%", "Uptime"], ["40+", "Countries"]].map(([num, label]) => (
                <div key={label}>
                  <p className="text-3xl font-bold text-amber-400">{num}</p>
                  <p className="text-xs text-stone-500 font-sans mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest text-amber-600 font-sans mb-3">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 mb-5">
            Simple, honest pricing.
          </h2>
          <p className="text-stone-500 font-sans mb-8">
            No hidden fees. No surprise charges. Cancel anytime.
          </p>
          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-stone-100 rounded-full p-1 font-sans text-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full transition-all ${!annual ? "bg-white shadow text-stone-900" : "text-stone-500"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full transition-all ${annual ? "bg-white shadow text-stone-900" : "text-stone-500"}`}
            >
              Annual
              <span className="ml-2 text-xs text-amber-600 font-medium">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const showPrice =
              plan.price !== "Custom"
                ? annual && plan.price !== "$0"
                  ? `$${Math.round(parseInt(plan.price.replace("$", "")) * 0.8)}`
                  : plan.price
                : plan.price;

            return (
              <div
                key={i}
                className={`rounded-2xl p-8 flex flex-col relative overflow-hidden transition-shadow hover:shadow-lg ${
                  plan.highlight
                    ? "bg-stone-900 text-stone-50"
                    : "bg-white border border-stone-200 text-stone-900"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-5 right-5">
                    <span className="bg-amber-500 text-stone-900 text-xs font-sans font-bold px-3 py-1 rounded-full">
                      Most popular
                    </span>
                  </div>
                )}

                <div>
                  <p className={`text-xs uppercase tracking-widest font-sans mb-3 ${plan.highlight ? "text-amber-400" : "text-amber-600"}`}>
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-5xl font-bold tracking-tight">{showPrice}</span>
                    {plan.price !== "Custom" && (
                      <span className={`text-sm font-sans ${plan.highlight ? "text-stone-400" : "text-stone-400"}`}>
                        /{annual && plan.price !== "$0" ? "mo, billed annually" : plan.period}
                      </span>
                    )}
                  </div>
                  <p className={`font-sans text-sm mb-7 ${plan.highlight ? "text-stone-400" : "text-stone-500"}`}>
                    {plan.desc}
                  </p>
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2.5 font-sans text-sm">
                      <span className={`mt-0.5 ${plan.highlight ? "text-amber-400" : "text-amber-600"}`}>✓</span>
                      <span className={plan.highlight ? "text-stone-300" : "text-stone-700"}>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-full text-sm font-sans font-medium transition-colors ${
                    plan.highlight
                      ? "bg-amber-500 text-stone-900 hover:bg-amber-400"
                      : "border border-stone-300 text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-stone-400 font-sans text-sm mt-10">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center bg-stone-900 text-stone-50 rounded-3xl py-20 px-8">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-5">
            Ready to build something
            <span className="italic text-amber-400"> remarkable?</span>
          </h2>
          <p className="text-stone-400 font-sans mb-10 max-w-xl mx-auto">
            Join thousands of teams who've made the switch. Setup takes under five minutes.
          </p>
          <button className="bg-amber-500 text-stone-900 font-sans font-medium px-10 py-4 rounded-full hover:bg-amber-400 transition-colors text-sm shadow-lg">
            Get started for free
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-200 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-stone-400 font-sans text-sm">
          <span className="text-stone-900 font-bold text-lg">
            arc<span className="text-amber-600">.</span>
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-700 transition-colors">Privacy</a>
            <a href="#" className="hover:text-stone-700 transition-colors">Terms</a>
            <a href="#" className="hover:text-stone-700 transition-colors">Contact</a>
          </div>
          <span>© 2026 Arc Technologies, Inc.</span>
        </div>
      </footer>
    </div>
  );
}