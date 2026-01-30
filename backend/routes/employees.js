import express from 'express';
import db from '../database.js';
import { validateEmployee } from '../middleware/validation.js';

const router = express.Router();

// Get all employees
router.get('/', (req, res) => {
    try {
        const employees = db.query('SELECT * FROM employees ORDER BY id DESC').all();
        res.json({ success: true, data: employees });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get single employee
router.get('/:id', (req, res) => {
    try {
        const employee = db.query('SELECT * FROM employees WHERE id = ?').get(req.params.id);
        if (!employee) {
            return res.status(404).json({ success: false, error: 'Employee not found' });
        }
        res.json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create new employee
router.post('/', validateEmployee, (req, res) => {
    try {
        const { name, department, role, email, phone, age, dateOfJoining, salary } = req.body;

        const insert = db.query(`
      INSERT INTO employees (name, department, role, email, phone, age, dateOfJoining, salary)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

        const result = insert.run(name, department, role, email, phone, age, dateOfJoining, salary);

        const newEmployee = db.query('SELECT * FROM employees WHERE id = ?').get(result.lastInsertRowid);

        res.status(201).json({ success: true, data: newEmployee });
    } catch (error) {
        if (error.message.includes('UNIQUE constraint failed')) {
            res.status(400).json({ success: false, errors: ['Email already exists'] });
        } else {
            res.status(500).json({ success: false, error: error.message });
        }
    }
});

// Update employee
router.put('/:id', validateEmployee, (req, res) => {
    try {
        const { name, department, role, email, phone, age, dateOfJoining, salary } = req.body;

        const update = db.query(`
      UPDATE employees 
      SET name = ?, department = ?, role = ?, email = ?, phone = ?, age = ?, dateOfJoining = ?, salary = ?
      WHERE id = ?
    `);

        const result = update.run(name, department, role, email, phone, age, dateOfJoining, salary, req.params.id);

        if (result.changes === 0) {
            return res.status(404).json({ success: false, error: 'Employee not found' });
        }

        const updatedEmployee = db.query('SELECT * FROM employees WHERE id = ?').get(req.params.id);

        res.json({ success: true, data: updatedEmployee });
    } catch (error) {
        if (error.message.includes('UNIQUE constraint failed')) {
            res.status(400).json({ success: false, errors: ['Email already exists'] });
        } else {
            res.status(500).json({ success: false, error: error.message });
        }
    }
});

// Delete employee
router.delete('/:id', (req, res) => {
    try {
        const deleteStmt = db.query('DELETE FROM employees WHERE id = ?');
        const result = deleteStmt.run(req.params.id);

        if (result.changes === 0) {
            return res.status(404).json({ success: false, error: 'Employee not found' });
        }

        res.json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get statistics
router.get('/api/stats', (req, res) => {
    try {
        // Department distribution
        const departmentStats = db.query(`
      SELECT department, COUNT(*) as count
      FROM employees
      GROUP BY department
      ORDER BY count DESC
    `).all();

        // Age distribution
        const ageStats = db.query(`
      SELECT 
        CASE 
          WHEN age < 25 THEN '18-24'
          WHEN age < 30 THEN '25-29'
          WHEN age < 35 THEN '30-34'
          WHEN age < 40 THEN '35-39'
          WHEN age < 50 THEN '40-49'
          ELSE '50+'
        END as ageRange,
        COUNT(*) as count
      FROM employees
      GROUP BY ageRange
      ORDER BY ageRange
    `).all();

        // Calculate average tenure
        const employees = db.query('SELECT dateOfJoining FROM employees').all();
        const today = new Date();
        let totalTenure = 0;

        employees.forEach(emp => {
            const joinDate = new Date(emp.dateOfJoining);
            const tenure = (today - joinDate) / (1000 * 60 * 60 * 24 * 365); // years
            totalTenure += tenure;
        });

        const averageTenure = employees.length > 0 ? totalTenure / employees.length : 0;

        // Total count
        const totalCount = db.query('SELECT COUNT(*) as count FROM employees').get();

        res.json({
            success: true,
            data: {
                totalEmployees: totalCount.count,
                departmentDistribution: departmentStats,
                ageDistribution: ageStats,
                averageTenure: averageTenure.toFixed(2)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
