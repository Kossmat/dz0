// Объявление модуля
var contactMe = (function () {

    // Инициализирует наш модуль
    function init () {
        _setUpListners();
    };

    // Прослушивает события 
    function _setUpListners () {
        $('#contact-me').on('submit', _submitForm);
    };

    var _submitForm = function(ev){
        console.log('отправка формы');
        ev.preventDefault();

        var form = $(this),
            url = 'callback.php',
            defObj = _ajaxForm(form, url);
    };

    var _ajaxForm = function (form, url){
        console.log('запрос, но с проверкой');
        if (!validation.validateForm(form)) return false;
        // если не заполнена форма, нет обращения к серверу

    };

  // Работает с модальным окном
    // function _doSome (e) {
    //     e.preventDefault();
    // };

    // Возвращаем объект (публичные методы) 
    return {
        init: init
    };

})();

// Вызов модуля
contactMe.init();