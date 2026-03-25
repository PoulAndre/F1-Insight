const BASE_URL = window.location.hostname === "localhost" ? "http://localhost:3000" : "https://f1-insight.onrender.com";

async function updateUI() {

    try {
        const response = await fetch(`${BASE_URL}/api/next`);
        const data = await response.json();


        console.log(data);

        document.getElementById("info").innerText = data.event;
        document.getElementById("bane").innerText = data.øktNavn.toUpperCase();
        
        const dato = data.session.sessionsinfo1;
        const tid = data.session.sessionsinfo2;
        document.getElementById("dato").innerText = `${dato}`.split("-").reverse().join("-");
        document.getElementById("dTid").innerText = `Kl ${tid}`;
 
        document.getElementById("VærEmoji").src = `https://openweathermap.org/img/wn/${data.weather.icon}@2x.png`;
        document.getElementById("værTekst").innerText = `${data.weather.description}`;
        document.getElementById("grader").innerText = `${data.weather.temp}°`;
        document.getElementById("humidity").innerText = `${data.weather.wind} m/s`;

      
        const meets = await fetch(`${BASE_URL}/api/meetings`);
        meetsdata = await meets.json();
        


            const bane = meetsdata.find(m => m.country_code === data.country_f1);
            let nåVærendeBane;
            if(bane){
                nåVærendeBane = bane.circuit_image;
            } else {
                nåVærendeBane = "";
            }

            const img = document.createElement("img");
            img.className = "Innhold3";
            img.innerHTML = `
                    <img class="bildet" scr="${nåVærendeBane}"/>
            `;
            liste.appendChild(li);


    } catch (error) {
        console.error("Klarte ikke hente data fra API-en din:", error);
    }

}

updateUI();


