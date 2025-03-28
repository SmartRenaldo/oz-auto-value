"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
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

// Generate price trend data in ascending chronological order
const generateTrendData = (
  basePrice: number,
  months: number,
  volatility: number
) => {
  const data = [];

  // Get current date
  const currentDate = new Date();

  // Start from (months) months ago and move forward to previous month
  const startDate = new Date();
  startDate.setMonth(currentDate.getMonth() - months);

  let price = basePrice;

  // Generate data for each month, starting from oldest to newest
  for (let i = 0; i < months; i++) {
    const monthIndex = (startDate.getMonth() + i) % 12;
    const yearOffset = Math.floor((startDate.getMonth() + i) / 12);
    const year = startDate.getFullYear() + yearOffset;

    // Random walk with slight upward or downward bias
    const change = (Math.random() - 0.45) * volatility;

    if (i === 0) {
      // Starting point (oldest month)
      price = basePrice;
    } else {
      // Each subsequent month builds on previous
      price = Math.max(price + change, price * 0.85); // Prevent too sharp declines
    }

    // Format date and add to data array
    const monthDate = new Date(year, monthIndex, 1);
    data.push({
      month: monthDate.toLocaleDateString("en-AU", {
        month: "short",
        year: "2-digit",
      }),
      price: Math.round(price),
    });
  }

  return data;
};

const trendData = {
  sedan: generateTrendData(25000, 12, 800),
  suv: generateTrendData(38000, 12, 1000),
  hatchback: generateTrendData(22000, 12, 500),
  ute: generateTrendData(42000, 12, 1200),
};

export default function PriceTrendChart() {
  const [selectedVehicleType, setSelectedVehicleType] = useState<
    "sedan" | "suv" | "hatchback" | "ute"
  >("sedan");
  const [timeRange, setTimeRange] = useState<"12m">("12m");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card>
        <CardHeader>
          <CardTitle>Price Trends by Vehicle Type</CardTitle>
          <CardDescription>
            Average market prices over the last 12 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Chart Controls */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="space-x-1">
              <Button
                size="sm"
                variant={
                  selectedVehicleType === "sedan" ? "default" : "outline"
                }
                onClick={() => setSelectedVehicleType("sedan")}
                className={
                  selectedVehicleType === "sedan"
                    ? "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                    : ""
                }
              >
                Sedan
              </Button>
              <Button
                size="sm"
                variant={selectedVehicleType === "suv" ? "default" : "outline"}
                onClick={() => setSelectedVehicleType("suv")}
                className={
                  selectedVehicleType === "suv"
                    ? "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                    : ""
                }
              >
                SUV
              </Button>
              <Button
                size="sm"
                variant={
                  selectedVehicleType === "hatchback" ? "default" : "outline"
                }
                onClick={() => setSelectedVehicleType("hatchback")}
                className={
                  selectedVehicleType === "hatchback"
                    ? "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                    : ""
                }
              >
                Hatchback
              </Button>
              <Button
                size="sm"
                variant={selectedVehicleType === "ute" ? "default" : "outline"}
                onClick={() => setSelectedVehicleType("ute")}
                className={
                  selectedVehicleType === "ute"
                    ? "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                    : ""
                }
              >
                Ute
              </Button>
            </div>
          </div>

          {/* The Chart */}
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendData[selectedVehicleType]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#888" tick={{ fill: "#888" }} />
                <YAxis
                  tickFormatter={formatCurrency}
                  stroke="#888"
                  tick={{ fill: "#888" }}
                  width={80}
                />
                <Tooltip
                  formatter={(value) => [
                    formatCurrency(value as number),
                    "Average Price",
                  ]}
                  contentStyle={{
                    background: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "0.375rem",
                  }}
                  labelStyle={{ color: "#9ca3af" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  name="Average Price"
                  stroke="url(#colorGradient)"
                  strokeWidth={3}
                  dot={{
                    stroke: "#a855f7",
                    strokeWidth: 2,
                    r: 4,
                    fill: "#1f2937",
                  }}
                  activeDot={{ r: 6, stroke: "#ec4899", strokeWidth: 2 }}
                />
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Insights Section */}
          <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-white mb-2">
              Market Insights:{" "}
              {selectedVehicleType.charAt(0).toUpperCase() +
                selectedVehicleType.slice(1)}
              s
            </h4>
            <p className="text-gray-300 text-sm">
              {selectedVehicleType === "sedan" &&
                "Sedan prices have remained relatively stable over the past year, with a slight upward trend in higher trim models. The decline in new car inventory has helped maintain used sedan values."}
              {selectedVehicleType === "suv" &&
                "SUVs continue to command premium prices with steady growth. Higher fuel costs have slightly reduced demand for larger models, while compact and mid-size SUVs remain highly sought after."}
              {selectedVehicleType === "hatchback" &&
                "The hatchback market has seen modest price increases, particularly for fuel-efficient models. Urban buyers continue to drive demand for compact, easy-to-park options."}
              {selectedVehicleType === "ute" &&
                "Utility vehicles have shown the strongest price growth, particularly work-ready models with low kilometers. Supply chain issues for new utes have created significant demand in the used market."}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
