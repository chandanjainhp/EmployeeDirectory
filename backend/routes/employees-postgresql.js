import express from 'express';
import pool, { query } from '../database-postgresql.js';

const router = express.Router();

// Helper function to convert snake_case to camelCase
const toCamelCase = (employee) => {
    if (!employee) return null;
    return {
        id: employee.id,
        name: employee.name,
        department: employee.department,
        role: employee.role,
        email: employee.email,
        phone: employee.phone,
        age: employee.age,
        dateOfJoining: employee.date_of_joining,
        salary: employee.salary,
        createdAt: employee.created_at
    };
};

// GET all employees with optional filtering
router.get('/', async (req, res) => {
    try {
        const { department, search } = req.query;
        let sql = 'SELECT * FROM employees WHERE 1=1';
        const params = [];
        let paramCount = 0;

        if (department) {
            paramCount++;
            sql += ` AND department = $${paramCount}`;
            params.push(department);
        }

        if (search) {
            paramCount++;
            sql += ` AND (name ILIKE $${paramCount} OR email ILIKE $${paramCount} OR role ILIKE $${paramCount})`;
            params.push(`%${search}%`);
        }

        sql += ' ORDER BY created_at DESC';

        const result = await pool.query(sql, params);
        const employees = result.rows.map(toCamelCase);
        res.json({ success: true, data: employees });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET single employee by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM employees WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Employee not found' });
        }

        res.json({ success: true, data: toCamelCase(result.rows[0]) });
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST create new employee
router.post('/', async (req, res) => {
    try {
        const { name, department, role, email, phone, age, dateOfJoining, salary } = req.body;

        // Validation
        if (!name || !department || !role || !email || !phone || !age || !dateOfJoining || !salary) {
            return res.status(400).json({ success: false, error: 'All fields are required' });
        }

        const sql = `
      INSERT INTO employees (name, department, role, email, phone, age, date_of_joining, salary)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

        const result = await pool.query(sql, [
            name,
            department,
            role,
            email,
            phone,
            age,
            dateOfJoining,
            salary
        ]);

        res.status(201).json({ success: true, data: toCamelCase(result.rows[0]) });
    } catch (error) {
        console.error('Error creating employee:', error);
        if (error.code === '23505') { // Unique constraint violation
            res.status(400).json({ success: false, error: 'Email already exists' });
        } else {
            res.status(500).json({ success: false, error: error.message });
        }
    }
});

// PUT update employee
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, department, role, email, phone, age, dateOfJoining, salary } = req.body;

        // Check if employee exists
        const checkResult = await pool.query('SELECT * FROM employees WHERE id = $1', [id]);
        if (checkResult.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Employee not found' });
        }

        const sql = `
      UPDATE employees
      SET name = $1, department = $2, role = $3, email = $4, phone = $5, 
          age = $6, date_of_joining = $7, salary = $8
      WHERE id = $9
      RETURNING *
    `;

        const result = await pool.query(sql, [
            name,
            department,
            role,
            email,
            phone,
            age,
            dateOfJoining,
            salary,
            id
        ]);

        res.json({ success: true, data: toCamelCase(result.rows[0]) });
    } catch (error) {
        console.error('Error updating employee:', error);
        if (error.code === '23505') {
            res.status(400).json({ success: false, error: 'Email already exists' });
        } else {
            res.status(500).json({ success: false, error: error.message });
        }
    }
});

// DELETE employee
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Employee not found' });
        }

        res.json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET statistics
router.get('/stats/summary', async (req, res) => {
    try {
        const departmentStats = await pool.query(`
      SELECT department, COUNT(*) as count
      FROM employees
      GROUP BY department
      ORDER BY count DESC
    `);

        const avgAge = await pool.query('SELECT AVG(age) as avg_age FROM employees');
        const avgSalary = await pool.query('SELECT AVG(salary) as avg_salary FROM employees');
        const totalEmployees = await pool.query('SELECT COUNT(*) as total FROM employees');

        res.json({
            success: true,
            data: {
                departmentDistribution: departmentStats.rows,
                averageAge: parseFloat(avgAge.rows[0].avg_age).toFixed(1),
                averageSalary: parseFloat(avgSalary.rows[0].avg_salary).toFixed(2),
                totalEmployees: parseInt(totalEmployees.rows[0].total)
            }
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
