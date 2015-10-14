// Объявление модуля
var modalWindow = (function() {

  // Инициализирует наш модуль
  var init = function() {
    _setUpListners();
  };

  // Прослушивает события
  var _setUpListners = function() {
    $('#add-new-item').on('click', _showModal); // открытие модального окна
    $('#add-new-project').on('submit', _addProj); // добавление проекта
    $('#fileupload').on('change', _changefileUpload); //добовление файла
  };

  //Измененили файл аплоад
  var _changefileUpload = function() {
    var input = $(this), //инпут type="file"
      name = input[0].files[0].name; //имя загруженного элемента
    $('#filename')
      .val(name)
      .trigger('hideTooltip')
      .removeClass('has-error');
  };

  //Работает с модальным окном
  var _showModal = function(ev) {
    // console.log('вызов модального окна');
    ev.preventDefault();
    var divPopup = $('#new-project-popup'),
      form = divPopup.find('login-form');
    divPopup.bPopup({
      speed: 650,
      transition: 'slideDown',
      onClose: function() {
        form.find('.server-mes').text('').hide();
        form.trigger("reset");
      }
    });
  };

  //Добовляет проект
  var _addProj = function(ev) {
    // console.log('добавление проекта');
    ev.preventDefault();

    //Объявляем переменные
    var form = $(this),
      url = 'add_project.php',
      defObj = _ajaxForm(form, url);

    if (defObj) {
      defObj.done(function(ans) {
        console.log(ans);
        var successBox = form.find('.success-mes'),
          errorBox = form.find('.error-mes');

        if (ans.status === 'OK') {
          errorBox.hide();
          successBox.text(ans.text).show();
        } else {
          successBox.hide();
          errorBox.text(ans.text).show();
        }
      });
    }
  };

  //Универсальная функция
  //1.Собирает данные из формы
  //2.проверяет форму
  //3.Делает запрос на сервер и возвращает ответ с сервера
  var _ajaxForm = function(form, url) {

    if (!validation.validateForm(form)) return false;

    //1. собрать данные из формы
    //2. проверить форму
    //3. (запрос)ответ (на)с сервера
    // if(!valid) return false;
    //
    data = form.serialize();

    var result = $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: data,
    });
    return result;
  };

  // Возвращаем объект (публичные методы)
  return {
    init: init
  };

})();

// Вызов модуля
modalWindow.init();
