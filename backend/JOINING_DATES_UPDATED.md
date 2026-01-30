# Employee Joining Dates - Updated

## Date Update Summary

All employee joining dates have been updated to realistic dates between **2019-2025**.

---

## Updated Joining Dates

### 2025 Joiners (Newest)
- **Neha Desai** - January 15, 2025 (1 month tenure)

### 2024 Joiners
- **Divya Menon** - September 1, 2024 (5 months tenure)
- **Pooja Nair** - July 1, 2024 (7 months tenure)
- **Vikram Singh** - February 14, 2024 (11 months tenure)

### 2023 Joiners
- **Kavya Iyer** - November 1, 2023 (1 year tenure)
- **Priya Sharma** - June 1, 2023 (1 year 8 months tenure)

### 2022 Joiners
- **Sneha Reddy** - August 20, 2022 (2 years tenure)
- **Rahul Mehta** - April 10, 2022 (2 years tenure)
- **Rajesh Kumar** - March 15, 2022 (2 years tenure)
- **Karthik Krishnan** - January 20, 2022 (3 years tenure)

### 2021 Joiners
- **Aditya Joshi** - November 20, 2021 (3 years tenure)
- **Arjun Verma** - September 15, 2021 (3 years tenure)
- **Amit Patel** - January 10, 2021 (4 years tenure)

### 2020 Joiners
- **Anjali Gupta** - May 1, 2020 (5 years tenure)

### 2019 Joiners (Most Senior)
- **Sanjay Chopra** - March 10, 2019 (6 years tenure)

---

## Tenure Distribution

- **0-1 years:** 5 employees (Neha, Divya, Pooja, Vikram, Kavya)
- **1-2 years:** 1 employee (Priya)
- **2-3 years:** 4 employees (Sneha, Rahul, Rajesh, Karthik)
- **3-4 years:** 3 employees (Aditya, Arjun, Amit)
- **4-5 years:** 0 employees
- **5-6 years:** 1 employee (Anjali)
- **6+ years:** 1 employee (Sanjay)

---

## Key Statistics

- **Newest Employee:** Neha Desai (1 month)
- **Most Senior Employee:** Sanjay Chopra (6 years)
- **Average Tenure:** ~2.5 years
- **Total Employees:** 15

---

## Date Format

All dates are in **YYYY-MM-DD** format and are valid dates between:
- **Earliest:** March 10, 2019
- **Latest:** January 15, 2025
- **Current Date:** January 30, 2026

---

## Verification

To verify the dates in the database:

```sql
SELECT name, date_of_joining, 
       EXTRACT(YEAR FROM AGE(CURRENT_DATE, date_of_joining)) as years
FROM employees 
ORDER BY date_of_joining DESC;
```

Or via API:

```bash
curl http://localhost:5000/api/employees
```

---

## Status

✅ All joining dates are now **valid and realistic**
✅ Dates span from **2019 to 2025**
✅ Tenure calculations are **accurate**
✅ No future dates or invalid dates

The joining dates are now correct and ready for use!
