"use client";

import { useEffect, useRef } from "react";

const ThreeDBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match the window
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Particle settings
    const particles: Particle[] = [];
    const particleCount = 150;
    const particleSize = 4;
    const particleMaxSpeed = 0.3;
    const connectionDistance = 200;
    const connectionOpacity = 0.25;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * particleMaxSpeed,
        vy: (Math.random() - 0.5) * particleMaxSpeed,
        size: Math.random() * particleSize + 1,
      });
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let mouseRadius = 150;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse repulsion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          p.vx += dx * force * 0.02;
          p.vy += dy * force * 0.02;
        }

        // Keep speed within limits
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > particleMaxSpeed) {
          p.vx = (p.vx / speed) * particleMaxSpeed;
          p.vy = (p.vy / speed) * particleMaxSpeed;
        }

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(220, 130, 255, ${
              (1 - distance / connectionDistance) * connectionOpacity
            })`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw particle
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size
        );
        gradient.addColorStop(0, "rgba(255, 130, 255, 0.8)");
        gradient.addColorStop(1, "rgba(100, 150, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-5 opacity-80 pointer-events-none"
    />
  );
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export default ThreeDBackground;
