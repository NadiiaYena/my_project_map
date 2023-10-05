// "use strict";
// gogle.maps.event.addDomListener(window, 'load', initMap)

async function initMap() {
   let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
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
    const initialSize = new google.maps.Size(3, 3);
    const icon = {
        19 : {
            url: iconBase +'2.png', //"Human losses" 
            scaledSize: initialSize
        }, 
        30 : {
            url: iconBase +'1.png', // "Death of an individual",
            scaledSize: initialSize
        },
        31 : {
            url: iconBase +'3.png',  //"Those wounded or whose health was otherwise damaged",
            scaledSize: initialSize
        },

        32 : {
            url: iconBase +'4.png',  //"Disappearance of an individual",
            scaledSize: initialSize
        },

        33 : {
            url: iconBase +'5.png',  //"Rape",
            scaledSize: initialSize
        },

        34 : {
            url: iconBase +'6.png',  //"Violation of other rights"
        scaledSize: initialSize
        },
    }
    const newSize = new google.maps.Size(17, 17); 

    const label = null
    const markers = []

    const names = await getCrimeType();
    const position = await getEvents();
    const events = []
    const affected_names = []


    for (let el of names.crimeType){
        // console.log(el)
        affected_names.push(el)
    }
    for (let el of names.eventTypes){
        events.push(el)
    }

  const items = document.getElementsByClassName('itemFilterDown')

    for ( let i of items) {
        // i.addEventListener('click', function () {
        console.log('add all markers!!!!!')
        const idItem = i.id.split('-')
        // const name = i.id
        const id = idItem[0]
        // const affected_name = idItem[1]
        console.log('idItem', idItem, id)
        const positionForMarkers = []
        // let region = null
        for( let key in  position) {
            // region = key
            // console.log('value', data, key)
            if (Array.isArray(position[key])) {
                for (const value of position[key]) {
                    // console.log(value.affected_type);
                    if(value.affected_type) {
                        // console.log(value);
                        if (value.affected_type === Number(id)) {
                            const val = {...value, region: key}
                            // console.log('pushhhhhhh', value.affected_type === Number(id))
                            positionForMarkers.push(val)
                        }
                    }
                }
                    
            }
        }
            
        // console.log('positionForMarkers',positionForMarkers)


        for (let el of positionForMarkers) {
            // console.log('add marker!', el)
            // console.log('icon', icon[el.affected_type])
            const lat = el.lat 
            const lng = el.lon 
            const numberEvent = el.event
            // console.log('lat lng numberEvent', lat, lng, numberEvent)

            let eventName = ''
            for( let el of events) {
                // console.log('el of events', Number(el.event.id), numberEvent, el.event.name)
                if(Number(el.event.id) == numberEvent){
                    // console.log('eventName = el.event.name')
                    eventName = el.event.name
                    // console.log('eventName', eventName)
                }
            }

            // addMarker(lat, lng, icon, eventName)
            const marker = new google.maps.Marker({

                position: new google.maps.LatLng(lat, lng),
                icon: icon[el.affected_type],
                map: map,
                // title: 'My place',
                type: el.region,
                label: label,
                title: eventName,
                id: el.affected_type
            });
            // console.log('marker added')
            markers.push(marker)
        }
console.log(markers)

        i.addEventListener('click', function () {
            console.log('click on button', i.id)
            const idItem = i.id.split('-')
            const id = idItem[0]*1
            // console.log('id-',id )                

            // const newSize = new google.maps.Size(17, 17); 

            markers.map(item=> {
                let itemId = item.id
                // console.log('markers map for marker, item.id - ', item.id,' id-,',id)
                if (itemId == id) {
                    // console.log('item == id  change size big', item.id,id )                
                    item.setIcon({
                        url: icon[id].url,
                        scaledSize: newSize,
                    })
                    item.setLabel({
                        text: id.toString(),
                        color: 'white'
                    })
                } else {
                    // console.log('item != id change size small', item.id, id )                
                    item.setIcon({
                        url: icon[itemId].url,
                        scaledSize: initialSize, 
                    })
                    item.setLabel(null)
                }
                // console.log('end level')
            })
            
        })

    }


    const dropdownItems = document.querySelectorAll('.dropdown-item');
const checkboxes = document.querySelectorAll('.check');
const allCheck = document.getElementById('allCheckbox');
const buttonRegion = document.getElementById('All States');
// const markers = []; // Припустимо, що у вас є масив з маркерами

let selectedValueRegion = null;
let numberCrime = null;
let itemCheck;


dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        console.log('dropdownItems-', item.textContent )
        selectedValueRegion = item.textContent;
        buttonRegion.textContent = selectedValueRegion;
        updateMarkers();
    });
});

