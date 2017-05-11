var timer_global = 0;
var timer_stopped = true;
var timer_food_queue = [];
var TIMER_FOODTYPE_PRIORITIES = {
    "menu-entradas": 0,
    "menu-sopas": 1,
    "menu-pratos": 2,
    "menu-bebidas": 0,
    "menu-sobremesas": 3,
    "menu-cafetaria": 4
};

function timer_init() {
    timer_stopped = false;

    timer_addOrder(sessionOrder);

    setTimeout(timer_tick, 1000);
    timer_update();
}

function timer_addOrder(order) {
    let maxTime = [0, 0, 0, 0, 0]; // um elemento por prioridade
    let initFoodQLen = timer_food_queue.length;

    for (let i = 0; i < order.length; i++) {
        let ct = getFoodByName(order[i]._name)._ctime;
        let priority = TIMER_FOODTYPE_PRIORITIES[getFoodCategory(order[i]._name)];
        if (ct * 60 > maxTime[priority])
            maxTime[priority] = ct * 60;
        timer_food_queue.push({
            _name: order[i]._name,
            _time: ct * 60,
            _priority: priority
        });
    }

    for (let i = initFoodQLen; i < timer_food_queue.length; i++) {
        for (let j = timer_food_queue[i]._priority-1; j >= 0; j--)
            timer_food_queue[i]._time += maxTime[j];
        timer_food_queue[i]._time += timer_global;
    }

    timer_sortQueue();

    if (timer_stopped) {
        timer_stopped = false;
        setTimeout(timer_tick, 1000);
    }
}

function timer_tick() {
    timer_global++;
    if (!timer_stopped)
        setTimeout(timer_tick, 1000);
    timer_update();
}

function timer_update() {
    while (timer_food_queue.length > 0 && timer_food_queue[0]._time <= timer_global)
        timer_food_queue.splice(0, 1);

    if (timer_food_queue.length === 0) {
        $(".timeleftbox").hide();
        timer_stopped = true;
        return;
    }

    timer_updateBox(1);
    timer_updateBox(2);
    timer_updateBox(3);
}

function timer_updateBox(boxnr) {
    if (timer_food_queue.length < boxnr) {
        $("#timeleft-box-" + boxnr).hide();
    }
    else {
        $("#timeleft-box-" + boxnr + " .timeleft-foodname").text(timer_food_queue[boxnr-1]._name);
        $("#timeleft-box-" + boxnr + " .timeleft-waittime").text(formatTime(timer_food_queue[boxnr-1]._time - timer_global));
        $("#timeleft-box-" + boxnr).show();
    }
}

function timer_sortQueue() {
    timer_food_queue = timer_food_queue.sort(function (a, b) {
        return a._time - b._time;
    });
}

function formatTime(time) {
    let txt = ":";
    if (time % 60 < 10)
        txt += "0";
    txt += String(time % 60);
    return String(Math.floor(time/60)) + txt;
}
