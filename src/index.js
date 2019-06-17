import _ from 'lodash';
import './assets/css/style.css';
import Icon from './assets/images/logo.png';
import("./call")
// import call from './call'
// import printMe from './print.js'
// import an from './another'

// printMe();
// an();
// call();
function component() {
    var element = document.createElement('div');
    var btn = document.createElement("button");
    var myIcon = new Image();
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    btn.innerHTML = 'Click me and check the console!';
    // btn.onclick = (e) => import(/* webpackChunkName: "print" */ './print.js').then(res => {
    //     var print = res.default;
    //     print();
    // });

    element.classList.add('hello');

    myIcon.src = Icon;
    element.appendChild(myIcon);
    element.appendChild(btn);

    return element;
}

// document.body.appendChild(component());
let element = component();
document.body.appendChild(element);

// if (module.hot) {
//     module.hot.accept('./print.js', function () {
//         console.log('Accepting the updated printMe module!');
//         // printMe();
//         document.body.removeChild(element);
//         element = component();
//         document.body.appendChild(element);
//     })
// }