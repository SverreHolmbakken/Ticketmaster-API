import renderEvents from "./renderEvents.js";
// import filterEvents from "./filterEvents.js";
// import { currentDropdownValue } from "./filterEvents.js";
// const dropdown = currentDropdownValue()
import { API_KEY } from "../../env.js";
let currentDropdownValue = 'NO';
export default async function fetchAPI() {
	//data model
	let countryCode = currentDropdownValue;
	const apiKey = API_KEY;
	const baseURL = 'https://app.ticketmaster.com/discovery/v2/events.json';
	const options = {
		method: "GET"
	};
	const endpoint	= `${baseURL}?apikey=${apiKey}&countryCode=${countryCode}&size=18&locale=*&sort=date,asc` ;

	const response = await fetch(endpoint, options);

	try {
		await handleResponse(response)
	} catch (error) {
		console.log(error)
	}
}

async function handleResponse(response) {
	if (response.ok) {
		const output = await response.json();
		//do what the api is going to do here VVVVVVV
		const eventList = output._embedded.events;
		eventList.forEach(element => {
			renderEvents(element);
		});


		const countryDropdown = document.getElementById('country');
	
		countryDropdown.addEventListener('change', handleDropdown);
		function handleDropdown(event) {
			event.preventDefault();
			filterEvents()
			fetchAPI()
			emptyHTML();
			
		}
		function filterEvents() {
			currentDropdownValue = countryDropdown.value;
			return currentDropdownValue;
		}

		function emptyHTML() {
			const eventsSection = document.querySelector('.events-section');
			eventsSection.innerText = '';
		}

	} else if (response.status === 404) {
		throw new Error('Url not existing');
	} else if (response.status === 401) {
		throw new Error('Not authorized user');
	} else if (response.status >= 500) {
		throw new Error('Server not responding');
	} else {
		throw new Error('Something went wrong');
	}
}