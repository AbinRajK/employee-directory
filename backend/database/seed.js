import { connectDB, closeDB } from './connection.js';

const seedData = async () => {
  try {
    const db = await connectDB();
    
    // Clear existing data
    await db.collection('employees').deleteMany({});
    await db.collection('departments').deleteMany({});
    
    // Seed departments
    const departments = [
      { _id: 'engineering', name: 'Engineering', floor: 3 },
      { _id: 'marketing', name: 'Marketing', floor: 2 },
      { _id: 'hr', name: 'Human Resources', floor: 1 }
    ];
    
    await db.collection('departments').insertMany(departments);
    
    // Seed employees
    const employees = [
      { name: 'John Doe', position: 'Senior Developer', department: 'engineering', salary: 85000 },
      { name: 'Jane Smith', position: 'Product Manager', department: 'engineering', salary: 95000 },
      { name: 'Mike Johnson', position: 'Marketing Specialist', department: 'marketing', salary: 55000 },
      { name: 'Sarah Wilson', position: 'Marketing Manager', department: 'marketing', salary: 75000 },
      { name: 'Emily Brown', position: 'HR Coordinator', department: 'hr', salary: 50000 },
      { name: 'David Lee', position: 'Full Stack Developer', department: 'engineering', salary: 80000 }
    ];
    
    await db.collection('employees').insertMany(employees);
    
    console.log('Database seeded successfully');
    await closeDB();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();