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


        driverdata.sort((a, b) => {
            const driverOne = championsdata.find(c => c.driver_number === a.driver_number);
            const driverTwo = championsdata.find(c => c.driver_number === b.driver_number);
            return driverTwo.points_current - driverOne.points_current;
        });


        const liste = document.getElementById("Drivers");
        driverdata.forEach((driver, index) => {
                const champion = championsdata.find(c => c.driver_number === driver.driver_number);
               
                let poeng;
                if(champion) {
                    poeng = champion.points_current;
                } else {
                    poeng = "NADA";
                }

                 
                const posisjon = index + 1;
                let pos;
                if(posisjon === 1) {
                    pos = "st";
                } else if(posisjon === 2) {
                    pos = "nd"; 
                } else if(posisjon === 3) {
                    pos = "rd";
                } else {
                    pos = "th";
                }
        

            const li = document.createElement("li");
            li.className = "Box";
            li.innerHTML = `
                <div class="Plass">
                    <p class="pos">${posisjon + pos}</p>
                    <p class="Driver">${driver.full_name}</p>
                    <p class="Team">${poeng }</p>
                </div>
            `;
            liste.appendChild(li);
        });
    } catch (error) {
         console.error("Klarte ikke hente data fra API-en din:", error);
    }
    
}

updateDriverInfo();

