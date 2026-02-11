import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  TrendingUp,
  Calendar,
  ArrowRight,
  Sparkles,
  Activity,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { employeeAPI, attendanceAPI } from '../api';
import PageTransition from '../components/common/PageTransition';
import Loader from '../components/common/Loader';
import ErrorAlert from '../components/common/ErrorAlert';
import { formatDate, getTodayDate } from '../utils/helpers';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    notMarked: 0,
  });
  const [recentAttendance, setRecentAttendance] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [employeesRes, todaySummaryRes, attendanceRes] = await Promise.all([
        employeeAPI.getAll(),
        attendanceAPI.getTodaySummary(),
        attendanceAPI.getAll(getTodayDate()),
      ]);

      setStats({
        totalEmployees: todaySummaryRes.total_employees || employeesRes.total || 0,
        presentToday: todaySummaryRes.present || 0,
        absentToday: todaySummaryRes.absent || 0,
        notMarked: todaySummaryRes.not_marked || 0,
      });

      setRecentAttendance(attendanceRes.data?.slice(0, 5) || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      icon: Users,
      color: 'primary',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      shadowColor: 'rgba(99, 102, 241, 0.4)',
      bgGlow: 'rgba(99, 102, 241, 0.15)',
    },
    {
      title: 'Present Today',
      value: stats.presentToday,
      icon: UserCheck,
      color: 'success',
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      shadowColor: 'rgba(16, 185, 129, 0.4)',
      bgGlow: 'rgba(16, 185, 129, 0.15)',
    },
    {
      title: 'Absent Today',
      value: stats.absentToday,
      icon: UserX,
      color: 'danger',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
      shadowColor: 'rgba(239, 68, 68, 0.4)',
      bgGlow: 'rgba(239, 68, 68, 0.15)',
    },
    {
      title: 'Not Marked',
      value: stats.notMarked,
      icon: Clock,
      color: 'warning',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      shadowColor: 'rgba(245, 158, 11, 0.4)',
      bgGlow: 'rgba(245, 158, 11, 0.15)',
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

  if (loading) {
    return <Loader text="Loading dashboard..." />;
  }

  return (
    <PageTransition>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '35%',
          height: '35%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Page Header */}
        <div className="page-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '32px',
          position: 'relative',
          zIndex: 1,
        }}>
          <div className="page-header-content">
            <motion.h1
              className="page-title"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                fontSize: '32px',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '8px',
                letterSpacing: '-0.02em',
              }}
            >
              <motion.div
                className="page-title-icon"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                style={{
                  width: 56,
                  height: 56,
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
                }} />
                <TrendingUp size={28} color="white" />
              </motion.div>
              Dashboard
            </motion.h1>
            <motion.p
              className="page-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: '16px',
                color: 'rgba(148, 163, 184, 0.9)',
                marginLeft: '72px',
              }}
            >
              Welcome back! Here's what's happening today.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 20px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div style={{
              width: 40,
              height: 40,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
            }}>
              <Calendar size={20} color="white" />
            </div>
            <div>
              <p style={{ fontSize: '11px', color: 'rgba(148, 163, 184, 0.7)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Today's Date
              </p>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>
                {formatDate(new Date(), 'EEEE, MMMM dd, yyyy')}
              </span>
            </div>
          </motion.div>
        </div>

        {error && (
          <ErrorAlert
            message={error}
            onRetry={fetchDashboardData}
            onDismiss={() => setError(null)}
          />
        )}

        {/* Stats Grid */}
        <motion.div
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: '32px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { type: 'spring', stiffness: 300 }
              }}
              className="stat-card"
              style={{ 
                position: 'relative', 
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Background glow effect */}
              <div style={{
                position: 'absolute',
                top: -40,
                right: -40,
                width: 120,
                height: 120,
                background: `radial-gradient(circle, ${stat.bgGlow} 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} />

              {/* Top shine line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '10%',
                right: '10%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
              }} />

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '20px',
              }}>
                <motion.div
                  className={`stat-card-icon ${stat.color}`}
                  whileHover={{ rotate: 15, scale: 1.15 }}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    width: 56,
                    height: 56,
                    background: stat.gradient,
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 8px 24px ${stat.shadowColor}`,
                    color: 'white',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
                  }} />
                  <stat.icon size={26} />
                </motion.div>

                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1 + 0.4, type: 'spring', stiffness: 200 }}
                  style={{
                    width: 32,
                    height: 32,
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <Activity size={16} color="rgba(148, 163, 184, 0.6)" />
                </motion.div>
              </div>

              <motion.div
                className="stat-card-value"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                style={{ 
                  position: 'relative', 
                  zIndex: 1,
                  fontSize: '42px',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  marginBottom: '4px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                {stat.value}
              </motion.div>

              <div className="stat-card-label" style={{ 
                position: 'relative', 
                zIndex: 1,
                fontSize: '14px',
                fontWeight: 500,
                color: 'rgba(148, 163, 184, 0.9)',
                letterSpacing: '0.01em',
              }}>
                {stat.title}
              </div>

              {/* Animated bottom gradient line */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: stat.gradient,
                  transformOrigin: 'left',
                  borderRadius: '0 0 20px 20px',
                }}
              />

              {/* Corner accent */}
              <div style={{
                position: 'absolute',
                bottom: 12,
                right: 12,
                width: 24,
                height: 24,
                borderRight: '2px solid rgba(255,255,255,0.1)',
                borderBottom: '2px solid rgba(255,255,255,0.1)',
                borderRadius: '0 0 8px 0',
              }} />
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions & Recent Activity */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Quick Actions Card */}
          <motion.div
            variants={itemVariants}
            className="card"
            style={{ 
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="card-header" style={{
              padding: '20px 24px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(99, 102, 241, 0.3)',
              }}>
                <Zap size={18} color="#8b5cf6" />
              </div>
              <h3 className="card-title" style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.01em',
              }}>Quick Actions</h3>
            </div>
            <div className="card-body" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px',
              padding: '20px',
            }}>
              <Link to="/employees" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ 
                    x: 8, 
                    background: 'rgba(99, 102, 241, 0.15)',
                    borderColor: 'rgba(99, 102, 241, 0.3)',
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 20px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      style={{
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        borderRadius: '12px',
                        color: 'white',
                        boxShadow: '0 6px 20px rgba(99, 102, 241, 0.35)',
                      }}
                    >
                      <Users size={22} />
                    </motion.div>
                    <div>
                      <p style={{ fontWeight: 600, color: '#ffffff', fontSize: '15px', marginBottom: '2px' }}>
                        Manage Employees
                      </p>
                      <p style={{ fontSize: '13px', color: 'rgba(148, 163, 184, 0.7)' }}>
                        Add, edit, or remove employees
                      </p>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ x: 4 }}
                    style={{
                      width: 36,
                      height: 36,
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <ArrowRight size={18} color="rgba(148, 163, 184, 0.8)" />
                  </motion.div>
                </motion.div>
              </Link>

              <Link to="/attendance" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ 
                    x: 8, 
                    background: 'rgba(16, 185, 129, 0.15)',
                    borderColor: 'rgba(16, 185, 129, 0.3)',
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 20px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      style={{
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                        borderRadius: '12px',
                        color: 'white',
                        boxShadow: '0 6px 20px rgba(16, 185, 129, 0.35)',
                      }}
                    >
                      <Calendar size={22} />
                    </motion.div>
                    <div>
                      <p style={{ fontWeight: 600, color: '#ffffff', fontSize: '15px', marginBottom: '2px' }}>
                        Mark Attendance
                      </p>
                      <p style={{ fontSize: '13px', color: 'rgba(148, 163, 184, 0.7)' }}>
                        Record daily attendance
                      </p>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ x: 4 }}
                    style={{
                      width: 36,
                      height: 36,
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <ArrowRight size={18} color="rgba(148, 163, 184, 0.8)" />
                  </motion.div>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Today's Attendance Summary */}
          <motion.div
            variants={itemVariants}
            className="card"
            style={{ 
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="card-header" style={{
              padding: '20px 24px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(52, 211, 153, 0.2) 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}>
                <Activity size={18} color="#34d399" />
              </div>
              <h3 className="card-title" style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.01em',
              }}>Today's Overview</h3>
            </div>
            <div className="card-body" style={{ padding: '24px' }}>
              {stats.totalEmployees > 0 ? (
                <div>
                  {/* Progress Circle */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '28px',
                  }}>
                    <div style={{ position: 'relative', width: 160, height: 160 }}>
                      {/* Outer glow ring */}
                      <div style={{
                        position: 'absolute',
                        inset: -10,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
                      }} />
                      
                      <svg width="160" height="160" viewBox="0 0 160 160">
                        {/* Background circle */}
                        <circle
                          cx="80"
                          cy="80"
                          r="65"
                          fill="none"
                          stroke="rgba(255, 255, 255, 0.06)"
                          strokeWidth="14"
                        />
                        {/* Track circle */}
                        <circle
                          cx="80"
                          cy="80"
                          r="65"
                          fill="none"
                          stroke="rgba(255, 255, 255, 0.03)"
                          strokeWidth="14"
                        />
                        {/* Progress circle */}
                        <motion.circle
                          cx="80"
                          cy="80"
                          r="65"
                          fill="none"
                          stroke="url(#progressGradient)"
                          strokeWidth="14"
                          strokeLinecap="round"
                          strokeDasharray={`${(stats.presentToday / stats.totalEmployees) * 408} 408`}
                          initial={{ strokeDasharray: '0 408' }}
                          animate={{ strokeDasharray: `${(stats.presentToday / stats.totalEmployees) * 408} 408` }}
                          transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                          transform="rotate(-90 80 80)"
                          style={{
                            filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))',
                          }}
                        />
                        <defs>
                          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="50%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                      }}>
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                          style={{
                            fontSize: '36px',
                            fontWeight: 800,
                            color: '#ffffff',
                            letterSpacing: '-0.02em',
                            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                          }}
                        >
                          {stats.totalEmployees > 0 
                            ? Math.round((stats.presentToday / stats.totalEmployees) * 100)
                            : 0}%
                        </motion.div>
                        <p style={{ 
                          fontSize: '12px', 
                          color: 'rgba(148, 163, 184, 0.7)',
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}>
                          Attendance
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '32px',
                    flexWrap: 'wrap',
                  }}>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px',
                        padding: '10px 16px',
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: '10px',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                      }}
                    >
                      <div style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                        boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)',
                      }} />
                      <span style={{ fontSize: '14px', color: '#ffffff', fontWeight: 500 }}>
                        Present
                      </span>
                      <span style={{ 
                        fontSize: '14px', 
                        color: '#10b981',
                        fontWeight: 700,
                      }}>
                        {stats.presentToday}
                      </span>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px',
                        padding: '10px 16px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        borderRadius: '10px',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                      }}
                    >
                      <div style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
                        boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)',
                      }} />
                      <span style={{ fontSize: '14px', color: '#ffffff', fontWeight: 500 }}>
                        Absent
                      </span>
                      <span style={{ 
                        fontSize: '14px', 
                        color: '#ef4444',
                        fontWeight: 700,
                      }}>
                        {stats.absentToday}
                      </span>
                    </motion.div>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    style={{
                      width: 80,
                      height: 80,
                      background: 'rgba(99, 102, 241, 0.1)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      border: '1px solid rgba(99, 102, 241, 0.2)',
                    }}
                  >
                    <Sparkles size={36} color="#8b5cf6" />
                  </motion.div>
                  <p style={{ 
                    color: 'rgba(148, 163, 184, 0.8)', 
                    fontSize: '15px',
                    marginBottom: '20px',
                  }}>
                    No employees added yet
                  </p>
                  <Link to="/employees">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)' }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-primary"
                      style={{
                        padding: '12px 28px',
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
                      }}
                    >
                      Add Employees
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;