let url = "http://localhost:8080/api/getData";
let map = L.map("map").setView([48.691435, 6.177898], 13);
let coordonne = [];

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  minZoom: 3,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const parkingIcon = new L.Icon({
    iconUrl: "../img/parking.png",
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const bikeIcon = new L.Icon({
  iconUrl: "../img/bicyclette.png",
  iconSize: [25, 25],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const busPointIcon = new L.Icon({
    iconUrl: "../img/bus_stop.png",
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

fetch(url)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (elements) {
        let parkingData = elements.features.filter(
          (feature) => feature.properties.tag === "parking"
        );
        let bikeData = elements.features.filter(
          (feature) => feature.properties.tag === "bike"
        );
        let busPointData = elements.features.filter(
          (feature) => feature.properties.tag === "busPoint"
        );
        let busLineData = elements.features.filter(
          (feature) => feature.properties.tag === "busLine"
        );

        showMap(parkingData);
        showMap(bikeData);
        showMap(busPointData);
        showMap(busLineData);
      });
    } else {
      console.log("Mauvaise réponse du réseau");
    }
  })
  .catch(function (error) {
    console.log(
      "Il y a eu un problème avec l'opération fetch : " + error.message
    );
  });

function showMap(elements) {
  elements.forEach((element) => {
    let bindPopup;
    switch (element.properties.tag) {
      case "parking":
        bindPopup = (layer) => {
          return (
            "ADRESSE : " +
            layer.feature.properties.address +
            "<br/>NOM : " +
            layer.feature.properties.name +
            "<br/>Nombres de places : " +
            layer.feature.properties.nbDispo +
            "<br/>capacité maximum : " +
            layer.feature.properties.capacity
          );
        };
        break;
      case "bike":
        bindPopup = (layer) => {
          return (
            "ADRESSE : " +
            layer.feature.properties.address +
            "<br/>NOM : " +
            layer.feature.properties.name +
            "<br/>Capacité max : " +
            layer.feature.properties.capacity +
            "<br/>nombre de vélos disponible : " +
            layer.feature.properties.nbDispo +
            "<br/>nombre de docks disponible : " +
            layer.feature.properties.num_docks_available
          );
        };
        break;
      case "busPoint":
        bindPopup = (layer) => {
          return (
            "NOM : " +
            layer.feature.properties.name +
            "<br/>code : " +
            layer.feature.properties.code +
            "<br/>Accès handicapé : " +
            layer.feature.properties.wheelchair_boarding
          );
        };
        break;
      case "busLine":
        bindPopup = (layer) => {
          return (
            "NOM COMMUN : " +
            layer.feature.properties.route_short_name +
            "<br/>NOM : " +
            layer.feature.properties.route_long_name
          );
        };
        break;
    }

    L.geoJSON(element, {
      style: function (features) {
        return { color: features.properties.route_color };
      },
      pointToLayer: function (feature, latlng) {
        switch (feature.properties.tag) {
            case 'parking':
                return L.marker(latlng, { icon: parkingIcon });
            case 'bike':
                return L.marker(latlng, { icon: bikeIcon });
            case 'busPoint':
                return L.marker(latlng, { icon: busPointIcon });
        }
      }
    })
      .bindPopup(bindPopup)
      .addTo(map);
  });
}
