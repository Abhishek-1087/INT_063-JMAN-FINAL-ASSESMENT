{{ config(
    tags=['mart']
)}}
WITH registered_user AS (
SELECT 
    uio.EMPLOYEE_ID,
    uio.FIRST_NAME || ' ' || uio.LAST_NAME AS NAME,
    uio.EMAIL,
    ueo.EVENT_NAME
FROM {{ ref('stg_userevent') }}  ueo
JOIN {{ ref('stg_events') }}  eo ON ueo.EVENT_NAME = eo.EVENT_NAME
JOIN {{ ref('stg_userinfos') }} uio ON ueo.USER_EMAIL = uio.EMAIL
ORDER BY NAME
)
SELECT * FROM registered_user