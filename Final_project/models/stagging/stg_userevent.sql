{{ config(
    tags=['staging']
)}}

WITH userevents_original AS (
    SELECT 
        CAST(EVENTNAME AS VARCHAR(100)) AS EVENT_NAME,
        CAST(USEREMAIL AS VARCHAR()) AS USER_EMAIL
    FROM {{ source('Final_project', 'USEREVENTS') }}
)

SELECT * FROM userevents_original
