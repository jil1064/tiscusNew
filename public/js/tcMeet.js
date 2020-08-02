var initial = "";
var fullname;
var count = "";

function mobile_show4() { /*when count != 0*/
  $('tbody').css("height", "calc(6.6vh * 5 + 4px)");
  $('tbody').css("max-height", "calc(11vw * 4.1)");
  $('table').css("margin-top","3.5vw");
}
function mobile_show5() { /*when count = 0*/
  $('tbody').css("height", "calc(6.6vh * 5)");
  $('tbody').css("max-height", "calc(11vw * 5)");
}
function desktop_show4() { /*when count != 0*/
  $('tbody').css("height","calc((2.2vw + 6px) * 4 + 1px)");
  $('table').css("margin-top","0.8vw");
}
function desktop_show5() { /*when count = 0*/
  $('tbody').css("height","calc((2.2vw + 6px) * 5)");
}

$(window).on('resize', function(e) {
  console.log('true');
  $('#datepicker').datepicker('hide');
  //for phone
  if (window.matchMedia('(max-width: 480px)').matches) {
    if (count != 0) { //determines how many rows to show
      mobile_show4();
    }
    else{
      mobile_show5();
    }
  }
  //for desktop
  else{
    if (count != 0) {
      desktop_show4();
    }
    else{
      desktop_show5();
    }
  }

});


$('tbody').on('click', 'tr', function(){
  $('.ppt').show();
  $('.border').show();

  $(this).find("td").each(function(){

    count = $('.ppt .circle:visible').length + 1;
    console.log(count);

    initial = $(this).closest('tr').find('.table_circle').text();
    console.log(initial);

    var get_name = $(this).closest('tr').find('td').text();
    //get_name.replace('\n', '');
    get_name = get_name.substring(2);
    //console.log(get_name);
    get_name = get_name.split(' ')
    //get_name = get_name.split('\n');
    //console.log(get_name);
    fullname = get_name[0] + " " + get_name[1] + " ";
    console.log(fullname);


    if (count != 0) { //show 4 rows when there's participants
      console.log('here1');
      $(".next_btn").prop( "disabled", false );
      $(".next_btn").addClass("next_btn_enabled");
      //4 rows for phone
      if (window.matchMedia('(max-width: 480px)').matches) {
        console.log('here2');
        mobile_show4();
      }
      //4 rows for desktop
      else{
        desktop_show4();
      }
    }


    if (count < 5) {
        //this.classList.contains('img')
        //console.log($(this).children().hasClass("table_circle"));
        $(this).hide();
        if ($(this).children().hasClass("table_circle")) {
          console.log("ppt clicked");
          var addHTML = "<div class='circle' style='font-weight: 500'>" + initial + " </div>";
          var circles = $(addHTML).text(initial);
          circles.append("<div class='minus'>-</div>")
          $(".selectPage .ppt").append(circles);
          //$(".tmConfirm .ppt").append(circles);
          console.log(fullname);
          circles.attr('id', fullname);
          console.log(count);
        }
        else{
          console.log("group clicked");

        }
    }
    else{
//        %%Max is supposed to be 10
      alert("Max number of participants is 6");
    }


  });
});

