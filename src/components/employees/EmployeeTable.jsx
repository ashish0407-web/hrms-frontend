import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, User, Mail, Building, Calendar, MoreVertical, Shield } from 'lucide-react';
import { formatDateTime, getInitials, getAvatarColor } from '../../utils/helpers';

const EmployeeTable = ({ employees, onEdit, onDelete, loading }) => {
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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

  // Get shadow color based on gradient
  const getAvatarShadow = (name) => {
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
    const index = name.charCodeAt(0) % shadows.length;
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
        gridTemplateColumns: '2fr 1.5fr 1fr 1fr 120px',
        padding: '16px 24px',
        background: 'rgba(255, 255, 255, 0.02)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          color: 'rgba(148, 163, 184, 0.7)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          Employee
        </div>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          color: 'rgba(148, 163, 184, 0.7)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          Email
        </div>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          color: 'rgba(148, 163, 184, 0.7)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          Department
        </div>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          color: 'rgba(148, 163, 184, 0.7)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          Joined
        </div>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          color: 'rgba(148, 163, 184, 0.7)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          textAlign: 'right',
        }}>
          Actions
        </div>
      </div>

      {/* Table Body */}
      <motion.div
        variants={tableVariants}
        initial="hidden"
        animate="visible"
      >
        {employees.map((employee, index) => (
          <motion.div
            key={employee.employee_id}
            variants={rowVariants}
            whileHover={{
              backgroundColor: 'rgba(99, 102, 241, 0.08)',
            }}
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1.5fr 1fr 1fr 120px',
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
                background: 'linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%)',
                borderRadius: '0 4px 4px 0',
                transformOrigin: 'center',
              }}
            />

            {/* Employee Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '14px',
                  background: getAvatarGradient(employee.full_name),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '14px',
                  boxShadow: `0 6px 20px ${getAvatarShadow(employee.full_name)}`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Shine effect */}
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
                <p style={{
                  fontWeight: 600,
                  color: '#ffffff',
                  fontSize: '14px',
                  marginBottom: '4px',
                  letterSpacing: '-0.01em',
                }}>
                  {employee.full_name}
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <span style={{
                    padding: '3px 10px',
                    background: 'rgba(99, 102, 241, 0.15)',
                    borderRadius: '20px',
                    fontWeight: 600,
                    fontSize: '11px',
                    color: '#8b5cf6',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    <Shield size={10} />
                    {employee.employee_id}
                  </span>
                </div>
              </div>
            </div>

            {/* Email */}
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
                  width: 28,
                  height: 28,
                  background: 'rgba(16, 185, 129, 0.15)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                }}>
                  <Mail size={12} color="#34d399" />
                </div>
                <span style={{ 
                  fontSize: '13px',
                  color: 'rgba(203, 213, 225, 0.9)',
                  fontWeight: 500,
                }}>
                  {employee.email}
                </span>
              </motion.div>
            </div>

            {/* Department */}
            <div>
              <motion.span
                whileHover={{ scale: 1.05, y: -2 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#a78bfa',
                  border: '1px solid rgba(99, 102, 241, 0.25)',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)',
                  cursor: 'default',
                }}
              >
                <Building size={14} />
                {employee.department}
              </motion.span>
            </div>

            {/* Joined Date */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: 'rgba(148, 163, 184, 0.8)',
              }}>
                <div style={{
                  width: 32,
                  height: 32,
                  background: 'rgba(245, 158, 11, 0.1)',
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
                }}>
                  {formatDateTime(employee.created_at)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '8px',
            }}>
              <motion.button
                whileHover={{ 
                  scale: 1.1, 
                  background: 'rgba(99, 102, 241, 0.2)',
                  borderColor: 'rgba(99, 102, 241, 0.4)',
                  color: '#8b5cf6',
                }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(employee);
                }}
                style={{
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: 'rgba(148, 163, 184, 0.8)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                title="Edit Employee"
              >
                <Edit2 size={16} />
              </motion.button>

              <motion.button
                whileHover={{ 
                  scale: 1.1, 
                  background: 'rgba(239, 68, 68, 0.2)',
                  borderColor: 'rgba(239, 68, 68, 0.4)',
                  color: '#f87171',
                }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(employee);
                }}
                style={{
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: 'rgba(148, 163, 184, 0.8)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                title="Delete Employee"
              >
                <Trash2 size={16} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Table Footer with count */}
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
            {employees.length} employee{employees.length !== 1 ? 's' : ''} total
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          background: 'rgba(99, 102, 241, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(99, 102, 241, 0.15)',
        }}>
          <span style={{
            fontSize: '11px',
            color: 'rgba(148, 163, 184, 0.6)',
            fontWeight: 500,
          }}>
            Last updated
          </span>
          <span style={{
            fontSize: '11px',
            color: '#8b5cf6',
            fontWeight: 600,
          }}>
            Just now
          </span>
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        /* Row hover effect enhancement */
        .table-container > div:hover .hover-indicator {
          transform: scaleY(1);
        }

        /* Responsive table */
        @media (max-width: 1024px) {
          .table-container > div {
            grid-template-columns: 1.5fr 1fr 1fr 100px !important;
          }
          
          .table-container > div > div:nth-child(2) {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .table-container > div {
            grid-template-columns: 1fr auto !important;
            gap: 12px;
          }
          
          .table-container > div > div:nth-child(2),
          .table-container > div > div:nth-child(3),
          .table-container > div > div:nth-child(4) {
            display: none;
          }
        }

        /* Smooth scrolling for table */}
        .table-container {
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(99, 102, 241, 0.3) transparent;
        }

        .table-container::-webkit-scrollbar {
          height: 6px;
        }

        .table-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .table-container::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 3px;
        }

        .table-container::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.5);
        }
      `}</style>
    </div>
  );
};

export default EmployeeTable;