import call from './call'
import './assets/css/style.css';
import Icon from './assets/images/logo.png';
// import("./call")

call();
console.log(Icon);
console.log('The print.js module has loaded! See the network tab in dev tools...');
export default function printMe() {
    cosnole.error('I get called from print.js!');
}