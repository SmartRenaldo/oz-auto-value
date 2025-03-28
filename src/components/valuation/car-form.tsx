// src/components/valuation/car-form.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { carBrands, carModels, carYears } from "@/lib/car-data";
import type { CarFormData } from "@/lib/types";

interface CarFormProps {
  onSubmit: (data: CarFormData) => void;
  isCalculating: boolean;
}

export default function CarForm({ onSubmit, isCalculating }: CarFormProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>("toyota");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CarFormData>({
    defaultValues: {
      brand: "toyota",
      model: "",
      year: 2018,
      type: "sedan",
      transmission: "automatic",
      fuelType: "petrol",
      odometer: 50000,
      condition: "good",
      features: [],
    },
  });

  const onFormSubmit = (data: CarFormData) => {
    onSubmit(data);
  };

  // Get available models based on selected brand
  const availableModels = selectedBrand
    ? carModels[selectedBrand as keyof typeof carModels] || []
    : [];

  const features = [
    "Leather Seats",
    "Sunroof",
    "Navigation System",
    "Bluetooth",
    "Backup Camera",
    "Apple CarPlay/Android Auto",
    "Heated Seats",
    "Keyless Entry",
    "Premium Audio",
    "Alloy Wheels",
  ];

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Brand */}
        <div>
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Brand
          </label>
          <select
            id="brand"
            {...register("brand", { required: true })}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {carBrands.map((brand) => (
              <option key={brand.value} value={brand.value}>
                {brand.label}
              </option>
            ))}
          </select>
          {errors.brand && (
            <p className="mt-1 text-sm text-red-500">Brand is required</p>
          )}
        </div>

        {/* Model */}
        <div>
          <label
            htmlFor="model"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Model
          </label>
          <select
            id="model"
            {...register("model", { required: true })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Model</option>
            {availableModels.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
          {errors.model && (
            <p className="mt-1 text-sm text-red-500">Model is required</p>
          )}
        </div>

        {/* Year */}
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Year
          </label>
          <select
            id="year"
            {...register("year", { required: true })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {carYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.year && (
            <p className="mt-1 text-sm text-red-500">Year is required</p>
          )}
        </div>

        {/* Car Type */}
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Car Type
          </label>
          <select
            id="type"
            {...register("type", { required: true })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="sedan">Sedan</option>
            <option value="hatchback">Hatchback</option>
            <option value="suv">SUV</option>
            <option value="wagon">Wagon</option>
            <option value="ute">Ute</option>
            <option value="van">Van</option>
            <option value="convertible">Convertible</option>
            <option value="coupe">Coupe</option>
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-500">Car type is required</p>
          )}
        </div>

        {/* Transmission */}
        <div>
          <label
            htmlFor="transmission"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Transmission
          </label>
          <select
            id="transmission"
            {...register("transmission", { required: true })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
            <option value="cvt">CVT</option>
          </select>
          {errors.transmission && (
            <p className="mt-1 text-sm text-red-500">
              Transmission is required
            </p>
          )}
        </div>

        {/* Fuel Type */}
        <div>
          <label
            htmlFor="fuelType"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Fuel Type
          </label>
          <select
            id="fuelType"
            {...register("fuelType", { required: true })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="hybrid">Hybrid</option>
            <option value="electric">Electric</option>
            <option value="lpg">LPG</option>
          </select>
          {errors.fuelType && (
            <p className="mt-1 text-sm text-red-500">Fuel type is required</p>
          )}
        </div>

        {/* Odometer */}
        <div>
          <label
            htmlFor="odometer"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Odometer (km)
          </label>
          <input
            type="number"
            id="odometer"
            {...register("odometer", {
              required: true,
              min: 0,
              max: 500000,
            })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.odometer && (
            <p className="mt-1 text-sm text-red-500">
              Please enter a valid odometer reading (0-500,000 km)
            </p>
          )}
        </div>

        {/* Condition */}
        <div>
          <label
            htmlFor="condition"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Condition
          </label>
          <select
            id="condition"
            {...register("condition", { required: true })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
          {errors.condition && (
            <p className="mt-1 text-sm text-red-500">Condition is required</p>
          )}
        </div>
      </div>

      {/* Features */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Features (select all that apply)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {features.map((feature) => (
            <div key={feature} className="flex items-center">
              <input
                id={`feature-${feature}`}
                type="checkbox"
                value={feature}
                {...register("features")}
                className="h-4 w-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700"
              />
              <label
                htmlFor={`feature-${feature}`}
                className="ml-2 text-sm text-gray-300"
              >
                {feature}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isCalculating}
          className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white py-3 text-lg rounded-lg"
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Calculating Value...
            </>
          ) : (
            "Get My Car Value"
          )}
        </Button>
      </div>
    </form>
  );
}
