// Charger les événements depuis le fichier JSON
async function loadEvents() {
  try {
    const response = await fetch("events.json");
    const data = await response.json();

    const organizersDirectory = data.organizers;
    const events = data.events;

    renderEvents(events, organizersDirectory);

    // Mise à jour automatique toutes les heures
    setInterval(() => renderEvents(events, organizersDirectory), 60 * 60 * 1000);
  } catch (error) {
    console.error("Erreur lors du chargement des événements :", error);
  }
}

// Fonction pour formater la date
function formatDate(dateString) {
  const eventDate = new Date(dateString);
  return eventDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// Fonction principale pour afficher les événements
function renderEvents(events, organizersDirectory) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const past = document.querySelector("#past-events ul");
  const upcoming = document.querySelector("#upcoming-events ul");
  const ideas = document.querySelector("#ideas-events ul");

  past.innerHTML = "";
  upcoming.innerHTML = "";
  ideas.innerHTML = "";

  const pastEvents = [];
  const upcomingEvents = [];
  const ideaEvents = [];

  // Séparer les événements
  events.forEach(event => {
    if (!event.date) {
      ideaEvents.push(event);
    } else {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      if (eventDate < today) {
        pastEvents.push(event);
      } else {
        upcomingEvents.push(event);
      }
    }
  });

  // Tri des événements
  upcomingEvents.sort((a,b) => new Date(a.date) - new Date(b.date));
  pastEvents.sort((a,b) => new Date(b.date) - new Date(a.date));

  // Identifier le prochain événement
  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

  // Fonction pour créer un <li> d'événement
  function createEventItem(event, isPast = false) {
    const li = document.createElement("li");
    li.classList.add("event");

    let html = `<strong>${event.title}</strong>`;

    if (event.date) {
      html += `<br><i class="fa-solid fa-calendar"></i> Le ${formatDate(event.date)}`;
    }

    if (event.organizers && event.organizers.length > 0) {
      html += ` - <i class="fa-solid fa-user"></i> par `;

      const organizersHTML = event.organizers.map(name => {
        const linkedin = organizersDirectory[name];
        return linkedin
          ? `<a class="link-anim" href="${linkedin}" target="_blank">${name}</a>`
          : name;
      }).join(" et ");

      html += organizersHTML;
    }

    if (event.comment) {
      html += `<br><p class="commentaire"><i class="fa-solid fa-circle-info"></i> ${event.comment}</p>`;
    }

    if (event.registration) {
      const btnClass = isPast ? "btn-passed" : "btn";
      html += `<button class="${btnClass}"><a href="${event.registration}" target="_blank" style="color:inherit; text-decoration:none;">S'inscrire</a></button>`;
    }

    li.innerHTML = html;

    if (!event.date) {
      li.classList.add("event-idea");
    } else if (isPast) {
      li.classList.add("event-past");
    } else {
      li.classList.add("event-upcoming");
      if (nextEvent && event.title === nextEvent.title) {
        li.classList.add("next-event"); // mettre en avant le prochain événement
      }
    }

    return li;
  }

  // Injecter dans le DOM
  upcomingEvents.forEach(ev => upcoming.appendChild(createEventItem(ev, false)));
  pastEvents.forEach(ev => past.appendChild(createEventItem(ev, true)));
  ideaEvents.forEach(ev => ideas.appendChild(createEventItem(ev)));
}

// Charger au démarrage
document.addEventListener("DOMContentLoaded", loadEvents);


// Menu hamburger //

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navMenu.classList.toggle("open");
});

// Fermer le menu après clic sur un lien
document.querySelectorAll(".nav-ul a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navMenu.classList.remove("open");
  });
});