const BASE_URL = window.location.hostname === "localhost" ? "http://localhost:3000" : "https://f1-insight.onrender.com";
console.log("BASE_URL:", BASE_URL);
console.log("hostname:", window.location.hostname);
async function updateScoreInfo() {
    try {
        const drivers = await fetch(`${BASE_URL}/api/drivers`);
        const driverdata = await drivers.json();

        let championsdata = [];
        
    try{
        const champions = await fetch(`${BASE_URL}/api/driverChampionship`);
        championsdata = await champions.json();
            if(championsdata.length > 0) {
                localStorage.setItem("championsdata", JSON.stringify(championsdata));
            }
    } catch (error) {
        console.log("Champ-data ikke tilgjengelig enda, bruker lagret data.");
        const lagret = localStorage.getItem("championsdata");
        if(lagret) {
            championsdata = JSON.parse(lagret);
        }
    }


        console.log(driverdata[0]);
        console.log(championsdata[0]);

        driverdata.sort((a, b) => {
            const driverOne = championsdata.find(c => c.driver_number === a.driver_number);
            const driverTwo = championsdata.find(c => c.driver_number === b.driver_number);
            const poengA = driverOne ? driverOne.points_current : 0;
            const poengB = driverTwo ? driverTwo.points_current : 0;
            return poengB - poengA;
        });

        

        const liste = document.getElementById("Drivers");
        driverdata.forEach((driver, index) => {
                const champion = championsdata.find(c => c.driver_number === driver.driver_number);
                let driverPoeng;
                if(champion) {
                    driverPoeng = champion.points_current;
                } else {
                    driverPoeng = "nada";
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
                    <p class="Team">${driverPoeng}</p>
                </div>
            `;
            liste.appendChild(li);
        });
    } catch (error) {
         console.error("Klarte ikke hente data fra API-en din:", error);
    }



    let teamsdata = [];
    try {
        const teams = await fetch(`${BASE_URL}/api/teamsChampionship`);
        teamsdata = await teams.json();

        if(teamsdata.length > 0) {
            localStorage.setItem("teamsdata", JSON.stringify(teamsdata));
        } else {
            const lagret = localStorage.getItem("teamsdata");
            if(lagret) teamsdata = JSON.parse(lagret);
        }
    } catch (error) {
        console.log("Teams-data ikke tilgjengelig enda, bruker lagret data.");
        const lagret = localStorage.getItem("teamsdata");
        if(lagret) {
            teamsdata = JSON.parse(lagret);
    }
}
    console.log(teamsdata[0]);


    teamsdata.sort((a, b) => {
    return (b.points_current || 0) - (a.points_current || 0);
});

    const teamsListe = document.getElementById("Teams");
        teamsdata.forEach((team, index) => {
            const topTeam = teamsdata.find(t => t.team_name === team.team_name);
            let teamPoeng;
            if(topTeam) {
                teamPoeng = topTeam.points_current;
            } else {
                teamPoeng = "NEI";
            }

            const posisjon = index + 1;
            let pos;
            if(posisjon === 1){
                pos = "st";
            } else if(posisjon === 2){
                pos = "nd";
            } else if(posisjon === 3) {
                pos = "rd";
            } else {
                pos = "th";
            }

            const ti = document.createElement("ti");
            ti.className = "Box";
            ti.innerHTML = `
            <div class="Plass">
                    <p class="pos">${posisjon + pos}</p>
                    <p class="Driver">${team.team_name}</p>
                    <p class="Team">${teamPoeng}</p>
                </div>
            `;
            teamsListe.appendChild(ti);
        });
    

}

updateScoreInfo();

