import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';



const today = dayjs();

const currentDate = today.add(5, 'days')
const nextMonth = today.add(1, "month")
const lastMonth = today.subtract(1, "month");

const dateString = currentDate.format('MMMM, dddd, YYYY')

const dateString_nextMonth = nextMonth.format('MMMM, dddd, YYYY')
const dateString_lastMonth = lastMonth.format('MMMM, dddd, YYYY')

console.log(dateString);
console.log(dateString_nextMonth);
console.log(dateString_lastMonth);

console.log(isWeekend(today));

function isWeekend(today){
    return today.format("dddd") === 'Saturday' || today.format("dddd") === 'Sunday';
}