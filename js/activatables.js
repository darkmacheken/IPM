function prepareActivatables() {
    $(document).mouseup(function () {
        $(".opcao,.opcao3ecran,.confirmarbtn,.submit").removeClass("js_active");
    });
    activatables_opcao3ecran();
     activatables_confirmar();
     activatables_confirmar2()
     activatables_submit();
}

function activatables_opcao() {
    $(".opcao").mousedown(function (e) {
        $(this).addClass("js_active");
    });

    $(".info").mousedown(function (e) {
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
