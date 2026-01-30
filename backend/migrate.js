#!/usr/bin/env node

/**
 * Migration Script: SQLite to PostgreSQL
 * 
 * This script migrates data from SQLite to PostgreSQL database
 * 
 * Usage:
 *   bun run migrate.js
 *   or
 *   node migrate.js
 */

import { Database } from 'bun:sqlite';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// SQLite connection
const sqliteDb = new Database(join(__dirname, 'employees.db'));

// PostgreSQL connection
const pgPool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'employee_directory',
    user: process.env.DB_USER || 'employee_app',
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

async function migrate() {
    console.log('Starting migration from SQLite to PostgreSQL...\n');

    try {
        // Test PostgreSQL connection
        await pgPool.query('SELECT NOW()');
        console.log('PostgreSQL connection successful');

        // Create table in PostgreSQL
        const createTableSQL = `
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
        await pgPool.query(createTableSQL);
        console.log('PostgreSQL table created/verified');

        // Check if PostgreSQL table already has data
        const countResult = await pgPool.query('SELECT COUNT(*) as count FROM employees');
        const existingCount = parseInt(countResult.rows[0].count);

        if (existingCount > 0) {
            console.log(`PostgreSQL table already contains ${existingCount} employees`);
            console.log('Do you want to:');
            console.log('1. Skip migration (keep existing data)');
            console.log('2. Clear and re-import (WARNING: This will delete existing data)');
            console.log('\nPlease update the script to choose an option.');

            // Uncomment one of the following:
            // return; // Option 1: Skip migration
            // await pgPool.query('TRUNCATE TABLE employees RESTART IDENTITY'); // Option 2: Clear data
        }

        // Fetch all employees from SQLite
        const employees = sqliteDb.query('SELECT * FROM employees').all();
        console.log(`Found ${employees.length} employees in SQLite database`);

        if (employees.length === 0) {
            console.log('No data to migrate');
            return;
        }

        // Insert employees into PostgreSQL
        const insertSQL = `
      INSERT INTO employees (name, department, role, email, phone, age, date_of_joining, salary, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (email) DO NOTHING
    `;

        let successCount = 0;
        let skipCount = 0;

        for (const employee of employees) {
            try {
                const result = await pgPool.query(insertSQL, [
                    employee.name,
                    employee.department,
                    employee.role,
                    employee.email,
                    employee.phone,
                    employee.age,
                    employee.dateOfJoining,
                    employee.salary,
                    employee.createdAt || new Date().toISOString()
                ]);

                if (result.rowCount > 0) {
                    successCount++;
                    console.log(`  Migrated: ${employee.name} (${employee.email})`);
                } else {
                    skipCount++;
                    console.log(`  Skipped (duplicate): ${employee.email}`);
                }
            } catch (error) {
                console.error(`  Failed to migrate ${employee.email}:`, error.message);
            }
        }

        console.log('\nMigration Summary:');
        console.log(`   Total records in SQLite: ${employees.length}`);
        console.log(`   Successfully migrated: ${successCount}`);
        console.log(`   Skipped (duplicates): ${skipCount}`);
        console.log(`   Failed: ${employees.length - successCount - skipCount}`);

        // Verify migration
        const finalCount = await pgPool.query('SELECT COUNT(*) as count FROM employees');
        console.log(`\nPostgreSQL now contains ${finalCount.rows[0].count} employees`);

        console.log('\nMigration completed successfully!');
    } catch (error) {
        console.error('\nMigration failed:', error);
        throw error;
    } finally {
        await pgPool.end();
        sqliteDb.close();
    }
}

// Run migration
migrate().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
