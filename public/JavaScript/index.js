let url = "http://localhost:8080/api/getData"
let map = L.map('map').setView([48.691435, 6.177898], 13);
let coordonne = []
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, minZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



fetch(url).then(function (response) {
    response.json().then(function (elements) {
        elements.forEach(element => {
            ad = element.ad
            name = element.name
            long = element.x
            lat = element.y

            if (element.places == null) {
                nbplace = "inconnu"
            } else {
                nbplace = element.places
            }
            if (element.capacities == null) {
                cap = "inconnu"
            } else {
                cap = element.capacities
            }

            L.marker([lat, long]).addTo(map).bindPopup("ADRESSE : " + ad + "<br/>NOM : " + name + "<br/>Nombres de places : " + nbplace + "<br/>Capacité maximum : " + cap)
                .openPopup();

        });


    });
});






