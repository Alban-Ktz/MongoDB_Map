let url = "http://localhost:8080/api/getData";
let map = L.map('map').setView([48.691435, 6.177898], 13);
let coordonne = []
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, minZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
let greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


fetch(url).then(function (response) {
    if (response.ok) {
        response.json().then(function (elements) {
            console.log(elements)
            elements.forEach(element => {
                id = element.properties
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
                //if (element.propreties === "parking") {
                //    L.marker([lat, long]).addTo(map).bindPopup("ADRESSE : " + ad + "<br/>NOM : " + name + "<br/>Nombres de places : " + nbplace + "<br/>Capacité maximum : " + cap)
                //        .openPopup();
                //}
                //else if (element.properties === "bike") {
                //    L.marker([lat, long], { icon: greenIcon }).addTo(map).bindPopup("ADRESSE : " + ad + "<br/>NOM : " + name + "<br/>Nombres de places : " + nbplace + "<br/>Capacité maximum : " + cap)
                //        .openPopup();
                //}


            });


        });
    } else {
        console.log('Mauvaise réponse du réseau');
    }
})
    .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
    });





