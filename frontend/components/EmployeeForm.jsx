'use client';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EMPLOYEE } from '../graphql/mutations';
import { GET_ALL_EMPLOYEES } from '../graphql/queries';

export default function EmployeeForm({ departments, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    salary: ''
  });
  const [errors, setErrors] = useState({});
  const [addEmployee, { loading }] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [{ query: GET_ALL_EMPLOYEES }],
    onCompleted: () => {
      onSuccess();
      onClose();
    },
    onError: (error) => {
      setErrors({ submit: error.message });
    }
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.salary || parseFloat(formData.salary) <= 0) {
      newErrors.salary = 'Valid salary is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    try {
      await addEmployee({
        variables: {
          ...formData,
          salary: parseFloat(formData.salary)
        }
      });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative p-5 border border-cyan-400 w-full max-w-md shadow-lg rounded-md bg-white m-2">
        <div className="mt-3">
          <h3 className="text-2xl text-center font-semibold text-gray-900 mb-4 ">Add New Employee</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400 ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-cyan-950">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400 ${
                  errors.position ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.position && <p className="mt-1 text-sm text-cyan-950">{errors.position}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400 ${
                  errors.department ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              {errors.department && <p className="mt-1 text-sm text-cyan-950">{errors.department}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Salary</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400 ${
                  errors.salary ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.salary && <p className="mt-1 text-sm text-cyan-950">{errors.salary}</p>}
            </div>
            {errors.submit && (
              <div className="text-cyan-950 text-sm">{errors.submit}</div>
            )}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 xs:w-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium bg-cyan-400 border border-transparent rounded-md hover:bg-cyan-950 hover:text-white focus:outline-none disabled:opacity-50 xs:w-full"
              >
                {loading ? 'Adding...' : 'Add Employee'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
