import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Plus, 
  Filter,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Users,
  CalendarCheck,
  Sparkles,
  BarChart3
} from 'lucide-react';
import toast from 'react-hot-toast';
import { employeeAPI, attendanceAPI } from '../api';
import PageTransition from '../components/common/PageTransition';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import ErrorAlert from '../components/common/ErrorAlert';
import AttendanceForm from '../components/attendance/AttendanceForm';
import AttendanceTable from '../components/attendance/AttendanceTable';
import { getTodayDate, formatDate } from '../utils/helpers';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [selectedEmployee, setSelectedEmployee] = useState('');
  
  // Stats
  const [stats, setStats] = useState({
    present: 0,
    absent: 0,
    total: 0,
  });
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchAttendance();
    }
  }, [selectedDate, selectedEmployee]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [employeesRes, attendanceRes] = await Promise.all([
        employeeAPI.getAll(),
        attendanceAPI.getAll(selectedDate),
      ]);
      
      setEmployees(employeesRes.data || []);
      const attendanceData = attendanceRes.data || [];
      setAttendance(attendanceData);
      calculateStats(attendanceData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendance = async () => {
    try {
      setError(null);
      let response;
      
      if (selectedEmployee) {
        response = await attendanceAPI.getByEmployee(selectedEmployee);
      } else if (selectedDate) {
        response = await attendanceAPI.getAll(selectedDate);
      } else {
        response = await attendanceAPI.getAll();
      }
      
      const attendanceData = response.data || [];
      setAttendance(attendanceData);
      calculateStats(attendanceData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch attendance');
    }
  };

  const calculateStats = (data) => {
    const present = data.filter(r => r.status === 'Present').length;
    const absent = data.filter(r => r.status === 'Absent').length;
    setStats({
      present,
      absent,
      total: data.length,
    });
  };

  const handleMarkAttendance = async (data) => {
    try {
      setFormLoading(true);
      await attendanceAPI.mark(data);
      toast.success('Attendance marked successfully!', {
        style: {
          background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
          color: '#ffffff',
          border: 'none',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#10b981',
        },
      });
      setIsFormOpen(false);
      fetchAttendance();
    } catch (err) {
      // Error is handled by API interceptor
    } finally {
      setFormLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchAttendance();
  };

  const clearFilters = () => {
    setSelectedDate(getTodayDate());
    setSelectedEmployee('');
  };

  // Calculate attendance percentage
  const attendancePercentage = stats.total > 0 
    ? Math.round((stats.present / stats.total) * 100) 
    : 0;

  if (loading) {
    return <Loader text="Loading attendance records..." />;
  }

  return (
    <PageTransition>
      <div style={{
        padding: '24px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Page Header */}
        <div className="page-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '28px',
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
                  background: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
                }} />
                <Calendar size={28} color="white" />
              </motion.div>
              Attendance
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
              Track and manage employee attendance
            </motion.p>
          </div>

          <motion.div
            className="page-actions"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'flex',
              gap: '12px',
            }}
          >
            <motion.button
              whileHover={{ 
                scale: 1.02, 
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRefresh}
              className="btn btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: 'rgba(203, 213, 225, 0.9)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <RefreshCw size={18} />
              Refresh
            </motion.button>
            <motion.button
              whileHover={{ 
                scale: 1.02, 
                boxShadow: '0 8px 32px rgba(16, 185, 129, 0.5)',
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsFormOpen(true)}
              className="btn btn-success"
              disabled={employees.length === 0}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 600,
                cursor: employees.length === 0 ? 'not-allowed' : 'pointer',
                opacity: employees.length === 0 ? 0.5 : 1,
                boxShadow: '0 4px 20px rgba(16, 185, 129, 0.35)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
              }} />
              <Plus size={18} style={{ position: 'relative', zIndex: 1 }} />
              <span style={{ position: 'relative', zIndex: 1 }}>Mark Attendance</span>
            </motion.button>
          </motion.div>
        </div>

        {error && (
          <ErrorAlert
            message={error}
            onRetry={fetchAttendance}
            onDismiss={() => setError(null)}
          />
        )}

        {/* Quick Stats */}
        <AnimatePresence>
          {attendance.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.25 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '28px',
              }}
            >
              {/* Total Records */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px 24px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Background glow */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-30%',
                  width: '80%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />

                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  style={{
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    borderRadius: '14px',
                    color: 'white',
                    boxShadow: '0 6px 20px rgba(99, 102, 241, 0.35)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
                  }} />
                  <BarChart3 size={22} />
                </motion.div>
                <div>
                  <p style={{ 
                    fontSize: '12px', 
                    color: 'rgba(148, 163, 184, 0.7)', 
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '4px',
                  }}>
                    Total Records
                  </p>
                  <p style={{ 
                    fontSize: '28px', 
                    fontWeight: 800, 
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                  }}>
                    {stats.total}
                  </p>
                </div>
              </motion.div>

              {/* Present */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px 24px',
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Background glow */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-30%',
                  width: '80%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />

                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  style={{
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                    borderRadius: '14px',
                    color: 'white',
                    boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
                  }} />
                  <CheckCircle size={22} />
                </motion.div>
                <div>
                  <p style={{ 
                    fontSize: '12px', 
                    color: '#34d399', 
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '4px',
                  }}>
                    Present
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <p style={{ 
                      fontSize: '28px', 
                      fontWeight: 800, 
                      color: '#10b981',
                      letterSpacing: '-0.02em',
                    }}>
                      {stats.present}
                    </p>
                    {stats.total > 0 && (
                      <span style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#34d399',
                        opacity: 0.8,
                      }}>
                        ({attendancePercentage}%)
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Absent */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px 24px',
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Background glow */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-30%',
                  width: '80%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />

                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  style={{
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
                    borderRadius: '14px',
                    color: 'white',
                    boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
                  }} />
                  <XCircle size={22} />
                </motion.div>
                <div>
                  <p style={{ 
                    fontSize: '12px', 
                    color: '#f87171', 
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '4px',
                  }}>
                    Absent
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <p style={{ 
                      fontSize: '28px', 
                      fontWeight: 800, 
                      color: '#ef4444',
                      letterSpacing: '-0.02em',
                    }}>
                      {stats.absent}
                    </p>
                    {stats.total > 0 && (
                      <span style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#f87171',
                        opacity: 0.8,
                      }}>
                        ({100 - attendancePercentage}%)
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Attendance Rate - Additional Stat */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px 24px',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Background glow */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-30%',
                  width: '80%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />

                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  style={{
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                    borderRadius: '14px',
                    color: 'white',
                    boxShadow: '0 6px 20px rgba(245, 158, 11, 0.4)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
                  }} />
                  <TrendingUp size={22} />
                </motion.div>
                <div>
                  <p style={{ 
                    fontSize: '12px', 
                    color: '#fbbf24', 
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '4px',
                  }}>
                    Attendance Rate
                  </p>
                  <p style={{ 
                    fontSize: '28px', 
                    fontWeight: 800, 
                    color: '#f59e0b',
                    letterSpacing: '-0.02em',
                  }}>
                    {attendancePercentage}%
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="filters-bar"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            padding: '20px 24px',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '24px',
          }}
        >
          {/* Date Filter */}
          <div className="filter-group" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: 40,
              height: 40,
              background: 'rgba(16, 185, 129, 0.15)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}>
              <Calendar size={18} color="#34d399" />
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedEmployee('');
              }}
              max={getTodayDate()}
              className="form-input"
              style={{
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
                minWidth: '180px',
              }}
            />
          </div>

          {/* Employee Filter */}
          <div className="filter-group" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: 40,
              height: 40,
              background: 'rgba(99, 102, 241, 0.15)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(99, 102, 241, 0.2)',
            }}>
              <Filter size={18} color="#8b5cf6" />
            </div>
            <select
              value={selectedEmployee}
              onChange={(e) => {
                setSelectedEmployee(e.target.value);
                if (e.target.value) setSelectedDate('');
              }}
              className="form-select"
              style={{
                minWidth: 240,
                padding: '12px 40px 12px 16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%238b5cf6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                backgroundSize: '16px',
              }}
            >
              <option value="" style={{ background: '#1e293b', color: '#ffffff' }}>All Employees</option>
              {employees.map((emp) => (
                <option key={emp.employee_id} value={emp.employee_id} style={{ background: '#1e293b', color: '#ffffff' }}>
                  {emp.full_name} ({emp.employee_id})
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          <AnimatePresence>
            {(selectedDate !== getTodayDate() || selectedEmployee) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ 
                  scale: 1.02,
                  background: 'rgba(239, 68, 68, 0.15)',
                  borderColor: 'rgba(239, 68, 68, 0.3)',
                }}
                whileTap={{ scale: 0.98 }}
                onClick={clearFilters}
                className="btn btn-ghost"
                style={{
                  padding: '10px 18px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: 'rgba(203, 213, 225, 0.9)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                Clear Filters
              </motion.button>
            )}
          </AnimatePresence>

          {/* Active Filter Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            {selectedDate && !selectedEmployee && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  borderRadius: '20px',
                  fontWeight: 600,
                  fontSize: '13px',
                  color: '#34d399',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                }}
              >
                <CalendarCheck size={14} />
                {formatDate(selectedDate, 'MMM dd, yyyy')}
              </motion.span>
            )}
            {selectedEmployee && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  background: 'rgba(139, 92, 246, 0.15)',
                  borderRadius: '20px',
                  fontWeight: 600,
                  fontSize: '13px',
                  color: '#a78bfa',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                }}
              >
                <Users size={14} />
                {employees.find(e => e.employee_id === selectedEmployee)?.full_name || selectedEmployee}
              </motion.span>
            )}
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {employees.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '80px 40px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative elements */}
              <div style={{
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '40%',
                height: '60%',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                style={{
                  width: 100,
                  height: 100,
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)',
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 28px',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
                }}
              >
                <Users size={44} color="#8b5cf6" />
              </motion.div>

              <h3 style={{
                fontSize: '24px',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '12px',
              }}>No employees found</h3>
              <p style={{
                fontSize: '16px',
                color: 'rgba(148, 163, 184, 0.8)',
                marginBottom: '32px',
              }}>Add employees first before marking attendance</p>

              <motion.a
                href="/employees"
                whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(99, 102, 241, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  border: 'none',
                  borderRadius: '14px',
                  color: '#ffffff',
                  fontSize: '15px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
                }}
              >
                Go to Employees
              </motion.a>
            </motion.div>
          ) : attendance.length > 0 ? (
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
            }}>
              <AttendanceTable
                records={attendance}
                showEmployee={!selectedEmployee}
              />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '80px 40px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative elements */}
              <div style={{
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '40%',
                height: '60%',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                style={{
                  width: 100,
                  height: 100,
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(52, 211, 153, 0.15) 100%)',
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 28px',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  boxShadow: '0 8px 32px rgba(16, 185, 129, 0.2)',
                }}
              >
                <CalendarCheck size={44} color="#34d399" />
              </motion.div>

              <h3 style={{
                fontSize: '24px',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '12px',
              }}>No attendance records</h3>
              <p style={{
                fontSize: '16px',
                color: 'rgba(148, 163, 184, 0.8)',
                marginBottom: '32px',
                maxWidth: '400px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
                {selectedDate 
                  ? `No attendance marked for ${formatDate(selectedDate, 'MMMM dd, yyyy')}`
                  : selectedEmployee
                  ? "No attendance records for this employee"
                  : "Start marking attendance for your employees"}
              </p>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(16, 185, 129, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFormOpen(true)}
                className="btn btn-success"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                  border: 'none',
                  borderRadius: '14px',
                  color: '#ffffff',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)',
                }}
              >
                <Plus size={20} />
                Mark Attendance
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Attendance Form Modal */}
        <AttendanceForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleMarkAttendance}
          employees={employees}
          loading={formLoading}
        />
      </div>

      {/* Custom styles */}
      <style>{`
        input[type="date"] {
          color-scheme: dark;
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.6;
          cursor: pointer;
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
        }

        .form-input:focus,
        .form-select:focus {
          border-color: rgba(99, 102, 241, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15), 0 4px 20px rgba(0, 0, 0, 0.2) !important;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .page-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          
          .page-actions {
            width: 100%;
            justify-content: flex-start !important;
          }
          
          .filters-bar {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          
          .filter-group {
            width: 100%;
          }
          
          .filter-group select,
          .filter-group input {
            width: 100% !important;
            min-width: unset !important;
          }
        }
      `}</style>
    </PageTransition>
  );
};

export default Attendance;