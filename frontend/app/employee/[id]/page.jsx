'use client';

import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { GET_EMPLOYEE_DETAILS } from '../../../graphql/queries';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { use } from 'react';


export default function EmployeeDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise); // ✅ Unwrap the Promise with `use()`
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_EMPLOYEE_DETAILS, {
    variables: { id: params.id },
    errorPolicy: 'all'
  });

  if (loading) return <LoadingSpinner />;

  if (error || !data?.getEmployeeDetails) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Employee Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error ? error.message : 'The requested employee could not be found.'}
          </p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Employees
          </button>
        </div>
      </div>
    );
  }

  const employee = data.getEmployeeDetails;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <button
          onClick={() => router.push('/')}
          className="inline-flex items-center text-sm text-cyan-500 hover:text-cyan-950"
        >
          ← Back to Employees
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
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
