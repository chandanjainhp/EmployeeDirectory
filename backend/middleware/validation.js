// Validation middleware for employee data
export const validateEmployee = (req, res, next) => {
    const { name, department, role, email, phone, age, dateOfJoining, salary } = req.body;
    const errors = [];

    // Required field validation
    if (!name || name.trim() === '') {
        errors.push('Name is required');
    }

    if (!department || department.trim() === '') {
        errors.push('Department is required');
    }

    if (!role || role.trim() === '') {
        errors.push('Role is required');
    }

    if (!email || email.trim() === '') {
        errors.push('Email is required');
    } else {
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push('Invalid email format');
        }
    }

    if (!phone || phone.trim() === '') {
        errors.push('Phone is required');
    } else {
        // Phone format validation (flexible format)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone)) {
            errors.push('Invalid phone format');
        }
    }

    if (!age) {
        errors.push('Age is required');
    } else {
        const ageNum = parseInt(age);
        if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
            errors.push('Age must be between 18 and 100');
        }
    }

    if (!dateOfJoining || dateOfJoining.trim() === '') {
        errors.push('Date of joining is required');
    } else {
        // Date format validation
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(dateOfJoining)) {
            errors.push('Date of joining must be in YYYY-MM-DD format');
        } else {
            const date = new Date(dateOfJoining);
            if (isNaN(date.getTime())) {
                errors.push('Invalid date of joining');
            }
        }
    }

    if (!salary) {
        errors.push('Salary is required');
    } else {
        const salaryNum = parseFloat(salary);
        if (isNaN(salaryNum) || salaryNum < 0) {
            errors.push('Salary must be a positive number');
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors
        });
    }

    next();
};
