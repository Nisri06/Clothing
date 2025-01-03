
$(document).ready(function() {
    $('#paymentForm').submit(function(event) {
      event.preventDefault();
      var formData = {
        fullName: $('#fullName').val(),
        email: $('#email').val(),
        cardNumber: $('#cardNumber').val(),
        expiryDate: $('#expiryDate').val(),
        couponCode: $('#couponCode').val()
      };
      $.ajax({
        type: 'POST',
        url: '/payment',
        data: formData,
        success: function(response) {
          alert('Payment successful!');
          console.log(response);
        },
        error: function(error) {
          alert('Error processing payment. Please try again later.');
          console.error(error);
        }
      });
    });
  });
  