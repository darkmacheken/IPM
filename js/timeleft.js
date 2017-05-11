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
    timer_addOrder(sessionOrder);
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
            _orderId: order[i]._orderId,
            _time: ct * 60,
            _priority: priority
        });
    }

    for (let i = initFoodQLen; i < timer_food_queue.length; i++) {
        for (let j = timer_food_queue[i]._priority-1; j >= 0; j--)
            timer_food_queue[i]._time += maxTime[j];
        timer_food_queue[i]._time += timer_global;
        for (let j = 0; j < i; j++) {
            if (timer_food_queue[i]._name === timer_food_queue[j]._name &&
                timer_food_queue[i]._orderId === timer_food_queue[j]._orderId) {
                timer_food_queue[j]._time = timer_food_queue[i]._time;
                timer_food_queue.splice(i, 1);
                i--;
            }
        }
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
    }

    timer_updateBox(1);
    timer_updateBox(2);
    timer_updateBox(3);

    if (showingOrders) {
        for (let i = 0; i < sessionOrder.length; i++) {
            qTime = timer_queueTime(sessionOrder[i]);
            if (qTime > 0) {
                $("#vieworder-timer-" + i + " .vieworder-timer").text(formatTime(qTime));
                $("#vieworder-timer-" + i).show();
            }
            else {
                $("#vieworder-timer-" + i).hide();
            }
        }
    }
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

function timer_queueTime(food) {
    let time = 0
    for (let i = 0; i < timer_food_queue.length; i++)
        if (timer_food_queue[i]._name === food._name &&
            timer_food_queue[i]._orderId === food._orderId &&
            timer_food_queue[i]._time - timer_global > time)
                time = timer_food_queue[i]._time - timer_global;
    return time;
}

function formatTime(time) {
    let txt = ":";
    if (time % 60 < 10)
        txt += "0";
    txt += String(time % 60);
    return String(Math.floor(time/60)) + txt;
}
