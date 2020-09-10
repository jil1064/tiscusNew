//表单提交前的验证
//This is for tcMeet events
function validate() {
    document.getElementById('submit').style.display = "none";
    var event_title = $('#tcTitle');
    var meeting_hr = document.getElementById('hr');
    var meeting_min = document.getElementById('min');
    var time = meeting_hr.value + meeting_min.value;
    var date = document.getElementById('first_date');
    var start_date = $('#first_date').datepicker().val();

    /*check for required questions not empty/checked  确认必填问题已输入信息*/
    if (event_title.value != "" && time != 000 && first_date.value != "") {
        console.log("in here");
        $('#submit').show();
    } else {
        console.log("else");
        document.getElementById('submit').style.display = "none";
    }
}

$('#first_date').change('input', function () {
    document.getElementById('second_date').removeAttribute("disabled");
    var start_date = $('#first_date').datepicker('getDate');
    $("#second_date").datepicker("option", "minDate", new Date((start_date.getMonth() + 1) + "/" + start_date.getDate() + "/" + start_date.getFullYear()));
    var end_date = start_date.setDate(start_date.getDate() + 2);
    end_date = new Date(end_date);

    $('#second_date').datepicker('option', 'maxDate',
        new Date((end_date.getMonth() + 1) + "/" + end_date.getDate() + "/" + end_date.getFullYear())).datepicker('setDate', end_date);

    var event_title = $('#tcTitle');
    var meeting_hr = document.getElementById('hr');
    var meeting_min = document.getElementById('min');
    var time = meeting_hr.value + meeting_min.value;
    if (event_title.value != "" && time != 000 && first_date.value != "") {
        console.log("in here");
        $('#submit').show();
    } else {
        console.log("else");
        document.getElementById('submit').style.display = "none";
    }
});

//For new calendar event in slotEdit.handlebars
function validateCal() {
  var cond = calNotes.value != "" && setDate.value != "" && setTime1.value != "" && setTime2.value != "";
    var temp = new Boolean(setDate.value);
  if($("input[type=radio]:checked").length >= 1) {
      $("#reoc").css('color',"#0075ff");
  }  
    if($("input[id='noReoc']:checked").length >= 1) {
        $(".hideDate").show();
        $("#reoc").css('color',"darkgray");
      }
    if($("input[id='weekReoc']:checked").length >= 1) {
        $(".hideDate").hide();
        $(".weekPanel").show();
        cond = false;
        if($(".reocChoice input:checked").length >= 1) {
            cond = calNotes.value != "" && setTime1.value != "" && setTime2.value != "";
        }
      } else {
          $(".hideDate").show();
          $(".weekPanel").hide();
      }

    if(cond) {
        $("#calSubmit").show();
      } else {
        $("#calSubmit").hide();
    }
}

 $("#setDate").change('input', function () {
//     validateCal();
 });

//For sign up. To view it, insert "http://localhost:3000/account/signup" as the url
function validateSignup() {

}

$(document).ready(function () {
    $(function () {
        $("#first_date").datepicker();
        $("#second_date, #setDate, #occurStart, #occurUntil").datepicker();
    });

    //日期选择
    $("#first_date").datepicker({
        dateFormat: "m/d/yy",
        changeMonth: true,
        changeYear: true,
        minDate: "+0d"
    });

    // Another task! Fix the implementation of '#setDate, #occurStart, #occurUntil' in slotEdit.handlebars
    $("#second_date, #setDate, #occurStart, #occurUntil").datepicker({
        dateFormat: "m/d/yy",
        changeMonth: true,
        changeYear: true,
        minDate: "+0d"
    });

});

//日期选择
// $("#first_date").datepicker({
//     dateFormat: "m/d/yy",
//     changeMonth: true,
//     changeYear: true,
//     minDate: "+0d"
// });
//
// // Another task! Fix the implementation of '#setDate, #occurStart, #occurUntil' in slotEdit.handlebars
// $("#second_date, #setDate, #occurStart, #occurUntil").datepicker({
//     dateFormat: "m/d/yy",
//     changeMonth: true,
//     changeYear: true,
//     minDate: "+0d"
// });
