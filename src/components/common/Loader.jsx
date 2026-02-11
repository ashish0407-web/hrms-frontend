import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';

const Loader = ({ size = 'medium', text = 'Loading...', fullScreen = false }) => {
  const sizes = {
    small: { spinner: 32, dot: 8, orbit: 40, text: 12 },
    medium: { spinner: 48, dot: 12, orbit: 64, text: 14 },
    large: { spinner: 64, dot: 16, orbit: 88, text: 16 },
  };

  const currentSize = sizes[size];

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const dotVariants = {
    initial: { y: 0, opacity: 0.5 },
    animate: {
      y: [-12, 0, -12],
      opacity: [0.5, 1, 0.5],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Orbital dots animation
  const orbitalVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  // Pulse ring animation
  const pulseVariants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0.3, 0, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeOut',
      },
    },
  };

  // Gradient colors for dots
  const dotColors = [
    'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
  ];

  const dotShadows = [
    '0 0 20px rgba(99, 102, 241, 0.6)',
    '0 0 20px rgba(16, 185, 129, 0.6)',
    '0 0 20px rgba(245, 158, 11, 0.6)',
  ];

  const content = (
    <motion.div 
      className="loader-container" 
      style={{ 
        minHeight: fullScreen ? '100vh' : '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: fullScreen 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
          : 'transparent',
        position: 'relative',
        overflow: 'hidden',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background decorative elements (only for fullscreen) */}
      {fullScreen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-15%',
              width: '50%',
              height: '50%',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              position: 'absolute',
              bottom: '-15%',
              left: '-10%',
              width: '40%',
              height: '40%',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Main loader container */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Outer pulse ring */}
        <motion.div
          variants={pulseVariants}
          animate="animate"
          style={{
            position: 'absolute',
            width: currentSize.orbit + 40,
            height: currentSize.orbit + 40,
            borderRadius: '50%',
            border: '2px solid rgba(99, 102, 241, 0.3)',
          }}
        />

        {/* Second pulse ring (delayed) */}
        <motion.div
          variants={pulseVariants}
          animate="animate"
          transition={{ delay: 0.5 }}
          style={{
            position: 'absolute',
            width: currentSize.orbit + 20,
            height: currentSize.orbit + 20,
            borderRadius: '50%',
            border: '2px solid rgba(16, 185, 129, 0.2)',
          }}
        />

        {/* Orbital ring background */}
        <div
          style={{
            position: 'absolute',
            width: currentSize.orbit,
            height: currentSize.orbit,
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        />

        {/* Rotating orbital dots */}
        <motion.div
          variants={orbitalVariants}
          animate="animate"
          style={{
            position: 'absolute',
            width: currentSize.orbit,
            height: currentSize.orbit,
          }}
        >
          {[0, 1, 2, 3].map((index) => {
            const angle = (index * 90) * (Math.PI / 180);
            const x = Math.cos(angle) * (currentSize.orbit / 2);
            const y = Math.sin(angle) * (currentSize.orbit / 2);
            
            return (
              <motion.div
                key={index}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate(${x - 4}px, ${y - 4}px)`,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: index % 2 === 0 
                    ? 'rgba(99, 102, 241, 0.8)' 
                    : 'rgba(16, 185, 129, 0.8)',
                  boxShadow: index % 2 === 0
                    ? '0 0 10px rgba(99, 102, 241, 0.5)'
                    : '0 0 10px rgba(16, 185, 129, 0.5)',
                }}
              />
            );
          })}
        </motion.div>

        {/* Center icon */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
            scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{
            width: currentSize.spinner,
            height: currentSize.spinner,
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Icon shine effect */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)',
          }} />
          <Sparkles 
            size={currentSize.spinner * 0.5} 
            color="white" 
            style={{ position: 'relative', zIndex: 1 }}
          />
        </motion.div>
      </div>

      {/* Bouncing dots */}
      <motion.div
        className="loader-dots"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: currentSize.dot,
          marginTop: '32px',
        }}
      >
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            variants={dotVariants}
            style={{
              width: currentSize.dot,
              height: currentSize.dot,
              background: dotColors[index],
              borderRadius: '50%',
              display: 'block',
              boxShadow: dotShadows[index],
            }}
          />
        ))}
      </motion.div>

      {/* Loading text */}
      {text && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          <motion.p
            className="loader-text"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              fontSize: `${currentSize.text}px`,
              color: 'rgba(203, 213, 225, 0.9)',
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            {text}
          </motion.p>
          
          {/* Animated loading bar */}
          <div style={{
            marginTop: '12px',
            width: '120px',
            height: '3px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
            margin: '12px auto 0',
          }}>
            <motion.div
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                width: '50%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent 0%, #8b5cf6 50%, transparent 100%)',
                borderRadius: '2px',
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          position: 'absolute',
          bottom: fullScreen ? '20%' : '10%',
          left: '30%',
          right: '30%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.3) 50%, transparent 100%)',
          transformOrigin: 'center',
        }}
      />
    </motion.div>
  );

  return content;
};

export default Loader;