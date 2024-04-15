{{ config(
    tags=['mart']
)}}
WITH employee_skill AS (
SELECT 
    ui.EMPLOYEE_ID,
    CONCAT(ui.FIRST_NAME, ' ', ui.LAST_NAME) AS NAME,
    sd.SKILLS
FROM {{ ref('stg_userinfos') }}  ui
JOIN {{ ref('stg_skillsdetails') }}  sd ON ui.EMPLOYEE_ID = sd.EMPLOYEE_ID
WHERE sd.RATING < 3
GROUP BY ui.EMPLOYEE_ID, NAME, sd.SKILLS
)
SELECT * FROM employee_skills