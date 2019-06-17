import call from './call'

call();
console.log('The print.js module has loaded! See the network tab in dev tools...');
export default function printMe() {
    cosnole.error('I get called from print.js!');
}