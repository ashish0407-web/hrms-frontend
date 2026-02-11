import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Building, Calendar, Edit2, Trash2, MoreVertical, Shield, Sparkles } from 'lucide-react';
import { formatDateTime, getInitials, getAvatarColor } from '../../utils/helpers';

const EmployeeCard = ({ employee, onEdit, onDelete, index = 0 }) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        delay: index * 0.05,
      },
    },
  };

  // Generate gradient colors for avatars based on name
  const getAvatarGradient = (name) => {
    const gradients = [
      'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
      'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
      'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
      'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
      'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
    ];
    const index = name.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  // Get shadow color based on name
  const getAvatarShadow = (name) => {
    const shadows = [
      'rgba(99, 102, 241, 0.5)',
      'rgba(139, 92, 246, 0.5)',
      'rgba(16, 185, 129, 0.5)',
      'rgba(245, 158, 11, 0.5)',
      'rgba(239, 68, 68, 0.5)',
      'rgba(6, 182, 212, 0.5)',
      'rgba(236, 72, 153, 0.5)',
      'rgba(59, 130, 246, 0.5)',
    ];
    const index = name.charCodeAt(0) % shadows.length;
    return shadows[index];
  };

  // Get accent color for the card based on name
  const getAccentColor = (name) => {
    const colors = [
      { primary: '#6366f1', secondary: '#8b5cf6' },
      { primary: '#8b5cf6', secondary: '#a855f7' },
      { primary: '#10b981', secondary: '#34d399' },
      { primary: '#f59e0b', secondary: '#fbbf24' },
      { primary: '#ef4444', secondary: '#f87171' },
      { primary: '#06b6d4', secondary: '#22d3ee' },
      { primary: '#ec4899', secondary: '#f472b6' },
      { primary: '#3b82f6', secondary: '#60a5fa' },
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const accentColor = getAccentColor(employee.full_name);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 60px ${getAvatarShadow(employee.full_name).replace('0.5', '0.15')}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '-30%',
        right: '-20%',
        width: '50%',
        height: '50%',
        background: `radial-gradient(circle, ${accentColor.primary}15 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-10%',
        width: '40%',
        height: '40%',
        background: `radial-gradient(circle, ${accentColor.secondary}10 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Top gradient bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
        style={{
          height: 3,
          background: getAvatarGradient(employee.full_name),
          transformOrigin: 'left',
          boxShadow: `0 0 20px ${getAvatarShadow(employee.full_name)}`,
        }}
      />

      {/* Shine effect line */}
      <div style={{
        position: 'absolute',
        top: 3,
        left: '10%',
        right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
      }} />

      {/* Content */}
      <div style={{ padding: '24px', position: 'relative', zIndex: 1 }}>
        {/* Header with avatar and actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px',
        }}>
          {/* Avatar and name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              style={{
                width: 60,
                height: 60,
                borderRadius: '18px',
                background: getAvatarGradient(employee.full_name),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: '18px',
                boxShadow: `0 8px 24px ${getAvatarShadow(employee.full_name)}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Avatar shine effect */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)',
              }} />
              <span style={{ position: 'relative', zIndex: 1 }}>
                {getInitials(employee.full_name)}
              </span>
            </motion.div>

            <div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '6px',
                letterSpacing: '-0.01em',
              }}>
                {employee.full_name}
              </h3>
              <motion.span
                whileHover={{ scale: 1.05 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  background: `linear-gradient(135deg, ${accentColor.primary}20 0%, ${accentColor.secondary}15 100%)`,
                  border: `1px solid ${accentColor.primary}30`,
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: accentColor.secondary,
                }}
              >
                <Shield size={10} />
                {employee.employee_id}
              </motion.span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <motion.button
              whileHover={{ 
                scale: 1.15, 
                background: 'rgba(99, 102, 241, 0.2)',
                borderColor: 'rgba(99, 102, 241, 0.4)',
                color: '#8b5cf6',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onEdit(employee)}
              style={{
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                color: 'rgba(148, 163, 184, 0.8)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              title="Edit Employee"
            >
              <Edit2 size={14} />
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: 1.15, 
                background: 'rgba(239, 68, 68, 0.2)',
                borderColor: 'rgba(239, 68, 68, 0.4)',
                color: '#f87171',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDelete(employee)}
              style={{
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                color: 'rgba(148, 163, 184, 0.8)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              title="Delete Employee"
            >
              <Trash2 size={14} />
            </motion.button>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
          marginBottom: '20px',
        }} />

        {/* Info items */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}>
          {/* Email */}
          <motion.div
            whileHover={{ x: 6 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(16, 185, 129, 0.15)',
              borderRadius: '10px',
              color: '#34d399',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              flexShrink: 0,
            }}>
              <Mail size={15} />
            </div>
            <span style={{
              fontSize: '13px',
              color: 'rgba(203, 213, 225, 0.9)',
              fontWeight: 500,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {employee.email}
            </span>
          </motion.div>

          {/* Department */}
          <motion.div
            whileHover={{ x: 6 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(99, 102, 241, 0.15)',
              borderRadius: '10px',
              color: '#8b5cf6',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              flexShrink: 0,
            }}>
              <Building size={15} />
            </div>
            <span style={{
              fontSize: '13px',
              color: 'rgba(203, 213, 225, 0.9)',
              fontWeight: 500,
            }}>
              {employee.department}
            </span>
          </motion.div>

          {/* Joined date */}
          <motion.div
            whileHover={{ x: 6 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(245, 158, 11, 0.15)',
              borderRadius: '10px',
              color: '#fbbf24',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              flexShrink: 0,
            }}>
              <Calendar size={15} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{
                fontSize: '11px',
                color: 'rgba(148, 163, 184, 0.6)',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Joined
              </span>
              <span style={{
                fontSize: '13px',
                color: 'rgba(203, 213, 225, 0.9)',
                fontWeight: 500,
              }}>
                {formatDateTime(employee.created_at)}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom corner accent */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          bottom: -30,
          right: -30,
          width: 60,
          height: 60,
          background: getAvatarGradient(employee.full_name),
          opacity: 0.1,
          borderRadius: '50%',
        }} />
      </div>

      {/* Status indicator */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.05 + 0.4, type: 'spring' }}
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          background: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '20px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        }}
      >
        <div style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
          boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)',
        }} />
        <span style={{
          fontSize: '10px',
          fontWeight: 600,
          color: '#34d399',
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
        }}>
          Active
        </span>
      </motion.div>
    </motion.div>
  );
};

export default EmployeeCard;