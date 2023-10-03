import { getCrimeType } from './data.js';


document.addEventListener('DOMContentLoaded', async function() {
    const crimeType = await getCrimeType();
    class Filter {
        constructor(options) {
            this.container = document.createElement('div');
            this.container.classList.add('filterTypes');
            console.log( options)

            options.forEach((el, index) => {
                console.log('el', el )

                const item = document.createElement('div');
                item.classList.add('item');

                const input = document.createElement('input');
                input.classList.add('check');
                input.type = 'checkbox';
                input.id = index;

                const label = document.createElement('label');
                label.classList.add('label');
                label.setAttribute('for', index);
                label.textContent = el.description;

                item.appendChild(input);
                item.appendChild(label);

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
            item.appendChild(input);
            item.appendChild(label);

            this.container.appendChild(item);


        }

        appendTo(element) {
            console.log('element', element)
            element.appendChild(this.container);
        }
    }


    const container2 = document.getElementById('filterType');
    console.log('container2', container2)
    const filter1 = new Filter(crimeType);
    console.log('filter1', filter1)
    filter1.appendTo(container2);



    const commonCheckbox = document.getElementById('allCheckbox')
console.log(commonCheckbox)

const allCheckboxes = document.getElementsByClassName('check')
console.log(allCheckboxes)
console.log(allCheckboxes.length)


commonCheckbox.addEventListener('change', function(event) {
    const isChecked = event.target.checked;
    console.log('isChecked', isChecked)

    if (isChecked) {
        console.log('Чекбокс включений');
        for( let c of allCheckboxes) {
            c.checked= true
        }
    } else {
        for( let c of allCheckboxes) {
            c.checked= false
        }
        console.log('Чекбокс вимкнений');
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
