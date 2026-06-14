import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Droplet, Sparkles } from "lucide-react";
import { Flavor } from "../types";

interface ThreeDCanProps {
  flavor: Flavor;
  isFloating?: boolean;
  interactive?: boolean;
  scale?: number;
  autoRotateSpeed?: number; // degrees per frame
}

export default function ThreeDCan({
  flavor,
  isFloating = true,
  interactive = true,
  scale = 1.0,
  autoRotateSpeed = 0.5,
}: ThreeDCanProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Rotation parameters using Motion Value and Spring for ultra-smooth buttery inertia
  const rotateYMotion = useMotionValue(0);
  const rotateXMotion = useMotionValue(0);
  
  const rotateY = useSpring(rotateYMotion, { damping: 25, stiffness: 120 });
  const rotateX = useSpring(rotateXMotion, { damping: 25, stiffness: 120 });

  // Floating micro-animation
  const floatY = useMotionValue(0);
  const floatYSpring = useSpring(floatY, { damping: 15, stiffness: 40 });

  // Render a cylinder with 12 segments
  const sidesCount = 12;
  const radius = 62; //px. Determines cylinder diameter. 62px * 2 = 124px width
  const angleStep = 360 / sidesCount;

  // Track auto-rotation frame
  const requestRef = useRef<number | null>(null);
  const autoRotateAngle = useRef(0);

  useEffect(() => {
    // Standard floating effect in background
    let timer: any;
    if (isFloating) {
      let t = 0;
      const floatInterval = setInterval(() => {
        t += 0.05;
        floatY.set(Math.sin(t) * 12);
      }, 30);
      return () => clearInterval(floatInterval);
    }
  }, [isFloating, floatY]);

  // Handle auto-rotation
  useEffect(() => {
    const render = () => {
      if (!isRotating && !dragActive && autoRotateSpeed !== 0) {
        autoRotateAngle.current = (autoRotateAngle.current + autoRotateSpeed) % 360;
        rotateYMotion.set(autoRotateAngle.current);
      }
      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRotating, dragActive, autoRotateSpeed, rotateYMotion]);

  // Interactive mouse move rotation within boundary
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || dragActive) return;
    setIsRotating(true);
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate angles based on mouse offset, relative to center
      const targetAngleY = autoRotateAngle.current + x * 0.4;
      const targetAngleX = -y * 0.22; // Limit vertical tilt
      
      rotateYMotion.set(targetAngleY);
      rotateXMotion.set(targetAngleX);
    }
  };

  const handleMouseLeave = () => {
    setIsRotating(false);
    rotateXMotion.set(0); // Return pitch rotation to standard
  };

  // Drag interaction
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!interactive) return;
    setDragActive(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    lastMouseX.current = clientX;
    lastMouseY.current = clientY;
  };

  const onDrag = (e: MouseEvent | TouchEvent) => {
    if (!dragActive) return;
    
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - lastMouseX.current;
    const deltaY = clientY - lastMouseY.current;
    
    // Convert deltas directly to degrees
    const currentY = rotateYMotion.get();
    const currentX = rotateXMotion.get();
    
    rotateYMotion.set(currentY + deltaX * 0.8);
    rotateXMotion.set(Math.max(-30, Math.min(30, currentX - deltaY * 0.8)));
    
    // Save current angle as base for auto-rotate resumption
    autoRotateAngle.current = rotateYMotion.get();
    
    lastMouseX.current = clientX;
    lastMouseY.current = clientY;
  };

  const stopDrag = () => {
    setDragActive(false);
  };

  // Bind drag events globally to window so cursor drag doesn't snap off
  useEffect(() => {
    if (dragActive) {
      window.addEventListener("mousemove", onDrag);
      window.addEventListener("mouseup", stopDrag);
      window.addEventListener("touchmove", onDrag);
      window.addEventListener("touchend", stopDrag);
    }
    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchmove", onDrag);
      window.removeEventListener("touchend", stopDrag);
    };
  }, [dragActive]);

  // Style helper for panel colors
  const gradientStyle = {
    background: `linear-gradient(90deg, ${flavor.canColor} 0%, ${flavor.gradientFrom} 50%, ${flavor.canColor} 100%)`,
  };

  return (
    <div className="relative select-none" style={{ perspective: 1000 }}>
      {/* Dynamic Aura background reflection shadow */}
      <div 
        className="absolute inset-0 m-auto blur-3xl opacity-30 transition-all duration-700 pointer-events-none rounded-full"
        style={{
          width: 250 * scale,
          height: 250 * scale,
          background: `radial-gradient(circle, ${flavor.gradientFrom} 0%, rgba(0,0,0,0) 70%)`
        }}
      />

      {/* Floating and tilt container */}
      <motion.div
        ref={containerRef}
        className="relative flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        style={{
          y: floatYSpring,
          rotateY: rotateY,
          rotateX: rotateX,
          transformStyle: "preserve-3d",
          width: 200 * scale,
          height: 340 * scale,
        }}
      >
        {/* Core Cylinder Graphic Wrapper */}
        <div 
          className="relative transition-transform duration-150"
          style={{
            transform: `scale(${scale})`,
            transformStyle: "preserve-3d",
            width: 130,
            height: 240,
          }}
        >
          {/* TOP METAL RIM (Curved dome lid of can) */}
          <div
            className="absolute top-[-10px] left-[3px] rounded-t-[50%] border-t-4 border-l border-r pointer-events-none"
            style={{
              width: 124,
              height: 20,
              backgroundColor: flavor.rimColor,
              borderColor: "rgba(255, 255, 255, 0.45)",
              transform: "rotateX(90deg) translateZ(120px) scaleY(1.1)",
              backgroundImage: "radial-gradient(ellipse at center, #ffffff 0%, #a3a3a3 50%, #404040 100%)",
              boxShadow: "inset 0 4px 6px rgba(0,0,0,0.6)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Can Tab Representation */}
            <div 
              className="absolute inset-0 m-auto rounded-full bg-zinc-400 border border-zinc-500 shadow-md"
              style={{ width: 14, height: 20, transform: "rotateZ(12deg) translateY(-2px)" }}
            >
              <div className="absolute top-1 left-1.5 w-2 h-3 rounded-md border border-zinc-600 bg-zinc-800" />
            </div>
          </div>

          {/* CYLINDER 12 PANELS */}
          <div 
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {Array.from({ length: sidesCount }).map((_, segmentIndex) => {
              const currentAngle = angleStep * segmentIndex;
              // Shade multiplier matching cylinder geometry to draw shadows on side faces
              // Face shining directly forward (angle ~ 0 or 360) is bright; sides (angle ~ 90, 270) are dark
              const faceAngleRad = (currentAngle * Math.PI) / 180;
              const shade = Math.max(0.18, Math.cos(faceAngleRad));
              
              // Custom text or logo displayed on front panels
              const isOnFront = segmentIndex >= 10 || segmentIndex <= 2;
              
              return (
                <div
                  key={segmentIndex}
                  className="absolute top-0 bottom-0 overflow-hidden"
                  style={{
                    width: Math.ceil(2 * radius * Math.sin(Math.PI / sidesCount)) + 2.5, // exact width + math gap overlap
                    left: 65 - Math.sin(Math.PI / sidesCount) * radius,
                    backgroundImage: `linear-gradient(to right, ${flavor.canColor}, ${flavor.accentColor}, ${flavor.canColor})`,
                    transform: `rotateY(${currentAngle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: "visible",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Panel Backdrop Texture with segment-specific shadowing overlay */}
                  <div 
                    className="absolute inset-0 flex flex-col justify-between py-5 text-center font-bold font-display"
                    style={{
                      backgroundColor: flavor.canColor,
                      backgroundImage: `linear-gradient(135deg, ${flavor.gradientFrom} 0%, ${flavor.gradientTo} 100%)`
                    }}
                  >
                    {/* Shadow overlay representing cylinder curvature lighting */}
                    <div 
                      className="absolute inset-0 pointer-events-none mix-blend-multiply" 
                      style={{
                        background: `linear-gradient(to right, rgba(0,0,0,${0.85 - shade * 0.7}) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,${0.85 - shade * 0.7}) 100%)`
                      }}
                    />

                    {/* Shimmer gleam over segments */}
                    <div 
                      className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
                      style={{
                        background: "linear-gradient(115deg, rgba(255,255,255,0.7) 0%, rgba(200,200,200,0) 25%, rgba(255,255,255,0.5) 45%, rgba(0,0,0,0) 70%)"
                      }}
                    />

                    {/* CONDENSATION BUBBLES inside panels - purely illustrative and highly energetic */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                      <div className="absolute top-[12%] left-[25%] w-1 h-1 bg-white rounded-full opacity-70" />
                      <div className="absolute top-[28%] left-[80%] w-1.5 h-1.5 bg-zinc-300 rounded-full opacity-60" />
                      <div className="absolute top-[45%] left-[15%] w-1 h-2 bg-white rounded-md opacity-45" />
                      <div className="absolute top-[67%] left-[60%] w-1.5 h-1.5 bg-white rounded-full opacity-80" />
                      <div className="absolute top-[82%] left-[45%] w-1 h-1 bg-zinc-200 rounded-full opacity-75" />
                    </div>

                    {/* Panel Top Details (Stars, sparkles or flavor text) */}
                    <div className="z-10 flex flex-col items-center">
                      <span className="text-[7px] tracking-[0.2em] font-mono text-zinc-100/70 block uppercase font-light">
                        {flavor.highlights[0] || "PREMIUM"}
                      </span>
                      <div className="w-5 h-[1px] bg-white/20 mt-1" />
                    </div>

                    {/* PRIMARY BRAND NAME TILTED (Re-created across side faces) */}
                    <div className="z-10 transform -rotate-90 origin-center translate-y-3 flex flex-col items-center justify-center">
                      <span 
                        className="text-lg font-black tracking-tighter uppercase leading-none drop-shadow-md select-none"
                        style={{ color: flavor.textColor }}
                      >
                        Dr. Paper
                      </span>
                      <span className="text-[6px] tracking-[0.3em] font-mono text-zinc-200 uppercase whitespace-nowrap bg-black/25 px-1 rounded-sm mt-0.5">
                        {flavor.name}
                      </span>
                    </div>

                    {/* Bottom Details (Volume & zero sugar indicator) */}
                    <div className="z-10 flex flex-col items-center">
                      <div className="w-6 h-[1px] bg-white/20 mb-1" />
                      <span className="text-[6px] tracking-widest font-mono text-white/50 uppercase">
                        355mL / 12 FL OZ
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BOTTOM METAL RIM */}
          <div
            className="absolute bottom-[-10px] left-[3px] rounded-b-[50%] border-b-4 border-l border-r pointer-events-none"
            style={{
              width: 124,
              height: 20,
              backgroundColor: flavor.rimColor,
              borderColor: "rgba(0,0,0,0.3)",
              transform: "rotateX(90deg) translateZ(-120px) scaleY(1.1)",
              backgroundImage: "radial-gradient(ellipse at center, #52525b 0%, #1e1b1b 100%)",
              boxShadow: "0 8px 16px rgba(0,0,0,0.8)",
              transformStyle: "preserve-3d",
            }}
          />
        </div>
      </motion.div>

      {/* Shadow layer hovering directly beneath the floating can */}
      {isFloating && (
        <div 
          className="absolute left-1/2 -bottom-10 -translate-x-1/2 rounded-full blur-xl bg-black/60 pointer-events-none transition-transform duration-300"
          style={{
            width: 110 * scale,
            height: 18 * scale,
            transform: `translateX(-50%) scale(${1 + floatYSpring.get() * -0.012})`,
            opacity: 0.7 - floatYSpring.get() * 0.015
          }}
        />
      )}
    </div>
  );
}
