import React from 'react';
import styles from './DayColumn.module.scss';

// Daily time slots
const DAILY_TIME_SLOTS = ['09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'];

const TimeSlot = ({ hour }) => (
  <div className={styles.time_slot}>
      <div className={styles.time_slot_content}>
    {hour}
      </div>
  </div>
);

const DayColumn = ({ date }) => (
  <div className={styles.day_column_container}>
    <div className={styles.date_container}>
      {date.toDateString()}
    </div>
    {
        DAILY_TIME_SLOTS.map((slot,i) => (
          <TimeSlot hour={slot} isTaken={false} key={`timeslot_${i}`}/>
        ))
    }
  </div>
);

export default DayColumn;
