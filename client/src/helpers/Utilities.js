function formatMoney(value, currency = "USD") {
  let valueAsNumber = Number(value);
  // Create number formatter.
  const props = {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  };
  // If the value is an integer, show no decimal digits.
  if (valueAsNumber % 1 == 0) {
    props.minimumFractionDigits = 0;
  }

  // Some currencies don't need to use higher denominations to represent values.
  if (currency !== "JPY") {
    valueAsNumber /= 100.0;
  }
  const formatter = new Intl.NumberFormat("en-US", props);

  return formatter.format(valueAsNumber);
}

function formatTime(durationInMs) {
  const duration = Number(durationInMs);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  let msg = [];
  if (hours > 0) {
    msg.push(hours);
    msg.push(hours > 1 ? "hours" : "hour");
  }

  if (minutes > 0) {
    msg.push(minutes);
    msg.push(minutes > 1 ? "mins" : "min");
  }

  if (msg.length > 0) {
    return msg.join(" ");
  } else {
    return "Unknown duration";
  }
}

/**
 * Reformat time to 12 hour am/pm format
 * @param {Date} date in business's time zone
 * @return {String} time in 12 hour format with am/pm
 */
function formatToAmPm(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours = hours % 12 ? hours % 12 : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutes} ${date.getHours() >= 12 ? "pm" : "am"}`;
}

function createDateAvailableTimesMap(availabilities, businessTimeZone) {
  const dateAvailableTimesMap = {};
  availabilities.forEach((availability) => {
    // get start date
    const startAtDate = new Date(availability.startAt);
    // convert dates to the business time zone
    const businessTime = new Date(
      startAtDate.toLocaleString("en-US", { timeZone: businessTimeZone })
    );
    const month = ("0" + (businessTime.getMonth() + 1)).slice(-2);
    const date = ("0" + businessTime.getDate()).slice(-2);
    const startDate = `${businessTime.getFullYear()}-${month}-${date}`;
    const availableTimes = dateAvailableTimesMap[startDate] || [];
    // add the available times as a value to the date
    availableTimes.push({
      date: availability.startAt, // keep date in same RFC 3339 format so it can be used in createBooking
      teamMemberId: availability.appointmentSegments[0].teamMemberId,
      time: formatToAmPm(businessTime),
    });
    dateAvailableTimesMap[startDate] = availableTimes;
  });

  return dateAvailableTimesMap;
}

function formatDateToParts(current, businessTimeZone, minutes) {
  const currentDate = new Date(
    new Date(current).toLocaleString("en-US", { timeZone: businessTimeZone })
  );
  const futureDate = new Date(currentDate.getTime() + minutes * 60000);

  const currentDateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const currentHourOptions = { hour: "numeric", minute: "numeric" };
  const currentDateFormatter = new Intl.DateTimeFormat(
    "en-US",
    currentDateOptions
  );
  const currentHourFormatter = new Intl.DateTimeFormat(
    "en-US",
    currentHourOptions
  );

  const futureOptions = { hour: "numeric", minute: "numeric" };
  // if is not the same day, show full date for the future date. Otherwise just show time.
  const sameDay = isSameDay(currentDate, futureDate);
  if (!sameDay) {
    futureOptions.weekday = "long";
    futureOptions.year = "numeric";
    futureOptions.month = "long";
    futureOptions.day = "numeric";
  }

  const futureFormatter = new Intl.DateTimeFormat("en-US", futureOptions);

  return sameDay
    ? [
        currentDateFormatter.format(currentDate),
        currentHourFormatter.format(currentDate) +
          " - " +
          futureFormatter.format(futureDate),
      ]
    : [
        currentDateFormatter.format(currentDate) +
          ", " +
          currentHourFormatter.format(currentDate),
        " - ",
        futureFormatter.format(futureDate),
      ];
}

function isSameDay(date1, date2) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export default {
  formatMoney,
  formatTime,
  formatToAmPm,
  formatDateToParts,
  createDateAvailableTimesMap,
};
