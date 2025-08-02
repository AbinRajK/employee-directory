// backend/schema/resolvers.js
import { ObjectId } from 'mongodb';
import { connectDB } from '../database/connection.js';

export const resolvers = {
  Query: {
    getAllEmployees: async () => {
      const db = await connectDB();
      return await db.collection('employees').find({}, {
        projection: { name: 1, position: 1, department: 1, salary: 1 }
      }).toArray();
    },

    getEmployeeDetails: async (_, { id }) => {
      const db = await connectDB();
      try {
        const employee = await db.collection('employees').findOne({ _id: new ObjectId(id) });
        if (!employee) throw new Error('Employee not found');
        return employee;
      } catch (error) {
        throw new Error('Invalid employee ID');
      }
    },

    getEmployeesByDepartment: async (_, { department }) => {
      const db = await connectDB();
      return await db.collection('employees').find({ department }).toArray();
    },

    getDepartments: async () => {
      const db = await connectDB();
      return await db.collection('departments').find({}).toArray();
    }
  },

  Mutation: {
    addEmployee: async (_, { name, position, department, salary }) => {
      const db = await connectDB();

      const departmentExists = await db.collection('departments').findOne({ _id: department });
      if (!departmentExists) {
        throw new Error('Invalid department');
      }

      const newEmployee = { name, position, department, salary };
      const result = await db.collection('employees').insertOne(newEmployee);
      return await db.collection('employees').findOne({ _id: result.insertedId });
    }
  },

  Employee: {
    id: (employee) => employee._id.toString(),
    department: async (employee) => {
      const db = await connectDB();
      const dept = await db.collection('departments').findOne({ _id: employee.department });
      return dept ? dept.name : null;
    }
  },

  Department: {
    id: (department) => department._id
  }
};
