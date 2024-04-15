{{ config(
    tags=['mart']
)}}

WITH user_events_certificates AS (
    SELECT 
        ue.EMPLOYEE_ID,
        ue.FIRST_NAME || ' ' || ue.LAST_NAME AS NAME,
        cd.CERTIFICATE_NAME,
        cd.ISSUE_DATE,
        cd.EXPIRE_DATE,
        cd.CERTIFICATE_STATUS
    FROM {{ ref('stg_userinfos') }} ue
    JOIN {{ ref('stg_certificatedetails')}} cd
    ON ue.EMPLOYEE_ID = cd.EMPLOYEE_ID AND CERTIFICATE_STATUS = 'Approved'
)

SELECT * FROM user_events_certificates

