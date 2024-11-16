console.log(usedCars)


const carMakeRange = usedCars.map(car => car.make);
const yearRange = usedCars.map(car => car.year);
const mileageRange = usedCars.map(car => car.mileage);
const priceRange = usedCars.map(car => car.price);
const colorRange = usedCars.map(car => car.color);

console.log(carMakeRange);
console.log(yearRange);
console.log(mileageRange);
console.log(priceRange);
console.log(colorRange);

const minYear = Math.min(...mileageRange);
const maxYear = Math.max(...mileageRange);

console.log(minYear);
console.log(maxYear)