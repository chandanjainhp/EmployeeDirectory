/**
 * Utility functions for transforming employee data into statistics
 */


export const calculateDepartmentDistribution = (employees) => {
    if (!employees || employees.length === 0) return [];

    const departmentCounts = employees.reduce((acc, emp) => {
        acc[emp.department] = (acc[emp.department] || 0) + 1;
        return acc;
    }, {});

    const total = employees.length;

    return Object.entries(departmentCounts)
        .map(([department, count]) => ({
            department,
            count,
            percentage: ((count / total) * 100).toFixed(1)
        }))
        .sort((a, b) => b.count - a.count);
};

/**
 * Calculate age distribution grouped by ranges
 * @param {Array} employees - Array of employee objects
 * @returns {Array} Array of {ageRange, count, percentage}
 */
export const calculateAgeDistribution = (employees) => {
    if (!employees || employees.length === 0) return [];

    const ageRanges = {
        '18-25': 0,
        '26-35': 0,
        '36-45': 0,
        '46-55': 0,
        '56+': 0
    };

    employees.forEach(emp => {
        const age = emp.age;
        if (age >= 18 && age <= 25) ageRanges['18-25']++;
        else if (age >= 26 && age <= 35) ageRanges['26-35']++;
        else if (age >= 36 && age <= 45) ageRanges['36-45']++;
        else if (age >= 46 && age <= 55) ageRanges['46-55']++;
        else if (age >= 56) ageRanges['56+']++;
    });

    const total = employees.length;

    return Object.entries(ageRanges)
        .map(([ageRange, count]) => ({
            ageRange,
            count,
            percentage: ((count / total) * 100).toFixed(1)
        }))
        .filter(item => item.count > 0);
};

/**
 * Calculate average tenure in years
 * @param {Array} employees - Array of employee objects
 * @returns {number} Average tenure in years (rounded to 1 decimal)
 */
export const calculateAverageTenure = (employees) => {
    if (!employees || employees.length === 0) return 0;

    const totalTenure = employees.reduce((sum, emp) => {
        const joinDate = new Date(emp.dateOfJoining);
        const today = new Date();
        const years = (today - joinDate) / (1000 * 60 * 60 * 24 * 365.25);
        return sum + years;
    }, 0);

    return (totalTenure / employees.length).toFixed(1);
};

/**
 * Calculate average age
 * @param {Array} employees - Array of employee objects
 * @returns {number} Average age (rounded to nearest integer)
 */
export const calculateAverageAge = (employees) => {
    if (!employees || employees.length === 0) return 0;

    const totalAge = employees.reduce((sum, emp) => sum + emp.age, 0);
    return Math.round(totalAge / employees.length);
};

/**
 * Calculate tenure distribution grouped by ranges
 * @param {Array} employees - Array of employee objects
 * @returns {Array} Array of {tenureRange, count, percentage}
 */
export const calculateTenureDistribution = (employees) => {
    if (!employees || employees.length === 0) return [];

    const tenureRanges = {
        '0-1 years': 0,
        '1-3 years': 0,
        '3-5 years': 0,
        '5-10 years': 0,
        '10+ years': 0
    };

    employees.forEach(emp => {
        const joinDate = new Date(emp.dateOfJoining);
        const today = new Date();
        const years = (today - joinDate) / (1000 * 60 * 60 * 24 * 365.25);

        if (years < 1) tenureRanges['0-1 years']++;
        else if (years < 3) tenureRanges['1-3 years']++;
        else if (years < 5) tenureRanges['3-5 years']++;
        else if (years < 10) tenureRanges['5-10 years']++;
        else tenureRanges['10+ years']++;
    });

    const total = employees.length;

    return Object.entries(tenureRanges)
        .map(([tenureRange, count]) => ({
            tenureRange,
            count,
            percentage: ((count / total) * 100).toFixed(1)
        }))
        .filter(item => item.count > 0);
};

/**
 * Get top N departments by employee count
 * @param {Array} departmentDistribution - Department distribution array
 * @param {number} limit - Number of top departments to return
 * @returns {Array} Top N departments
 */
export const getTopDepartments = (departmentDistribution, limit = 3) => {
    if (!departmentDistribution || departmentDistribution.length === 0) return [];
    return departmentDistribution.slice(0, limit);
};

/**
 * Calculate hiring trend by year
 * @param {Array} employees - Array of employee objects
 * @returns {Array} Array of {year, count}
 */
export const calculateGrowthTrend = (employees) => {
    if (!employees || employees.length === 0) return [];

    const yearCounts = employees.reduce((acc, emp) => {
        const year = new Date(emp.dateOfJoining).getFullYear();
        acc[year] = (acc[year] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(yearCounts)
        .map(([year, count]) => ({ year: parseInt(year), count }))
        .sort((a, b) => a.year - b.year);
};

/**
 * Get newest employee (most recent hire)
 * @param {Array} employees - Array of employee objects
 * @returns {Object|null} Employee object or null
 */
export const getNewestEmployee = (employees) => {
    if (!employees || employees.length === 0) return null;

    return employees.reduce((newest, emp) => {
        const empDate = new Date(emp.dateOfJoining);
        const newestDate = new Date(newest.dateOfJoining);
        return empDate > newestDate ? emp : newest;
    });
};

/**
 * Get employee with longest tenure
 * @param {Array} employees - Array of employee objects
 * @returns {Object|null} Employee object or null
 */
export const getLongestTenureEmployee = (employees) => {
    if (!employees || employees.length === 0) return null;

    return employees.reduce((longest, emp) => {
        const empDate = new Date(emp.dateOfJoining);
        const longestDate = new Date(longest.dateOfJoining);
        return empDate < longestDate ? emp : longest;
    });
};

/**
 * Filter employees by department
 * @param {Array} employees - Array of employee objects
 * @param {string} department - Department name
 * @returns {Array} Filtered employees
 */
export const getEmployeesByDepartment = (employees, department) => {
    if (!employees || !department) return [];
    return employees.filter(emp => emp.department === department);
};
