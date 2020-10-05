import React from 'react';
// ----Styles----//
import { Button } from 'semantic-ui-react';
import styles from './Calendar.module.scss';
// ----Components--- //
import DayColumn from './DayColumn';
// Days Column
const DAYS = [1, 2, 3, 4, 5, 6, 7];

const currentDate = new Date();

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1,
      currentDate: new Date(),
    };
  }

  render() {
    const { currentDate } = this.state;
    return (
      <div className={styles.calendar_container}>
        <div className={styles.weeks_nav_btn_container}>
          <Button className={styles.week_nav_btn}> Previous Week </Button>
          <Button className={styles.week_nav_btn}> Next Week </Button>
        </div>
        <div className={styles.days_column_container}>
          {DAYS.map((day, i) => {
            const date = currentDate.setDate(currentDate.getDate() + i);
            return (
              <DayColumn date={date} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Calendar;
