{{ config(
    tags=['staging']
)}}

WITH skillsdetails_original AS (
    SELECT 
        CAST(USERID AS VARCHAR(10)) AS EMPLOYEE_ID,
        CAST(SKILLS AS VARCHAR(100)) AS SKILLS,
        CAST(RATING AS INTEGER) AS RATING
    FROM {{ source('Final_project', 'SKILLSDETAILS') }}
)

SELECT * FROM skillsdetails_original