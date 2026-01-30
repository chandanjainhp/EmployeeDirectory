import pool from './database-postgresql.js';

console.log('Updating employee joining dates to realistic 2024-2025 dates...\n');

async function updateJoiningDates() {
    try {
        // Update with realistic joining dates (2022-2025)
        const updates = [
            { name: 'Rajesh Kumar', date: '2022-03-15' },
            { name: 'Priya Sharma', date: '2023-06-01' },
            { name: 'Amit Patel', date: '2021-01-10' },
            { name: 'Sneha Reddy', date: '2022-08-20' },
            { name: 'Vikram Singh', date: '2024-02-14' },
            { name: 'Anjali Gupta', date: '2020-05-01' },
            { name: 'Arjun Verma', date: '2021-09-15' },
            { name: 'Kavya Iyer', date: '2023-11-01' },
            { name: 'Rahul Mehta', date: '2022-04-10' },
            { name: 'Pooja Nair', date: '2024-07-01' },
            { name: 'Karthik Krishnan', date: '2022-01-20' },
            { name: 'Neha Desai', date: '2025-01-15' },
            { name: 'Sanjay Chopra', date: '2019-03-10' },
            { name: 'Divya Menon', date: '2024-09-01' },
            { name: 'Aditya Joshi', date: '2021-11-20' }
        ];

        for (const update of updates) {
            await pool.query(
                'UPDATE employees SET date_of_joining = $1 WHERE name = $2',
                [update.date, update.name]
            );
            console.log(`  Updated: ${update.name} -> ${update.date}`);
        }

        console.log('\nJoining dates updated successfully!');

        // Show updated data
        const result = await pool.query(`
      SELECT name, date_of_joining, 
             EXTRACT(YEAR FROM AGE(CURRENT_DATE, date_of_joining)) as years,
             EXTRACT(MONTH FROM AGE(CURRENT_DATE, date_of_joining)) as months
      FROM employees 
      ORDER BY date_of_joining DESC
      LIMIT 10
    `);

        console.log('\nRecent Joiners:');
        result.rows.forEach(row => {
            const tenure = row.years > 0
                ? `${Math.floor(row.years)} years ${Math.floor(row.months)} months`
                : `${Math.floor(row.months)} months`;
            console.log(`  ${row.name.padEnd(20)} | Joined: ${row.date_of_joining} | Tenure: ${tenure}`);
        });

    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    } finally {
        await pool.end();
    }
}

updateJoiningDates();
