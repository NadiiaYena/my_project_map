// "use strict";
// import { getCrimeType, getEvents } from './data.js';
// gogle.maps.event.addDomListener(window, 'load', initMap)

async function initMap() {
//   const myLatLng = {
//     lat: 50.450050354003906,
//     lng: 30.524044036865234
//   };
   let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: new google.maps.LatLng(50.4813883,30.5715489,9.86),
    fullscreenControl: false,
    zoomControl: true,
    streetViewControl: false,
    language: 'en',
    styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#181818"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1b1b1b"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#2c2c2c"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8a8a8a"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#373737"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3c3c3c"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#4e4e4e"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#000000"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3d3d3d"
            }
          ]
        }
      ]
  });

  const iconBase = 'img/'
  const icon = {
    19 : {
        url: iconBase +'2.png', //"Human losses" 
        scaledSize: new google.maps.Size(15, 15)
     }, 
    30 : {
        url: iconBase +'1.png', // "Death of an individual",
        scaledSize: new google.maps.Size(15, 15)
    },
    31 : {
        url: iconBase +'3.png',  //"Those wounded or whose health was otherwise damaged",
        scaledSize: new google.maps.Size(15, 15)
    },

    32 : {
        url: iconBase +'4.png',  //"Disappearance of an individual",
        scaledSize: new google.maps.Size(15, 15)
    },

    33 : {
        url: iconBase +'5.png',  //"Rape",
        scaledSize: new google.maps.Size(15, 15)
    },

    34 : {
        url: iconBase +'6.png',  //"Violation of other rights"
    scaledSize: new google.maps.Size(15, 15)
    },

  }

//  const markers = []
  const items = document.getElementsByClassName('itemFilterDown')
  console.log('itemFilterDown', items)
  for ( let i of items) {
    i.addEventListener('click', function () {
        console.log('add fjfhfhfhfj marker!!!!!')
        const idItem = i.id.split('-')
        const name = i.id
        const id = idItem[0]
        const affected_name = idItem[1]
        console.log('idItem', idItem, id)
        const position = showMarker(name, id) 
        const events = []
        const affected_names = []
        const names = getCrimeType()
        names.then(data=>{
            console.log('names data', data.crimeType, data.eventTypes)
            
                console.log( 'data.crimeType', data.crimeType)
                for (let el of data.crimeType){
                    console.log(el)
                    affected_names.push(el)
                }
                for (let el of data.eventTypes){
                    events.push(el)
                }

            
            console.log('event and affected_name',  events, affected_names)
        }).catch (error => {
            // Обробка помилок, якщо вони виникли під час виконання проміса
            console.error(error);
          });
        console.log('names', names)
        
        console.log('position', position)
        position.then(data => {
            // data - це масив об'єктів, який ви отримали з проміса
            console.log(data);
            for (let el of data) {
                console.log('el', el)
                console.log('icon', icon[el.affected_type])
                const lat = el.lat 
                const lng = el.lon 
                const numberEvent = el.event

                let eventName = ''
                for( let el of events) {
                    // console.log('el of events', Number(el.event.id), numberEvent, el.event.name)
                    if(Number(el.event.id) == numberEvent){
                        console.log('eventName = el.event.name')
                        eventName = el.event.name
                        console.log('eventName', eventName)
                    }
                }

                // const eventName = events[el.event] 
                console.log('eventName', eventName)

                
                const marker = new google.maps.Marker({

                    position: new google.maps.LatLng(lat, lng),
                    icon: icon[el.affected_type],
                    map: map,
                    // title: 'My place',
                    type: 'info',
                    // label: {
                        // text: eventName,
                        // color: 'white',
                    // }
                    title: eventName
                  });
            }
            // console.log('marker', marker)
          }).catch(error => {
            // Обробка помилок, якщо вони виникли під час виконання проміса
            console.error(error);
          });
        // const marker = new google.maps.Marker({

        //     position: userLatLng,
        //     map: map,
        //     title: 'My place'
        //   });

    })
  
  
  }
//спочатку додати маркери до групи
  document.getElementById('clearFilter').addEventListener( 'click', function(){
    console.log('clear markers')
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    
    // Очищення масиву маркерів
    markers = [];
    // markerGroup.clearLayers();
  })
  

  document.getElementById('getLocationButton').addEventListener('click', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var userLatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          // Створіть новий маркер та встановіть його на карту
          const marker = new google.maps.Marker({

            position: userLatLng,
            map: map,
            title: 'My place'
          });


          // Перемістіть карту до нових координат користувача
          map.setCenter(userLatLng);
        });
      } else {
        alert('Geolocation is not supported in your browser.');
      }
})
}





window.initMap = initMap;

// отримуємо данні =====

const events = '/data/events.json'
console.log(events)
const names = '/data/names.json'
console.log(names)

// випадки, кількість, позиція
async function getEvents() {
    try {
        const response = await fetch(events)
        const data = await response.json();
        console.log(data)
        return data
}
    catch(error) {
        console.error('Помилка завантаження JSON-файлу:', error);
        return []
  }
};
// назва і айді злочину, назва і айді події
async function getCrimeType() {
    try {
        const response = await fetch(names);
        const data = await response.json();
        console.log('data', data)
        const obj = data[0].affected_type;
        const events = data[0].event
        console.log('events', events)
        // const crimeType = Object.keys(obj).map((id) => ({
        //     [id]: {
        //       description: obj[id],
        //     },
        //   }));
          
        //   const eventTypes = Object.keys(events).map((id) => ({
        //     [id]: {
        //       name: events[id],
        //     },
        //   }));
          
        //   console.log('crimeType', crimeType);
        //   console.log('eventTypes', eventTypes);
              
        const crimeType = [];
        const eventTypes = []
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                crimeType.push({ crime_type: {id: key, description: obj[key] }});
            }
        }
        for (const key in events) {
            eventTypes.push({event: {id: key, name: events[key]}})
        }
        // crimeType.push({'event_name': events})
        console.log('crimeType', crimeType)
        console.log('eventTypes', eventTypes)

        return { crimeType, eventTypes };
        // return crimeType;
    } catch (error) {
        console.error('Помилка завантаження JSON-файлу:', error);
        return [];
    }
}

// прослуховую кнопки =====

// document.addEventListener('DOMContentLoaded', async function() {

// const item0 = document.getElementById('item0')
// console.log('item0', item0)

// item0.addEventListener('click', function () {
//     console.log('add fjfhfhfhfj marker!!!!!')
// })




// })

async function showMarker(name, id) {
    console.log('type crime: ', name, id)
 const crimes =  await getCrimeType()

 console.log('crimes', crimes)
 const events = await getEvents()

 console.log('crimes',crimes )
 console.log('events',events )
const arr=[]
 crimes.crimeType.map( item => {
    console.log(item)
    for( let key in  events) {
        // console.log('value', key)
        if (Array.isArray(events[key])) {
            for (const value of events[key]) {
                // console.log(value.affected_type);
                if(value.affected_type) {
                    // console.log(value.affected_type);

                    if (value.affected_type === Number(id)) {
                        // console.log('pushhhhhhh', value)
                        arr.push(value)
                    }
                       

                    // addMarker(value.lat, value.lon, value.event)
                    // const myPos = {
                    //     lat: value.lat,
                    //     lng: value.lon
                    //   };
                    // new google.maps.Marker({

                    //     position: myPos,
                    //     map: map,
                    //     title: value.event,
                    //     icon: <div class="markerColor"></div>
                    //   });
                }
                }
                
        }
    }
 })
 console.log('arr', arr)
 return arr
}

function addMarker(lat, lng, title) {
    console.log(' function addMarker')
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

