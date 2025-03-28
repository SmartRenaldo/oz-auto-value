"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import MarketHeader from "@/components/market/market-header";
import PriceTrendChart from "@/components/market/price-trend-chart";
import PopularityChart from "@/components/market/popularity-chart";
import MarketInsights from "@/components/market/market-insights";
import BrandComparison from "@/components/market/brand-comparison";
import { Button } from "@/components/ui/button";

export default function MarketTrendsPage() {
  const [activeTab, setActiveTab] = useState<
    "price" | "popularity" | "insights" | "comparison"
  >("price");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050010] to-[#0a021e] py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="invisible">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white px-3 rounded-md hover:bg-gray-800 transition-colors"
          ></Link>
        </div>
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            <span className="pointer-events-none">Back to Home</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/50 rounded-xl p-8 shadow-xl border border-gray-700 backdrop-blur-sm"
        >
          <h1 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 tracking-tight">
            Australian Used Car Market Trends
          </h1>

          <MarketHeader />

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-10 mb-8">
            <Button
              variant={activeTab === "price" ? "default" : "ghost"}
              onClick={() => setActiveTab("price")}
              className={
                activeTab === "price"
                  ? "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                  : ""
              }
            >
              Price Trends
            </Button>
            <Button
              variant={activeTab === "popularity" ? "default" : "ghost"}
              onClick={() => setActiveTab("popularity")}
              className={
                activeTab === "popularity"
                  ? "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                  : ""
              }
            >
              Popularity Index
            </Button>
            <Button
              variant={activeTab === "insights" ? "default" : "ghost"}
              onClick={() => setActiveTab("insights")}
              className={
                activeTab === "insights"
                  ? "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                  : ""
              }
            >
              Market Insights
            </Button>
            <Button
              variant={activeTab === "comparison" ? "default" : "ghost"}
              onClick={() => setActiveTab("comparison")}
              className={
                activeTab === "comparison"
                  ? "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                  : ""
              }
            >
              Brand Comparison
            </Button>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "price" && <PriceTrendChart />}
            {activeTab === "popularity" && <PopularityChart />}
            {activeTab === "insights" && <MarketInsights />}
            {activeTab === "comparison" && <BrandComparison />}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
