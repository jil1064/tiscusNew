var initial = "";
var fullname;
var count = "";

function mobile_show4() { /*when count != 0*/
    $('tbody').css("height", "calc(6.6vh * 5 + 4px)");
    $('tbody').css("max-height", "calc(11vw * 4.1)");
    $('table').css("margin-top", "3.5vw");
}

function mobile_show5() { /*when count = 0*/
    $('tbody').css("height", "calc(6.6vh * 5)");
    $('tbody').css("max-height", "calc(11vw * 5)");
}

function desktop_show4() { /*when count != 0*/
    $('tbody').css("height", "calc((2.2vw + 6px) * 4 + 1px)");
    $('table').css("margin-top", "0.8vw");
}

function desktop_show5() { /*when count = 0*/
    $('tbody').css("height", "calc((2.2vw + 6px) * 5)");
}

$(window).on('resize', function (e) {
    console.log('true');
    //for phone 手机排版
    if (window.matchMedia('(max-width: 480px)').matches) {
        if (count != 0) { //determines how many rows to show 决定显示的行数
            mobile_show4();
        } else {
            mobile_show5();
        }
    }
    //for desktop 桌面排版
    else {
        if (count != 0) {
            desktop_show4();
        } else {
            desktop_show5();
        }
    }

});


//点击搜索结果后触发
$('tbody').on('click', 'tr', function () {
    $('.ppt').show();
    $('.border').show();

    $(this).find("td").each(function () {

        count = $('.ppt .circle:visible').length + 1;
        console.log(count);

        initial = $(this).closest('tr').find('.table_circle').text();
        console.log(initial);

        //点击搜索结果生成名字缩写
        var get_name = $(this).closest('tr').find('td').text();
        get_name = get_name.substring(2);
        get_name = get_name.split(' ')
        fullname = get_name[0] + " " + get_name[1] + " ";
        console.log(fullname);


        if (count != 0) { //show 4 rows when there's participants 显示4行
            console.log('here1');
            $(".next_btn").prop("disabled", false);
            $(".next_btn").addClass("next_btn_enabled");
            //4 rows for phone
            if (window.matchMedia('(max-width: 480px)').matches) {
                console.log('here2');
                mobile_show4();
            }
            //4 rows for desktop 桌面4行
            else {
                desktop_show4();
            }
        }


        if (count < 11) {
            $(this).hide();
            if ($(this).children().hasClass("table_circle")) {
                console.log("ppt clicked");
                var addHTML = "<div class='circle' style='font-weight: 500'>" + initial + " </div>";
                var circles = $(addHTML).text(initial);
                circles.append("<div class='minus'>-</div>")
                $(".selectPage .ppt").append(circles);
                console.log(fullname);
                circles.attr('id', fullname);
                console.log(count);
            } else {
                console.log("group clicked");

            }
        } else {
            alert("Max number of participants is 10");
        }


    });
});

$('.ppt').on('click', '.circle', function () {
    count--;
    console.log(count);
    //没有用户时，禁用“next”按钮
    if (count == 0) {
        console.log("minus");
        $(".next_btn").prop("disabled", true);
        $(".next_btn").removeClass("next_btn_enabled");

        $('.border').remove()
        $('table').css("margin-top", "0");
        //for phones 手机排版
        if (window.matchMedia('(max-width: 480px)').matches) {
            mobile_show5();
        }
        //for desktop/ipad 桌面排版
        else {
            desktop_show5();
        }
    }

    //hide the circle if user is clicked 点击用户取消选择
    var closest_circle = $(this).closest('.circle');
    $(closest_circle).remove();

    //get person's name and initial to add it back to the table row 点击名字缩写找回全名
    var minus_initial = closest_circle.text().substring(0, 2);
    var minus_name = $(closest_circle).attr('id');
    //console.log(minus_name);

    //add the participant back into the table把用户加回搜索结果（这个我们可以去掉）
    var addRow = "<tr><td><span class='table_circle'>" + minus_initial + "</span>" + minus_name + "</td></tr>"
    $("tbody").append(addRow);
    console.log(minus_name + ":" + minus_initial);

});

