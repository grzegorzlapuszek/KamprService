export interface ICar{
    color:string,
    model:string,
    topSpeed?: number
}

const car1 : ICar = {
    color : 'Blue',
    model : 'BMW'
};

const car2 : ICar = {
    color:"Dark",
    model:'Mercedes',
    topSpeed: 200
};

export const cars = [car1, car2];