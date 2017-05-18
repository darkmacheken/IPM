function prepareActivatables() {
    $(document).mouseup(function () {
        $(".opcao,.opcao3ecran,.confirmarbtn,.confirmOk2btn,.submit,.paybtn").removeClass("js_active");
    });
    activatables_opcao3ecran();
     activatables_confirmar();
     activatables_confirmar2()
     activatables_submit();
     activatables_paybtn();
}

function activatables_opcao() {
    $(".opcao").mousedown(function (e) {
        $(this).addClass("js_active");
    });

    $(".info, .info3ecran").mousedown(function (e) {
        e.stopPropagation();
    });
}
function activatables_opcao3ecran() {
    $(".opcao3ecran").mousedown(function (e) {
        $(this).addClass("js_active");
    });

    $(".info3ecran").mousedown(function (e) {
        e.stopPropagation();
    });
}

function activatables_confirmar() {
    $(".confirmarbtn").mousedown(function (e) {
        $(this).addClass("js_active");
    });

    $(".disabler").mousedown(function (e) {
        e.stopPropagation();
    });
}


function activatables_confirmar2() {
    $(".confirmOk2btn").mousedown(function (e) {
        $(this).addClass("js_active");
    });

    $(".disabler").mousedown(function (e) {
        e.stopPropagation();
    });
}

function activatables_submit() {
    $(".submit").mousedown(function (e) {
        $(this).addClass("js_active");
    });

    $(".disabler").mousedown(function (e) {
        e.stopPropagation();
    });
}

function activatables_paybtn() {
    $(".paybtn").mousedown(function (e) {
        $(this).addClass("js_active");
    });

    $(".disabler").mousedown(function (e) {
        e.stopPropagation();
    });
}