//点击“next”后页面变更，复制所选用户
$("#select_next").click(function () {
    $('.tmConfirm .confirm_ppt').empty();
    $('.selectPage .ppt').clone().appendTo('.tmConfirm .confirm_ppt');
    $('.confirm_ppt').css("padding-top", "0.5vw");
    $('.confirm_ppt .minus').remove();
});

//searching JS 前端学妹写的“搜索”
//  function searchPpt() {
//    //user input value
//    var input = document.getElementById('tcSearch').value;
//    input = input.toLowerCase();
//    //gets all "tr's"
//    var tr = document.getElementsByTagName("tr");
//    //tr[0] = schedule with input box, so start at 1
//    for (i = 1; i < tr.length; i++) {
//      //no space btwn initial and name
//      var pptname1 = tr[i].getElementsByTagName("td");
//      pptname1 = ($(pptname1).text()).trim();
//      //space btwn initial and name
//      var pptname2 = pptname1.substring(0,2) + " " + pptname1.substring(2);
//      //no spaces at all
//      var pptname3 = pptname1.replace(" ", "");
//      //console.log(pptname1, ":", pptname1.toLowerCase().indexOf(input));
//      //search table. -1 = no match
//      if (pptname1.toLowerCase().indexOf(input) > -1 ||
//        pptname2.toLowerCase().indexOf(input) > -1 ||
//        pptname3.toLowerCase().indexOf(input) > -1) {
//          $(tr[i]).show();
//      }
//      else{
//          $(tr[i]).hide();
//      }
//  }};

$(document).ready(function () {
    $(function () {
        console.log("datepicker");
        $("#first_date").datepicker();
        $("#second_date").datepicker();
    });

});

//日期选择
$("#first_date").datepicker({
    dateFormat: "m/d/yy",
    changeMonth: true,
    changeYear: true,
    minDate: "+0d"
});
$("#second_date").datepicker({
    dateFormat: "m/d/yy",
    changeMonth: true,
    changeYear: true,

});


//表单提交前的验证
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
        //note打字时反复，需修改
        $('#submit').fadeIn({ queue: true });
    } else {
        console.log("else");
        document.getElementById('submit').style.display = "none";
    }
}

//自动生成第二个日期（3天间隔）
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
        $('#submit').fadeIn({ queue: true });
    } else {
        console.log("else");
        document.getElementById('submit').style.display = "none";
    }
});


//提交表单
function initCreateTc() {
    $('#tcForm').submit(function (e) {
        alert('sendInvi');
        e.preventDefault();
        console.log("submit form...");
        let tcTitle = $('#tcTitle').val();
        let tcNotes = $('#tcNotes').val();
        let tcDuration = $('#hr').val() + ":" + $('#min').val();
        let tcConstraint = $('#first_date').val() + '-' + $('#second_date').val();
        let tcUsers = [];
        $('.confirm_ppt>.ppt div').each(function () {
            console.log(this.id);
            tcUsers.unshift(this.id.replace('\n', ''));
        })
        // $.post('events/submitTc', {tcTitle: tcTitle}, postCallback);
        $.ajax({
            url: 'events/submitTc',
            type: 'post',
            data: {
                tcTitle: tcTitle,
                tcNotes: tcNotes,
                tcDuration: tcDuration,
                tcConstraint: tcConstraint,
                tcUsers: tcUsers.toString()
            },
            success: function (data) {
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

/**
 * 监听用户下拉列表元素插入
 */
$('.ppt_tbody').bind('DOMNodeInserted', function (element) {
    let target = $(element.target).children();
    //根据标签数量判断是否为要更变的内容
    if (target.length === 1) {
        let headPortrait = target.children(".table_circle");
        if (headPortrait[0].style.backgroundImage.indexOf("") !== -1) {
            //清空背景图
            headPortrait.css("backgroundImage", "");
            let usernameArr = target.children("span").text().split(" ");
            let defaultAvatar = "";
            for (let i = 0; i < usernameArr.length; i++) {
                defaultAvatar += usernameArr[i].charAt(0);
            }
            headPortrait.text(defaultAvatar);

        }
    }
})