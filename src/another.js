import _ from 'lodash';
import './assets/css/style.css';
import Icon from './assets/images/logo.png';
// import printMe from './print.js';
import call from './call'
// import("./call")


// printMe();
call();
console.log(Icon);
console.log("this form another js");
export default function () {
    console.log(
        _.join(['Another', 'module', 'loaded!'], ' ')
    );
}