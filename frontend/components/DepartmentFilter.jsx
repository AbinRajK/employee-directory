'use client';

export default function DepartmentFilter({ departments, selectedDepartment, onDepartmentChange }) {
  return (
    <div className="mb-6">
      <label htmlFor="department-filter" className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Department
      </label>
      <select
        id="department-filter"
        value={selectedDepartment}
        onChange={(e) => onDepartmentChange(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-cyan-400 sm:text-sm"
      >
        <option value="">All Departments</option>
        {departments.map((dept) => (
          <option key={dept.id} value={dept.id}>
            {dept.name}
          </option>
        ))}
      </select>
    </div>
  );
}