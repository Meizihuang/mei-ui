'use strict';
import './index.css';
import "./index.html";

console.log("in")
console.log(1);

function jumpto() {
    var btn = document.querySelector(".button");

    btn.onclick = function (e) {
        console.info("***************");
        // console.log("funck")
        // window.location.href = "./news.html";
    }
}
jumpto();