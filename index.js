async function updateUI() {
    try {
        const response = await fetch('https://f1-insight.onrender.com/api/next');
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

        
       


    } catch (error) {
        console.error("Klarte ikke hente data fra API-en din:", error);
    }
}

updateUI();





