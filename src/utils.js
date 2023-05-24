export const nullFn = () => null
export const calcDaysDiff = (date1, date2) => {
	const d1 = new Date(date1);
	const d2 = new Date(date2);
	const diffTime = Math.abs(d2 - d1);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

	return diffDays
}
export const daysFromToday = date => calcDaysDiff(new Date(), date)
export const dateToHuman = dateString => {
	const date = new Date(dateString)
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


	return months[date.getMonth()] + " " + date.getDate()
}
