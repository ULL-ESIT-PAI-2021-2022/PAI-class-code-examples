/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author F. de Sande
 * @since 20.feb.2020, 26.02.2021
 * @version 2
 * @desc ES6 Object Oriented Analog Canvas based Clock
 * @tutorial Adapted from {@link https://www.w3schools.com/graphics/canvas_clock.asp}
 * Also, check out {@link https://gist.github.com/fixiecoder/a6146501aaa8ad3bf885fa30a66ba079}
 */

'use strict';

/**
 * An ES6 class representing an analog clock that is drawn on a page using HTML Canvas
 * @class
 */
class Clock {
  /** @private */
	/** All properties are private */
	/** All the properties will be defined in the constructor */
  #centerX = undefined;
  #centerY = undefined;
  #radius = undefined;
  #hands = {};
  #canvas = document.createElement("CANVAS");  // A new HTML element
	#ctx = this.#canvas.getContext('2d');

  /**
   * Create a clock
	 * @constructor
	 * @public
   * @param {object} containerElement - The HTML element that contains the clock
   * @param {number} size - Size in pixels of the square in which the clock is inscribed
   */
  constructor(containerElement, size) {
    this.#radius = 0.95 * (size / 2);
    this.#hands = {
      second: {
        length: this.#radius * 0.90,
        color: 'lightgrey',
        width: this.#radius * 0.01
      },
      minute: {
        length: this.#radius * 0.90,
        color: 'darkgrey',
        width: this.#radius * 0.03
      },
      hour: {
        length: this.#radius * 0.7,
        color: 'black',
        width: this.#radius * 0.05
      }
    };
    this.#canvas.width = size;
    this.#canvas.height = size;
    containerElement.appendChild(this.#canvas);
    this.#centerX = this.#canvas.width / 2;
    this.#centerY = this.#canvas.height / 2;
    this.#ctx.translate(this.#centerX, this.#centerY);

    this.render = this.render.bind(this);
    this.render(0, this.#ctx);
  }

  /**
   * Draws the clock face
   * @param {Object} ctx - Canvas Drawing Context
   */
  #drawClockFace(ctx) {
	  const FILL_STYLE = '#333';
    ctx.beginPath();
    ctx.arc(0, 0, this.#radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    // Create a radial gradient (95% and 105% of radius):
    //                 createRadialGradient(x0, y0, r0,                 x1, y1, r1);
    let gradient = ctx.createRadialGradient(0,   0, this.#radius * 0.95, 0,  0, this.#radius * 1.05);

		// Create 3 color stops, corresponding with the inner, middle, and outer edge of the arc:
    gradient.addColorStop(0, FILL_STYLE);
    gradient.addColorStop(0.5, 'white');
    gradient.addColorStop(1, FILL_STYLE);

    // Define the gradient as the stroke style of the drawing object:
    ctx.strokeStyle = gradient;
    ctx.lineWidth = this.#radius * 0.1;
    ctx.stroke();

    // Draw the cental black button
    ctx.beginPath();
    ctx.arc(0, 0, this.#radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = FILL_STYLE;
    ctx.fill();
  }

  /**
   * Draws the clock numbers
   * @param {Object} ctx - Canvas Drawing Context
   */
  #drawNumbers(ctx) {
    ctx.font = this.#radius * 0.15 + 'px arial';
    ctx.fillStyle = 'black';  // Numbers color
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    for(let hour = 1; hour <= 12; hour++){
      const RATIO = 0.85;         // 85%
      const ANGLE = hour * Math.PI / 6;  // Pi/6 = 2*Pi/12
      ctx.rotate(ANGLE);
      ctx.translate(0, -this.#radius * RATIO);
      ctx.rotate(-ANGLE);
      ctx.fillText(hour.toString(), 0, 0);
      ctx.rotate(ANGLE);
      ctx.translate(0, this.#radius * RATIO);
      ctx.rotate(-ANGLE);
    }
  }

  /**
   * Draws each of the clock hands
   * @param {string} handType- Hand type ('second' | 'minute' | 'hour')
   * @param {Object} ctx - Canvas Drawing Context
   */
  #drawHand(handType, ctx) {
    const NOW = new Date();
    const SECONDS = NOW.getSeconds();
    const MINUTES = NOW.getMinutes();
    const HOURS = NOW.getHours() % 12;
    const HAND = this.#hands[handType];
    let angle = 0;

	  switch(handType) {
		  case 'second':
			  angle = (SECONDS * Math.PI / 30);
			  break;
		  case 'minute':
			  angle = (MINUTES * Math.PI / 30) + (SECONDS * Math.PI / (30 * 60));
			  break;
		  case 'hour':
			  angle =  (HOURS * Math.PI / 6) + (MINUTES * Math.PI / (6 * 60)) + (SECONDS * Math.PI / (360 * 60));
			  break;
			default: 
			  throw new Error('Error in handType');
			  break;
		}
    ctx.beginPath();
    ctx.lineWidth = HAND.width;
    ctx.lineCap = 'round';
    ctx.strokeStyle = HAND.color;
    ctx.moveTo(0, 0);
    ctx.rotate(angle);
    ctx.lineTo(0, -HAND.length);
    ctx.stroke();
    ctx.rotate(-angle);
  }

  /**
   * Draws the clock hands 
   */
  #drawTime() {
    this.#drawHand('second', this.#ctx);
    this.#drawHand('minute', this.#ctx);
    this.#drawHand('hour', this.#ctx);
  }

  /**
   * Draws the clock and performs it's animation
   */
  render(time) {
    this.#drawClockFace(this.#ctx);
    this.#drawNumbers(this.#ctx);
    this.#drawTime();
  }
}

// https://www.w3schools.com/jsref/prop_doc_body.asp
// constructor(containerElement, size)
let clock = new Clock(document.body, 800);
