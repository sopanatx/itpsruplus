function getDay() {
  var day = new Date();
  var weekday = new Array(7);
  weekday[0] = 'Sunday';
  weekday[1] = 'Monday';
  weekday[2] = 'Tuesday';
  weekday[3] = 'Wednesday';
  weekday[4] = 'Thursday';
  weekday[5] = 'Friday';
  weekday[6] = 'Saturday';

  var n = weekday[day.getDay()];
  return n;
}
function convertDate(date) {
  //2020-10-30T18:00:00.000Z
  const year = Number(date.slice(2, 4)) + 43;
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  let monthText = '';
  switch (month) {
    case '1':
      monthText = 'ม.ค.';
      break;
    case '2':
      monthText = 'ก.พ.';
      break;
    case '3':
      monthText = 'มี.ค.';
      break;
    case '4':
      monthText = 'เม.ย.';
      break;
    case '5':
      monthText = 'พ.ค.';
      break;
    case '6':
      monthText = 'มิ.ย.';
      break;
    case '8':
      monthText = 'ส.ค.';
      break;
    case '9':
      monthText = 'ก.ย.';
      break;
    case '10':
      monthText = 'ต.ค.';
      break;
    case '11':
      monthText = 'พ.ย.';
      break;
    case '12':
      monthText = 'ธ.ค.';
      break;
  }
  return `${day} ${monthText} ${year}`;
}
export {getDay, convertDate};
