// src/components/valuation/result-card.tsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import type { ValuationResult } from "@/lib/types";

interface ResultCardProps {
  result: ValuationResult;
  onReset: () => void;
}

export default function ResultCard({ result, onReset }: ResultCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <motion.h2
          className="text-2xl font-bold mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Estimated Value
        </motion.h2>
        <motion.div
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
        >
          {formatPrice(result.estimatedPrice)}
        </motion.div>
        <motion.p
          className="text-gray-400 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Price Range: {formatPrice(result.priceRange.min)} -{" "}
          {formatPrice(result.priceRange.max)}
        </motion.p>
        <motion.div
          className="mt-2 inline-block px-3 py-1 rounded-full bg-blue-900/50 border border-blue-700 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {result.confidence === "high"
            ? "🎯 High"
            : result.confidence === "medium"
            ? "✓ Medium"
            : "⚠️ Low"}{" "}
          Confidence
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-xl font-semibold mb-3">Valuation Factors</h3>
        <div className="space-y-3">
          {result.factors.map((factor, index) => (
            <Card key={index} className="bg-gray-700/50 border-gray-600">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{factor.factor}</div>
                    <div className="text-sm text-gray-300">
                      {factor.description}
                    </div>
                  </div>
                  <div
                    className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${
                      factor.impact === "positive"
                        ? "bg-green-900/50 text-green-300 border border-green-700"
                        : factor.impact === "negative"
                        ? "bg-red-900/50 text-red-300 border border-red-700"
                        : "bg-gray-700 text-gray-300 border border-gray-600"
                    }
                  `}
                  >
                    {factor.impact === "positive"
                      ? "↑ Positive"
                      : factor.impact === "negative"
                      ? "↓ Negative"
                      : "→ Neutral"}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Button onClick={onReset} variant="outline" className="px-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Start New Valuation
        </Button>
      </motion.div>
    </div>
  );
}
