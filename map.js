// function initMap() {
//
//   function createMap(coords, selector) {
//     var cityOptions = {
//       center:coords,
//       zoom: 12
//     };
//     return new google.maps.Map(document.getElementById(selector), cityOptions);
//   }
//
//   const melbourne = createMap({lat: -37.8136, lng: 144.9631}, 'map');
//   const canberra = createMap({lat: -35.280937, lng: 149.130009}, 'test');
//
//   // Add marker
//   function addMarker(coords, map) {
//     var marker = new google.maps.Marker({
//       position:coords,
//       map: map
//     })
//   }
//
//   addMarker({lat: -37.7971762, lng: 144.9855213}, melbourne)
//   addMarker({lat: -35.279115, lng: 149.126466}, canberra)
//
// }
