{{ config(
    tags=['mart']
)}}
WITH registered_user1 AS (
SELECT 
    SKILLS,
    AVG(RATING) AS AVERAGE_RATING
FROM {{ ref('stg_skillsdetails') }}
GROUP BY SKILLS
)
SELECT * FROM registered_user1