checkboxes.forEach(check => {
    check.addEventListener('click', () => {
        itemCheck = check.checked
        numberCrime = parseInt(check.id.split('-')[0]);
        // console.log('itemCheck numberCrime', itemCheck, numberCrime)

        updateMarkers();
    });
});

allCheck.addEventListener('click', () => {
    checkboxes.forEach(check => {
        check.checked = allCheck.checked;
    });
    numberCrime = allCheck.checked ? null : parseInt(checkboxes[0].id.split('-')[0]);
    updateMarkers();
});

function updateMarkers() {
    markers.forEach(item => {
        for (let check of checkboxes) {
            numberCrime = parseInt(check.id.split('-')[0]);

            if (selectedValueRegion && item.type === selectedValueRegion) {
                console.log(selectedValueRegion, item.type)

                if (item.id === numberCrime && check.checked && !item.label) {
                    item.setIcon({
                        url: icon[item.id].url,
                        scaledSize: newSize,
                    });
                    item.setLabel({
                        text: item.id.toString(),
                        color: 'white',
                    });
                } else if (item.id === numberCrime && !check.checked && item.label){
                    item.setIcon({
                        url: icon[item.id].url,
                        scaledSize: initialSize,
                    });
                    item.setLabel(null);
                // } else {
                //     item.setIcon({
                //         url: icon[item.id].url,
                //         scaledSize: newSize,
                //     });
                //     item.setLabel({
                //         text: item.id.toString(),
                //         color: 'white',
                //     });
                }
            }
                else if(!selectedValueRegion){
                    console.log('!selectedValueRegion-', !selectedValueRegion)
                if (item.id === numberCrime && check.checked && !item.label) {
                    item.setIcon({
                        url: icon[item.id].url,
                        scaledSize: newSize,
                    });
                    item.setLabel({
                        text: item.id.toString(),
                        color: 'white',
                    });
                } else if (item.id === numberCrime && !check.checked && item.label){
                    item.setIcon({
                        url: icon[item.id].url,
                        scaledSize: initialSize,
                    });
                    item.setLabel(null);
                }

        } 
        else {
            item.setIcon({
                url: icon[item.id].url,
                scaledSize: initialSize,
            });
            item.setLabel(null);
        }
    }
    });
}


// Додаємо обробник події для кнопки "Очистити фільтр"
document.getElementById('clearFilter').addEventListener('click', () => {
    selectedValueRegion = null;
    numberCrime = null;
    buttonRegion.textContent = buttonRegion.id;
    checkboxes.forEach(check => {
        check.checked = false;
    });
    allCheck.checked = false;
    updateMarkers();
});

  
//     const dropdownItems = document.getElementsByClassName('dropdown-item')
//     let selectedValueRegion = null
//     let nubmerCrime = null
//     console.log('selectedValueRegion', selectedValueRegion)
//     for (let item of dropdownItems) {
//         item.addEventListener('click', ()=>{
//             selectedValueRegion = item.textContent;
//             // console.log(selectedValue);
//             for( let key in  position) {
//                 if( key == selectedValueRegion) { 
//                     markers.map(item=>{
//                         // console.log('key - item', key, item.type)
//                         if(key == item.type){
//                             item.setIcon({
//                                 url: icon[item.id].url,
//                                 scaledSize: newSize,
//                             })
//                             item.setLabel({
//                                 text: item.id.toString(),
//                                 color: 'white'
//                             })
//                         } else { 
//                         item.setIcon({
//                             url: icon[item.id].url,
//                             scaledSize: initialSize, 
//                         })
//                         item.setLabel(null)
//                         }
//                     })
//                 }

