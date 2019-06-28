'use strict';
import './index.scss';

function jumpto() {
    var btn = document.querySelector(".button");

    btn.onclick = function (e) {
        console.info("***************");
        // console.log("funck")
        window.location.href = "./news.html";
    }
}
jumpto();