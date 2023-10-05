import { getCrimeType, getEvents } from './data.js';


export async function showMarker(name) {
    console.log('type crime: ' ,name)
 const crimes =  await getCrimeType()
 const events = await getEvents()

 console.log('crimes',crimes )
 console.log('events',events )
const arr=[]
 crimes.map( item => {
    console.log(item, item.id)
    for( let key in  events) {
        console.log('value', key)
        if (Array.isArray(events[key])) {
            for (const value of events[key]) {
                console.log(value.affected_type);
                if(value.affected_type) {
                    arr.push(value)
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
                console.log('arr', arr)
        }
    }
 })
}

