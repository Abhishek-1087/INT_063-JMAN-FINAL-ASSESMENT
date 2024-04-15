
  
    

        create or replace transient table JMAN_ASSESSMENT.JMAN.evevts
         as
        (

WITH user_events_certificates AS (
    SELECT 
        ue.EMPLOYEE_ID,
        ue.FIRST_NAME || ' ' || ue.LAST_NAME AS NAME,
        cd.CERTIFICATE_NAME,
        cd.ISSUE_DATE,
        cd.EXPIRE_DATE,
        cd.CERTIFICATE_STATUS
    FROM JMAN_ASSESSMENT.JMAN.stg_userinfos ue
    JOIN JMAN_ASSESSMENT.JMAN.stg_certificatedetails cd
    ON ue.EMPID = cd.EMPID AND cd.CERTIFICATE_STATUS = "Approved"
)

SELECT * FROM user_events_certificates
        );
      
  