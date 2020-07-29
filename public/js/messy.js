$(document).ready(function () {
    //alert("hi");
    $(".welcome").fadeIn(1000);
    $(".welcome").delay(1000);
    $(".welcome").fadeOut(1000);
    initCreateTc();
});

$('.timeSlot').click(function () {
    var y = $(this).position().top;
    var yy = Math.floor(y + 115).toString() + 'px';
    $('#todayDel').animate({'top': yy}, "fast");
    $('#todayEdit').animate({'top': yy}, "fast");
    var color = $(this).children('button').children().css('border-left-color');
    $('.editBar').css('background-color', color);
    $('.colorDot').css('border', '5px solid white');
    slotID = "something";
});

$(".todayEvents").scroll(function () {
    $("#todayDel").css('top', '-99px');
    $("#todayEdit").css('top', '-99px');
});

$('#createSlot').click(function () {
    $('.rightPage').fadeOut();
    $('.editBar').css('background-color', '#fff24d');
    $('.colorDot').css('border', '5px solid white');
    $('#yellowDot div').css('border', 'none');
    $('#setDate').attr("placeholder", "Date");
    $('#setDate2').attr("placeholder", "Different day?");
    $('.editPage').fadeIn();
});

$('#todayEdit').click(function () {
    $('.rightPage').fadeOut();
    $('.editPage').fadeIn();
});

$('.monthEvent').click(function () {
    $('.rightPage').fadeOut();
    $('.editPage').fadeIn();
    var color = $(this).css('background-color');
    $('.editBar').css('background-color', color);
    $('.colorDot').css('border', '5px solid white');
});

$('#todayDate').click(function () {
    $('.monthView').toggle("fast");
    $(this).toggleClass('todayDate2');
});

$('#chooseMonth').click(function () {
    $('#todayDate').toggle("fast");
    $('#selectMonth').toggle("fast");
});

$('#back, #ok, #reject, #accept').click(function () {
    $(this).parent().parent().parent().fadeOut();
});

$('.colorDot').click(function () {
    $('.colorDot').css('border', '5px solid white');
    $(this).css('border', 'none');
    var color = $(this).css('background');
    $('.editBar').css('background', color);
});

$('#delThis, #delTc, #delReoc, #confirm').click(function () {
    $('#deleteModal').modal('hide');
    $('#waitModal').modal('hide');
    $('.editPage').css('display', 'none');
});

$('#account, .accounticon').click(function () {
    $('.rightPage').fadeOut();
    $('.accountPage').fadeIn();
});

$('#editAccount').click(function () {
    $('.editAccountPage').fadeIn();
});

$('#setting').click(function () {
    $('.settingPage').fadeIn();
});

$('#screenshotAI').click(function () {
    $('.sAI2').fadeOut();
    $('.screenshotAIPage').fadeIn();
    $('.sAI1').fadeIn();
    $('.AIcomplete').css('opacity', '0');
});

$('#AInext').click(function () {
    $('.sAI1').toggle();
    $('.sAI2').fadeIn();
    $('.AIcomplete').css('opacity', '1');
});

$('#meetNext').click(function () {
    $('.meetStep1').toggle();
    $('.meetStep2').fadeIn();
    $('.meetStep2 input').focusin();
    $('.meetStep2 input').blur();
});

$('.allowNotifyDiv').click(function () {
    $('.allowNotify').toggleClass('allowNotify2');
});

$('.shareable').click(function () {
    $(this).toggleClass('shareable2');
});

$('#functional, .funcicon').click(function () {
    $('.leftPage').fadeOut();
    $('.functionalPage').fadeIn();
});

$('#funcMeet').click(function () {
    $('.meetPage').fadeIn();
});

$('#funcWITH').click(function () {
    $('.WITHPage').fadeIn();
});

$('#createMeet').click(function () {
    $('.createMeetPage').fadeIn();
    $('.meetStep2').css('display', 'none');
    $('.meetStep1').fadeIn();
    $('#addToGroup').css('border', '1px solid cadetblue');
    $('#addToGroup').html('add to the group');
    $('#addToGroup').attr("disabled", false);
    $('#newGroupName').css('display', 'none');
    $('#createGroup').css('display', 'inline-block');
});

$("#tcSearch").focusin(function () {
    $("#searchResult").fadeIn();
    $("#resultInfo").delay(300).fadeIn();
});

$("#tcSearch").focusout(function () {
    $("#searchResult").fadeOut();
});

var tryadd = 0;
var trycreate = 0;

$('#addToGroup').click(function () {
    tryadd += 1;
    if (tryadd > 1) {
        $('#createGroup').css('display', 'none');
        $(this).css('border', 'none');
        $(this).html('added to UCSD SCF!');
        $(this).attr("disabled", true);
    } else {
        $('#tcSearch').focus();
        $('#searchResult').html('Select 1 group and user(s) you want to add!');
    }

});

$('#createGroup').click(function () {
    trycreate += 1;
    if (trycreate > 1) {
        $('#newGroupName').fadeIn();
        $(this).css('display', 'none');
        $('#submitGroup').fadeIn();
    } else {
        $('#tcSearch').focus();
        $('#searchResult').html('Select user(s) you want to create a group with!');
    }
});

$('#submitGroup').click(function () {
    $(this).fadeOut();
    $('#newGroupName').fadeOut();
    $('#addToGroup').css('border', 'none');
    $('#addToGroup').html('UCSD Rides created');
    $('#addToGroup').attr("disabled", true);
});

$('.meetGroupCard, .user_list').click(function () {
    $(this).remove();
});

$('.chooseTimeCard').click(function () {
    $('.chooseTimeCard').not(this).removeClass('chooseTimeCard2');
    $(this).toggleClass('chooseTimeCard2');
});

$('#sendInvi').click(function () {
    $('.createMeetPage').fadeOut();
});

$('.done').click(function () {
    $('.meetInfoPage').fadeIn();
    $('.otherTime').css('display', 'none');
    $('.chooseTimeCard').removeClass('chooseTimeCard2');
});

$('#meetChoose').click(function () {
    $('.otherTime').fadeIn();
});

$('#notiBell').click(function () {
    $('.notifyPage').fadeIn();
});

function initCreateTc() {
    alert("testing");
    // add your code here
    $('#tcForm').submit(function (e) {
        alert('sendInvi');
        e.preventDefault();
        console.log("submit form...");
        let tcTitle = $('#tcTitle').val();
        let tcNotes=$('#tcNotes').val();
        let tcDuration=$('#tcDuration').val();
        var tcUsers=[];
        $('#resultInfo a').each(function () {
            console.log(this.id);
            tcUsers.unshift(this.id);
        })
        // $.post('events/submitTc', {tcTitle: tcTitle}, postCallback);
        $.ajax({
            url: 'events/submitTc',
            type: 'post',
            data: {tcTitle:tcTitle,tcNotes:tcNotes,tcDuration:tcDuration,tcUsers:tcUsers.toString()},
            success:function (data) {
                postCallback(data);
            }
        });
    });

    function postCallback(res) {
        alert("RSVP form successfully submitted");
        $('#tcTitle').val('');
        console.log(res)
    }
}