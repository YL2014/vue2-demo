export const formateDate = (dateObj) => {
  let year = dateObj.getFullYear()
  let month = dateObj.getMonth()
  let day = dateObj.getDate()

  return year + '-' + month + '-' + day
}
