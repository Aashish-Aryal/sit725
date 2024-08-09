$(document).ready(function () {
    $("form").submit(function (event) {
        event.preventDefault();
        
        const formData = {
            first_name: $("#first_name").val(),
            last_name: $("#last_name").val(),
            email: $("#email").val(),
            password: $("#password").val()
      };

      console.log("Submitting form data:", formData);
  
      $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3040/signup",
        contentType: "application/json",        
        data: JSON.stringify(formData),
        dataType: "json",
        success: function(response) {
            console.log("Response from server:", response);
            alert(response.message);
        },
        error: function (xhr, status, error) {
            console.log("Error response from server:", xhr.responseText);
            alert(`Error: ${xhr.responseText}`)
        }
      })

    });
  });