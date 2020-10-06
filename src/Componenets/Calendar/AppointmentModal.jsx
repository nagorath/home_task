import React, { useState } from 'react';
import {
  Modal, Select, Button,
} from 'semantic-ui-react';
import classNames from 'classnames';
// ----Styles---//
import styles from './AppointmentModal.module.scss';
// ---Dicts---//
import AppointmentTypes from '../../Common/AppointmentTypes';

const dropDownOptions = AppointmentTypes.map((type) => ({
  key: type,
  value: type,
  text: type,
}));

const AppointmentModal = ({
  isOpen, onCancelClick, onApproveClick, time, currentUser, date,
}) => {
  const [appType, setAppType] = useState(AppointmentTypes[0]);
  return (
    <Modal
      open={isOpen}
      className={styles.timeslot_modal}
    >
      <div className={styles.modal_content_container}>
        <h1 className={styles.modal_header}>
          Make new appointment
        </h1>
        <div className={styles.modal_inputs_container}>
          <div className={styles.input_container}>
            {`Date: ${date}`}
          </div>
          <div className={styles.input_container}>
            {`Time: ${time}`}
          </div>
          <div className={styles.input_container}>
            Appointment type:
            <Select
              value={appType}
              onChange={(e, data) => setAppType(data.value)}
              style={{ marginLeft: '10px' }}
              options={dropDownOptions}
            />
          </div>
        </div>
        <div className={styles.btns_container}>
          <Button
            className={classNames(styles.btns, styles.cancel)}
            onClick={() => onCancelClick()}
          >
            Cancel
          </Button>
          <Button
            className={classNames(styles.btns, styles.approve)}
            onClick={() => {
              onApproveClick({
                name: currentUser,
                date,
                time,
                appType,
              });
              onCancelClick();
            }}
          >
            Approve
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default AppointmentModal;
