const events = '/data/events.json'
console.log(events)
const names = '/data/names.json'
console.log(names)


export async function getEvents() {
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

  export async function getCrimeType() {
    try {
        const response = await fetch(names);
        const data = await response.json();
        const obj = data[0].affected_type;
        const crimeType = [];
        
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                crimeType.push({ id: key, description: obj[key] });
            }
        }
        
        return crimeType;
    } catch (error) {
        console.error('Помилка завантаження JSON-файлу:', error);
        return [];
    }
}
  