//             }
//         })
//     }

//     const checkboxes = document.getElementsByClassName('check')
//     console.log('checkboxes', checkboxes)
//     for( let check of checkboxes) {
//         check.addEventListener('click', function() {
//             console.log(check.id, 'checked:', check.checked)
//             const idItem = check.id.split('-')
//             const id = idItem[0]*1
//             nubmerCrime = id
//             console.log(id, 'check')
//             if (selectedValueRegion){
//                 console.log('selectedValueRegion', selectedValueRegion)
//                 markers.map(item=>{
//                     if(id == item.id && selectedValueRegion == item.type){
//                         console.log('item', item.id, !item.label)
//                         if(check.checked && !item.label){ 
//                                     item.setIcon({
//                                         url: icon[id].url,
//                                         scaledSize: newSize,
//                                     })
//                                     item.setLabel({
//                                         text: item.id.toString(),
//                                         color: 'white'
//                                     })
//                         } else if (check.checked && item.label){
//                             return
//                         } else if(!check.checked && item.label){
//                             item.setIcon({
//                                 url: icon[id].url,
//                                 scaledSize: initialSize, 
//                             })
//                             item.setLabel(null)
//                         } else {
//                             return
//                         }
//                     } else {
//                         return
//                     }
    
//                 })
    
//             } else {
//                 markers.map(item=>{
//                     if(id == item.id){
//                         console.log('item', item.id, !item.label)
//                         if(check.checked && !item.label){ 
//                                     item.setIcon({
//                                         url: icon[id].url,
//                                         scaledSize: newSize,
//                                     })
//                                     item.setLabel({
//                                         text: item.id.toString(),
//                                         color: 'white'
//                                     })
//                         } else if (check.checked && item.label){
//                             return
//                         } else if(!check.checked && item.label){
//                             item.setIcon({
//                                 url: icon[id].url,
//                                 scaledSize: initialSize, 
//                             })
//                             item.setLabel(null)
//                         } else {
//                             return
//                         }
//                     } else {
//                         return
//                     }
    
//                 })
    

//             }

      
//         })
//     }

//     const allCheck = document.getElementById('allCheckbox')
//     allCheck.addEventListener('click', function(){
//         console.log('allCheck', allCheck, allCheck.checked)
//         markers.map(item=>{
//             if(allCheck.checked && !item.label){
//                 console.log('allCheck.checked && !item.label')
//                 item.setIcon({
//                     url: icon[item.id].url,
//                     scaledSize: newSize,
//                 })
//                 item.setLabel({
//                     text: item.id.toString(),
//                     color: 'white'
//                 })
//             } else if(!allCheck.checked && item.label) {
//                 console.log('!allCheck.checked && item.label')

//                 item.setIcon({
//                     url: icon[item.id].url,
//                     scaledSize: initialSize, 
//                 })
//                 item.setLabel(null)

//             } else {
//                 console.log('!allCheck.checked && !item.label')

//                 return
//             }
//         })
//     })

// const buttonRegion = document.getElementById('All States')
// console.log(buttonRegion.id)
//     document.getElementById('clearFilter').addEventListener( 'click', function(){
//         console.log('clear markers')
//         for( let check of checkboxes) {
//             check.checked = false
//         }
//         for (let item of dropdownItems) {
//             buttonRegion.textContent = buttonRegion.id
//         }
//         allCheck.checked = false

//         markers.map(item=> {
//             item.setIcon({
//                 url: icon[item.id].url,
//                 scaledSize: initialSize, 
//             }),
//             item.setLabel(null)
//         })
    
    
//       })
        
    document.getElementById('getLocationButton').addEventListener('click', function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var userLatLng = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                const marker = new google.maps.Marker({
                    position: userLatLng,
                    map: map,
                    title: 'My place'
                });

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
        // console.log('data', data)
        const obj = data[0].affected_type;
        const events = data[0].event
        // console.log('events', events)
              
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
        // console.log('crimeType', crimeType)
        // console.log('eventTypes', eventTypes)

        return { crimeType, eventTypes };
    } catch (error) {
        console.error('Помилка завантаження JSON-файлу:', error);
        return [];
    }
}


