import _ from 'lodash';
// import printMe from './print.js';
// import call from './call'
import("./call")


// printMe();
// call();
export default function() {
    console.log(
        _.join(['Another', 'module', 'loaded!'], ' ')
    );
}
