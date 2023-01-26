let url = "http://localhost:8080/api/getData";
let map = L.map('map').setView([48.691435, 6.177898], 13);
let coordonne = []
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, minZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
let veloIcon = new L.Icon({
    iconUrl: '../img/bicyclette.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

let parkingIcon = new L.Icon({
    iconUrl: '../img/parking.png',
    iconSize: [15, 31],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


fetch(url).then(function (response) {
    if (response.ok) {
        response.json().then(function (elements) {
            elements.forEach(element => {
                console.log(element)
                console.log(element.properties)

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

                switch (element.properties) {
                    case 'parking':
                        L.marker([lat, long], { icon: parkingIcon }).addTo(map).bindPopup("ADRESSE : " + ad + "<br/>NOM : " + name + "<br/>Nombres de places : " + nbplace + "<br/>Capacité maximum : " + cap)
                            .openPopup(); break;
                    case 'bike':
                        L.marker([lat, long], { icon: veloIcon }).addTo(map).bindPopup("ADRESSE : " + ad + "<br/>NOM : " + name + "<br/>Nombres de places : " + nbplace + "<br/>Capacité maximum : " + cap)
                            .openPopup(); break;
                    default: console.log('aucun point trouvé');

                }
            });


        });
    } else {
        console.log('Mauvaise réponse du réseau');
    }
})
    .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
    });





