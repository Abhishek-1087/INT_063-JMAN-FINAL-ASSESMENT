
  
    

        create or replace transient table JMAN_ASSESSMENT.JMAN.employee_skills
         as
        (
WITH employee_skill AS (
SELECT 
    ui.EMPLOYEE_ID,
    CONCAT(ui.FIRST_NAME, ' ', ui.LAST_NAME) AS NAME,
    sd.SKILLS
FROM JMAN_ASSESSMENT.JMAN.stg_userinfos  ui
JOIN JMAN_ASSESSMENT.JMAN.stg_skillsdetails  sd ON ui.EMPLOYEE_ID = sd.EMPLOYEE_ID
WHERE sd.RATING > 3
GROUP BY ui.EMPLOYEE_ID, NAME, sd.SKILLS
)
SELECT * FROM employee_skills
        );
      
  