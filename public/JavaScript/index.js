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
parking.addEventListener('change', function () {
    fetch(url).then(function (response) {
        if (response.ok) {
            response.json().then(function (elements) {
                allData = L.geoJSON(elements, {
                    filter: function (feature) {
                        if (parking.checked) {
                            return feature.properties.tag === "parking"
                        } else {
                            map.removeLayer(allData);
                        }
                    },
                    style: function (features) {
                        return {color: features.properties.color};
                    }
                }).bindPopup((layer) => {
                    return "ADRESSE : " + layer.feature.properties.address + "<br/>NOM : " + layer.feature.properties.name + "<br/>Nombres de places : " + layer.feature.properties.nbDispo + "<br/>capacité maximum : " + layer.feature.properties.capacity;
                });
                allData.addTo(map);
            });
        } else {
            console.log('Mauvaise réponse du réseau');
        }
    })
});

velo.addEventListener('change', function () {
    fetch(url).then(function (response) {
        if (response.ok) {
            response.json().then(function (elements) {
                allData = L.geoJSON(elements, {
                    filter: function (feature) {
                        if (velo.checked) {
                            return feature.properties.tag === "bike"
                        } else {
                            map.removeLayer(allData);
                        }
                    },
                    style: function (features) {
                        return {color: features.properties.color};
                    }
                }).bindPopup((layer) => {
                    return "ADRESSE : " + layer.feature.properties.address + "<br/>NOM : " + layer.feature.properties.name + "<br/>Nombres de places : " + layer.feature.properties.nbDispo + "<br/>capacité maximum : " + layer.feature.properties.capacity;
                });
                allData.addTo(map);
            });
        } else {
            console.log('Mauvaise réponse du réseau');
        }
    })
});

bus.addEventListener('change', function () {
    fetch(url).then(function (response) {
        if (response.ok) {
            response.json().then(function (elements) {
                allData = L.geoJSON(elements, {
                    filter: function (feature) {
                        if (bus.checked) {
                            return feature.properties.tag === "busPoint"
                        } else {
                            map.removeLayer(allData);
                        }
                    },
                    style: function (features) {
                        return {color: features.properties.color};
                    }
                }).bindPopup((layer) => {
                    return "ADRESSE : " + layer.feature.properties.address + "<br/>NOM : " + layer.feature.properties.name + "<br/>Nombres de places : " + layer.feature.properties.nbDispo + "<br/>capacité maximum : " + layer.feature.properties.capacity;
                });
                allData.addTo(map);
            });
        } else {
            console.log('Mauvaise réponse du réseau');
        }
    })
});

busLine.addEventListener('change', function () {
    fetch(url).then(function (response) {
        if (response.ok) {
            response.json().then(function (elements) {
                allData = L.geoJSON(elements, {
                    filter: function (feature) {
                        if (busLine.checked) {
                            return feature.geometry.type === "LineString"
                        } else {
                            map.removeLayer(allData);
                        }
                    },
                    style: function (features) {
                        return {color: features.properties.color};
                    }
                }).bindPopup((layer) => {
                    return "ADRESSE : " + layer.feature.properties.address + "<br/>NOM : " + layer.feature.properties.name + "<br/>Nombres de places : " + layer.feature.properties.nbDispo + "<br/>capacité maximum : " + layer.feature.properties.capacity;
                });
                allData.addTo(map);
            });
        } else {
            console.log('Mauvaise réponse du réseau');
        }
    })
});

