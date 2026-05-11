const BASE_URL = window.location.hostname === "localhost" ? "http://localhost:3000" : "https://f1-insight.onrender.com";

async function updateSchedule() {

    try {
        const response = await fetch(`${BASE_URL}/api/calendar`);
        const data = await response.json();
        console.log(data);

        const container = document.getElementById("løpsinfo");


            data.events.forEach(events => {
                if(!events.round) return;
                const løpsinfoListe = document.createElement("div");
                løpsinfoListe.className = "løpsinfoNoe";
                løpsinfoListe.innerHTML = `
                        <div class="løpsinfoListe">    
                            <p>${events.round}</p>
                                <div class="infoListeDIV"> 
                                    <p>${events.sessions.fp1.date}</p>
                                    <p>-</p>
                                    <p>${events.sessions.race.date}</p> 
                                </div>
                                </div>
                                    <h2>${events.name}</h2>
                    </div>`
             container.appendChild(løpsinfoListe);
            
       });
    } catch (error) {
        console.error("Klarte ikke hente data fra API-en din:", error);
    }

}

updateSchedule();
