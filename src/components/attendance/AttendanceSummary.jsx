import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, TrendingUp, Sparkles, Activity } from 'lucide-react';

const AttendanceSummary = ({ summary }) => {
  const {
    employee_id = '',
    total_days = 0,
    present_days = 0,
    absent_days = 0,
    attendance_percentage = 0,
  } = summary || {};

  const stats = [
    {
      label: 'Total Days',
      value: total_days,
      icon: Clock,
      color: 'primary',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      shadowColor: 'rgba(99, 102, 241, 0.4)',
      bgGlow: 'rgba(99, 102, 241, 0.15)',
      textColor: '#8b5cf6',
      borderColor: 'rgba(99, 102, 241, 0.25)',
    },
    {
      label: 'Present',
      value: present_days,
      icon: CheckCircle,
      color: 'success',
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      shadowColor: 'rgba(16, 185, 129, 0.4)',
      bgGlow: 'rgba(16, 185, 129, 0.15)',
      textColor: '#34d399',
      borderColor: 'rgba(16, 185, 129, 0.25)',
    },
    {
      label: 'Absent',
      value: absent_days,
      icon: XCircle,
      color: 'danger',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
      shadowColor: 'rgba(239, 68, 68, 0.4)',
      bgGlow: 'rgba(239, 68, 68, 0.15)',
      textColor: '#f87171',
      borderColor: 'rgba(239, 68, 68, 0.25)',
    },
    {
      label: 'Attendance Rate',
      value: `${attendance_percentage}%`,
      icon: TrendingUp,
      color: 'accent',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      shadowColor: 'rgba(245, 158, 11, 0.4)',
      bgGlow: 'rgba(245, 158, 11, 0.15)',
      textColor: '#fbbf24',
      borderColor: 'rgba(245, 158, 11, 0.25)',
      isPercentage: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
  };

  // Determine performance level based on attendance percentage
  const getPerformanceIndicator = () => {
    if (attendance_percentage >= 90) return { label: 'Excellent', color: '#10b981' };
    if (attendance_percentage >= 75) return { label: 'Good', color: '#fbbf24' };
    if (attendance_percentage >= 50) return { label: 'Average', color: '#f59e0b' };
    return { label: 'Needs Improvement', color: '#ef4444' };
  };

  const performance = getPerformanceIndicator();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          whileHover={{ 
            y: -6, 
            scale: 1.02,
          }}
          onHoverStart={(e) => {
            e.currentTarget.style.boxShadow = `0 20px 40px ${stat.shadowColor}, 0 0 60px ${stat.bgGlow}`;
          }}
          onHoverEnd={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
          style={{
            position: 'relative',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '18px',
            border: `1px solid ${stat.borderColor}`,
            overflow: 'hidden',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Background glow effect */}
          <div
            style={{
              position: 'absolute',
              top: '-30%',
              right: '-20%',
              width: '70%',
              height: '70%',
              background: `radial-gradient(circle, ${stat.bgGlow} 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          {/* Subtle grid pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
              pointerEvents: 'none',
              opacity: 0.5,
            }}
          />

          {/* Top shine line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
            style={{
              position: 'absolute',
              top: 0,
              left: '10%',
              right: '10%',
              height: '1px',
              background: `linear-gradient(90deg, transparent 0%, ${stat.borderColor} 50%, transparent 100%)`,
              transformOrigin: 'center',
            }}
          />

          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 1,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '12px',
              }}>
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.15 }}
                  style={{
                    width: 46,
                    height: 46,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: stat.gradient,
                    borderRadius: '14px',
                    color: 'white',
                    boxShadow: `0 6px 20px ${stat.shadowColor}`,
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
                  <stat.icon size={22} style={{ position: 'relative', zIndex: 1 }} />
                </motion.div>

                {/* Activity indicator for percentage stat */}
                {stat.isPercentage && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.4, type: 'spring' }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      background: `${performance.color}20`,
                      borderRadius: '20px',
                      border: `1px solid ${performance.color}40`,
                    }}
                  >
                    <div style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: performance.color,
                      boxShadow: `0 0 8px ${performance.color}`,
                    }} />
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      color: performance.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                    }}>
                      {performance.label}
                    </span>
                  </motion.div>
                )}
              </div>

              <p style={{
                fontSize: '11px',
                color: 'rgba(148, 163, 184, 0.7)',
                fontWeight: 600,
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                {stat.label}
              </p>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    fontSize: '32px',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    textShadow: `0 2px 10px ${stat.shadowColor}`,
                  }}
                >
                  {typeof stat.value === 'number' ? stat.value : stat.value.replace('%', '')}
                </span>
                {stat.isPercentage && (
                  <span style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: stat.textColor,
                  }}>
                    %
                  </span>
                )}
              </motion.div>
            </div>

            {/* Mini chart/indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {stat.isPercentage ? (
                // Circular progress for percentage
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="3"
                  />
                  <motion.circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    stroke={stat.textColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${(attendance_percentage / 100) * 100.53} 100.53`}
                    initial={{ strokeDasharray: '0 100.53' }}
                    animate={{ strokeDasharray: `${(attendance_percentage / 100) * 100.53} 100.53` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5, ease: 'easeOut' }}
                    transform="rotate(-90 20 20)"
                    style={{
                      filter: `drop-shadow(0 0 4px ${stat.shadowColor})`,
                    }}
                  />
                </svg>
              ) : (
                // Activity pulse for other stats
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: stat.gradient,
                    boxShadow: `0 0 12px ${stat.shadowColor}`,
                  }}
                />
              )}
            </motion.div>
          </div>

          {/* Bottom accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              background: stat.gradient,
              transformOrigin: 'left',
              boxShadow: `0 0 10px ${stat.shadowColor}`,
            }}
          />

          {/* Corner accent */}
          <div style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            width: 20,
            height: 20,
            borderRight: `2px solid ${stat.borderColor}`,
            borderBottom: `2px solid ${stat.borderColor}`,
            borderRadius: '0 0 6px 0',
            opacity: 0.5,
          }} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AttendanceSummary;