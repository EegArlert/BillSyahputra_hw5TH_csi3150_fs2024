/*
THINGS TO DO:

1. Create Function for creating individual Card content ----DONE

2. Create Function that appendChild to the Card Parent Wrapper ----DONE

3. Process all colors and car makes so it can be listed for fitltering method

4. Process the Form and store each value to a variable

5. Create a sorting method per filter

6. Finish Styling
*/

function createHtmlElement(elementTag, className) {
    const anElement = document.createElement(elementTag);
    anElement.classList.add(className);
    return anElement;
}

//-----------------------CARD CONTENT START---------------------------------------//
function createCard(year, make, model, mileage, price, color, gasMileage, imagePath) {

    //card wrapper
    const cardWrapper = createHtmlElement('div', 'card-wrapper');

    //card image container --child card wrapper
    const imageContainer = createHtmlElement('div', 'image');
    imageContainer.style.background = `no-repeat center url(${imagePath})`;
    imageContainer.style.backgroundSize = 'cover';


    //card information container --child card wrapper --parent of card info
    const infoContainer = createHtmlElement('div', 'info-container');

    //appending image and information container to the card wrapper
    cardWrapper.appendChild(imageContainer);
    cardWrapper.appendChild(infoContainer);

    //all children of info container
    const cardInfoHeading = document.createElement('h5');
    cardInfoHeading.innerText = `${year} ${make} ${model}`;

    const cardInfoSubHeading = document.createElement('h6');
    cardInfoSubHeading.innerHTML = `${color} &nbsp; ${mileage} mil <br /> ${gasMileage}`;

    const cardInfoPrice = document.createElement('h3');
    //source of this function is from MDN Intl.NumberFormat();
    const priceFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: '0' }).format(price);
    cardInfoPrice.innerText = `${priceFormat}`;

    //appending all children info container to parent info container
    infoContainer.appendChild(cardInfoHeading);
    infoContainer.appendChild(cardInfoSubHeading);
    infoContainer.appendChild(cardInfoPrice);

    return cardWrapper;
}



function appendChildToParent(child, parent) {
    parent.appendChild(child);
}

//adding all car into individual cards with info
const parentContentCardWrapper = document.querySelector('.parent-content-card-wrapper');

usedCars.forEach((car) => {
    appendChildToParent(createCard(car.year, car.make, car.model, car.mileage, car.price, car.color, car.gasMileage, car.imagePath), parentContentCardWrapper);
});

//-----------------------CARD CONTENT END---------------------------------------//


//-----------------------FILTER WRAPPER FUNCTION START---------------------------------------//

const carsColor = usedCars.map(car => car.color);

// adding type of color and make to filter option function

//Filtering duplicate color
const availableColor = [];

for (let i = 0; i < carsColor.length; i++) {
    if (availableColor.includes(carsColor[i])) {
        continue;
    }
    availableColor.push(carsColor[i]);
}

//function adding all filter color and car make type to the filter parent
function addColorRange(array, parentElement) {
    for (let i = 0; i < array.length; i++) {
        const li = createHtmlElement('li', `color`);
        li.innerText = `${array[i]}`;

        const input = createHtmlElement('input', `input-color`);
        input.type = 'checkbox';
        li.appendChild(input);

        const div = createHtmlElement('div', 'div-color');
        div.style.background = `${array[i]}`
        li.appendChild(div);

        parentElement.appendChild(li);
    };
};

const filterListColor = document.querySelector('.filter-list-color');

addColorRange(availableColor, filterListColor);


//adding type of make to filter option function
const carsMake = usedCars.map(car => car.make);

//Filtering duplicate color or car make
const availableCarMake = [];

for (let i = 0; i < carsMake.length; i++) {
    if (availableCarMake.includes(carsMake[i])) {
        continue;
    };
    availableCarMake.push(carsMake[i]);
};

//function adding all filter car make type to the filter parent
function addMakeRange(array, parentElement) {
    for (let i = 0; i < array.length; i++) {
        const li = createHtmlElement('li', `make`);
        li.innerText = `${array[i]}`;

        const input = createHtmlElement('input', `input-make`);
        input.type = 'checkbox';
        li.appendChild(input);

        parentElement.appendChild(li);
    }
}

const filterListMake = document.querySelector('.filter-list-make');

addMakeRange(availableCarMake, filterListMake);


// sorting filter function

const submitButton = document.querySelector('form button');

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.querySelector('form');

    if (form.checkValidity()) {
        console.log("The form is valid!");
    } else {
        // Show validation errors
        console.log("The form is invalid!");
        form.reportValidity();
    }

    //storing all numerical inputs
    const yearMin = parseInt(document.getElementById('year-input-min').value) || 0;
    const yearMax = parseInt(document.getElementById('year-input-max').value) || Infinity;
    const mileageMin = parseInt(document.getElementById('mileage-input-min').value) || 0;
    const mileageMax = parseInt(document.getElementById('mileage-input-max').value) || Infinity;
    const priceMin = parseInt(document.getElementById('price-input-min').value) || 0;
    const priceMax = parseInt(document.getElementById('price-input-max').value) || Infinity;

    //storing selected makes
    const selectedMakes = Array.from(document.querySelectorAll('.filter-list-make .input-make:checked')).map(
        (input) => input.parentElement.textContent.trim()
    );

    //storing selected colors
    const selectedColors = Array.from(document.querySelectorAll('.filter-list-color .input-color:checked')).map(
        (input) => input.parentElement.textContent.trim()
    );

    const filteredCars = usedCars.filter((car) => {
        return (
            car.year >= yearMin &&
            car.year <= yearMax &&
            car.mileage >= mileageMin &&
            car.mileage <= mileageMax &&
            car.price >= priceMin &&
            car.price <= priceMax &&
            (selectedMakes.length === 0 || selectedMakes.includes(car.make)) &&
            (selectedColors.length === 0 || selectedColors.includes(car.color))
        );
    });

    // Display results
    displayFilteredCars(filteredCars);
});

function displayFilteredCars(filteredCars) {
    const resultContainer = document.querySelector('.parent-content-card-wrapper');
    resultContainer.innerHTML = ''; // Clear previous results

    if (filteredCars.length === 0) {
        resultContainer.innerHTML = '<p>No cars found matching the filters.</p>';
        return;
    }

    filteredCars.forEach((car) => {
        const card = createCard(
            car.year,
            car.make,
            car.model,
            car.mileage,
            car.price,
            car.color,
            car.gasMileage,
            car.imagePath
        );
        appendChildToParent(card, resultContainer);
    });
}







//dropdown filter style toggle

document.querySelectorAll('.filter-container h3').forEach((header) => {
    header.addEventListener('click', function () {
        // Use `this` to reference the clicked header's sibling dropdown
        const dropDown = this.nextElementSibling;

        if (dropDown && dropDown.classList.contains('drop-down')) {
            dropDown.classList.toggle('active');
            this.classList.toggle('active');
        }
    });
});












// console.log(usedCars)


// const carMakeRange = usedCars.map(car => car.make);
// const yearRange = usedCars.map(car => car.year);
// const mileageRange = usedCars.map(car => car.mileage);
// const priceRange = usedCars.map(car => car.price);
// const colorRange = usedCars.map(car => car.color);

// console.log(carMakeRange);
// console.log(yearRange);
// console.log(mileageRange);
// console.log(priceRange);
// console.log(colorRange);

// const minYear = Math.min(...mileageRange);
// const maxYear = Math.max(...mileageRange);

// console.log(minYear);
// console.log(maxYear)