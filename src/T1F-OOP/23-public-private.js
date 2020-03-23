/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author       F. de Sande
 * @since 20.feb.2020
 * @desc Private and protected properties and methods
 * @tutorial {@link https://javascript.info/private-protected-properties-methods#protecting-wateramount}
 */

"use strict"

/**
 * NOTE: waterAmount has been moved into the constructor to work on NodeJS
 */
class CoffeeMachine {
  set waterAmount(value) {
    if (value < 0) throw new Error("Negative amount of water");
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
    this.waterAmount = 0;		// Call the setter
    console.log( `Created a coffee-machine, power: ${power}` );
  }

}

// Create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

// Add water
coffeeMachine.waterAmount = -10; // Error: Negative water
coffeeMachine.waterAmount = 10; // Error: Negative water
