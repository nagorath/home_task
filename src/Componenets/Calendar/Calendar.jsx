import React from 'react';
// ----Styles----//
import { Button, Input } from 'semantic-ui-react';
import styles from './Calendar.module.scss';
// ----Components--- //
import DayColumn from './DayColumn';
import AppointmentModal from './AppointmentModal';

// Consts & Dicts //
const DAYS = [1, 2, 3, 4, 5, 6, 7];

// Help Functions //
const dateToInputValue = (date) => {
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  month = (month.length > 1) ? month : `0${month}`;
  let day = date.getDate().toString();
  day = (day.length > 1) ? day : `0${day}`;
  return (
    `${year}-${month}-${day}`
  );
};

const inputValueToDate = (date) => {
  const formattedDate = new Date();
  const data = date.split('-');
  const year = data[0];
  const month = data[1];
  const day = data[2];
  formattedDate.setFullYear(year);
  formattedDate.setMonth(month - 1);
  formattedDate.setDate(day);
  return formattedDate;
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      isModalOpen: false,
      clickedTimeSlotTime: '',
      clickedTimeSlotDate: '',

    };
  }

  changeWeek(action) {
    const { currentDate } = this.state;
    const dateDifference = (action === 'next') ? 7 : -7;
    const currentDateClone = new Date(currentDate.getTime());
    const newDate = new Date(currentDateClone.setDate(currentDateClone.getDate() + dateDifference));
    this.setState({ currentDate: newDate });
  }

  setCurrentDate(inputValue) {
    this.setState({ currentDate: inputValueToDate(inputValue) });
  }

  toggleModal(clickedTimeSlotTime, clickedTimeSlotDate) {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen, clickedTimeSlotTime, clickedTimeSlotDate });
  }

  render() {
    const {
      currentDate, isModalOpen, clickedTimeSlotTime, clickedTimeSlotDate,
    } = this.state;
    const { addNewAppointment, currentUser, appointments } = this.props;
    return (
      <div className={styles.calendar_container}>
        <div className={styles.weeks_nav_btn_container}>
          <Input
            type="date"
            className={styles.week_nav_btn}
            onChange={(e) => this.setCurrentDate(e.currentTarget.value)}
            value={dateToInputValue(currentDate)}
          />
          <Button
            className={styles.week_nav_btn}
            onClick={() => this.changeWeek('back')}
          >
            Previous Week
          </Button>
          <Button
            className={styles.week_nav_btn}
            onClick={() => this.changeWeek('next')}
          >
            Next Week
          </Button>
        </div>
        <div className={styles.days_column_container}>
          {DAYS.map((day, i) => {
            const currentDateClone = new Date(currentDate.getTime());
            const newDate = new Date(currentDateClone.setDate(currentDateClone.getDate() + i));
            const filteredAppointments = appointments.filter((app) => app.date === newDate.toDateString());
            return (
              <DayColumn
                currentUser={currentUser}
                date={newDate}
                key={`dayColumn_${i}`}
                onTimeslotClick={(a, b) => this.toggleModal(a, b)}
                appointments={filteredAppointments}
              />
            );
          })}
        </div>
        <div style={{ marginTop: '10px' }}>
          <div style={{ marginBottom: '10px', color: '#7BE550', fontSize: '18px' }}>*My Appointments</div>
          <div style={{ color: '#E55050', fontSize: '18px' }}>*Taken Appointments</div>
        </div>
        <AppointmentModal
          isOpen={isModalOpen}
          onCancelClick={() => this.toggleModal()}
          onApproveClick={(e) => addNewAppointment(e)}
          time={clickedTimeSlotTime}
          currentUser={currentUser}
          date={clickedTimeSlotDate}
        />
      </div>
    );
  }
}

export default Calendar;
