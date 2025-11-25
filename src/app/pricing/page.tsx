"use client";
import { useState } from "react";

const MONTHLY_PRICE = 19.99;
const ANNUAL_PRICE = 199.0;

type BillingPeriod = "monthly" | "annually";

export default function PricingPage() {
  const [period, setPeriod] = useState<BillingPeriod>("annually");
  const price = period === "monthly" ? MONTHLY_PRICE : ANNUAL_PRICE;
  const isAnnual = period === "annually";

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0e1d3d] text-center">Pricing Plans</h1>
        <p className="mt-4 max-w-3xl mx-auto text-center text-gray-600">
          Uncover thousands of exclusive stories and always stay informed. Our flexible pricing plans are suitable for
          everyone. Pay monthly, yearly or simply pay as you go using our credits system.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Pro plan card */}
          <div className="rounded-lg border border-gray-200 bg-[#eff3f7] p-8">
            <div className="flex items-baseline gap-4">
              <h2 className="text-2xl font-bold text-[#0e1d3d]">Pro plan</h2>
              <span className="text-3xl md:text-4xl font-extrabold text-red-500">${price.toFixed(2)}</span>
              <span className="text-sm font-medium text-gray-600">{period === "monthly" ? "for monthly" : "for annually"}</span>
            </div>
            <div className="mt-3 h-px bg-red-300/70" />

            {/* Billing toggle */}
            <div className="mt-5 flex items-center gap-4 text-sm text-[#0e1d3d]">
              <button
                type="button"
                className={`transition-colors ${period === "monthly" ? "font-semibold" : "text-[#0e1d3d]"}`}
                onClick={() => setPeriod("monthly")}
              >
                Billed monthly
              </button>
              <button
                type="button"
                role="switch"
                aria-checked={isAnnual}
                onClick={() => setPeriod(isAnnual ? "monthly" : "annually")}
                className={`relative inline-flex w-12 h-6 items-center rounded-full transition-colors ${
                  isAnnual ? "bg-red-500/80" : "bg-gray-300"
                }`}
                aria-label="Toggle billing period"
              >
                <span
                  className={`absolute h-4 w-4 rounded-full bg-white shadow transition-transform ${
                    isAnnual ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
              <button
                type="button"
                className={`transition-colors ${period === "annually" ? "font-semibold" : "text-[#0e1d3d]"}`}
                onClick={() => setPeriod("annually")}
              >
                Billed annually
              </button>
            </div>

            <div className="mt-6 rounded-xl bg-white p-6 text-sm">
              <h3 className="font-semibold text-[#0e1d3d]">Pro plan features:</h3>
              <ul className="mt-3 space-y-3 text-gray-700">
                <li>Get unlimited access to all the exclusive articles</li>
                <li>Billed monthly or once per year</li>
                <li>Save 25% by paying for the full year in advance</li>
                <li>For clients who are consistent readers of our content</li>
                <li>Exclusive content delivered directly to your inbox</li>
              </ul>
            </div>

            <div className="mt-8">
              <button className="w-full md:w-auto rounded-full bg-red-500 px-8 py-3 font-semibold text-white hover:bg-red-600">SELECT PLAN</button>
            </div>
          </div>

          {/* Credits card */}
          <div className="rounded-lg border border-red-200 bg-[#fbf3ef] p-8">
            <div className="flex items-baseline gap-4">
              <h2 className="text-2xl font-bold text-[#0e1d3d]">10 Credits</h2>
              <span className="text-3xl md:text-4xl font-extrabold text-red-500">$10.00</span>
            </div>
            <div className="mt-3 h-px bg-red-300/70" />

            <div className="mt-6 rounded-xl bg-white p-6 text-sm">
              <h3 className="font-semibold text-[#0e1d3d]">Credits features:</h3>
              <ul className="mt-3 space-y-3 text-gray-700">
                <li>Unlock as you read using your prepaid credits</li>
                <li>Pay only for the articles you like</li>
                <li>For clients looking for flexibility</li>
              </ul>
            </div>

            <div className="mt-8">
              <button className="w-full md:w-auto rounded-full border border-red-500 px-8 py-3 font-semibold text-red-600 hover:bg-red-50">BUY 10 CREDITS</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}