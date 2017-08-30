
const splitDate = (date)=> {
  let objectDate = { year: null, month: null, day: null, week: null, hour: null, minute: null, second: null}
    , dateRe = typeof date == 'date' ? date : new Date(date)
  objectDate.year = dateRe.getFullYear()
  objectDate.month = dateRe.getMonth() + 1
  objectDate.day = dateRe.getDate()
  objectDate.week = dateRe.getDay()
  objectDate.hour = dateRe.getHours()
  objectDate.minute = dateRe.getMinutes()
  objectDate.second = dateRe.getSeconds()
  return objectDate
}

export default splitDate