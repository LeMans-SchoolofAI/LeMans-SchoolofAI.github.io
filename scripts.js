// CHANGER LES EVENEMENTS CHAQUE ANNEE, format de date FR: jj/mm/aaaa
const event_datas = [
    {
        "date": convertToDate("22/02/2024"),
        "description": "Titre de l'événement 1",
        "auteur": "Bob"
    },
    {
        "date": convertToDate("26/08/2024"),
        "description": "Titre de l'événement 11",
        "auteur": "Alice"
    },
    {
        "date": convertToDate("22/03/2024"),
        "description": "Tire de l'événement 2",
        "auteur": "Charlie"
    },
    {
        "date": convertToDate("22/06/2024"),
        "description": "Titre de l'événement 3",
        "auteur": "David"
    }
];



function convertToDate(dateString) {
    // Split the date string into day, month, and year
    var parts = dateString.split('/');
    // Create a new Date object
    var date = new Date(parts[2], parts[1] - 1, parts[0]);
    return date;
}

// Function to load a json for events
function loadEvents() {
    console.log('Loading events');
    console.log(event_datas);
    let upcomingEventList = document.querySelector('.upcoming-events');
    let pastEventList = document.querySelector('.past-events');
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let upcomingEvents = [];
    let pastEvents = [];

    event_datas.forEach(event => {
        if (event.date > tomorrow) {
            upcomingEvents.push(event);
        } else {
            pastEvents.push(event);
        }
    });

    // Sort the events based on the date
    upcomingEvents.sort((a, b) => a.date - b.date);
    pastEvents.sort((a, b) => b.date - a.date);

    // Append the events converted to <li> to the respective lists
    for (const [index, event] of upcomingEvents.entries()) {
        let eventItem = document.createElement('li');
        eventItem.textContent = `${event.date.toLocaleDateString('fr-FR')}: ${event.description} animé par ${event.auteur}`;
        if (index === 0) {
            eventItem.classList.add('highlight');
        }
        upcomingEventList.appendChild(eventItem);
    }

    for (const [index, event] of pastEvents.entries()) {
        let eventItem = document.createElement('li');
        eventItem.textContent = `${event.date.toLocaleDateString('fr-FR')}: ${event.description} animé par ${event.auteur}`;
        pastEventList.appendChild(eventItem);
    }
}


// Call the function when the page loads
window.onload = function() {
    // Load the events from the JSON file and highlight the next event
    loadEvents();

    // Get the height of the navigation bar and set margin-top for the container
    var navHeight = document.querySelector('nav').offsetHeight;
    document.querySelector('.container').style.marginTop = navHeight + 'px';
    
    // Check if the URL ends with 'index.html#contact'
    if (window.location.href.endsWith('index.html#contact')) {
        // If it does, focus on the element with the class 'contact'
        document.querySelector('.contact').focus();
    }

    // Get the link element
    var contactLink = document.querySelector('a[href="index.html#contact"]');
    // Add a click event listener to the link
    contactLink.addEventListener('click', function(event) {
        // Prevent the default action (which is to navigate to the anchor)
        event.preventDefault();

        // Change the location hash to 'contact'
        window.location.hash = 'contact';

        // Force the page to reload
        window.location.reload(true);
    });
};
