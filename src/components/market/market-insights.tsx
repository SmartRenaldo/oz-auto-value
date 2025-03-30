"use client";

"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, AlertTriangle, Lightbulb, ArrowRight } from "lucide-react";
import {
  getRecentQuarters,
  formatQuarter,
  getRelativeMonthYear,
  getDynamicDateRange,
} from "@/lib/date-utils";

export default function MarketInsights() {
  // Get recent quarters dynamically based on the current date - showing previous 4 completed quarters
  const recentQuarters = getRecentQuarters();

  console.log("recentQuarters", recentQuarters);

  // Generate quarterly data with realistic trends - data now represents completed quarters
  const quarterlyData = recentQuarters.map((quarterInfo, index) => {
    // Base volume that grows slightly each quarter (but going backward in time)
    // We start with the most recent completed quarter and go backward
    const baseVolume = 730000 - index * 8000;

    // Randomi slightly but maintain a trend
    const randomFactor = 0.98 + Math.random() * 0.04;
    const volume = Math.round(baseVolume * randomFactor);

    // Change percentage that increases slightly as we get closer to present (showing market growth)
    // But going backward in time
    const change = 0.3 + index * 0.15;
    const changePercentage = `+${(change * (0.7 + Math.random() * 0.3)).toFixed(
      1
    )}%`;

    // Days on market that decreases slightly as we get closer to present (showing increased demand)
    // But going backward in time
    const days = Math.round(28 - (3 - index) * 1.2);

    return {
      quarter: formatQuarter(quarterInfo),
      change: changePercentage,
      volume: volume.toLocaleString(),
      days: days.toString(),
    };
  });

  const insights = [
    {
      title: "Accelerating Demand for Electric Vehicles",
      category: "Trend",
      description:
        `Electric vehicle searches have increased by 78% since ${getRelativeMonthYear(
          12,
          "long"
        )}, with the Tesla Model Y now the most searched EV. ` +
        "Used EV prices are beginning to stabilise as more inventory enters the market from early adopters upgrading.",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Online Purchase Platforms Growing",
      category: "Alert",
      description:
        "Traditional dealerships are facing increased competition as online-only car sales platforms gain market share. " +
        `Over 22% of used vehicles in Australia are now purchased entirely online, up from 14% in ${
          new Date().getFullYear() - 2
        }.`,
      icon: AlertTriangle,
      color: "from-amber-500 to-yellow-500",
    },
    {
      title: "Hybrid Vehicles Leading Value Retention",
      category: "Insight",
      description:
        `With continued fuel price volatility through ${new Date().getFullYear()}, hybrid vehicles are now depreciating 26% slower than their conventional counterparts. ` +
        "Toyota RAV4 Hybrid models are particularly sought after, maintaining up to 85% of their value after 3 years.",
      icon: Lightbulb,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card>
        <CardHeader>
          <CardTitle>Market Insights & Analysis</CardTitle>
          <CardDescription>
            Expert analysis of Australian used car market trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Key Insights Cards */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-5 bg-gray-800/50 rounded-lg border border-gray-700"
              >
                <div className="flex items-start">
                  <div
                    className={`p-3 rounded-full bg-gradient-to-r ${insight.color} mr-4`}
                  >
                    <insight.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span
                      className={`text-xs uppercase font-semibold bg-gradient-to-r ${insight.color} text-transparent bg-clip-text`}
                    >
                      {insight.category}
                    </span>
                    <h3 className="text-lg font-semibold text-white mt-1">
                      {insight.title}
                    </h3>
                    <p className="text-gray-400 mt-2 text-sm">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quarterly Market Data */}
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-5 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quarterly Market Overview
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2">Quarter</th>
                    <th className="text-right py-2">Price Change</th>
                    <th className="text-right py-2">Total Listings</th>
                    <th className="text-right py-2">Avg. Days Listed</th>
                  </tr>
                </thead>
                <tbody>
                  {quarterlyData.map((quarter) => (
                    <tr
                      key={quarter.quarter}
                      className="border-b border-gray-700/50 hover:bg-gray-700/30"
                    >
                      <td className="py-3 font-medium">{quarter.quarter}</td>
                      <td
                        className={`text-right py-3 ${
                          quarter.change.startsWith("+")
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {quarter.change}
                      </td>
                      <td className="text-right py-3">{quarter.volume}</td>
                      <td className="text-right py-3">{quarter.days}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Factors Affecting the Market */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Key Factors Affecting the Market
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4">
                <h4 className="font-medium text-white flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-pink-500" />
                  Economic Factors
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-gray-400">
                  <li>• Rising interest rates slowing vehicle financing</li>
                  <li>• Inflation increasing new vehicle costs</li>
                  <li>• Fuel price volatility affecting vehicle preferences</li>
                  <li>• Strong employment supporting overall demand</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4">
                <h4 className="font-medium text-white flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-purple-500" />
                  Industry Factors
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-gray-400">
                  <li>• Ongoing semiconductor shortages limiting new supply</li>
                  <li>• Electric vehicle adoption accelerating</li>
                  <li>• Import restrictions affecting luxury vehicle prices</li>
                  <li>• Shift to online purchasing platforms</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4">
                <h4 className="font-medium text-white flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  Consumer Behavior
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-gray-400">
                  <li>• Growing preference for SUVs and crossovers</li>
                  <li>• Increased focus on vehicle safety features</li>
                  <li>• Rising acceptance of higher mileage vehicles</li>
                  <li>• Extended ownership periods before replacement</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4">
                <h4 className="font-medium text-white flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-cyan-500" />
                  Regional Variations
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-gray-400">
                  <li>• Urban markets favoring smaller, efficient models</li>
                  <li>• Rural areas maintaining strong ute/4WD demand</li>
                  <li>• Coastal regions seeing higher convertible prices</li>
                  <li>• Mining regions driving heavy-duty vehicle demand</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gray-800/50 rounded-lg border border-gray-700 p-5">
            <h3 className="text-lg font-semibold text-white mb-4">
              cast: {getDynamicDateRange(0, 11)}
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Based on current economic conditions, supply chain improvements,
              and seasonal trends, our analysts project the following market
              developments:
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-pink-500 h-3 w-3 rounded-full mt-1.5 mr-3"></div>
                <div>
                  <h4 className="text-white font-medium">
                    Gradual Price Stabilisation
                  </h4>
                  <p className="text-gray-400 text-sm">
                    We expect average used car prices to stabilise with minor
                    increases of 0.3-0.6% per quarter, significantly lower than
                    the 1-2% increases seen in {new Date().getFullYear() - 1}-
                    {new Date().getFullYear()}.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-500 h-3 w-3 rounded-full mt-1.5 mr-3"></div>
                <div>
                  <h4 className="text-white font-medium">
                    Increased Inventory Availability
                  </h4>
                  <p className="text-gray-400 text-sm">
                    New car production is recovering, which should increase used
                    car inventory by approximately 6-10% by{" "}
                    {getRelativeMonthYear(18, "long")}, easing the supply
                    constraints.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-500 h-3 w-3 rounded-full mt-1.5 mr-3"></div>
                <div>
                  <h4 className="text-white font-medium">
                    EV Market Expansion
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Used electric vehicles will become more accessible as early
                    adopters trade up to newer models, potentially creating a
                    15-20% increase in used EV listings by{" "}
                    {formatQuarter(recentQuarters[0])}.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-cyan-500 h-3 w-3 rounded-full mt-1.5 mr-3"></div>
                <div>
                  <h4 className="text-white font-medium">Vehicle Age Shift</h4>
                  <p className="text-gray-400 text-sm">
                    The average age of used vehicles on the market is expected
                    to increase from 6.8 to 7.2 years as owners hold onto
                    vehicles longer due to economic uncertainty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
