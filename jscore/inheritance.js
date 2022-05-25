function Car(fuelType, makeYear){
    this.fuelType = fuelType;
    this.makeYear = makeYear;
}

function BMW(name, fuelType, makeYear){
    Car.call(this, fuelType, makeYear);
    this.name = name;
}

BMW.prototype = new Car();
BMW.prototype.constructor = BMW;