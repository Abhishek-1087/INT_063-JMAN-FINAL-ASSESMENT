
WITH registered_user1 AS (
SELECT 
    SKILLS,
    AVG(RATING) AS AVERAGE_RATING
FROM JMAN_ASSESSMENT.JMAN.stg_skillsdetails
GROUP BY SKILLS
)
SELECT * FROM registered_user1