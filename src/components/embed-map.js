// var GoogleMapsLoader = require('google-maps');
// GoogleMapsLoader.KEY = 'AIzaSyDObqWvYRenuA4KR-Byx-sdXiNWJ8pQHPA'

module.exports = function embedMap(el, props) {
  function initMap(){
    const map = new google.maps.Map(el, {
      center: props.cityCoordinates,
      zoom: 12
    });

    new google.maps.Marker({
      position: props.coordinates,
      map: map
    });
  }
google.maps.event.addDomListener(window, 'load', initMap);
}
