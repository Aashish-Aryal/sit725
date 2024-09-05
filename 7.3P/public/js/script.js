$(document).ready(function () {
  // Handle form submission
  $("form").submit(function (event) {
      event.preventDefault();
      
      const formData = {
          first_name: $("#first_name").val(),
          last_name: $("#last_name").val(),
          email: $("#email").val(),
          password: $("#password").val()
      };

      $.ajax({
          type: "POST",
          url: "http://127.0.0.1:3040/api/signup",
          contentType: "application/json",        
          data: JSON.stringify(formData),
          dataType: "json",
          success: function(response) {
              alert(response.message);
          },
          error: function (xhr) {
              alert(`Error: ${xhr.responseText}`);
          }
      });
  });

  // Bind click event to the View All button
  $("#viewAllBtn").click(function () {
      $.ajax({
          type: "GET",
          url: "http://127.0.0.1:3040/api/users",
          success: function(users) {
              $("#userList").empty();  // Clear existing list
              users.forEach(user => {
                  $("#userList").append(`<li>${user.first_name} ${user.last_name} - ${user.email} <button class="delete-btn" data-email="${user.email}">Delete</button></li>`);
              });
          },
          error: function(xhr) {
              alert(`Error: ${xhr.responseText}`);
          }
      });
  });

  // Handle delete button click
  $(document).on('click', '.delete-btn', function() {
      const email = $(this).data('email');
      $.ajax({
          type: "DELETE",
          url: "http://127.0.0.1:3040/api/delete",
          contentType: "application/json",
          data: JSON.stringify({ email }),
          success: function(response) {
              alert(response.message);
              location.reload();  // Refresh the list after deletion
          },
          error: function (xhr) {
              alert(`Error: ${xhr.responseText}`);
          }
      });
  });
});
