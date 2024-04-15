
  
    

        create or replace transient table JMAN_ASSESSMENT.JMAN.count_approved_skills
         as
        (
WITH count_skills AS (
    SELECT 
    c.EMPLOYEE_ID,
    COUNT(DISTINCT s.SKILLS) AS NUM_SKILLS,
    COUNT(DISTINCT c.CERTIFICATE_NAME) AS NUM_CERTIFICATES,
    COUNT(DISTINCT CASE WHEN c.CERTIFICATE_STATUS = 'Approved' THEN c.CERTIFICATE_NAME END) AS NUM_APPROVED_CERTIFICATES,
    COUNT(DISTINCT CASE WHEN c.CERTIFICATE_STATUS = 'Rejected' THEN c.CERTIFICATE_NAME END) AS NUM_REJECTED_CERTIFICATES
FROM JMAN_ASSESSMENT.JMAN.stg_certificatedetails c
LEFT JOIN JMAN_ASSESSMENT.JMAN.stg_skillsdetails s ON c.EMPLOYEE_ID = s.EMPLOYEE_ID
GROUP BY c.EMPLOYEE_ID
)
SELECT * FROM count_skills
        );
      
  