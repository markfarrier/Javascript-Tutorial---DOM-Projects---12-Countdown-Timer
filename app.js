const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
const weekdays = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
// can use any type of css selector, such as adding the h4 at the end in below example
const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// tutorial uses 2020, but it's 2021 right now, so 2020 is in the past rather than the future
// interestingly, it automatically makes it NZ Standard Time
// let futureDate = new Date(2021, 9, 6, 21, 03, 45);

const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const mins = futureDate.getMinutes();

const month = months[futureDate.getMonth()];
const weekday = weekdays[futureDate.getDay()];
const date = futureDate.getDate();
// console.log(month);

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${mins}am`;

// future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
	const today = new Date().getTime();
	const t = futureTime - today;
	// console.log(t);
	// 1s = 1000ms
	// 1m = 60s
	// 1hr = 60min
	// 1day = 24hr

	// values in ms
	const oneDay = 24 * 60 * 60 * 1000;
	const oneHour = 60 * 60 * 1000;
	const oneMinute = 60 * 1000;
	const oneSecond = 1000;

	let remainingDays = Math.floor(t / oneDay);
	// console.log(remainingDays);
	let remainingHours = Math.floor((t % oneDay) / oneHour);
	// console.log(remainingHours);
	let remainingMinutes = Math.floor((t % oneHour) / oneMinute);
	// console.log(remainingMinutes);
	let remainingSeconds = Math.floor((t % oneMinute) / oneSecond);
	// console.log(remainingSeconds);

	// set values array
	const values = [
		remainingDays,
		remainingHours,
		remainingMinutes,
		remainingSeconds,
	];

	function format(item) {
		if (item < 10) {
			return (item = `0${item}`);
		}
		return item;
	}
	items.forEach(function (item, index) {
		item.innerHTML = format(values[index]);
	});
	if (t < 0) {
		clearInterval(countdown);
		deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;
	}
}

// countdown
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();
