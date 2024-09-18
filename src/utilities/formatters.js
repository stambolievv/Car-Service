/**
 * @description Formats the given date to international format.
 * @param {string | number | Date} date - The date to be formatted.
 * @param {string | Array<string>} [locales] - The locale to use for formatting the date.
 * @returns {string} The formatted date as a locale-specific string.
 */
export function formatDateToLocale(date, locales = 'bg-BG') {
  try {
    const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
    const adjustedDate = Number(new Date(date)) + timeZoneOffset;
    return Intl.DateTimeFormat(locales).format(adjustedDate);
  } catch {
    return date.toString();
  }
}

/**
 * @description Formats the given date to ISO 8601 string with the current time.
 * @param {string} date - The date in 'YYYY-MM-DD' format.
 * @returns {string} The formatted date in 'YYYY-MM-DDTHH:mm:ss.000Z' format.
 */
export function formatDateToISO(date) {
  return `${date}T${getTime()}.000Z`;
}

/**
 * @description Retrieves the day part of the provided date or the current date if none is specified.
 * @param {string | number | Date} [date] - The date from which to extract the day.
 * @returns {string} The day in 'YYYY-MM-DD' format.
 */
export function getDay(date) {
  const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
  const adjustedDate = date ? Number(new Date(date).getTime() + timeZoneOffset) : Date.now();
  return new Date(adjustedDate - timeZoneOffset).toISOString().split('T')[0];
}

/**
 * @description Retrieves the time part of the provided date or the current date if none is specified.
 * @param {string | number | Date} [inputDate] - The date from which to extract the time.
 * @returns {string} The time in 'HH:mm:ss' format.
 */
export function getTime(inputDate) {
  const offset = new Date().getTimezoneOffset() * 60000;
  const date = (inputDate && Number(new Date(inputDate).getTime() + offset)) || Date.now();
  const ISO = new Date(date - offset).toISOString();

  return ISO.split('T')[1].slice(0, -5);
}