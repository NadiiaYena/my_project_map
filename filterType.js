import { getCrimeType, getEvents } from './data.js';


document.addEventListener('DOMContentLoaded', async function() {
    const crimeType = await getCrimeType();
    const events = await getEvents();

    class Filter {
        constructor(options) {
            // console.log('options', options, events)
            this.container = document.createElement('div');
            this.container.classList.add('filterTypes');
            // console.log( options)
            let countEventAll = 0
            options.forEach((el, index) => {
                // console.log('el Filter', el )
                let countEvents = 0
                const id = Number(el.id)
                for (let key in events){ 
                if (Array.isArray(events[key])) {
                    // console.log(Array.isArray(events[key]))
                    for (const value of events[key]) {
                        // console.log(id, value.affected_type);
                        if(value.affected_type == id) {
                            countEvents++
                            countEventAll++
                            // console.log('value.affected_type')
                        }
                    }
                }
            }
                const item = document.createElement('div');
                item.classList.add('item');

                const input = document.createElement('input');
                input.classList.add('check');
                input.type = 'checkbox';
                input.id = el.id + '-checkbox';

                const label = document.createElement('label');
                label.classList.add('label');
                label.setAttribute('for', index);
                label.textContent = el.description;
                const count = document.createElement('p');
                count.classList.add('countText');
                count.id = el.id + '-countText'
                count.textContent = countEvents;

                item.appendChild(input);
                item.appendChild(label);
                item.appendChild(count);

                this.container.appendChild(item);
            });
            const item = document.createElement('div');
            item.classList.add('item');

            const input = document.createElement('input');
            input.classList.add('all');
            input.type = 'checkbox';
            input.id = 'allCheckbox';

            const label = document.createElement('label');
            label.classList.add('label');
            label.setAttribute('for', 'allCheckbox');
            label.textContent = 'All';
            const countAll = document.createElement('p');
            countAll.classList.add('countText');
            countAll.id = 'countAll'
            countAll.textContent = countEventAll;

            item.appendChild(input);
            item.appendChild(label);
            item.appendChild(countAll);

            this.container.appendChild(item);


        }

        appendTo(element) {
            // console.log('element', element)
            element.appendChild(this.container);
        }
    }


    const container2 = document.getElementById('filterType');
    // console.log('container2', container2)
    const filter1 = new Filter(crimeType, events);
    // console.log('filter1', filter1)
    filter1.appendTo(container2);



    const commonCheckbox = document.getElementById('allCheckbox')
// console.log(commonCheckbox)

const allCheckboxes = document.getElementsByClassName('check')
// console.log(allCheckboxes)
// console.log(allCheckboxes.length)


commonCheckbox.addEventListener('change', function(event) {
    const isChecked = event.target.checked;
    // console.log('isChecked', isChecked)

    if (isChecked) {
        // console.log('Чекбокс включений');
        for( let c of allCheckboxes) {
            c.checked= true
        }
    } else {
        for( let c of allCheckboxes) {
            c.checked= false
        }
        // console.log('Чекбокс вимкнений');
    }
});
// let check = 0;
for (let ch of allCheckboxes) {
    ch.addEventListener('change', function() {
        let check = 0;
        for (let checkbox of allCheckboxes) {
            if (checkbox.checked) {
                check++;
            }
        }
        commonCheckbox.checked = (check === allCheckboxes.length);
    });
}

})
