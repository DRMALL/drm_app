
const monthToDays = (year, month)=> {
  let month0 = month < 10 ? `0${month}` : `${month}`
    , month1 = (month+1) < 10 ? `0${month+1}` : `${month+1}`
    , startMonthDay = `${year}-${month0}-01`
    , endMonthDay = month == 12 ? `${year+1}-01-01` : `${year}-${month1}-01`
    , startWeek = new Date(startMonthDay).getDay()
    , timeSlot = new Date(endMonthDay).getTime() - new Date(startMonthDay).getTime()
    , slotLength = timeSlot/(24*60*60*1000)
    , timeSlotArr = []
    , timeSlotArrTD = []
  for(var w = 0; w < startWeek; w++) {
    timeSlotArr.push('')
  }
  for(var i = 1; i <= slotLength; i++) {
    timeSlotArr.push(`${i}`)
  }
  //ListView二维数组
  for(var tol = 0; tol < (timeSlotArr.length/7); tol++) {
    var sectionArr = []
    for(var rnum = 0; rnum < 7; rnum++) {
      sectionArr.push(timeSlotArr[tol*7 + rnum])
    }
    timeSlotArrTD.push(sectionArr)
  }
  return timeSlotArrTD
}

export default monthToDays