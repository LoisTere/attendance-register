 
$(document).ready(function() {
  $("#main1").hide();
  $("#signUp").hide();
  $("#form-group").hide();
  $("#register").hide();
  $("#checkIn").click(function() {
    $("#main1").show(); 
    $("#form-group").show(); 
  });

  var attribute = {
    convert: function(hr, min) {
      var ampm = hr > 12 ? "pm" : "am";
      var newHr = hr % 12;
      newHr = newHr ? newHr : 12;
      min = min < 10 ? "0" + min : min;
      return {
        hr: newHr,
        ampm: ampm,
        min: min
      };
    },
    getCurrentTime: function() {  // time of login
      var dateGenerated = new Date(Date.now());  //  create new date object
      var hours = dateGenerated.getHours();  //  from date: pick the hours
      var minutes = dateGenerated.getMinutes(); //  from date: pick the hours 
      var time = attribute.convert(hours, minutes);  
      var checkinHour = time.hr;
      var ampm = time.ampm;
      minutes = time.min;
      return {
        checkinHour: checkinHour, // call convert and save it's return value
        minutes: minutes,
        ampm: ampm
      };
    },
    validateLength: function(str) {
      if (str.length > 8) {
        return true;
      }
      else {
        return false;
      }
    },

    beforeSignIn: function() {
      $(".new").click(function () {
        $("#signUp").show();
        $("#form-group").hide();
        $("#oldSign").hide();
      });    
    },
    beforeLogIn: function() {
      $(".existing").click(function (){
        $("#form-group").show();
        $("#signUp").hide();
        $("#newSign").hide();
      });
    },
    beforeAuthentication: function() {
      //hide welcome div
      $("#welcome").hide();
    },

    checkingInit: function() {
      $("#checkIn").click(function(event) {
        event.preventDefault();
        // name of the staff
        var name = $('#textbox').val();
        if (attribute.validateLength(name) === true) {
        $('.loginError').text("Please enter your full name").hide();
        var getTime = attribute.getCurrentTime();
        var checkTime = attribute.getCurrentTime().checkinHour + ":" + attribute.getCurrentTime().minutes + ' ' + attribute.getCurrentTime().ampm;
        checkoutBox = '<input type="checkbox" id="checkout">';
        var date = new Date();
        var n_date = date.toDateString();
      
        //  setup time variable to have say 9:54 AM
        var tableRow = '<tr><td>' + name + '</td><td>' + checkTime + ' ' +n_date+'</td>' + '<td>' + checkoutBox + '</td>' + '<td id="checkout"></td>' + '</tr>';
        $("tbody.list").append(tableRow); // apend the row to the table
        // clear input field
        $('#textbox').val("");
        } else {
        $('.loginError').text("Please enter your full name").show();
        return false;
        }
      $("#main1").show();
      $("#form-group").hide();
      $("#newSign").hide();
      $("#oldSign").hide();


      });
    },

    bodyInit: function() {
      //trigger an event when the chedkBox is clicked
      //Best practice - Avoid nested functions to avoid things getting complicated in case of a bigger project.
      $('body').on("click", '#checkout', function(event) {
        event.preventDefault();
        //get the current time the user checks the button.
        //console.log(2535325);
        var getTime = attribute.getCurrentTime();
        //alert(getTime);
        var checkTime = attribute.getCurrentTime().checkinHour + ":" + attribute.getCurrentTime().minutes + ' ' + attribute.getCurrentTime().ampm;
        if ($(this).is(':checked')) {
          $(this).parent().next('td').append(checkTime);
        } else {
          $(this).parent().next('td').html('');
        }
        //append the time beside the checkbox
        // remove the displayed time when the user uncheck the button

      });
    }, 

    listenerInit: function() {
     
      $("#sign").click(function(event) {
        event.preventDefault();
        var name = $('#textbox1').val();
        var pass = $('#pwdtextbox1').val();
        var namePass = {
          name: name,
          pass:pass
        }; 
        if(!localStorage.getItem('contact_counter')) {
        contact_counter= 0;
        } else {
        contact_counter=localStorage.getItem('contact_counter')
        }
        localStorage.setItem('namePass:'+ contact_counter, JSON.stringify(namePass));
        contact_counter++;
        localStorage.setItem('contact_counter', contact_counter);
        $("#form-group").show();
        $("#signUp").hide();
      }); 
    }
  };
  attribute.beforeSignIn();
  attribute.beforeLogIn();
  attribute.listenerInit();
  attribute.checkingInit();
  attribute.bodyInit();
});
     