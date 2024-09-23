const QUERY_RANGE_PERIOD_DAYS = 30;

// only show booking availability 1.5 hours from current time
/* eslint-disable sort-keys */
const MIN_BOOKING_START_TIME_HOURS = 1;
const MIN_BOOKING_START_TIME_MINUTES = 30;

/**
 * Generate end date for search
 * @param startDate {Date}
 * @returns date
 */
function getEndAtDate(startDate) {
  const endDate = new Date(startDate);

  // only allow booking end time 30 days from start
  endDate.setDate(endDate.getDate() + QUERY_RANGE_PERIOD_DAYS);

  return endDate;
}

/**
 * Generate start date for search
 * @returns date
 */
function getStartAtDate() {
  const date = new Date();

  // only allow booking start time 4 hours from now
  date.setHours(date.getHours() + MIN_BOOKING_START_TIME_HOURS);
  date.setMinutes(date.getMinutes() + MIN_BOOKING_START_TIME_MINUTES);

  return date;
}

export default {
  getEndAtDate,
  getStartAtDate,
};
