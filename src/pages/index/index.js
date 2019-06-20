'use strict';
import './index.css';

function jumpto() {
    var btn = document.querySelector(".button");
    btn.onclick = function (e) {
        console.info("in");
        window.location.href = "./news/index.html";
    }
}
jumpto();