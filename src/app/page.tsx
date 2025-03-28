"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background with overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage: "url(/images/hero.jpg)",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          </div>

          {/* Content */}
          <div className="container relative z-10 px-4 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                OzAutoValue
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium mb-4 text-white">
                Australian Used Car Valuation Expert
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
                Get a precise market value estimation for your used car with our
                intelligent tool, completely free
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/valuation">
                  <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-6 rounded-lg text-lg font-medium">
                    Start Valuation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-900">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Why Choose Our Valuation Tool
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: "Accurate Valuation",
                  description:
                    "Based on Australian market data, providing precise used car price estimates",
                  icon: "📊",
                },
                {
                  title: "Instant Results",
                  description:
                    "Just fill out a simple form and get your car valuation result immediately",
                  icon: "⚡",
                },
                {
                  title: "Completely Free",
                  description:
                    "Use our valuation tool for free, with no hidden fees",
                  icon: "🎁",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800 p-8 rounded-xl backdrop-blur-sm border border-gray-700"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Get Your Car Valuation Now
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              In just a few minutes, discover the true value of your car in the
              current market
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/valuation">
                <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-6 rounded-lg text-lg font-medium">
                  Free Valuation
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
