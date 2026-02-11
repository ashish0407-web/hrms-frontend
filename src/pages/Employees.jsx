import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  RefreshCw,
  Sparkles,
  UserPlus,
  Database
} from 'lucide-react';
import toast from 'react-hot-toast';
import { employeeAPI } from '../api';
import PageTransition from '../components/common/PageTransition';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import ErrorAlert from '../components/common/ErrorAlert';
import ConfirmModal from '../components/common/ConfirmModal';
import EmployeeForm from '../components/employees/EmployeeForm';
import EmployeeTable from '../components/employees/EmployeeTable';
import { debounce } from '../utils/helpers';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deletingEmployee, setDeletingEmployee] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    filterEmployees();
  }, [searchTerm, selectedDepartment, employees]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await employeeAPI.getAll();
      setEmployees(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const filterEmployees = () => {
    let filtered = [...employees];

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (emp) =>
          emp.full_name.toLowerCase().includes(search) ||
          emp.employee_id.toLowerCase().includes(search) ||
          emp.email.toLowerCase().includes(search)
      );
    }

    if (selectedDepartment) {
      filtered = filtered.filter((emp) => emp.department === selectedDepartment);
    }

    setFilteredEmployees(filtered);
  };

  const handleSearchChange = debounce((value) => {
    setSearchTerm(value);
  }, 300);

  const handleAddEmployee = async (data) => {
    try {
      setFormLoading(true);
      await employeeAPI.create(data);
      toast.success('Employee added successfully!', {
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
      fetchEmployees();
    } catch (err) {
      // Error is handled by API interceptor
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditEmployee = async (data) => {
    try {
      setFormLoading(true);
      await employeeAPI.update(editingEmployee.employee_id, {
        full_name: data.full_name,
        email: data.email,
        department: data.department,
      });
      toast.success('Employee updated successfully!', {
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
      setEditingEmployee(null);
      fetchEmployees();
    } catch (err) {
      // Error is handled by API interceptor
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteEmployee = async () => {
    try {
      setDeleteLoading(true);
      await employeeAPI.delete(deletingEmployee.employee_id);
      toast.success('Employee deleted successfully!', {
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
      setDeletingEmployee(null);
      fetchEmployees();
    } catch (err) {
      // Error is handled by API interceptor
    } finally {
      setDeleteLoading(false);
    }
  };

  const openEditModal = (employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const openDeleteModal = (employee) => {
    setDeletingEmployee(employee);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingEmployee(null);
  };

  // Get unique departments for filter
  const departments = [...new Set(employees.map((emp) => emp.department))].sort();

  if (loading) {
    return <Loader text="Loading employees..." />;
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
          top: '-15%',
          right: '-8%',
          width: '35%',
          height: '35%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-12%',
          left: '-8%',
          width: '30%',
          height: '30%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: '40%',
          right: '20%',
          width: '25%',
          height: '25%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Page Header */}
        <div className="page-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '28px',
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
                <Users size={28} color="white" />
              </motion.div>
              Employees
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
              Manage your organization's employees
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
              onClick={fetchEmployees}
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
                boxShadow: '0 8px 32px rgba(99, 102, 241, 0.5)',
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsFormOpen(true)}
              className="btn btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.35)',
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
              <span style={{ position: 'relative', zIndex: 1 }}>Add Employee</span>
            </motion.button>
          </motion.div>
        </div>

        {error && (
          <ErrorAlert
            message={error}
            onRetry={fetchEmployees}
            onDismiss={() => setError(null)}
          />
        )}

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
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Search Input */}
          <div className="search-wrapper" style={{ flex: '1', minWidth: '280px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 36,
                height: 36,
                background: 'rgba(99, 102, 241, 0.15)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(99, 102, 241, 0.2)',
              }}>
                <Search size={16} color="#8b5cf6" />
              </div>
              <input
                type="text"
                placeholder="Search by name, ID, or email..."
                onChange={(e) => handleSearchChange(e.target.value)}
                className="form-input"
                style={{
                  width: '100%',
                  padding: '14px 20px 14px 68px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                }}
              />
            </div>
          </div>

          {/* Department Filter */}
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
              <Filter size={18} color="#34d399" />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="form-select"
              style={{
                minWidth: 200,
                padding: '14px 20px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%238b5cf6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                backgroundSize: '18px',
                paddingRight: '44px',
              }}
            >
              <option value="" style={{ background: '#1e293b', color: '#ffffff' }}>All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept} style={{ background: '#1e293b', color: '#ffffff' }}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 16px',
              background: 'rgba(99, 102, 241, 0.1)',
              borderRadius: '10px',
              border: '1px solid rgba(99, 102, 241, 0.2)',
            }}
          >
            <Database size={16} color="#8b5cf6" />
            <span style={{
              fontSize: '13px',
              color: 'rgba(203, 213, 225, 0.9)',
              fontWeight: 500,
            }}>
              Showing <span style={{ color: '#8b5cf6', fontWeight: 700 }}>{filteredEmployees.length}</span> of <span style={{ color: '#8b5cf6', fontWeight: 700 }}>{employees.length}</span> employees
            </span>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {filteredEmployees.length > 0 ? (
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
            }}>
              <EmployeeTable
                employees={filteredEmployees}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
              />
            </div>
          ) : employees.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '60px 40px',
                textAlign: 'center',
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                style={{
                  width: 80,
                  height: 80,
                  background: 'rgba(245, 158, 11, 0.15)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                }}
              >
                <Search size={36} color="#fbbf24" />
              </motion.div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '8px',
              }}>No matches found</h3>
              <p style={{
                fontSize: '15px',
                color: 'rgba(148, 163, 184, 0.8)',
                marginBottom: '24px',
              }}>Try adjusting your search or filter criteria</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDepartment('');
                }}
                className="btn btn-secondary"
                style={{
                  padding: '12px 28px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Clear Filters
              </motion.button>
            </motion.div>
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
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute',
                bottom: '-20%',
                left: '-10%',
                width: '40%',
                height: '60%',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
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
                  position: 'relative',
                }}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                }} />
                <UserPlus size={44} color="#8b5cf6" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: '12px',
                  letterSpacing: '-0.02em',
                }}>No employees yet</h3>
                <p style={{
                  fontSize: '16px',
                  color: 'rgba(148, 163, 184, 0.8)',
                  marginBottom: '32px',
                  maxWidth: '400px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>Start by adding your first employee to the system</p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(99, 102, 241, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFormOpen(true)}
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
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
                }} />
                <Plus size={20} style={{ position: 'relative', zIndex: 1 }} />
                <span style={{ position: 'relative', zIndex: 1 }}>Add First Employee</span>
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Employee Form Modal */}
        <EmployeeForm
          isOpen={isFormOpen}
          onClose={closeForm}
          onSubmit={editingEmployee ? handleEditEmployee : handleAddEmployee}
          initialData={editingEmployee}
          loading={formLoading}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={!!deletingEmployee}
          onClose={() => setDeletingEmployee(null)}
          onConfirm={handleDeleteEmployee}
          title="Delete Employee"
          message={`Are you sure you want to delete ${deletingEmployee?.full_name}? This will also remove all their attendance records. This action cannot be undone.`}
          confirmText="Delete Employee"
          type="danger"
          loading={deleteLoading}
        />
      </div>

      {/* Custom styles for inputs */}
      <style>{`
        .form-input::placeholder {
          color: rgba(148, 163, 184, 0.5);
        }
        
        .form-input:focus {
          border-color: rgba(99, 102, 241, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15), 0 4px 20px rgba(0, 0, 0, 0.2) !important;
        }
        
        .form-select:focus {
          border-color: rgba(99, 102, 241, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15), 0 4px 20px rgba(0, 0, 0, 0.2) !important;
        }
        
        .form-select option {
          background: #1e293b;
          color: #ffffff;
          padding: 12px;
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.5);
        }

        /* Responsive adjustments */
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
          
          .search-wrapper {
            min-width: 100% !important;
          }
          
          .filter-group {
            width: 100%;
          }
          
          .filter-group select {
            flex: 1;
          }
        }
      `}</style>
    </PageTransition>
  );
};

export default Employees;
