
  
    

        create or replace transient table JMAN_ASSESSMENT.JMAN.stg_events
         as
        (

WITH events_original AS (
    SELECT
        CAST(NAME AS VARCHAR(50)) AS EVENT_NAME,
        CAST(TOTAL_CAPACITY AS INTEGER) AS TOTAL_CAPACITY,
        CAST(STARTDATE AS VARCHAR(50)) AS START_DATE,
        CAST(ENDDATE AS VARCHAR(50)) AS END_DATE,
        CAST(TRAINEE_NAME AS VARCHAR(100)) AS TRAINEE_NAME,
        CAST(MODE AS VARCHAR(50)) AS MODE,
        CAST(MEETINGLINK AS VARCHAR(200)) AS MEETING_LINK,
        CAST(VENUE AS VARCHAR(200)) AS VENUE
    FROM JMAN_ASSESSMENT.JMAN.EVENTS
)

SELECT * FROM events_original
        );
      
  