import React, { PropTypes } from 'react';
import moment from 'moment';
import { Label } from 'react-bootstrap';

const DATE_FORMAT = 'DD/MM/YYYY à k:mm';

const DeadLine = ({ deadLine }) => {
  if (deadLine) {
    const momentDate = moment(deadLine);
    const isSoon = moment().add(24, 'hours').isAfter(momentDate);
    const style = isSoon ? 'warning' : 'primary';

    return <Label bsStyle={style}>{momentDate.format(DATE_FORMAT)}</Label>;
  } else {
    return <Label bsStyle="default">No due date</Label>;
  }
};

DeadLine.propTypes = {
  deadLine: PropTypes.string,
};

export default DeadLine;
