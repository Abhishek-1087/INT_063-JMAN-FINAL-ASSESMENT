
  
    

        create or replace transient table JMAN_ASSESSMENT.JMAN.stg_projectdetails
         as
        (

WITH events_original AS (
    SELECT
        CAST(EMPID AS VARCHAR(20)) AS EMPLOYEE_ID,
        CAST(PROJECTNAME AS VARCHAR(100)) AS PROJECT_NAME,
        CAST(MAJORSKILL AS VARCHAR(50)) AS TECHSTACK_USED,
        CAST(STATUS AS VARCHAR(100)) AS STATUS

    FROM JMAN_ASSESSMENT.JMAN.PROJECTDETAILS
)

SELECT * FROM events_original
        );
      
  