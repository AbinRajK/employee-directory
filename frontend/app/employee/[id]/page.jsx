'use client';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { GET_EMPLOYEE_DETAILS } from '../../../graphql/queries';

export default function EmployeeDetailModal({ employeeId, onClose }) {
  const { data, loading, error } = useQuery(GET_EMPLOYEE_DETAILS, {
    variables: { id: employeeId },
    skip: !employeeId,
    errorPolicy: 'all'
  });

  if (!employeeId) return null;

  // Loading state
  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-30 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="relative mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
          <div className="text-right p-4">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <Image src="/delete.svg" alt="Close" width={25} height={25} />
            </button>
          </div> 
        </div>
      </div>
    );
  }

  // Error state
  if (error || !data?.getEmployeeDetails) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-30 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="relative mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
          <div className="text-right p-4">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <Image src="/delete.svg" alt="Close" width={25} height={25} />
            </button>
          </div>
          <div className="px-4 py-5 sm:px-6 text-center">
            <div className="text-cyan-950">
              <h2 className="text-lg font-semibold">Employee Not Found</h2>
              <p className="mt-2 text-sm text-gray-600">
                {error ? error.message : 'The requested employee could not be found.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const employee = data.getEmployeeDetails;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-30 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
        <div className="text-right p-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Image src="/delete.svg" alt="Close" width={25} height={25} />
          </button>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Employee details and information</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{employee.name}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Position</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{employee.position}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Department</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">{employee.department}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Salary</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                ${employee.salary.toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
