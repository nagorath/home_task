import React from 'react';
import classNames from 'classnames';
import styles from './DayColumn.module.scss';

// Daily time slots
const DAILY_TIME_SLOTS = ['09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00'];

const TimeSlot = ({
  hour, onClick, isTaken, isUserTimeSlot,
}) => (
  <>
    {(!isTaken) && (
    <div
      className={styles.time_slot}
      onClick={() => onClick()}
    >
      <div className={styles.time_slot_content}>
        {hour}
      </div>
    </div>
    )}
    {(isTaken) && (
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

const DayColumn = ({
  date,
  onTimeslotClick,
  appointments,
  currentUser,
}) => {
  const x = 5;
  return (
    <div className={styles.day_column_container}>
      <div className={styles.date_container}>
        {date.toDateString()}
      </div>
      {
        DAILY_TIME_SLOTS.map((slot, i) => {
          let isSlotTaken = false;
          let isTakenByUser = false;
          let a = 0;
          while (a < appointments.length && !isSlotTaken) {
            const { time, name } = appointments[a];
            if (time === slot) {
              isSlotTaken = true;
              if (name === currentUser) {
                isTakenByUser = true;
              }
            }
            a += 1;
          }
          return (
            <TimeSlot
              hour={slot}
              key={`timeslot_${i}`}
              onClick={() => onTimeslotClick(slot, date.toDateString())}
              isTaken={isSlotTaken}
              isUserTimeSlot={isTakenByUser}
            />
          );
        })
}
    </div>
  );
};

export default DayColumn;
