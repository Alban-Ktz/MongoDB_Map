let url = "http://localhost:8080/api/getData";
let map = L.map('map').setView([48.691435, 6.177898], 13);
let coordonne = []
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, minZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



fetch(url).then(function (response) {
    if (response.ok) {
        response.json().then(function (elements) {
            console.log(elements)
            elements.forEach(element => {
                ad = element.attributes.ADRESSE
                name = element.attributes.NOM
                long = element.geometry.x
                lat = element.geometry.y

                if (element.attributes.PLACES == null) {
                    nbplace = "inconnu"
                } else {
                    nbplace = element.attributes.PLACES
                }
                if (element.attributes.CAPACITE == null) {
                    cap = "inconnu"
                } else {
                    cap = element.attributes.CAPACITE
                }

                L.marker([lat, long]).addTo(map).bindPopup("ADRESSE : " + ad + "<br/>NOM : " + name + "<br/>Nombres de places : " + nbplace + "<br/>Capacité maximum : " + cap)
                    .openPopup();

            });


        });
    } else {
        console.log('Mauvaise réponse du réseau');
    }
})
    .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
    });





