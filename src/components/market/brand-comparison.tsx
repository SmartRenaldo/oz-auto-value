"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
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

// Brand comparison metrics data
const brandComparisonData = [
  {
    brand: "Toyota",
    valueRetention: 82,
    reliability: 90,
    popularity: 88,
    runningCosts: 75,
    performance: 65,
  },
  {
    brand: "Mazda",
    valueRetention: 75,
    reliability: 85,
    popularity: 80,
    runningCosts: 78,
    performance: 70,
  },
  {
    brand: "Ford",
    valueRetention: 68,
    reliability: 72,
    popularity: 75,
    runningCosts: 65,
    performance: 78,
  },
  {
    brand: "Hyundai",
    valueRetention: 72,
    reliability: 78,
    popularity: 76,
    runningCosts: 82,
    performance: 68,
  },
  {
    brand: "BMW",
    valueRetention: 60,
    reliability: 68,
    popularity: 85,
    runningCosts: 45,
    performance: 90,
  },
  {
    brand: "Kia",
    valueRetention: 70,
    reliability: 82,
    popularity: 75,
    runningCosts: 79,
    performance: 67,
  },
  {
    brand: "Mitsubishi",
    valueRetention: 65,
    reliability: 80,
    popularity: 73,
    runningCosts: 76,
    performance: 63,
  },
  {
    brand: "Honda",
    valueRetention: 78,
    reliability: 88,
    popularity: 75,
    runningCosts: 72,
    performance: 69,
  },
  {
    brand: "Volkswagen",
    valueRetention: 65,
    reliability: 70,
    popularity: 77,
    runningCosts: 62,
    performance: 82,
  },
  {
    brand: "Subaru",
    valueRetention: 73,
    reliability: 83,
    popularity: 72,
    runningCosts: 70,
    performance: 75,
  },
];

// Format data for radar chart
const formatDataForRadar = (brands: string[]) => {
  const metrics = [
    "valueRetention",
    "reliability",
    "popularity",
    "runningCosts",
    "performance",
  ];

  // Custom labels with line breaks to prevent overlapping
  const metricLabels = {
    valueRetention: "Value\nRetention",
    reliability: "Reliability",
    popularity: "Popularity",
    runningCosts: "Running\nCosts",
    performance: "Performance",
  };

  const radarData = metrics.map((metric) => {
    const formattedMetric = metricLabels[metric as keyof typeof metricLabels];

    const dataPoint: { [key: string]: string | number } = {
      metric: formattedMetric,
    };

    brands.forEach((brand) => {
      const brandData = brandComparisonData.find(
        (item) => item.brand === brand
      );
      if (brandData) {
        dataPoint[brand] = brandData[metric as keyof typeof brandData];
      }
    });

    return dataPoint;
  });

  return radarData;
};

export default function BrandComparison() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([
    "Toyota",
    "Mazda",
    "BMW",
  ]);

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      // Don't remove if it's the last selected brand
      if (selectedBrands.length > 1) {
        setSelectedBrands(selectedBrands.filter((b) => b !== brand));
      }
    } else {
      // Allow up to 4 brands for comparison (was 3 previously)
      if (selectedBrands.length < 4) {
        setSelectedBrands([...selectedBrands, brand]);
      }
    }
  };

  // Brand colors for the radar chart - high contrast colors with better distinction
  const brandColors: { [key: string]: string } = {
    Toyota: "#FF0000", // bright red
    Mazda: "#000000", // pure black
    Ford: "#0066FF", // bright blue
    Hyundai: "#00CCFF", // cyan
    BMW: "#1C69D4", // BMW blue
    Kia: "#FF9900", // orange
    Mitsubishi: "#9900CC", // purple
    Honda: "#00CC00", // green
    Volkswagen: "#FFFFFF", // white
    Subaru: "#FFFF00", // yellow
  };

  const radarData = formatDataForRadar(selectedBrands);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card>
        <CardHeader>
          <CardTitle>Brand Comparison</CardTitle>
          <CardDescription>
            Compare key metrics across major car brands (select up to 4)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Brand Selection */}
          <div className="flex flex-wrap gap-2 mb-6">
            {brandComparisonData.map((brandData) => (
              <Button
                key={brandData.brand}
                size="sm"
                variant={
                  selectedBrands.includes(brandData.brand)
                    ? "default"
                    : "outline"
                }
                onClick={() => toggleBrand(brandData.brand)}
                className={
                  selectedBrands.includes(brandData.brand)
                    ? "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                    : ""
                }
              >
                {brandData.brand}
              </Button>
            ))}
          </div>

          {/* Radar Chart */}
          <div className="h-[400px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                outerRadius={150}
                data={radarData}
                margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
              >
                <PolarGrid stroke="#444" />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: "#fff" }}
                  tickLine={false}
                />

                {selectedBrands.map((brand) => (
                  <Radar
                    key={brand}
                    name={brand}
                    dataKey={brand}
                    stroke={brandColors[brand]}
                    fill={brandColors[brand]}
                    fillOpacity={0.2}
                    strokeWidth={3}
                    // Add dot to enhance visibility
                    dot={{
                      stroke: brandColors[brand],
                      strokeWidth: 2,
                      fill: "#1f2937",
                      r: 4,
                    }}
                    activeDot={{
                      stroke: brandColors[brand],
                      strokeWidth: 3,
                      fill: "#1f2937",
                      r: 6,
                    }}
                  />
                ))}
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  payload={selectedBrands.map((brand) => ({
                    value: brand,
                    type: "circle",
                    color: brandColors[brand],
                  }))}
                  formatter={(value) => (
                    <span style={{ color: "white", marginLeft: "8px" }}>
                      {value}
                    </span>
                  )}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Brand Analysis Table */}
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-5">
            <h3 className="text-lg font-semibold text-white mb-4">
              Brand Analysis
            </h3>
            <div className="space-y-4">
              {selectedBrands.map((brand) => {
                const brandData = brandComparisonData.find(
                  (item) => item.brand === brand
                );
                if (!brandData) return null;

                return (
                  <div key={brand} className="p-4 bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">{brand}</h4>
                    <p className="text-sm text-gray-400 mb-3">
                      {brand === "Toyota" &&
                        "Known for exceptional reliability and strong resale value. Toyota vehicles consistently rank among the lowest depreciation rates in Australia."}
                      {brand === "Mazda" &&
                        "Offers an excellent balance of quality, style and value. Mazda has built a strong reputation for reliable, well-designed vehicles with appealing aesthetics."}
                      {brand === "Ford" &&
                        "Strong performer in utility vehicles, with the Ranger consistently ranking as one of Australia's best-selling vehicles. Sedans and small cars show mixed results."}
                      {brand === "Hyundai" &&
                        "Has significantly improved its market position with strong warranty offerings and improved build quality. Value retention has strengthened considerably in recent years."}
                      {brand === "BMW" &&
                        "Luxury vehicles with excellent performance and features, but typically experience higher depreciation. Higher maintenance costs affect long-term ownership value."}
                    </p>

                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <div className="text-gray-400">Value Retention</div>
                        <div className="font-medium text-white">
                          {brandData.valueRetention}/100
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400">Reliability</div>
                        <div className="font-medium text-white">
                          {brandData.reliability}/100
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400">Running Costs</div>
                        <div className="font-medium text-white">
                          {brandData.runningCosts}/100
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
