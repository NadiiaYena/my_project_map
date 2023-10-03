// initMap();
export function addMarker(lat, lng, title) {
    if (typeof title !== 'undefined') {
        title = title.toString();
      } else {
        title = '111'; // За замовчуванням, якщо title не вказано або він є undefined
      }
    var marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      title: title,
      icon: '/img/circle30.png',
      label: {
        text: 'my text',
        color: 'white'
      }

    });
  }
