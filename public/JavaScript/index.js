const url = "http://localhost:8080/api/getData";
let map = L.map("map").setView([48.691435, 6.177898], 13);
let coordonne = [];
let allData;

const bus = document.getElementById("bus");
const bike = document.getElementById("velo");
const parking = document.getElementById("parking");
const busLine = document.getElementById("busLine");

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  minZoom: 3,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const parkingIcon = new L.Icon({
    iconUrl: "../img/parking.png",
    iconSize: [25, 25],
    iconAnchor: [5, 15],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const bikeIcon = new L.Icon({
  iconUrl: "../img/bicyclette.png",
  iconSize: [25, 25],
  iconAnchor: [5, 15],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const busPointIcon = new L.Icon({
    iconUrl: "../img/bus_stop.png",
    iconSize: [25, 25],
    iconAnchor: [5, 15],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

/* EventListener */
parking.addEventListener('change', () => {
  if (parking.checked) {
    fetchData("parking");
  } else {
    map.removeLayer(allData);
  }
});
bike.addEventListener('change', () => {
  if (bike.checked) {
    fetchData("bike");
  } else {
    map.removeLayer(allData);
  }
});
bus.addEventListener('change', () => {
  if (bus.checked) {
    fetchData("busPoint");
  } else {
    map.removeLayer(allData);
  }
});
busLine.addEventListener('change', () => {
  if (busLine.checked) {
    fetchData("LineString");
  } else {
    map.removeLayer(allData);
  }
});

const fetchData = (filterTag) => {
  fetch(url)
    .then(response => {
      if (response.ok) {
        response.json().then(elements => {
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

          console.log(parkingData);
          console.log(filterTag);

          showMap(parkingData, filterTag);
          showMap(bikeData, filterTag);
          showMap(busPointData, filterTag);
          showMap(busLineData, filterTag);
        });
      } else {
        console.log('Mauvaise réponse du réseau.');
      }
    })
    .catch(function (error) {
      console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
    });
}

const showMap = (elements, filterTag) => {
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
      filter: function(feature) {
        if(filterTag === "LineString") {
            return feature.geometry.type === filterTag;
        }
        return feature.properties.tag === filterTag;
      },
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

window.addEventListener('load', () => {
  parking.checked = true;
  fetchData("parking");
  bus.checked = false;
  busLine.checked = false;
  velo.checked = false;
});
