import React from 'react';
// ----Styles ---- //
import styles from './App.module.scss';
// ----Components --- //
import Logo from './static/Logo.png';
import profilePic from './static/Profile pic.jpg';
import Calendar from './Componenets/Calendar/Calendar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'James',
      appointments: [],
    };
  }

  componentDidUpdate() {
    const { appointments } = this.state;
    console.log(appointments);
  }

  addNewAppointment(appointment) {
    const { appointments } = this.state;
    const newAppointmentsArray = [...appointments, appointment];
    this.setState({ appointments: newAppointmentsArray });
  }

  render() {
    const { currentUser, appointments } = this.state;
    return (
      <div className={styles.site_container}>
        <div className={styles.nav_bar_container}>
          <div className={styles.logo_container}>
            <img src={Logo} alt="" />
          </div>
          <div className={styles.user_profile_container}>
            <img src={profilePic} alt="" className={styles.profile_pic} />
            <div className={styles.profile_name}>
              {currentUser}
            </div>
          </div>
        </div>
        <div className={styles.content_wrapper}>
          <h1>Hair Saloon Schedule</h1>
          <div className={styles.calendar_container}>
            <Calendar
              currentUser={currentUser}
              addNewAppointment={(e) => this.addNewAppointment(e)}
              appointments={appointments}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
