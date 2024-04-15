
  
    

        create or replace transient table JMAN_ASSESSMENT.JMAN.merged_data
         as
        (

WITH merged_data AS (
SELECT COALESCE(cd. EMPLOYEE_ID, ui. EMPLOYEE_ID, pd. EMPLOYEE_ID, sd.EMPLOYEE_ID) AS EMPLOYEE_ID,
       cd.CERTIFICATE_NAME,
       cd.ISSUING_ORGANIZATION,
       cd.ISSUE_DATE,
       cd.EXPIRE_DATE,
       cd.CREDENTIAL_ID,
       cd.CERTIFICATE_STATUS,
       ui.FIRST_NAME,
       ui.LAST_NAME,
       ui.EMAIL,
       ui.USERTYPE,
       ui.DATE_OF_BIRTH,
       ui.GENDER,
       ui.PHONENO,
       ui.ADDRESS,
       ed.EVENT_NAME,
       ed.TOTAL_CAPACITY,
       ed.START_DATE,
       ed.END_DATE,
       ed.TRAINEE_NAME,
       ed.MODE,
       ed.MEETING_LINK,
       ed.VENUE,
       sd.SKILLS,
       sd.RATING,
       ue.USER_EMAIL,
       pd.PROJECT_NAME,
       pd.TECHSTACK_USED,
       pd.STATUS
FROM JMAN_ASSESSMENT.JMAN.stg_certificatedetails cd
LEFT JOIN JMAN_ASSESSMENT.JMAN.stg_userinfos ui ON cd.EMPLOYEE_ID = ui.EMPLOYEE_ID
LEFT JOIN JMAN_ASSESSMENT.JMAN.stg_skillsdetails sd ON ui.EMPLOYEE_ID = sd.EMPLOYEE_ID
LEFT JOIN  JMAN_ASSESSMENT.JMAN.stg_userevent ue ON ui.EMAIL = ue.USER_EMAIL
LEFT JOIN JMAN_ASSESSMENT.JMAN.stg_projectdetails pd ON ui.EMPLOYEE_ID = pd.EMPLOYEE_ID
LEFT JOIN JMAN_ASSESSMENT.JMAN.stg_events ed ON ue.EVENT_NAME = ed.EVENT_NAME OR pd.PROJECT_NAME = ed.EVENT_NAME
)
SELECT * FROM merged_data
        );
      
  