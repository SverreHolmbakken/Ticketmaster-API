export default async function fetchAPI() {
	//data model
	const apiKey = 'vRUAnvHH8eelbE3N89Nh3pGKlnQE3VGc';
	const baseURL = 'https://app.ticketmaster.com/discovery/v2/events.json';
	const options = {
		method: "GET"
	};
	const endpoint	= `${baseURL}?apikey=${apiKey}` ;

	const response = await fetch(endpoint);

	try {
		await handleResponse(response)
	} catch (error) {
		console.log(error)
		// handleError(error)
	}
}

async function handleResponse(response) {
	const eventsSection = document.querySelector('.events-section');
	if (response.ok) {
		const output = await response.json();
		//do what the api is going to do here VVVVVVV
		const eventList = output._embedded.events;
		eventList.forEach(element => {
			renderHTML(element);
		});
		// output.forEach(output._embedded.events.name)
		// function renderAll() {
		// 	eventsSection.innerHTML = '';
		// 	output.forEach(() => {
		// 		renderHTML();
		// 	});
		// }

		
		// renderAll();

		////
		// renderCard(output._embedded.events.name)


		function renderHTML(element) {
			const eventCardLink = document.createElement('a');
			eventCardLink.className = 'event__card-link'
			eventCardLink.href = `${element.url}`
			eventsSection.appendChild(eventCardLink)

			const eventCard = document.createElement('div');
			eventCard.className = 'event__card';
			eventCardLink.appendChild(eventCard);
			
			const eventTitle = document.createElement('h2');
			eventTitle.className = 'event__title';
			eventCard.appendChild(eventTitle);
			eventTitle.textContent = `${element.name}`;

			const eventImage = document.createElement('img')
			eventImage.setAttribute('src', `${element.images[0].url}`)
			eventCard.appendChild(eventImage)
		}


		//
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

// function handleError(error) {
// 	warningElement.classList.toggle('hidden');
// 	warningElement.textContent = error.message;
// }