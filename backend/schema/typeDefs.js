// backend/schema/typeDefs.js
export const typeDefs = `
  type Employee {
    id: ID!
    name: String!
    position: String!
    department: String!   # Will return department name from resolver
    salary: Float!
  }

  type Department {
    id: ID!
    name: String!
    floor: Int!
  }

  type Query {
    getAllEmployees: [Employee!]!
    getEmployeeDetails(id: ID!): Employee
    getEmployeesByDepartment(department: String!): [Employee!]!
    getDepartments: [Department!]!
  }

  type Mutation {
    addEmployee(name: String!, position: String!, department: String!, salary: Float!): Employee!
  }
`;
