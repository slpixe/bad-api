// document.addEventListener("DOMContentLoaded", function() {
//     // Button states
//     const getBtn = document.getElementById("get-btn");
//     const postBtn = document.getElementById("post-btn");
//     const putBtn = document.getElementById("put-btn");
//     const sendBtn = document.getElementById("send-btn");
//
//     const notLoadingBtn = document.getElementById("not-loading-btn");
//     const loadingBtn = document.getElementById("loading-btn");
//     const loadedBtn = document.getElementById("loaded-btn");
//
//     const unknownOkBtn = document.getElementById("unknown-ok-btn");
//     const notOkBtn = document.getElementById("not-ok-btn");
//     const okBtn = document.getElementById("ok-btn");
//
//     const statusCodeElem = document.getElementById("status-code");
//     const responseTextElem = document.getElementById("response-text");
//
//     // Change API request method button states
//     getBtn.addEventListener("click", function() {
//         resetMethodButtons();
//         getBtn.classList.add("btn-primary");
//     });
//
//     postBtn.addEventListener("click", function() {
//         resetMethodButtons();
//         postBtn.classList.add("btn-primary");
//     });
//
//     putBtn.addEventListener("click", function() {
//         resetMethodButtons();
//         putBtn.classList.add("btn-primary");
//     });
//
//     function resetMethodButtons() {
//         getBtn.classList.remove("btn-primary");
//         postBtn.classList.remove("btn-primary");
//         putBtn.classList.remove("btn-primary");
//     }
//
//     // Change Response status buttons
//     notLoadingBtn.addEventListener("click", function() {
//         resetStatusButtons();
//         notLoadingBtn.classList.add("btn-secondary");
//     });
//
//     loadingBtn.addEventListener("click", function() {
//         resetStatusButtons();
//         loadingBtn.classList.add("btn-secondary");
//     });
//
//     loadedBtn.addEventListener("click", function() {
//         resetStatusButtons();
//         loadedBtn.classList.add("btn-primary");
//         statusCodeElem.textContent = "Status Code: 200";
//     });
//
//     function resetStatusButtons() {
//         notLoadingBtn.classList.remove("btn-primary", "btn-secondary");
//         loadingBtn.classList.remove("btn-primary", "btn-secondary");
//         loadedBtn.classList.remove("btn-primary", "btn-secondary");
//     }
//
//     // OK buttons for responses
//     okBtn.addEventListener("click", function() {
//         resetResponseButtons();
//         okBtn.classList.add("btn-primary");
//         responseTextElem.textContent = '{"a": "b"}';
//     });
//
//     unknownOkBtn.addEventListener("click", function() {
//         resetResponseButtons();
//         unknownOkBtn.classList.add("btn-secondary");
//     });
//
//     notOkBtn.addEventListener("click", function() {
//         resetResponseButtons();
//         notOkBtn.classList.add("btn-secondary");
//     });
//
//     function resetResponseButtons() {
//         okBtn.classList.remove("btn-primary");
//         unknownOkBtn.classList.remove("btn-primary", "btn-secondary");
//         notOkBtn.classList.remove("btn-primary", "btn-secondary");
//     }
// });
