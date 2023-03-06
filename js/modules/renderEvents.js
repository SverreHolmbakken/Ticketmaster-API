export default function renderEvents(element) {	
	const eventsSection = document.querySelector('.events-section');
	
	const eventCardLink = document.createElement('a');
	const eventCard = document.createElement('div');
	const eventImageBox = document.createElement('div');
	const eventImage = document.createElement('img');
	const eventText = document.createElement('div');
	const eventTitle = document.createElement('h2');
	const eventStartDay = document.createElement('h3');
	const eventStartDate = document.createElement('h3');
	const eventStartTime = document.createElement('h3');
	const eventVenue = document.createElement('h3');
	
	
	const dateString = element.dates.start.localDate;

	const monthToString = new Date(dateString);
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	]
	
	const displayMonth = months[monthToString.getMonth()]
	
	const dateArray = dateString.split('-');
	const date = `${dateArray[2]}. ${displayMonth}`;

	if (element.dates.start.localTime) {
		const timeString = element.dates.start.localTime;
		const timeArray = timeString.split(':');
		const time = `${timeArray[0]}:${timeArray[1]}`
		eventStartTime.textContent = `${time}`;
	}

	const dayOfTheWeek = new Date(dateString)
	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Sunday',
		'Sunday',
	]
	const dateDay = days[dayOfTheWeek.getDay()]

	eventCardLink.className = 'event__card-link'
	eventCard.className = 'event__card';
	eventImageBox.className = 'event__image-box';
	eventText.className = 'event__text'
	eventTitle.className = 'event__title';
	eventStartDay.className = 'event__start-day';
	eventStartDate.className = 'event__start-date';
	eventStartTime.className = 'event__start-time';
	eventVenue.className = 'event__venue';

	eventCardLink.href = `${element.url}`
	eventCardLink.setAttribute('target', '_blank')

	eventImageBox.style.background = `transparent url(${element.images.find(image => image.width > 600)?.url}) no-repeat center` 
	
	eventTitle.textContent = `${element.name}`;
	eventStartDate.textContent = `${dateDay} ${date}`;
	if (element._embedded.venues[0].name == undefined) {
		eventVenue.textContent = `${element._embedded.venues[0].address.line1}`
	} else {
		eventVenue.textContent = `${element._embedded.venues[0].name}`
	}
	
	eventsSection.append(eventCardLink);
	eventCardLink.append(eventCard);
	eventCard.append(
		eventImageBox, 
		eventText 
		);
	eventText.append(
		eventTitle,
		eventStartTime,
		eventStartDate,
		eventStartDay,
		eventVenue
		);
	eventImageBox.append(eventImage);
}