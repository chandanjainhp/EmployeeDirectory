import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// PostgreSQL connection configuration
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'employee_directory',
    user: process.env.DB_USER || 'employee_app',
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Alternative: Use connection string
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
// });

// Test database connection
pool.on('connect', () => {
    console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// Create employees table
const createTable = async () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS employees (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      department VARCHAR(100) NOT NULL,
      role VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      phone VARCHAR(20) NOT NULL,
      age INTEGER NOT NULL,
      date_of_joining DATE NOT NULL,
      salary DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

    try {
        await pool.query(sql);
        console.log('Employees table created/verified');
    } catch (error) {
        console.error('Error creating table:', error);
        throw error;
    }
};

// Initialize database with sample data
const initializeData = async () => {
    try {
        const result = await pool.query('SELECT COUNT(*) as count FROM employees');
        const count = parseInt(result.rows[0].count);

        if (count === 0) {
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

            const insertQuery = `
        INSERT INTO employees (name, department, role, email, phone, age, date_of_joining, salary)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;

            for (const employee of sampleEmployees) {
                await pool.query(insertQuery, [
                    employee.name,
                    employee.department,
                    employee.role,
                    employee.email,
                    employee.phone,
                    employee.age,
                    employee.dateOfJoining,
                    employee.salary
                ]);
            }

            console.log('Database initialized with sample data');
        } else {
            console.log(`Database already contains ${count} employees`);
        }
    } catch (error) {
        console.error('Error initializing data:', error);
        throw error;
    }
};

// Initialize database
const initializeDatabase = async () => {
    try {
        await createTable();
        await initializeData();
    } catch (error) {
        console.error('Database initialization failed:', error);
        process.exit(1);
    }
};

// Run initialization
initializeDatabase();

// Database query helpers
export const query = async (text, params) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query', { text, duration, rows: res.rowCount });
        return res;
    } catch (error) {
        console.error('Query error:', error);
        throw error;
    }
};

export const getClient = async () => {
    const client = await pool.connect();
    const query = client.query.bind(client);
    const release = client.release.bind(client);

    // Set a timeout of 5 seconds, after which we will log this client's last query
    const timeout = setTimeout(() => {
        console.error('A client has been checked out for more than 5 seconds!');
    }, 5000);

    // Monkey patch the query method to keep track of the last query executed
    client.query = (...args) => {
        client.lastQuery = args;
        return query(...args);
    };

    client.release = () => {
        clearTimeout(timeout);
        client.query = query;
        client.release = release;
        return release();
    };

    return client;
};

export default pool;
