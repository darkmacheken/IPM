var timer_global = 0;
var timer_firstDish = 0;
var timer_stopped = true;

function timer_start() {

}

function timer_tick() {
    timer_global--;
    if (!timer_stopped)
        setTimeout(timer_tick, 1000);
    timer_update();
}

function timer_update() {
    $("#timeleft-circle span").text("");
    $("#timeleft-box span").text("");
}
