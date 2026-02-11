import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Calendar, CheckCircle, XCircle, AlertCircle, CalendarCheck, Sparkles, UserCheck } from 'lucide-react';
import { getTodayDate } from '../../utils/helpers';

const AttendanceForm = ({
  isOpen,
  onClose,
  onSubmit,
  employees = [],
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    employee_id: '',
    date: getTodayDate(),
    status: 'Present',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        employee_id: '',
        date: getTodayDate(),
        status: 'Present',
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleStatusSelect = (status) => {
    setFormData((prev) => ({ ...prev, status }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.employee_id) newErrors.employee_id = 'Please select an employee';
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.status) newErrors.status = 'Please select a status';

    // Check if date is not in the future
    if (formData.date > getTodayDate()) {
      newErrors.date = 'Cannot mark attendance for future dates';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 25 },
    },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  };

  // Get selected employee details
  const selectedEmployee = employees.find(emp => emp.employee_id === formData.employee_id);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            zIndex: 'var(--z-modal-backdrop)',
          }}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 500,
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px rgba(16, 185, 129, 0.1)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Background decorative elements */}
            <div style={{
              position: 'absolute',
              top: '-20%',
              right: '-15%',
              width: '50%',
              height: '50%',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-10%',
              left: '-10%',
              width: '40%',
              height: '40%',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 28px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(255, 255, 255, 0.02)',
              position: 'relative',
            }}>
              {/* Header shine line */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '5%',
                right: '5%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.3) 50%, transparent 100%)',
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    width: 52,
                    height: 52,
                    background: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
                  }} />
                  <CalendarCheck size={24} color="white" />
                </motion.div>
                <div>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                  }}>
                    Mark Attendance
                  </h2>
                  <p style={{
                    fontSize: '13px',
                    color: 'rgba(148, 163, 184, 0.8)',
                    marginTop: '4px',
                  }}>
                    Record attendance for an employee
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 90,
                  background: 'rgba(239, 68, 68, 0.2)',
                  borderColor: 'rgba(239, 68, 68, 0.4)',
                  color: '#f87171',
                }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                style={{
                  width: 44,
                  height: 44,
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
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div style={{ padding: '28px', position: 'relative', zIndex: 1 }}>
                {/* Employee Select */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  style={{ marginBottom: '24px' }}
                >
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'rgba(203, 213, 225, 0.9)',
                    marginBottom: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    Select Employee
                    <span style={{ color: '#ef4444', fontSize: '14px', fontWeight: 400 }}>*</span>
                  </label>

                  <div style={{ position: 'relative' }}>
                    <motion.div
                      animate={{
                        borderColor: errors.employee_id
                          ? 'rgba(239, 68, 68, 0.5)'
                          : formData.employee_id
                          ? 'rgba(16, 185, 129, 0.5)'
                          : 'rgba(99, 102, 241, 0.25)',
                      }}
                      style={{
                        position: 'absolute',
                        left: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 38,
                        height: 38,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: errors.employee_id
                          ? 'rgba(239, 68, 68, 0.15)'
                          : formData.employee_id
                          ? 'rgba(16, 185, 129, 0.15)'
                          : 'rgba(99, 102, 241, 0.15)',
                        borderRadius: '10px',
                        border: `1px solid ${
                          errors.employee_id
                            ? 'rgba(239, 68, 68, 0.3)'
                            : formData.employee_id
                            ? 'rgba(16, 185, 129, 0.3)'
                            : 'rgba(99, 102, 241, 0.25)'
                        }`,
                        transition: 'all 0.3s ease',
                        zIndex: 1,
                      }}
                    >
                      <User 
                        size={16} 
                        color={
                          errors.employee_id
                            ? '#f87171'
                            : formData.employee_id
                            ? '#34d399'
                            : '#8b5cf6'
                        }
                      />
                    </motion.div>

                    <select
                      name="employee_id"
                      value={formData.employee_id}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '16px 50px 16px 66px',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: formData.employee_id ? '#ffffff' : 'rgba(148, 163, 184, 0.5)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: `2px solid ${
                          errors.employee_id
                            ? 'rgba(239, 68, 68, 0.5)'
                            : 'rgba(255, 255, 255, 0.08)'
                        }`,
                        borderRadius: '14px',
                        outline: 'none',
                        cursor: 'pointer',
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2310b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 16px center',
                        backgroundSize: '18px',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <option value="" style={{ background: '#1e293b', color: 'rgba(148, 163, 184, 0.8)' }}>
                        Choose an employee
                      </option>
                      {employees.map((emp) => (
                        <option 
                          key={emp.employee_id} 
                          value={emp.employee_id}
                          style={{ background: '#1e293b', color: '#ffffff' }}
                        >
                          {emp.full_name} ({emp.employee_id})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Selected Employee Preview */}
                  <AnimatePresence>
                    {selectedEmployee && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        style={{
                          marginTop: '12px',
                          padding: '12px 16px',
                          background: 'rgba(16, 185, 129, 0.1)',
                          borderRadius: '12px',
                          border: '1px solid rgba(16, 185, 129, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                        }}
                      >
                        <div style={{
                          width: 36,
                          height: 36,
                          background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '12px',
                        }}>
                          {selectedEmployee.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>
                            {selectedEmployee.full_name}
                          </p>
                          <p style={{ fontSize: '11px', color: 'rgba(148, 163, 184, 0.7)' }}>
                            {selectedEmployee.department} • {selectedEmployee.employee_id}
                          </p>
                        </div>
                        <CheckCircle size={18} color="#34d399" style={{ marginLeft: 'auto' }} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {errors.employee_id && (
                      <motion.p
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginTop: '10px',
                          padding: '8px 12px',
                          fontSize: '12px',
                          fontWeight: 500,
                          color: '#f87171',
                          background: 'rgba(239, 68, 68, 0.1)',
                          borderRadius: '8px',
                          border: '1px solid rgba(239, 68, 68, 0.2)',
                        }}
                      >
                        <AlertCircle size={12} />
                        {errors.employee_id}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Date Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{ marginBottom: '24px' }}
                >
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'rgba(203, 213, 225, 0.9)',
                    marginBottom: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    Date
                    <span style={{ color: '#ef4444', fontSize: '14px', fontWeight: 400 }}>*</span>
                  </label>

                  <div style={{ position: 'relative' }}>
                    <motion.div
                      animate={{
                        borderColor: errors.date
                          ? 'rgba(239, 68, 68, 0.5)'
                          : 'rgba(245, 158, 11, 0.25)',
                      }}
                      style={{
                        position: 'absolute',
                        left: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 38,
                        height: 38,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: errors.date
                          ? 'rgba(239, 68, 68, 0.15)'
                          : 'rgba(245, 158, 11, 0.15)',
                        borderRadius: '10px',
                        border: `1px solid ${
                          errors.date
                            ? 'rgba(239, 68, 68, 0.3)'
                            : 'rgba(245, 158, 11, 0.25)'
                        }`,
                        transition: 'all 0.3s ease',
                        zIndex: 1,
                      }}
                    >
                      <Calendar 
                        size={16} 
                        color={errors.date ? '#f87171' : '#fbbf24'}
                      />
                    </motion.div>

                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      max={getTodayDate()}
                      style={{
                        width: '100%',
                        padding: '16px 20px 16px 66px',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#ffffff',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: `2px solid ${
                          errors.date
                            ? 'rgba(239, 68, 68, 0.5)'
                            : 'rgba(255, 255, 255, 0.08)'
                        }`,
                        borderRadius: '14px',
                        outline: 'none',
                        colorScheme: 'dark',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  </div>

                  <AnimatePresence>
                    {errors.date && (
                      <motion.p
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginTop: '10px',
                          padding: '8px 12px',
                          fontSize: '12px',
                          fontWeight: 500,
                          color: '#f87171',
                          background: 'rgba(239, 68, 68, 0.1)',
                          borderRadius: '8px',
                          border: '1px solid rgba(239, 68, 68, 0.2)',
                        }}
                      >
                        <AlertCircle size={12} />
                        {errors.date}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Status Selection */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'rgba(203, 213, 225, 0.9)',
                    marginBottom: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    Attendance Status
                    <span style={{ color: '#ef4444', fontSize: '14px', fontWeight: 400 }}>*</span>
                  </label>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                  }}>
                    {/* Present Button */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleStatusSelect('Present')}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '24px 20px',
                        background: formData.status === 'Present'
                          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)'
                          : 'rgba(255, 255, 255, 0.03)',
                        border: `2px solid ${
                          formData.status === 'Present' 
                            ? 'rgba(16, 185, 129, 0.5)' 
                            : 'rgba(255, 255, 255, 0.08)'
                        }`,
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Glow effect when selected */}
                      {formData.status === 'Present' && (
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
                          pointerEvents: 'none',
                        }} />
                      )}

                      <motion.div
                        animate={{
                          scale: formData.status === 'Present' ? [1, 1.1, 1] : 1,
                          boxShadow: formData.status === 'Present' 
                            ? '0 8px 24px rgba(16, 185, 129, 0.5)' 
                            : 'none',
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                          width: 56,
                          height: 56,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: formData.status === 'Present'
                            ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
                            : 'rgba(255, 255, 255, 0.08)',
                          borderRadius: '16px',
                          color: formData.status === 'Present' ? 'white' : 'rgba(148, 163, 184, 0.6)',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        {formData.status === 'Present' && (
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
                          }} />
                        )}
                        <CheckCircle size={28} />
                      </motion.div>
                      <span style={{
                        fontSize: '15px',
                        fontWeight: 700,
                        color: formData.status === 'Present' ? '#34d399' : 'rgba(148, 163, 184, 0.7)',
                        letterSpacing: '-0.01em',
                      }}>
                        Present
                      </span>

                      {/* Checkmark indicator */}
                      {formData.status === 'Present' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          style={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            width: 20,
                            height: 20,
                            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <CheckCircle size={12} color="white" />
                        </motion.div>
                      )}
                    </motion.button>

                    {/* Absent Button */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleStatusSelect('Absent')}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '24px 20px',
                        background: formData.status === 'Absent'
                          ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%)'
                          : 'rgba(255, 255, 255, 0.03)',
                        border: `2px solid ${
                          formData.status === 'Absent' 
                            ? 'rgba(239, 68, 68, 0.5)' 
                            : 'rgba(255, 255, 255, 0.08)'
                        }`,
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Glow effect when selected */}
                      {formData.status === 'Absent' && (
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.2) 0%, transparent 70%)',
                          pointerEvents: 'none',
                        }} />
                      )}

                      <motion.div
                        animate={{
                          scale: formData.status === 'Absent' ? [1, 1.1, 1] : 1,
                          boxShadow: formData.status === 'Absent' 
                            ? '0 8px 24px rgba(239, 68, 68, 0.5)' 
                            : 'none',
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                          width: 56,
                          height: 56,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: formData.status === 'Absent'
                            ? 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)'
                            : 'rgba(255, 255, 255, 0.08)',
                          borderRadius: '16px',
                          color: formData.status === 'Absent' ? 'white' : 'rgba(148, 163, 184, 0.6)',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        {formData.status === 'Absent' && (
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
                          }} />
                        )}
                        <XCircle size={28} />
                      </motion.div>
                      <span style={{
                        fontSize: '15px',
                        fontWeight: 700,
                        color: formData.status === 'Absent' ? '#f87171' : 'rgba(148, 163, 184, 0.7)',
                        letterSpacing: '-0.01em',
                      }}>
                        Absent
                      </span>

                      {/* Checkmark indicator */}
                      {formData.status === 'Absent' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          style={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            width: 20,
                            height: 20,
                            background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <CheckCircle size={12} color="white" />
                        </motion.div>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Footer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '12px',
                padding: '20px 28px',
                background: 'rgba(0, 0, 0, 0.2)',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              }}>
                <motion.button
                  type="button"
                  whileHover={{ 
                    scale: 1.02,
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  disabled={loading}
                  className="btn btn-secondary"
                  style={{
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'rgba(203, 213, 225, 0.9)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.5 : 1,
                    transition: 'all 0.3s ease',
                  }}
                >
                  Cancel
                </motion.button>

                <motion.button
                  type="submit"
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: '0 8px 30px rgba(16, 185, 129, 0.4)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="btn btn-primary"
                  style={{
                    padding: '12px 28px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#ffffff',
                    background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {/* Button shine effect */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
                    pointerEvents: 'none',
                  }} />
                  
                  {loading ? (
                    <span style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      position: 'relative',
                      zIndex: 1,
                    }}>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        style={{
                          width: 18,
                          height: 18,
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTopColor: 'white',
                          borderRadius: '50%',
                          display: 'inline-block',
                        }}
                      />
                      Saving...
                    </span>
                  ) : (
                    <span style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      position: 'relative',
                      zIndex: 1,
                    }}>
                      <CalendarCheck size={18} />
                      Mark Attendance
                    </span>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

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

        select:focus,
        input:focus {
          border-color: rgba(16, 185, 129, 0.5) !important;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1), 0 4px 20px rgba(0, 0, 0, 0.2) !important;
        }

        select option {
          background: #1e293b;
          color: #ffffff;
          padding: 12px;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default AttendanceForm;