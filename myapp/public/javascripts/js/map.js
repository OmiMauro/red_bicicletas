var mymap = L.map('mapa').setView([-27.0416353, -55.2300104], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);
var marker = L.marker([-27.04311, -55.22711]).addTo(mymap);