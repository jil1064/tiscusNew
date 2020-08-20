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

//For new calendar event in slotEdit.handlebars
function validateCal() {
    
}

//For sign up. To view it, insert "http://localhost:3000/account/signup" as the url
function validateSignup() {
    
}

$(document).ready(function () {
    $(function () {
        $("#first_date").datepicker();
        $("#second_date, #setDate, #occurStart, #occurUntil").datepicker();
    });

});

//日期选择
$("#first_date").datepicker({
    dateFormat: "m/d/yy",
    changeMonth: true,
    changeYear: true,
    minDate: "+0d"
});

//Another task! Fix the implementation of '#setDate, #occurStart, #occurUntil' in slotEdit.handlebars
$("#second_date, #setDate, #occurStart, #occurUntil").datepicker({
    dateFormat: "m/d/yy",
    changeMonth: true,
    changeYear: true,
});
