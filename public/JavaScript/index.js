let url = "http://localhost:8080/api/getData";
let map = L.map('map').setView([48.691435, 6.177898], 13);
let coordonne = []
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, minZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let bus = document.getElementById("bus");
let velo = document.getElementById("velo");
let parking = document.getElementById("parking");
let busLine = document.getElementById("busLine");

// feature.properties.tag === "parking" || feature.properties.tag === "busPoint" || feature.properties.tag === "bike" || feature.geometry.type === "LineString"

let allData;
const fetchData = (url, filterTag) => {
  fetch(url)
    .then(response => {
      if (response.ok) {
        response.json().then(elements => {
          allData = L.geoJSON(elements, {
            filter: function(feature) {
                if(filterTag === "LineString") {
                    return feature.geometry.type === filterTag;
                }
                return feature.properties.tag === filterTag;
            },
            style: feature => ({ color: feature.properties.color }),
          }).bindPopup(layer => `
            ADRESSE : ${layer.feature.properties.address}
            NOM : ${layer.feature.properties.name}
            Nombres de places : ${layer.feature.properties.nbDispo}
            capacité maximum : ${layer.feature.properties.capacity}
          `);
          allData.addTo(map);
        });
      } else {
        console.log('Mauvaise réponse du réseau.');
      }
    })
    .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
    });
};

parking.addEventListener('change', () => {
  if (parking.checked) {
    fetchData(url, "parking");
    console.log("parking")
  } else {
    map.removeLayer(allData);
    console.log("no parking")
  }
});

velo.addEventListener('change', () => {
  if (velo.checked) {
    fetchData(url, "bike");
    console.log("velo")
  } else {
    map.removeLayer(allData);
    console.log("no velo")
  }
});

bus.addEventListener('change', () => {
  if (bus.checked) {
    fetchData(url, "busPoint");
  } else {
    map.removeLayer(allData);
  }
});

busLine.addEventListener('change', () => {
  if (busLine.checked) {
    fetchData(url, "LineString");
  } else {
    map.removeLayer(allData);
  }
});

window.addEventListener('load', (event) => {
    parking.checked = true;
    fetchData(url, "parking");
    bus.checked = false;
    busLine.checked = false;
    velo.checked = false;
});