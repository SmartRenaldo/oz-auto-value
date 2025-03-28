"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Clock, Award } from "lucide-react";

export default function MarketHeader() {
  const stats = [
    {
      title: "Average Price Change",
      value: "+2.4%",
      change: "up",
      subtitle: "Last 12 months",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Most Depreciation",
      value: "-15.3%",
      change: "down",
      subtitle: "Luxury Sedans",
      icon: TrendingDown,
      color: "from-red-500 to-pink-500",
    },
    {
      title: "Average Days on Market",
      value: "23",
      subtitle: "Down from 31 last year",
      icon: Clock,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Highest Demand",
      value: "SUVs",
      subtitle: "37% of all searches",
      icon: Award,
      color: "from-yellow-500 to-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm">{stat.title}</p>
              <div className="flex items-center">
                <h3
                  className={`text-2xl font-bold bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`}
                >
                  {stat.value}
                </h3>
                {stat.change && (
                  <span
                    className={`ml-1 text-xs ${
                      stat.change === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.change === "up" ? "↑" : "↓"}
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-xs mt-1">{stat.subtitle}</p>
            </div>
            <div
              className={`p-2 rounded-full bg-gradient-to-r ${stat.color} bg-opacity-10`}
            >
              <stat.icon className={`h-5 w-5 text-white`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
