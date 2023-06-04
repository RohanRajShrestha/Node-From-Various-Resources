import { randomUUID } from "node:crypto"
/**
 * We create entities to map out the data
*/


export default class Hero {
    constructor({name, age, power}) {
        this.id = randomUUID(),
        this.name = name,
        this.age = age,
        this.power = power
    }
}

