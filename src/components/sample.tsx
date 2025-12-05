import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ProgressDisplay } from "@/components/ProgressDisplay";

const PADDING = 10; // 10px larger on each side
const CARD_WIDTH = 280;
const CONTAINER_HEIGHT = 500;

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapped, setIsSnapped] = useState(false);
  const [snapTarget, setSnapTarget] = useState<"top" | "bottom">("top");
  const [cardHeight, setCardHeight] = useState(170); // Default estimate

  const y = useMotionValue(0);
  
  const zoneWidth = CARD_WIDTH + PADDING * 2;
  const zoneHeight = cardHeight + PADDING * 2;
  
  // Distance the card travels: from top zone to bottom zone
  // Card starts at PADDING from container top
  // Card ends at (CONTAINER_HEIGHT - zoneHeight + PADDING) from container top
  // So dragMaxY = (CONTAINER_HEIGHT - zoneHeight + PADDING) - PADDING = CONTAINER_HEIGHT - zoneHeight
  const dragMaxY = CONTAINER_HEIGHT - zoneHeight;
  
  const progress = useTransform(y, [0, Math.max(dragMaxY, 1)], [0, 100]);

  // Measure card height after render
  useEffect(() => {
    const measureCard = () => {
      if (cardRef.current) {
        const height = cardRef.current.offsetHeight;
        if (height > 0) {
          setCardHeight(height);
        }
      }
    };

    measureCard();
    window.addEventListener("resize", measureCard);
    const timer = setTimeout(measureCard, 100);
    
    return () => {
      window.removeEventListener("resize", measureCard);
      clearTimeout(timer);
    };
  }, []);

  const snapThreshold = 80;

  const handleDrag = (_: any, info: { point: { y: number } }) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const relativeY = info.point.y - containerRect.top;
    
    // Bottom zone center position
    const bottomZoneCenter = CONTAINER_HEIGHT - zoneHeight / 2;
    const distanceToBottom = Math.abs(relativeY - bottomZoneCenter);
    
    if (distanceToBottom < snapThreshold) {
      setSnapTarget("bottom");
    } else {
      setSnapTarget("top");
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    
    const targetY = snapTarget === "bottom" ? dragMaxY : 0;
    
    animate(y, targetY, {
      type: "spring",
      stiffness: 500,
      damping: 30,
      mass: 0.8,
      onComplete: () => {
        setIsSnapped(snapTarget === "bottom");
      },
    });
  };

  const resetPosition = () => {
    animate(y, 0, {
      type: "spring",
      stiffness: 500,
      damping: 30,
      mass: 0.8,
      onComplete: () => {
        setIsSnapped(false);
        setSnapTarget("top");
      },
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div 
        ref={containerRef}
        className="relative"
        style={{ 
          width: zoneWidth,
          height: CONTAINER_HEIGHT,
        }}
      >
        {/* Top Zone */}
        <div 
          style={{ 
            width: zoneWidth,
            height: zoneHeight,
          }}
          className={`absolute top-0 left-0 snap-zone flex items-center justify-center transition-all duration-300 ${
            !isDragging && snapTarget === "top" && !isSnapped ? "snap-zone-active" : ""
          }`}
        >
          <span className="text-muted-foreground text-sm font-medium tracking-wide uppercase opacity-30 pointer-events-none">
            {isSnapped ? "Origem" : "Posição inicial"}
          </span>
        </div>

        {/* Bottom Zone */}
        <div 
          style={{ 
            width: zoneWidth,
            height: zoneHeight,
          }}
          className={`absolute bottom-0 left-0 snap-zone flex items-center justify-center transition-all duration-300 ${
            (isDragging && snapTarget === "bottom") || isSnapped 
              ? "snap-zone-active animate-pulse-border" 
              : ""
          }`}
        >
          <span className="text-muted-foreground text-sm font-medium tracking-wide uppercase opacity-30 pointer-events-none">
            {isSnapped ? "Conectado!" : "Solte aqui"}
          </span>
        </div>

        {/* Draggable Card */}
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: dragMaxY }}
          dragElastic={0.05}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{ 
            y,
            top: PADDING,
            left: PADDING,
          }}
          className={`absolute cursor-grab active:cursor-grabbing ${
            isDragging ? "z-20" : "z-10"
          }`}
        >
          <div 
            ref={cardRef}
            style={{ width: CARD_WIDTH }}
            className={`drag-card p-6 ${
              isDragging ? "drag-card-active" : ""
            } ${isSnapped ? "animate-snap-success" : ""}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                Arraste-me
              </span>
            </div>
            
            <h2 className="text-xl font-bold text-foreground mb-2">
              Card Arrastável
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Arraste este card até a zona inferior para fazer o snap automático.
            </p>
            
            <div className="mt-4 flex items-center gap-2">
              <div className="h-1 flex-1 bg-secondary rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary rounded-full origin-left"
                  style={{
                    scaleX: useTransform(y, [0, Math.max(dragMaxY, 1)], [0, 1]),
                  }}
                />
              </div>
              <ProgressDisplay progress={progress} />
            </div>
          </div>
        </motion.div>

        {/* Reset Button */}
        {isSnapped && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={resetPosition}
            className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-lg hover:bg-secondary/80 transition-colors"
          >
            Resetar posição
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Index;
