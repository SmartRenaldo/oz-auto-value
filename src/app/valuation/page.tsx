"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CarForm from "@/components/valuation/car-form";
import ResultCard from "@/components/valuation/result-card";
import type { CarFormData, ValuationResult } from "@/lib/types";
import { calculateCarPrice } from "@/components/valuation/price-calculator";

export default function ValuationPage() {
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSubmit = async (data: CarFormData) => {
    // Simulate calculation delay
    setIsCalculating(true);

    setTimeout(() => {
      const valuationResult = calculateCarPrice(data);
      setResult(valuationResult);
      setIsCalculating(false);
    }, 1500); // 1.5 seconds "calculation" delay for better UX
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6 invisible">
          <Link
            href="/"
            className="flex items-center text-gray-400 hover:text-white p-3 rounded-md hover:bg-gray-800 transition-colors w-full"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white px-3 py-2 rounded-md hover:bg-gray-800 transition-colors group"
          >
            <ChevronLeft className="h-4 w-4 mr-2 transition-colors group-hover:text-white" />
            <span className="transition-colors">Back to Home</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700 backdrop-blur-sm"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Used Car Valuation Tool
          </h1>

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CarForm
                  onSubmit={handleSubmit}
                  isCalculating={isCalculating}
                />
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ResultCard result={result} onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