//%% people have big fingers; let us trigger this when the whole circle is clicked
$('.ppt').on('click', '.minus', function(){
    //alert("minus clicked");
    count--;
    console.log(count);
    //when no participants, hide border and make button disabled
    if (count == 0) {
      console.log("minus");
      $(".next_btn").prop("disabled", true);
      $(".next_btn").removeClass("next_btn_enabled");

      $('.border').remove()
      $('table').css("margin-top","0");
      //for phones
      if (window.matchMedia('(max-width: 480px)').matches) {
        mobile_show5();
      }
      //for desktop/ipad
      else{
        desktop_show5();
      }
    }

    //console.log(this);
    //hide the circle if minus is clicked
    var closest_circle = $(this).closest('.circle');
    $(closest_circle).remove();
    //console.log(closest_circle.text());

    //get person's name and initial to add it back to the table row
    var minus_initial = closest_circle.text().substring(0,2);
    var minus_name = $(closest_circle).attr('id');
    //console.log(minus_name);

    //add the participant back into the table
    var addRow ="<tr><td><span class='table_circle'>" + minus_initial + "</span>" + minus_name + "</td></tr>"
    $("tbody").append(addRow);
    console.log(minus_name + ":" + minus_initial);

});

  $("#select_next").click(function(){
      $('.selectPage .ppt').clone().appendTo('.tmConfirm .confirm_ppt');
      $('.confirm_ppt').css("padding-top", "0.5vw");
      $('.confirm_ppt .minus').remove();
  });

  //searching JS
  function searchPpt() {
    //user input value
    var input = document.getElementById('search').value;
    input = input.toLowerCase();
    console.log(input);
    //gets all "tr's"
    var tr = document.getElementsByTagName("tr");
    console.log(tr);
    //tr[0] = schedule with input box, so start at 1
    for (i = 1; i < tr.length; i++) {
      //no space btwn initial and name
      var pptname1 = tr[i].getElementsByTagName("td");
      pptname1 = ($(pptname1).text()).trim();
      //space btwn initial and name
      var pptname2 = pptname1.substring(0,2) + " " + pptname1.substring(2);
      console.log(pptname2);
      //no spaces at all
      var pptname3 = pptname1.replace(" ", "");
      console.log(pptname3);
      //console.log(pptname1, ":", pptname1.toLowerCase().indexOf(input));
      //search table. -1 = no match
      if (pptname1.toLowerCase().indexOf(input) > -1 ||
        pptname2.toLowerCase().indexOf(input) > -1 ||
        pptname3.toLowerCase().indexOf(input) > -1) {
          console.log("match");
          $(tr[i]).show();
      }
      else{
          console.log("no");
          $(tr[i]).hide();
      }
  }};

  $(document).ready(function() {
     $(function() {
       console.log("datepicker");
       $("#first_date").datepicker();
     });
      initCreateTc();
   });

   $( "#first_date" ).datepicker({
     dateFormat: "m/d/yy",
     changeMonth: true,
     changeYear: true,
   });

   function validate() {
     document.getElementById('submit').style.display = "none";
       console.log(tcTitle.value);
       var meeting_hr = document.getElementById('hr');
       console.log(meeting_hr.value);
       var meeting_min = document.getElementById('min');
       console.log(meeting_min.value);
       var date = document.getElementById('first_date');
       //console.log(first_date.value);
       //console.log(date.value);
       var start_date = $('#first_date').datepicker().val();
       console.log(start_date);

       //var date = $("#first_date").val();
       //console.log(date);
       /*check for required questions not empty/checked*/
       if (tcTitle.value != "" && meeting_hr.value != "" && meeting_min.value != "" && first_date.value != "") {
           console.log("in here");
           document.getElementById('submit').style.display = "block";
           //document.getElementById('submit').hidden = false;
       }
       else{
         console.log("else");
         document.getElementById('submit').style.display = "none";
         //document.getElementById('submit').hidden = true;
       }
   }

   $('#first_date').change('input', function() {
    //function calcDate() {
      var start_date = $('#first_date').datepicker('getDate');
      //console.log("s" + start_date);
      var end_date = start_date.setDate(start_date.getDate()+2);
      end_date = new Date(end_date);
      //console.log(end_date);
      //$('#second_date').datepicker('setDate', end_date);
      $('#second_date').val((end_date.getMonth()+1) + "/" + end_date.getDate() + "/" + end_date.getFullYear());

      if (tcTitle.value != "" && hr.value != "" && min.value != "" && start_date != "") {
          console.log("in here");
          document.getElementById('submit').style.display = "block";
          //document.getElementById('submit').hidden = false;
      }
      else{
        console.log("else");
        document.getElementById('submit').style.display = "none";
        //document.getElementById('submit').hidden = true;
      }
    });


function initCreateTc() {
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