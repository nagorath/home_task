import React from 'react';
import classNames from 'classnames';
import styles from './DayColumn.module.scss';

// Daily time slots
const DAILY_TIME_SLOTS = ['09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'];

const TimeSlot = ({
  hour, onClick, isTaken, isUserTimeSlot,
}) => (
  <>
    {(isTaken === false) && (
    <div
      className={styles.time_slot}
      onClick={() => onClick()}
    >
      <div className={styles.time_slot_content}>
        {hour}
      </div>
    </div>
    )}
    {(isTaken === true) && (
    <div
      className={classNames(styles.time_slot_taken,
        {
          [styles.taken_by_user]: isUserTimeSlot,
        })}
    >
      <div className={styles.time_slot_content}>
        {hour}
      </div>
    </div>
    )}
  </>
);

const DayColumn = ({ date, onTimeslotClick }) => (
  <div className={styles.day_column_container}>
    <div className={styles.date_container}>
      {date.toDateString()}
    </div>
    {
        DAILY_TIME_SLOTS.map((slot, i) => (
          <TimeSlot
            hour={slot}
            key={`timeslot_${i}`}
            onClick={() => onTimeslotClick(slot, date.toDateString())}
            isTaken={false}
            isUserTimeSlot={false}
          />
        ))
    }
  </div>
);

export default DayColumn;
