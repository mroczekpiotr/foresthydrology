const map = L.map('map').setView([52.4, 21.5], 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let forestLayer, riskLayer;
fetch('data/example.geojson')
  .then(r => r.json())
  .then(data => {
    forestLayer = L.geoJSON(data, {
      pointToLayer: (feature, latlng) => L.circleMarker(latlng, {radius:7, weight:2, fillOpacity:.8}),
      onEachFeature: (feature, layer) => {
        const p = feature.properties || {};
        layer.bindPopup(`<strong>${p.name || 'Forest site'}</strong><br>NDMI: ${p.ndmi ?? '—'}<br>Risk: ${p.risk ?? '—'}`);
      }
    }).addTo(map);
    riskLayer = L.geoJSON(data, {
      pointToLayer: (feature, latlng) => L.circleMarker(latlng, {radius:12, weight:1, fillOpacity:.12}),
      onEachFeature: (feature, layer) => layer.bindTooltip((feature.properties || {}).risk || 'Risk')
    });
  })
  .catch(() => {});

document.getElementById('forestLayer')?.addEventListener('change', e => {
  if (!forestLayer) return;
  e.target.checked ? forestLayer.addTo(map) : map.removeLayer(forestLayer);
});
document.getElementById('riskLayer')?.addEventListener('change', e => {
  if (!riskLayer) return;
  e.target.checked ? riskLayer.addTo(map) : map.removeLayer(riskLayer);
});