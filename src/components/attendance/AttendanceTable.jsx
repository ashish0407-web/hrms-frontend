import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Calendar, User, Clock, Shield, Sparkles } from 'lucide-react';
import { formatDate, getInitials, getAvatarColor } from '../../utils/helpers';

const AttendanceTable = ({ records, showEmployee = true }) => {
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
  };

  // Generate gradient colors for avatars based on ID
  const getAvatarGradient = (id) => {
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
    const index = id.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  // Get shadow color based on ID
  const getAvatarShadow = (id) => {
    const shadows = [
      'rgba(99, 102, 241, 0.4)',
      'rgba(139, 92, 246, 0.4)',
      'rgba(16, 185, 129, 0.4)',
      'rgba(245, 158, 11, 0.4)',
      'rgba(239, 68, 68, 0.4)',
      'rgba(6, 182, 212, 0.4)',
      'rgba(236, 72, 153, 0.4)',
      'rgba(59, 130, 246, 0.4)',
    ];
    const index = id.charCodeAt(0) % shadows.length;
    return shadows[index];
  };

  return (
    <div 
      className="table-container" 
      style={{ 
        borderRadius: '20px', 
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      {/* Table Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: showEmployee 
          ? '2fr 1.5fr 1fr 1.2fr' 
          : '1.5fr 1fr 1.2fr',
        padding: '16px 24px',
        background: 'rgba(255, 255, 255, 0.02)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}>
        {showEmployee && (
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            color: 'rgba(148, 163, 184, 0.7)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>
            Employee
          </div>
        )}
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          color: 'rgba(148, 163, 184, 0.7)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          Date
        </div>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          color: 'rgba(148, 163, 184, 0.7)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          Status
        </div>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          color: 'rgba(148, 163, 184, 0.7)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          Recorded At
        </div>
      </div>

      {/* Table Body */}
      <motion.div
        variants={tableVariants}
        initial="hidden"
        animate="visible"
      >
        {records.map((record, index) => (
          <motion.div
            key={`${record.employee_id}-${record.date}`}
            variants={rowVariants}
            whileHover={{
              backgroundColor: record.status === 'Present' 
                ? 'rgba(16, 185, 129, 0.08)' 
                : 'rgba(239, 68, 68, 0.08)',
            }}
            style={{
              display: 'grid',
              gridTemplateColumns: showEmployee 
                ? '2fr 1.5fr 1fr 1.2fr' 
                : '1.5fr 1fr 1.2fr',
              padding: '16px 24px',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
            }}
          >
            {/* Hover indicator line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileHover={{ scaleY: 1 }}
              style={{
                position: 'absolute',
                left: 0,
                top: '20%',
                bottom: '20%',
                width: 3,
                background: record.status === 'Present'
                  ? 'linear-gradient(180deg, #10b981 0%, #34d399 100%)'
                  : 'linear-gradient(180deg, #ef4444 0%, #f87171 100%)',
                borderRadius: '0 4px 4px 0',
                transformOrigin: 'center',
              }}
            />

            {/* Employee Column */}
            {showEmployee && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    background: getAvatarGradient(record.employee_id),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '12px',
                    boxShadow: `0 6px 16px ${getAvatarShadow(record.employee_id)}`,
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
                    {record.employee_id.slice(0, 2).toUpperCase()}
                  </span>
                </motion.div>

                <div>
                  <span style={{
                    fontWeight: 600,
                    color: '#ffffff',
                    fontSize: '14px',
                    display: 'block',
                    marginBottom: '4px',
                  }}>
                    {record.employee_name || record.employee_id}
                  </span>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '2px 8px',
                    background: 'rgba(99, 102, 241, 0.15)',
                    borderRadius: '20px',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: '#8b5cf6',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                  }}>
                    <Shield size={8} />
                    {record.employee_id}
                  </span>
                </div>
              </div>
            )}

            {/* Date Column */}
            <div>
              <motion.div
                whileHover={{ x: 4 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{
                  width: 30,
                  height: 30,
                  background: 'rgba(245, 158, 11, 0.15)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                }}>
                  <Calendar size={14} color="#fbbf24" />
                </div>
                <span style={{ 
                  fontSize: '13px', 
                  fontWeight: 500,
                  color: 'rgba(203, 213, 225, 0.9)',
                }}>
                  {formatDate(record.date, 'EEE, MMM dd, yyyy')}
                </span>
              </motion.div>
            </div>

            {/* Status Column */}
            <div>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.08, y: -2 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  background: record.status === 'Present'
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)'
                    : 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%)',
                  border: `1px solid ${
                    record.status === 'Present' 
                      ? 'rgba(16, 185, 129, 0.3)' 
                      : 'rgba(239, 68, 68, 0.3)'
                  }`,
                  borderRadius: '24px',
                  boxShadow: record.status === 'Present'
                    ? '0 4px 12px rgba(16, 185, 129, 0.2)'
                    : '0 4px 12px rgba(239, 68, 68, 0.2)',
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: record.status === 'Present' ? '#10b981' : '#ef4444',
                    boxShadow: record.status === 'Present'
                      ? '0 0 8px rgba(16, 185, 129, 0.6)'
                      : '0 0 8px rgba(239, 68, 68, 0.6)',
                  }}
                />
                {record.status === 'Present' ? (
                  <CheckCircle size={16} color="#34d399" />
                ) : (
                  <XCircle size={16} color="#f87171" />
                )}
                <span style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: record.status === 'Present' ? '#34d399' : '#f87171',
                  letterSpacing: '0.02em',
                }}>
                  {record.status}
                </span>
              </motion.div>
            </div>

            {/* Recorded At Column */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <div style={{
                  width: 30,
                  height: 30,
                  background: 'rgba(99, 102, 241, 0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(99, 102, 241, 0.15)',
                }}>
                  <Clock size={14} color="#8b5cf6" />
                </div>
                <span style={{
                  fontSize: '13px',
                  color: 'rgba(148, 163, 184, 0.8)',
                  fontWeight: 500,
                }}>
                  {formatDate(record.created_at, 'MMM dd, yyyy HH:mm')}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Table Footer */}
      <div style={{
        padding: '16px 24px',
        background: 'rgba(255, 255, 255, 0.02)',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)',
          }} />
          <span style={{
            fontSize: '13px',
            color: 'rgba(148, 163, 184, 0.7)',
            fontWeight: 500,
          }}>
            {records.length} record{records.length !== 1 ? 's' : ''} found
          </span>
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(16, 185, 129, 0.15)',
          }}>
            <CheckCircle size={12} color="#34d399" />
            <span style={{ fontSize: '11px', color: '#34d399', fontWeight: 600 }}>
              Present: {records.filter(r => r.status === 'Present').length}
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(239, 68, 68, 0.15)',
          }}>
            <XCircle size={12} color="#f87171" />
            <span style={{ fontSize: '11px', color: '#f87171', fontWeight: 600 }}>
              Absent: {records.filter(r => r.status === 'Absent').length}
            </span>
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        /* Row hover enhancement */
        .table-container > div:hover .hover-indicator {
          transform: scaleY(1);
        }

        /* Responsive table */
        @media (max-width: 1024px) {
          .table-container > div > div {
            grid-template-columns: ${showEmployee ? '1.5fr 1fr 1fr' : '1.5fr 1fr'} !important;
          }
          
          .table-container > div > div > div:last-child {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .table-container > div > div {
            grid-template-columns: 1fr auto !important;
          }
          
          .table-container > div > div > div:nth-child(2) {
            display: none;
          }
        }

        /* Smooth scrolling */
        .table-container {
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(16, 185, 129, 0.3) transparent;
        }

        .table-container::-webkit-scrollbar {
          height: 6px;
        }

        .table-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .table-container::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 3px;
        }

        .table-container::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </div>
  );
};

export default AttendanceTable;