
  
    

        create or replace transient table JMAN_ASSESSMENT.JMAN.stg_skillsdetails
         as
        (

WITH skillsdetails_original AS (
    SELECT 
        CAST(USERID AS VARCHAR(10)) AS EMPLOYEE_ID,
        CAST(SKILLS AS VARCHAR(100)) AS SKILLS,
        CAST(RATING AS INTEGER) AS RATING
    FROM JMAN_ASSESSMENT.JMAN.SKILLSDETAILS
)

SELECT * FROM skillsdetails_original
        );
      
  