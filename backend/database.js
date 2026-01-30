import { Database } from 'bun:sqlite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'employees.db'));


// Create employees table
const createTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      department TEXT NOT NULL,
      role TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL,
      age INTEGER NOT NULL,
      dateOfJoining TEXT NOT NULL,
      salary REAL NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.run(sql);
};

// Initialize database with sample data
const initializeData = () => {
  const count = db.query('SELECT COUNT(*) as count FROM employees').get();

  if (count.count === 0) {
    const sampleEmployees = [
      {
        name: 'John Smith',
        department: 'Engineering',
        role: 'Senior Software Engineer',
        email: 'john.smith@company.com',
        phone: '+1-555-0101',
        age: 32,
        dateOfJoining: '2020-03-15',
        salary: 95000
      },
      {
        name: 'Sarah Johnson',
        department: 'Engineering',
        role: 'Frontend Developer',
        email: 'sarah.johnson@company.com',
        phone: '+1-555-0102',
        age: 28,
        dateOfJoining: '2021-06-01',
        salary: 82000
      },
      {
        name: 'Michael Chen',
        department: 'Engineering',
        role: 'DevOps Engineer',
        email: 'michael.chen@company.com',
        phone: '+1-555-0103',
        age: 35,
        dateOfJoining: '2019-01-10',
        salary: 98000
      },
      {
        name: 'Emily Davis',
        department: 'Marketing',
        role: 'Marketing Manager',
        email: 'emily.davis@company.com',
        phone: '+1-555-0104',
        age: 30,
        dateOfJoining: '2020-08-20',
        salary: 75000
      },
      {
        name: 'David Wilson',
        department: 'Marketing',
        role: 'Content Strategist',
        email: 'david.wilson@company.com',
        phone: '+1-555-0105',
        age: 27,
        dateOfJoining: '2022-02-14',
        salary: 65000
      },
      {
        name: 'Lisa Anderson',
        department: 'HR',
        role: 'HR Director',
        email: 'lisa.anderson@company.com',
        phone: '+1-555-0106',
        age: 42,
        dateOfJoining: '2018-05-01',
        salary: 88000
      },
      {
        name: 'Robert Taylor',
        department: 'Sales',
        role: 'Sales Manager',
        email: 'robert.taylor@company.com',
        phone: '+1-555-0107',
        age: 38,
        dateOfJoining: '2019-09-15',
        salary: 92000
      },
      {
        name: 'Jennifer Martinez',
        department: 'Sales',
        role: 'Account Executive',
        email: 'jennifer.martinez@company.com',
        phone: '+1-555-0108',
        age: 29,
        dateOfJoining: '2021-11-01',
        salary: 70000
      },
      {
        name: 'James Brown',
        department: 'Finance',
        role: 'Financial Analyst',
        email: 'james.brown@company.com',
        phone: '+1-555-0109',
        age: 31,
        dateOfJoining: '2020-04-10',
        salary: 78000
      },
      {
        name: 'Patricia Garcia',
        department: 'Finance',
        role: 'Accountant',
        email: 'patricia.garcia@company.com',
        phone: '+1-555-0110',
        age: 26,
        dateOfJoining: '2022-07-01',
        salary: 62000
      },
      {
        name: 'Christopher Lee',
        department: 'Engineering',
        role: 'Backend Developer',
        email: 'christopher.lee@company.com',
        phone: '+1-555-0111',
        age: 33,
        dateOfJoining: '2020-01-20',
        salary: 90000
      },
      {
        name: 'Amanda White',
        department: 'HR',
        role: 'Recruiter',
        email: 'amanda.white@company.com',
        phone: '+1-555-0112',
        age: 25,
        dateOfJoining: '2023-01-15',
        salary: 58000
      }
    ];

    const insert = db.query(`
      INSERT INTO employees (name, department, role, email, phone, age, dateOfJoining, salary)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const employee of sampleEmployees) {
      insert.run(
        employee.name,
        employee.department,
        employee.role,
        employee.email,
        employee.phone,
        employee.age,
        employee.dateOfJoining,
        employee.salary
      );
    }

    console.log('Database initialized with sample data');
  }
};

// Initialize database
createTable();
initializeData();

export default db;
