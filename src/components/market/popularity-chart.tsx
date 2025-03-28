"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Popularity data by type and region
const popularityData = {
  type: [
    { name: "SUV", popularity: 37, growth: "+5.2%" },
    { name: "Ute", popularity: 21, growth: "+3.7%" },
    { name: "Sedan", popularity: 18, growth: "-2.1%" },
    { name: "Hatchback", popularity: 14, growth: "-1.5%" },
    { name: "Wagon", popularity: 5, growth: "-0.8%" },
    { name: "Van", popularity: 3, growth: "+0.2%" },
    { name: "Convertible", popularity: 2, growth: "-0.2%" },
  ],
  brand: [
    { name: "Toyota", popularity: 18.4, growth: "+0.5%" },
    { name: "Mazda", popularity: 12.1, growth: "+0.3%" },
    { name: "Ford", popularity: 9.5, growth: "+1.2%" },
    { name: "Hyundai", popularity: 8.2, growth: "+0.8%" },
    { name: "Volkswagen", popularity: 6.5, growth: "-0.3%" },
    { name: "Mitsubishi", popularity: 6.1, growth: "+0.2%" },
    { name: "Kia", popularity: 5.7, growth: "+1.5%" },
  ],
  region: [
    { name: "NSW", popularity: 32, growth: "+0.7%" },
    { name: "VIC", popularity: 28, growth: "+1.1%" },
    { name: "QLD", popularity: 18, growth: "+0.5%" },
    { name: "WA", popularity: 10, growth: "+0.3%" },
    { name: "SA", popularity: 7, growth: "-0.1%" },
    { name: "TAS", popularity: 2, growth: "0.0%" },
    { name: "ACT", popularity: 2, growth: "+0.2%" },
    { name: "NT", popularity: 1, growth: "-0.1%" },
  ],
};

export default function PopularityChart() {
  const [dataCategory, setDataCategory] = useState<"type" | "brand" | "region">(
    "type"
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card>
        <CardHeader>
          <CardTitle>Popularity Index</CardTitle>
          <CardDescription>
            Which vehicles are most searched for in Australia
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Data Category Selector */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              size="sm"
              variant={dataCategory === "type" ? "default" : "outline"}
              onClick={() => setDataCategory("type")}
              className={
                dataCategory === "type"
                  ? "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                  : ""
              }
            >
              By Vehicle Type
            </Button>
            <Button
              size="sm"
              variant={dataCategory === "brand" ? "default" : "outline"}
              onClick={() => setDataCategory("brand")}
              className={
                dataCategory === "brand"
                  ? "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                  : ""
              }
            >
              By Brand
            </Button>
            <Button
              size="sm"
              variant={dataCategory === "region" ? "default" : "outline"}
              onClick={() => setDataCategory("region")}
              className={
                dataCategory === "region"
                  ? "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                  : ""
              }
            >
              By Region
            </Button>
          </div>

          {/* The Chart */}
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={popularityData[dataCategory]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                barSize={35}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" tick={{ fill: "#888" }} />
                <YAxis
                  label={{
                    value: "% of Searches",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#888",
                  }}
                  stroke="#888"
                  tick={{ fill: "#888" }}
                />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Popularity"]}
                  contentStyle={{
                    background: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "0.375rem",
                  }}
                  labelStyle={{ color: "#9ca3af" }}
                />
                <Legend />
                <defs>
                  <linearGradient
                    id="barColorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={1} />
                    <stop offset="50%" stopColor="#a855f7" stopOpacity={1} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <Bar
                  dataKey="popularity"
                  name="Popularity (%)"
                  fill="url(#barColorGradient)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Popularity Table */}
          <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-white mb-2">
              Top Items with Growth Trends
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2">
                      {dataCategory === "type"
                        ? "Vehicle Type"
                        : dataCategory === "brand"
                        ? "Brand"
                        : "Region"}
                    </th>
                    <th className="text-right py-2">% of Searches</th>
                    <th className="text-right py-2">YoY Change</th>
                  </tr>
                </thead>
                <tbody>
                  {popularityData[dataCategory].map((item) => (
                    <tr
                      key={item.name}
                      className="border-b border-gray-700/50 hover:bg-gray-700/30"
                    >
                      <td className="py-2">{item.name}</td>
                      <td className="text-right py-2">{item.popularity}%</td>
                      <td
                        className={`text-right py-2 ${
                          item.growth.startsWith("+")
                            ? "text-green-500"
                            : item.growth.startsWith("-")
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      >
                        {item.growth}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Insights */}
          <div className="mt-4 text-sm text-gray-400">
            <p>
              {dataCategory === "type" &&
                "SUVs continue to dominate the Australian market, growing 5.2% in popularity over the last year. Utility vehicles follow in second place, reflecting Australia's robust trade and outdoor lifestyle sectors."}
              {dataCategory === "brand" &&
                "Toyota maintains its position as Australia's most searched car brand, with Mazda and Ford holding strong in second and third positions. Kia shows the strongest growth as it continues to gain market share."}
              {dataCategory === "region" &&
                "New South Wales and Victoria account for 60% of all vehicle searches in Australia, with Victoria showing the strongest year-over-year growth at 1.1%."}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
