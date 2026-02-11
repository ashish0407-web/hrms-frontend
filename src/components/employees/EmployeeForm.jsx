import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Building, Hash, AlertCircle, CheckCircle, Sparkles, UserPlus, UserCog } from 'lucide-react';
import { isValidEmail } from '../../utils/helpers';

const EmployeeForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  loading = false,
}) => {
  const isEditing = !!initialData;

  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        employee_id: initialData.employee_id || '',
        full_name: initialData.full_name || '',
        email: initialData.email || '',
        department: initialData.department || '',
      });
    } else {
      setFormData({
        employee_id: '',
        full_name: '',
        email: '',
        department: '',
      });
    }
    setErrors({});
    setTouched({});
  }, [initialData, isOpen]);

  const validateField = (name, value) => {
    switch (name) {
      case 'employee_id':
        if (!value.trim()) return 'Employee ID is required';
        if (value.length < 2) return 'Employee ID must be at least 2 characters';
        if (!/^[a-zA-Z0-9\-_]+$/.test(value)) return 'Only letters, numbers, hyphens, and underscores allowed';
        return '';
      case 'full_name':
        if (!value.trim()) return 'Full name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s\-']+$/.test(value)) return 'Only letters, spaces, hyphens, and apostrophes allowed';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!isValidEmail(value)) return 'Please enter a valid email address';
        return '';
      case 'department':
        if (!value.trim()) return 'Department is required';
        if (value.length < 2) return 'Department must be at least 2 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!isEditing || key !== 'employee_id') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    setTouched({ employee_id: true, full_name: true, email: true, department: true });

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
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

  const inputVariants = {
    focus: { scale: 1.02, transition: { type: 'spring', stiffness: 300 } },
    blur: { scale: 1 },
  };

  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Design', 'Product'];

  const inputFields = [
    {
      name: 'employee_id',
      label: 'Employee ID',
      icon: Hash,
      placeholder: 'e.g., EMP001',
      disabled: isEditing,
      iconColor: '#8b5cf6',
      iconBg: 'rgba(139, 92, 246, 0.15)',
      iconBorder: 'rgba(139, 92, 246, 0.25)',
    },
    {
      name: 'full_name',
      label: 'Full Name',
      icon: User,
      placeholder: 'e.g., John Doe',
      iconColor: '#6366f1',
      iconBg: 'rgba(99, 102, 241, 0.15)',
      iconBorder: 'rgba(99, 102, 241, 0.25)',
    },
    {
      name: 'email',
      label: 'Email Address',
      icon: Mail,
      placeholder: 'e.g., john.doe@company.com',
      type: 'email',
      iconColor: '#34d399',
      iconBg: 'rgba(16, 185, 129, 0.15)',
      iconBorder: 'rgba(16, 185, 129, 0.25)',
    },
  ];

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
              maxWidth: 520,
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px rgba(99, 102, 241, 0.1)',
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
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-10%',
              left: '-10%',
              width: '40%',
              height: '40%',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
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
                background: 'linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.3) 50%, transparent 100%)',
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    width: 52,
                    height: 52,
                    background: isEditing 
                      ? 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
                      : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isEditing
                      ? '0 8px 24px rgba(245, 158, 11, 0.4)'
                      : '0 8px 24px rgba(99, 102, 241, 0.4)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
                  }} />
                  {isEditing ? <UserCog size={24} color="white" /> : <UserPlus size={24} color="white" />}
                </motion.div>
                <div>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                  }}>
                    {isEditing ? 'Edit Employee' : 'Add New Employee'}
                  </h2>
                  <p style={{
                    fontSize: '13px',
                    color: 'rgba(148, 163, 184, 0.8)',
                    marginTop: '4px',
                  }}>
                    {isEditing ? 'Update employee information' : 'Fill in the details to add a new employee'}
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
                {inputFields.map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{ marginBottom: '22px' }}
                  >
                    <label
                      htmlFor={field.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'rgba(203, 213, 225, 0.9)',
                        marginBottom: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {field.label}
                      <span style={{ 
                        color: '#ef4444',
                        fontSize: '14px',
                        fontWeight: 400,
                      }}>*</span>
                      {field.disabled && (
                        <span style={{
                          fontSize: '10px',
                          padding: '2px 8px',
                          background: 'rgba(148, 163, 184, 0.1)',
                          borderRadius: '20px',
                          color: 'rgba(148, 163, 184, 0.6)',
                          fontWeight: 500,
                          textTransform: 'lowercase',
                          letterSpacing: 'normal',
                        }}>
                          read-only
                        </span>
                      )}
                    </label>

                    <div style={{ position: 'relative' }}>
                      <motion.div
                        animate={{
                          borderColor: errors[field.name] && touched[field.name]
                            ? 'rgba(239, 68, 68, 0.5)'
                            : touched[field.name] && !errors[field.name]
                            ? 'rgba(16, 185, 129, 0.5)'
                            : field.iconBorder,
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
                          background: errors[field.name] && touched[field.name]
                            ? 'rgba(239, 68, 68, 0.15)'
                            : touched[field.name] && !errors[field.name]
                            ? 'rgba(16, 185, 129, 0.15)'
                            : field.iconBg,
                          borderRadius: '10px',
                          border: `1px solid ${
                            errors[field.name] && touched[field.name]
                              ? 'rgba(239, 68, 68, 0.3)'
                              : touched[field.name] && !errors[field.name]
                              ? 'rgba(16, 185, 129, 0.3)'
                              : field.iconBorder
                          }`,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <field.icon 
                          size={16} 
                          color={
                            errors[field.name] && touched[field.name]
                              ? '#f87171'
                              : touched[field.name] && !errors[field.name]
                              ? '#34d399'
                              : field.iconColor
                          }
                        />
                      </motion.div>

                      <motion.input
                        variants={inputVariants}
                        whileFocus="focus"
                        id={field.name}
                        name={field.name}
                        type={field.type || 'text'}
                        value={formData[field.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={field.disabled}
                        placeholder={field.placeholder}
                        style={{
                          width: '100%',
                          padding: '16px 50px 16px 66px',
                          fontSize: '14px',
                          fontWeight: 500,
                          color: '#ffffff',
                          background: field.disabled 
                            ? 'rgba(255, 255, 255, 0.02)' 
                            : 'rgba(255, 255, 255, 0.05)',
                          border: `2px solid ${
                            errors[field.name] && touched[field.name]
                              ? 'rgba(239, 68, 68, 0.5)'
                              : touched[field.name] && !errors[field.name]
                              ? 'rgba(16, 185, 129, 0.5)'
                              : 'rgba(255, 255, 255, 0.08)'
                          }`,
                          borderRadius: '14px',
                          outline: 'none',
                          transition: 'all 0.3s ease',
                          cursor: field.disabled ? 'not-allowed' : 'text',
                          opacity: field.disabled ? 0.6 : 1,
                        }}
                      />

                      {touched[field.name] && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          style={{
                            position: 'absolute',
                            right: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 28,
                            height: 28,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: errors[field.name]
                              ? 'rgba(239, 68, 68, 0.15)'
                              : 'rgba(16, 185, 129, 0.15)',
                            borderRadius: '8px',
                            border: `1px solid ${
                              errors[field.name]
                                ? 'rgba(239, 68, 68, 0.3)'
                                : 'rgba(16, 185, 129, 0.3)'
                            }`,
                          }}
                        >
                          {errors[field.name] ? (
                            <AlertCircle size={14} color="#f87171" />
                          ) : (
                            <CheckCircle size={14} color="#34d399" />
                          )}
                        </motion.div>
                      )}
                    </div>

                    <AnimatePresence>
                      {errors[field.name] && touched[field.name] && (
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
                          {errors[field.name]}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                {/* Department Select */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label
                    htmlFor="department"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'rgba(203, 213, 225, 0.9)',
                      marginBottom: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Department
                    <span style={{ 
                      color: '#ef4444',
                      fontSize: '14px',
                      fontWeight: 400,
                    }}>*</span>
                  </label>

                  <div style={{ position: 'relative' }}>
                    <motion.div
                      animate={{
                        borderColor: errors.department && touched.department
                          ? 'rgba(239, 68, 68, 0.5)'
                          : touched.department && !errors.department
                          ? 'rgba(16, 185, 129, 0.5)'
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
                        background: errors.department && touched.department
                          ? 'rgba(239, 68, 68, 0.15)'
                          : touched.department && !errors.department
                          ? 'rgba(16, 185, 129, 0.15)'
                          : 'rgba(245, 158, 11, 0.15)',
                        borderRadius: '10px',
                        border: `1px solid ${
                          errors.department && touched.department
                            ? 'rgba(239, 68, 68, 0.3)'
                            : touched.department && !errors.department
                            ? 'rgba(16, 185, 129, 0.3)'
                            : 'rgba(245, 158, 11, 0.25)'
                        }`,
                        transition: 'all 0.3s ease',
                        zIndex: 1,
                      }}
                    >
                      <Building 
                        size={16} 
                        color={
                          errors.department && touched.department
                            ? '#f87171'
                            : touched.department && !errors.department
                            ? '#34d399'
                            : '#fbbf24'
                        }
                      />
                    </motion.div>

                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        width: '100%',
                        padding: '16px 50px 16px 66px',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: formData.department ? '#ffffff' : 'rgba(148, 163, 184, 0.5)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: `2px solid ${
                          errors.department && touched.department
                            ? 'rgba(239, 68, 68, 0.5)'
                            : touched.department && !errors.department
                            ? 'rgba(16, 185, 129, 0.5)'
                            : 'rgba(255, 255, 255, 0.08)'
                        }`,
                        borderRadius: '14px',
                        outline: 'none',
                        cursor: 'pointer',
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%238b5cf6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 16px center',
                        backgroundSize: '18px',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <option value="" style={{ background: '#1e293b', color: 'rgba(148, 163, 184, 0.8)' }}>
                        Select a department
                      </option>
                      {departments.map((dept) => (
                        <option 
                          key={dept} 
                          value={dept}
                          style={{ background: '#1e293b', color: '#ffffff' }}
                        >
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <AnimatePresence>
                    {errors.department && touched.department && (
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
                        {errors.department}
                      </motion.p>
                    )}
                  </AnimatePresence>
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
                    boxShadow: isEditing
                      ? '0 8px 30px rgba(245, 158, 11, 0.4)'
                      : '0 8px 30px rgba(99, 102, 241, 0.4)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="btn btn-primary"
                  style={{
                    padding: '12px 28px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#ffffff',
                    background: isEditing
                      ? 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
                      : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    boxShadow: isEditing
                      ? '0 4px 20px rgba(245, 158, 11, 0.3)'
                      : '0 4px 20px rgba(99, 102, 241, 0.3)',
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
                      {isEditing ? 'Updating...' : 'Creating...'}
                    </span>
                  ) : (
                    <span style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      position: 'relative',
                      zIndex: 1,
                    }}>
                      {isEditing ? <UserCog size={16} /> : <UserPlus size={16} />}
                      {isEditing ? 'Update Employee' : 'Add Employee'}
                    </span>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Custom styles for inputs */}
      <style>{`
        input::placeholder {
          color: rgba(148, 163, 184, 0.4);
        }
        
        input:focus {
          border-color: rgba(99, 102, 241, 0.5) !important;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1), 0 4px 20px rgba(0, 0, 0, 0.2) !important;
        }
        
        select:focus {
          border-color: rgba(99, 102, 241, 0.5) !important;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1), 0 4px 20px rgba(0, 0, 0, 0.2) !important;
        }

        input:disabled {
          cursor: not-allowed;
        }

        /* Custom scrollbar for select dropdown */
        select::-webkit-scrollbar {
          width: 6px;
        }
        
        select::-webkit-scrollbar-track {
          background: #1e293b;
        }
        
        select::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 3px;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default EmployeeForm;