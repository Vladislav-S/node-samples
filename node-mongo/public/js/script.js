$(document).ready(()=>{
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });
  var form = $("#mainForm");
  console.log("ready");
  form.submit((e)=>{
    //console.log("submit");
    e.preventDefault();
    var _name = $("#faggotName").val();
    var _date = $("#date").val();

    if(_name !== '' && _date !== ''){
      $.ajax({
        type: 'POST',
        url: '/',
        data: form.serialize(),
        success: (data) => {
          console.log("success");
          console.log(data);
          var inTHtml = $("#tbody").html();
          inTHtml += "<tr id='"+data._id+"'><td>"+data.faggotName+"</td><td>"+data.date+"</td></tr>";
          $("#tbody").html(inTHtml);
        },
        error: (data)=>{
          console.log(data);
        }
      })
    }
    //console.log(_name);
    //console.log(_date);

  });

})
