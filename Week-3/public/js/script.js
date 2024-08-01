$(document).ready(function () {
    $("form").submit(function (event) {
      const formData = {
        first_name: $("#first_name").val(),
        last_name: $("#last_name").val(),
        email: $("#email").val(),
        password: $("#password").val()
      };
  
      $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3040/signup",
        data: formData,
        dataType: "json",
        // encode: true,
        success: function(d) {
            alert(d);
        }
      })

      event.preventDefault();
    });
  });