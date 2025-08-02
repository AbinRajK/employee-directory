'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_EMPLOYEES, GET_EMPLOYEES_BY_DEPARTMENT, GET_DEPARTMENTS } from '../graphql/queries';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeForm from '../components/EmployeeForm';
import DepartmentFilter from '../components/DepartmentFilter';
import LoadingSpinner from '../components/LoadingSpinner';


export default function HomePage() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [showForm, setShowForm] = useState(false);

  const { data: departmentsData, loading: departmentsLoading } = useQuery(GET_DEPARTMENTS);
  
  const { data: employeesData, loading: employeesLoading, error } = useQuery(
    selectedDepartment ? GET_EMPLOYEES_BY_DEPARTMENT : GET_ALL_EMPLOYEES,
    {
      variables: selectedDepartment ? { department: selectedDepartment } : {},
      errorPolicy: 'all'
    }
  );

  if (departmentsLoading || employeesLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-cyan-950">Error loading employees: {error.message}</p>
      </div>
    );
  }

  const employees = selectedDepartment 
    ? employeesData?.getEmployeesByDepartment || []
    : employeesData?.getAllEmployees || [];

  const departments = departmentsData?.getDepartments || [];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Employees</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all employees in the company including their name, position, and department.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-cyan-400 px-4 py-2 text-sm font-medium shadow-sm hover:bg-cyan-950 hover:text-white focus:outline-none sm:w-auto"
          >
            Add New Employee
          </button>
        </div>
      </div>

      <div className="mt-8">
        <DepartmentFilter
          departments={departments}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
        />
        
        <EmployeeTable employees={employees} />
      </div>

      {showForm && (
        <EmployeeForm
          departments={departments}
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            // Optional: Show success message
            console.log('Employee added successfully');
          }}
        />
      )}
    </div>
  );
}