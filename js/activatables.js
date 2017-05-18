function prepareActivatables() {
    $(document).mouseup(function () {
        $(".opcao").removeClass("js_active");
    });
}

function activatables_opcao() {
    $(".opcao").mousedown(function (e) {
        $(this).addClass("js_active");
    });

    $(".info").mousedown(function (e) {
        e.stopPropagation();
    });
}
