import { getCrimeType } from './data.js';



document.addEventListener('DOMContentLoaded', async function() {
    const crimeType1 = await getCrimeType();

    class FilterCrimeDown {
        constructor(options) {
            this.container = document.createElement('div');
            this.container.classList.add('filterDown');
            console.log( options)

            options.forEach((el, index) => {
                console.log('el', el )

                const item = document.createElement('div');
                item.classList.add('itemFilterDown');
                item.id = el.id + '-' + el.description
                
                const divColor = document.createElement('div')
                divColor.classList.add('color'+index)
                divColor.id = 'color'+index

                const nameCrime = document.createElement('p')
                nameCrime.classList.add('textCrime')
                nameCrime.textContent = el.description
                // item.addEventListener('click', function() {
                //     console.log('show metka')
                //     showMarker(nameCrime.textContent)
                // })



                item.appendChild(divColor);
                item.appendChild(nameCrime);

                this.container.appendChild(item);
            });



        }

        appendTo(element) {
            console.log('element', element)
            element.appendChild(this.container);
        }
    }


    const container2 = document.getElementById('filterDownMain');
    console.log('container2', container2)
    const filter1 = new FilterCrimeDown(crimeType1);
    console.log('filter1', filter1)
    filter1.appendTo(container2);



}
)