import renderEvents from "./renderEvents.js";
import { API_KEY } from "/env.js";

let currentDropdownValue = 'NO';
let currentSearchValue = '';

export default async function fetchAPI() {
	//data model
	let countryCode = currentDropdownValue;
	let searchKeyword = currentSearchValue;
	const apiKey = API_KEY;
	const baseURL = 'https://app.ticketmaster.com/discovery/v2/events.json';
	const options = {
		method: "GET"
	};
	const endpoint	= `${baseURL}?apikey=${apiKey}&countryCode=${countryCode}&keyword=${searchKeyword}&size=21&locale=*&sort=date,asc`;

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

const countryDropdown = document.getElementById('country');
const searchInput = document.getElementById('search');

countryDropdown.addEventListener('change', handleDropdown);
searchInput.addEventListener('keypress', handleSearch)

function handleDropdown() {
	filterEvents();
	fetchAPI();
	emptyHTML();
}

function handleSearch(event) {
	if (event.key === 'Enter') {
		searchEvents();
		fetchAPI();
		emptyHTML();
	}
}

function searchEvents() {
	currentSearchValue = searchInput.value;
	return currentSearchValue;
}

function filterEvents() {
	currentDropdownValue = countryDropdown.value;
	return currentDropdownValue;
}

function emptyHTML() {
	const eventsSection = document.querySelector('.events-section');
	eventsSection.innerText = '';
}