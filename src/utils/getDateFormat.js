const timeInSeconds = {
  year: 31536000,
  month: 2629800,
  week: 604800,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
};
let timerDelayId = 0;

export const getDateFormat = (startTime) => {
  const endTime = Date.now();
  let dateFormat = "now";

  // Current date in seconds
  const currentDate = Math.floor((endTime - startTime) / 1000);

  // The timer delay to call this function again
  // At first it is 30 seconds
  let timerDelay = {
    id: timerDelayId,
    value: 30000,
  };

  // Converting the current date according to its seconds,
  // getting the date format and the new timer delay
  for (let key in timeInSeconds) {
    const time = timeInSeconds[key];

    if (currentDate >= time) {
      let newDate = Math.floor(currentDate / time);

      dateFormat = `${newDate}  ${key}${newDate > 1 ? "s" : ""} ago`;
      timerDelay.value = key === "second" ? 30000 : time * 1000;
      break;
    }
  }

  timerDelayId++;
  return { dateFormat, timerDelay };
};
