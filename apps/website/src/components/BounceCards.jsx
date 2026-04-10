import { useState } from 'react';
import { motion } from 'framer-motion';

export default function BounceCards({
  className = '',
  cards = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = [0.175, 0.885, 0.32, 1.275],
  transformStyles = [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)'
  ],
  enableHover = false
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const getNoRotationTransform = transformStr => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    } else if (transformStr === 'none') {
      return 'rotate(0deg)';
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform, offsetX) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: animationStagger,
        delayChildren: animationDelay
      }
    }
  };

  const cardVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{
        width: containerWidth,
        height: containerHeight
      }}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {cards.map((card, idx) => {
        const baseTransform = transformStyles[idx] || 'none';
        let targetTransform = baseTransform;

        if (enableHover && hoveredIdx !== null) {
          if (idx === hoveredIdx) {
            targetTransform = getNoRotationTransform(baseTransform);
          } else {
            const offsetX = idx < hoveredIdx ? -160 : 160;
            targetTransform = getPushedTransform(baseTransform, offsetX);
          }
        }

        return (
          <motion.div
            key={idx}
            className={`card absolute w-[240px] aspect-4/5 border border-border/50 bg-background rounded-3xl overflow-hidden group will-change-transform`}
            style={{
              boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
            }}
            variants={cardVariants}
            animate={{
              transform: targetTransform,
              scale: 1
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: hoveredIdx !== null && idx !== hoveredIdx ? Math.abs(hoveredIdx - idx) * 0.05 : 0
            }}
            onMouseEnter={() => enableHover && setHoveredIdx(idx)}
            onMouseLeave={() => enableHover && setHoveredIdx(null)}
          >
            <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 h-full font-sans transition-colors duration-300">
              {card.icon && (
                <div className="mb-4 p-4 bg-primary/10 rounded-full text-primary">
                  {card.icon}
                </div>
              )}
              <h3 className="font-bold text-xl mb-2 text-foreground leading-tight">{card.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-4">{card.description}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
