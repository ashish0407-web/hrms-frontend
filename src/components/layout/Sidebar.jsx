import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Calendar,
  X,
  Menu,
  Sparkles,
} from 'lucide-react';

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/employees', icon: Users, label: 'Employees' },
    { path: '/attendance', icon: Calendar, label: 'Attendance' },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const linkVariants = {
    initial: { x: -20, opacity: 0 },
    animate: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    }),
    hover: {
      x: 8,
      transition: { type: 'spring', stiffness: 400, damping: 25 },
    },
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 'var(--z-modal-backdrop)',
              display: 'none',
            }}
            className="sidebar-overlay"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 'var(--sidebar-width)',
          height: '100vh',
          background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 'var(--z-fixed)',
          boxShadow: '4px 0 24px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Background Elements */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-30%',
          width: '80%',
          height: '80%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
        <div style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          position: 'relative',
        }}>
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              style={{
                width: 48,
                height: 48,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
              }} />
              <Sparkles size={24} color="white" style={{ position: 'relative', zIndex: 1 }} />
            </motion.div>
            <div>
              <h1 style={{
                fontSize: '20px',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}>
                HRMS
              </h1>
              <p style={{
                fontSize: '11px',
                color: 'rgba(148, 163, 184, 0.8)',
                fontWeight: 500,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                Management System
              </p>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav style={{
          flex: 1,
          padding: '24px 12px',
          overflowY: 'auto',
          position: 'relative',
        }}>
          <p style={{
            fontSize: '10px',
            fontWeight: 700,
            color: 'rgba(148, 163, 184, 0.5)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '16px',
            paddingLeft: '16px',
          }}>
            Navigation
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <motion.div
                  key={item.path}
                  custom={index}
                  variants={linkVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <NavLink
                    to={item.path}
                    onClick={() => window.innerWidth < 768 && onToggle()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      position: 'relative',
                      overflow: 'hidden',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)'
                        : 'transparent',
                      border: isActive 
                        ? '1px solid rgba(99, 102, 241, 0.3)' 
                        : '1px solid transparent',
                      backdropFilter: isActive ? 'blur(10px)' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {/* Active indicator bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: 3,
                          height: 28,
                          background: 'linear-gradient(180deg, #6366f1 0%, #a855f7 100%)',
                          borderRadius: '0 4px 4px 0',
                          boxShadow: '0 0 12px rgba(99, 102, 241, 0.6)',
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Glow effect on active */}
                    {isActive && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(ellipse at left center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                        pointerEvents: 'none',
                      }} />
                    )}

                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '10px',
                        background: isActive
                          ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                          : 'rgba(255, 255, 255, 0.05)',
                        color: isActive ? 'white' : 'rgba(148, 163, 184, 0.8)',
                        transition: 'all 0.3s ease',
                        boxShadow: isActive 
                          ? '0 4px 16px rgba(99, 102, 241, 0.4)' 
                          : 'none',
                        border: isActive 
                          ? 'none' 
                          : '1px solid rgba(255, 255, 255, 0.06)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {isActive && (
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
                        }} />
                      )}
                      <item.icon size={20} style={{ position: 'relative', zIndex: 1 }} />
                    </motion.div>

                    <span style={{
                      fontSize: '14px',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#ffffff' : 'rgba(203, 213, 225, 0.9)',
                      letterSpacing: '-0.01em',
                      transition: 'all 0.3s ease',
                    }}>
                      {item.label}
                    </span>

                    {/* Active dot indicator */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{
                          marginLeft: 'auto',
                          width: 6,
                          height: 6,
                          background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                          borderRadius: '50%',
                          boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)',
                        }}
                      />
                    )}
                  </NavLink>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(0, 0, 0, 0.2)',
          position: 'relative',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              padding: '16px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
              borderRadius: '12px',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative shine */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
            }} />
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '8px',
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)',
              }} />
              <p style={{ 
                fontSize: '13px', 
                fontWeight: 600, 
                color: '#ffffff',
                letterSpacing: '-0.01em',
              }}>
                HRMS
              </p>
            </div>
            <p style={{ 
              fontSize: '11px', 
              color: 'rgba(148, 163, 184, 0.7)',
              paddingLeft: '18px',
            }}>
              © 2026 All rights reserved
            </p>
          </motion.div>
        </div>
      </motion.aside>

      {/* Mobile menu button */}
      <motion.button
        whileHover={{ scale: 1.08, rotate: 3 }}
        whileTap={{ scale: 0.92 }}
        onClick={onToggle}
        style={{
          position: 'fixed',
          top: 'var(--space-4)',
          left: 'var(--space-4)',
          zIndex: 'var(--z-sticky)',
          width: 52,
          height: 52,
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '14px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
          cursor: 'pointer',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="mobile-menu-btn"
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, transparent 50%)',
          opacity: 0.5,
        }} />
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      <style>{`
        @media (max-width: 768px) {
          .sidebar-overlay {
            display: block !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          aside {
            transform: translateX(-100%);
          }
        }
        
        /* Custom scrollbar for dark theme */
        nav::-webkit-scrollbar {
          width: 4px;
        }
        nav::-webkit-scrollbar-track {
          background: transparent;
        }
        nav::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 4px;
        }
        nav::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.5);
        }
      `}</style>
    </>
  );
};

export default Sidebar;
