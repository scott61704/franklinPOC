// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';
//import { loadHeader } from './lib-franklin.js';
//import { loadFooter } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');
console.log("DELAYED - at beginning")
  //loadHeader(document.querySelector('header'));
  //loadFooter(document.querySelector('footer'));

// add more delayed functionality here
