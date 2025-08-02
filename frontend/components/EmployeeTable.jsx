'use client';
import Link from 'next/link';

export default function EmployeeTable({ employees }) {
  if (employees.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No employees found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
              Name
            </th>
            <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
              Position
            </th>
            <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
              Department
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {employee.name}
              </td>
              <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {employee.position}
              </td>
              <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                {employee.department}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link
                  href={`/employee/${employee.id}`}
                  className="text-cyan-400 hover:text-cyan-950"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}