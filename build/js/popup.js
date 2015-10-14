// Объявление модуля
var modalWindow = (function () {

    // Инициализирует наш модуль
    var init = function () {
        _setUpListners();
    };

    // Прослушивает события 
    var _setUpListners = function () {
        $('#add-new-item').on('click', _showModal);
        // $('#add-new-project').on('submit', _addProject);
    };

    var _showModal = function  (ev) {
        ev.preventDefault();
        $('#new-project-popup').bPopup({
            speed: 650,
            transition: 'slideDown',
            onClose: function () {
                this.find('.form')
                        .trigger("reset");
                }
        });
    };

 /*   var _addProject = function(ev){
        console.log('добавление');
        ev.preventDefault();

        var form = $(this);
            url = 'add_project.php'
            data = form.serialize();

            console.log(data);
    };*/

    // запроc на сервер
/*    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: data,
    })
    .done(function(ans) {
        console.log("success");
        console.log(ans);
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });*/



    // Возвращаем объект (публичные методы) 
    return {
        init: init
    };

})();

// Вызов модуля
modalWindow.init();
