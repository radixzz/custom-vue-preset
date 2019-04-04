const DAYS_IN_JANUARY = 31;
const DAYS_IN_FEBRUARY = 28;
const DAYS_IN_FEBRUARY_LEAP_YEAR = 29;
const DAYS_IN_MARCH = 31;
const DAYS_IN_APRIL = 30;
const DAYS_IN_MAY = 31;
const DAYS_IN_JUNE = 30;
const DAYS_IN_JULY = 31;
const DAYS_IN_AUGUST = 31;
const DAYS_IN_SEPTEMBER = 30;
const DAYS_IN_OCTOBER = 31;
const DAYS_IN_NOVEMBER = 30;
const DAYS_IN_DECEMBER = 31;
const DAYS_IN_YEAR = 365;
const DAYS_IN_LEAP_YEAR = 366;

/**
 * The number of days appearing in each month. May be used for easy index lookup.
 * The stored value for February corresponds to a standard year--not a leap year.
 * @type {number[]}
 * @property DAYS_IN_MONTHS
 * @export function
 * @public
 */
const DAYS_IN_MONTHS = [DAYS_IN_JANUARY, DAYS_IN_FEBRUARY, DAYS_IN_MARCH, DAYS_IN_APRIL, DAYS_IN_MAY, DAYS_IN_JUNE, DAYS_IN_JULY, DAYS_IN_AUGUST, DAYS_IN_SEPTEMBER, DAYS_IN_OCTOBER, DAYS_IN_NOVEMBER, DAYS_IN_DECEMBER];

/**
 * Timezone abbreviation
 * @type {string[]}
 * @property _TIMEZONES
 * @private
 * @export function
 */
const _TIMEZONES = ["IDLW", "NT", "HST", "AKST", "PST", "MST", "CST", "EST", "AST", "ADT", "AT", "WAT", "GMT", "CET", "EET", "MSK", "ZP4", "ZP5", "ZP6", "WAST", "WST", "JST", "AEST", "AEDT", "NZST"];

/**
 * Array to transform the format 0(sun)-6(sat) to 1(mon)-7(sun)
 * @type {number[]}
 * @private
 * @export function
 * @property _MONDAY_STARTING_WEEK
 */
const MONDAY_STARTING_WEEK = [7, 1, 2, 3, 4, 5, 6];

/**
 * Parse a SQL-DATETIME (YYYY-MM-DD HH:MM:SS) to a Date
 * @param {string} dateTime an SQL-DATETIME (YYYY-MM-DD HH:MM:SS)
 * @returns {Date} The date of the supplied string
 */
export function parseFromSqlDateTime(dateTime) {
    if (dateTime === null) {
        return null;
    }
    dateTime = dateTime.replace(/-/g, "/");
    dateTime = dateTime.replace("T", " ");
    dateTime = dateTime.replace("Z", " GMT-0000");
    dateTime = dateTime.replace(/\.[0-9]{3}/g, "");

    const date = new Date(Date.parse(dateTime));
    if (date.toString() === "Invalid Date") {
        return null;
    }
    return date;

}

/**
 * Returns a two digit representation of the year represented by the specified date.
 * @param {Date} date The date to be parsed
 * @returns {string} The resulting string
 */
export function getShortYear(date) {
    const year = date.getFullYear().toString();
    if (year.length < 3) {
        return year;
    }
    return (year.substr(year.length - 2));
}

/**
 * Compares two dates and returns an integer depending on their relationship.
 *
 *      Returns -1 if d1 is greater than d2.
 *      Returns 1 if d2 is greater than d1.
 *      Returns 0 if both dates are equal.
 *
 * @param {Date} date1 The date that will be compared to the second date.
 * @param {Date} date2 The date that will be compared to the first date.
 * @returns {number} The number of the result
 */
export function compareDates(date1, date2) {
    const d1ms = date1.getTime();
    const d2ms = date2.getTime();

    if (d1ms > d2ms) {
        return -1;
    } if (d1ms < d2ms) {
        return 1;
    }
    return 0;

}

/**
 * Returns a short hour (0 - 12) represented by the specified date.
 *      If the hour is less than 12 (0 - 11 AM) then the hour will be returned.
 *      If the hour is greater than 12 (12 - 23 PM) then the hour minus 12 will be returned.
 * @param {Date} date The date to be parsed
 * @returns {number} The hours parsed from date
 */
export function getShortHour(date) {
    const h = date.getHours();
    if (h === 0 || h === 12) {
        return 12;
    } if (h > 12) {
        return h - 12;
    }
    return h;

}

/**
 * Determines the number of days between the start value and the end value. The result
 * may contain a fractional part, so cast it to int if a whole number is desired.
 * @param {Date} start The start date
 * @param {Date} end The end date
 * @returns {number} The number of days between
 */
