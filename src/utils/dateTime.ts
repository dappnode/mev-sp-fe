/**
 * Function to subtract two dates and return the difference in a specified format
 * @param date1 First date to subtract from
 * @param date2 Second date to subtract from the first
 * @param format Format to return the difference in (currently only supports 'hh:mm:ss') if not provided, returns the difference in milliseconds
 * @returns Difference between the two dates in the specified format or milliseconds
 * @example
 * subtractDates(new Date('2020-01-01T00:00:00'), new Date('2020-01-01T00:00:00')) // returns 0
 * subtractDates(new Date('2020-01-01T00:00:00'), new Date('2020-01-01T00:00:01')) // returns 1000
 * subtractDates(new Date('2020-01-01T00:00:00'), new Date('2020-01-01T00:01:00'), 'hh:mm:ss') // returns '00h 01m 00s'
 */
export const subtractDates = (
  date1: Date,
  date2: Date,
  format?: 'hh:mm:ss'
) => {
  // Check if the dates are valid
  if (Number.isNaN(date1.getTime()) || Number.isNaN(date2.getTime())) {
    throw new Error('Invalid date')
  }
  // check if the second date is greater than the first, and if so, set the isNegative flag to true
  const isNegative = date2.getTime() > date1.getTime()
  // get the absolute difference between the two dates in milliseconds
  const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime())
  // divide the difference in milliseconds by the number of milliseconds in an hour, round down to the nearest integer, and get the difference in hours
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60))
  // get the remaining milliseconds after removing the hours, divide by the number of milliseconds in a minute, round down to the nearest integer, and get the difference in minutes
  const diffInMinutes = Math.floor(
    (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  )
  const diffInSeconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000)

  switch (format) {
    case 'hh:mm:ss':
      // get the remaining milliseconds after removing the hours and minutes, divide by the number of milliseconds in a second, and round down to the nearest integer to get the difference in seconds
      return `${isNegative ? '-' : ''}${String(diffInHours).padStart(
        2,
        '0'
      )}h ${String(diffInMinutes).padStart(2, '0')}m ${String(
        diffInSeconds
      ).padStart(2, '0')}s` // combine the values into a string in the format "hh:mm:ss"

    default:
      return diffInMilliseconds
  }
}
