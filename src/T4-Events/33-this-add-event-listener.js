/**
  * Universidad de La Laguna
	* Escuela Superior de Ingeniería y Tecnología
	* Grado en Ingeniería Informática
	* Programación de Aplicaciones Interactivas
  *
  * @author F. de Sande
  * @since 14.may.2020
	* desc @desc Events. this in addEventListener
	*
	* this is an implicit parameter that is passed to every JavaScript function, including functions not defined in a class!
	* When used in an event handler, this is set to the element to which that event was added 
	*
  * @see {@link * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#As_a_DOM_event_handler}
*/

"use strict";

/**
  * @description MDN: When a function is used as an event handler, 
	*              its this is set to the element on which the listener is placed 
*/
function onClick() {
  console.log('Clicked!');
  console.log(this);
}

const button = document.querySelector('button');
button.addEventListener('click', onClick);
