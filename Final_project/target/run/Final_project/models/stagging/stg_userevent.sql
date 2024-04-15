
  
    

        create or replace transient table JMAN_ASSESSMENT.JMAN.stg_userevent
         as
        (

WITH userevents_original AS (
    SELECT 
        CAST(EVENTNAME AS VARCHAR(100)) AS EVENT_NAME,
        CAST(USEREMAIL AS VARCHAR()) AS USER_EMAIL
    FROM JMAN_ASSESSMENT.JMAN.USEREVENTS
)

SELECT * FROM userevents_original
        );
      
  