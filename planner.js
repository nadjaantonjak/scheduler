var today = moment();
var currentDay = today.format("dddd [the ]Do MMMM YYYY");
var currentHour = parseInt(moment().format("H"))
var currentTime = today.format("h:mm A");
const timeBlock = $(".time-block");
var socialHours = [6, 7, 18, 19, 20, 21, 22];

// Dynamic HTML JQuery elements
$("#currentDay").text("Today is " + currentDay);
$("#currentTime").text("The time is " + currentTime);

// Colour each timeBlock function
timeBlock.each(function () {
    var parent = $(this).parents(".flex-row");
    var timeId = parseInt(parent.attr("id"));
    var thisHour = parseInt(moment().format("H"));

    // Change the timeBlock classes to determine the background color
    if (timeId < thisHour) {
        $(this).addClass("past").removeClass("present future");
    } else if (timeId > thisHour) {
        $(this).addClass("future").removeClass("present past");
    } else if (timeId == thisHour) {
        $(this).addClass("present").removeClass("past future");
    }

    // Change classes for social time
    for (i = 0; i < socialHours.length; i++) {
        console.log(socialHours[i]);
        if (timeId === socialHours[i]) {
            $(this).addClass("social").removeClass("past future");
        }
    }

    // Fill textAreas from localStorage
    $(this).val(localStorage.getItem(parent.attr("id")));
});

//Event listener for button click
$(".saveBtn").on("click", function () {
    var taskText = $(this).siblings(".time-block").val();
    var hourTask = $(this).parent(".flex-row").attr("id");
    localStorage.setItem(hourTask, taskText);
    if (taskText == "" || taskText == " ") {
        // Clears the task from the current hour
        localStorage.removeItem(hourTask);
    }
})