export function countDays(start, end) {
    return Math.abs(end.valueOf() - start.valueOf()) / (1000 * 60 * 60 * 24);
}

/**
 * Determines if the input year is a leap year (with 366 days, rather than 365).
 * @param {number} year the year value as stored in a Date object.
 * @returns {boolean} A boolean determining if the year is leap
 */
export function isLeapYear(year) {
    if (year % 100 === 0) {
        return year % 400 === 0;
    }
    return year % 4 === 0;
}

/**
 * Determines if the dates are the same
 * @param {Date} compare The first Date to compare
 * @param {Date} to The seconds Date to compare
 * @returns {boolean} A boolean determining if the two days are the same
 */
export function isSameDay(compare, to) {
    if (compare.getFullYear() !== to.getFullYear()) {
        return false;
    }
    if (compare.getMonth() !== to.getMonth()) {
        return false;
    }
    if (compare.getDate() !== to.getDate()) {
        return false;
    }
    return true;
}

/**
 * Calculate the age of the supplied date
 * @param {Date} birthdate The birthdate to calculate the age for
 * @param {Date} [on] Date on which the age is calculated. If null, the current date is used.
 * @returns {number} The age in number of the supplied Date
 */
export function age(birthdate, on = null) {
    if (!on) {
        on = new Date();
    }
    const _age = on.getFullYear() - birthdate.getFullYear();
    if (birthdate.getMonth() < on.getMonth()) {
        return _age;
    }
    if (birthdate.getMonth() > on.getMonth()) {
        return _age - 1;
    }
    if (birthdate.getDate() <= on.getDate()) {
        return _age;
    }
    return _age - 1;
}

/**
 * Checks if a date is the same as or older then a given years
 * @param {Date} date The Date to be validated
 * @param {number} years The minimum years
 * @returns {boolean} A boolean determining if the Date is valid
 */
export function ageCheck(date, years) {
    return age(date) >= years;
}

/**
 * Number of days in the current month (such as 28-31)
 * @param {Date} date The Date to be evaluated
 * @returns {number} the number of days in month
 */
export function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Returns a string indicating whether the date represents a time in the ante meridian (AM) or post meridian (PM).
 * @param {Date} date The date to ve evaluated
 * @returns {string} The resulting string of hours
 */
export function getAMPM(date) {
    return (date.getHours() > 11) ? "PM" : "AM";
}

/**
 * Returns the number of the current week for the year, a week starts with monday
 * @param {Date} date The date to be evaluated
 * @returns {number} The number of week of the current date
 */
export function getWeekOfYear(date) {
    const dayOfYear = getDayOfYear(date);
    const firstDay = new Date(date.getFullYear(), 0, 1);
    let fullWeeks = (dayOfYear - (MONDAY_STARTING_WEEK[date.getDay()] + (7 - MONDAY_STARTING_WEEK[firstDay.getDay()]))) / 7;
    if (MONDAY_STARTING_WEEK[firstDay.getDay()] <= 4) {
        fullWeeks++;
    }
    fullWeeks++;
    return fullWeeks;
}

/**
 * returns the day of the year, starting with 0 (0-365)
 * @param {Date} date The date to be evaluated
 * @returns {number} The day number in current year of the current Date
 */
export function getDayOfYear(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const millisecondsOffset = date.getTime() - firstDayOfYear.getTime();
    return Math.floor(millisecondsOffset / 86400000);
}

/**
 * Gets the next date in the week for the given time and day. Useful for weekly countdowns
 * @param {number} day The day for the countdown. 0 starts at sunday, so every monday at 20:00 is: getNextInWeekDatefor (1, 20);
 * @param {number} hours The hours of the time
 * @param {number} minutes The minutes of the time
 * @param {number} seconds The seconds of the time
 * @returns {Date} The resulting Date
 */
export function getNextDayInWeek(day, hours, minutes, seconds) {
    const d = new Date();
    const targetDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hours, minutes, seconds);
    if (targetDate.getDay() !== day) {
        targetDate.setDate(targetDate.getDate() + (((day + 7) - targetDate.getDay()) % 7));
    } else if (d.getTime() > targetDate.getTime()) {
        targetDate.setDate(targetDate.getDate() + 7);
    }
    return targetDate;
}

export default {
    parseFromSqlDateTime,
    getShortYear,
    compareDates,
    getShortHour,
    countDays,
    isLeapYear,
    isSameDay,
    age,
    ageCheck,
    getDaysInMonth,
    getAMPM,
    getWeekOfYear,
    getDayOfYear,
    getNextDayInWeek,
}
