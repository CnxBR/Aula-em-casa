function turnLights () {
    const bulb = document.querySelector(".bulb");
    const button = document.querySelector(".switch");
    
    button.classList.toggle("on");
    bulb.classList.toggle("on");
}
