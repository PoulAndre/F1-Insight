const BASE_URL = window.location.hostname === "localhost" ? "http://localhost:3000" : "https://f1-insight.onrender.com";

async function updateDriverInfo() {
    try {
        const drivers = await fetch(`${BASE_URL}/api/drivers`);
        const driverdata = await drivers.json();

        let championsdata = [];
        try{
        const champions = await fetch(`${BASE_URL}/api/driverChampionship`);
        championsdata = await champions.json();
        } catch (error) {
            console.log("Champ-data ikke tilgjengelig enda.");
        }
        console.log(driverdata[0]);
        console.log(championsdata[0]);

        const liste = document.getElementById("Drivers");
        driverdata.forEach((driver, index) => {
                const champion = championsdata.find(c => c.driver_number === driver.driver_number);
                    
                    let poeng;
                   for(let i = 0; i < driverdata.length; i++){
                    for(let j = 0; j < driverdata.length; j++) {
                        if(i === j) {
                            
                        }
                    }
                   }
                        if(champion) {
                            poeng = champion.points_current;
                        } else {
                            poeng = "NADA";
                        }

        const one = "st";
        const two = "nd";
        const third = "rd";
        const rest = "th";

        const posisjon = index + 1;
        let pos;
        if(posisjon === 1) {
            pos = one;
        } else if(posisjon === 2) {
            pos = two; 
        } else if(posisjon === 3) {
            pos = third;
        } else {
            pos = rest;
        }
        

            const li = document.createElement("li");
            li.className = "Box";
            li.innerHTML = `
                <div class="Plass">
                    <p class="pos">${posisjon + pos}</p>
                    <p class="Driver">${driver.full_name}</p>
                    <p class="Team">${poeng}</p>
                </div>
            `;
            liste.appendChild(li);
            });
    } catch (error) {
         console.error("Klarte ikke hente data fra API-en din:", error);
    }
    
}

updateDriverInfo();





