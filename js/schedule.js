function weekDay(){
   thisDate = new Date();
   var thisWDay = thisDate.getDay();
   var wdName = new Array("Sunday", "Monday", "Tuesday", "Wednesday",
       "Thursday", "Friday", "Saturday");
   return wdName[thisWDay];
}

var expected;

if (weekDay() == "Sunday") {
	expected = "not scheduled to stream today. <br />The next scheduled stream is tomorrow, starting at 2:00 PM EST.";
}
else if (weekDay() == "Monday") {
	expected = "scheduled to stream from 3:00 PM to 7:00 PM EST.";
}
else if (weekDay() == "Tuesday") {
	expected = "scheduled to stream from 3:00 PM to 7:00 PM EST.";
}
else if (weekDay() == "Wednesday") {
	expected = "scheduled to stream from 3:00 PM to 7:00 PM EST.";
}
else if (weekDay() == "Thursday") {
	expected = "scheduled to stream from 3:00 PM to 7:00 PM EST.";
}
else if (weekDay() == "Friday") {
	expected = "scheduled to stream from 3:00 PM to 7:00 PM EST.";
}
else if (weekDay() == "Saturday") {
	expected = "scheduled to stream from 3:00 PM to 7:00 PM EST.";
}

window.onload = function() {
document.getElementById('todayNotice').innerHTML = "Today is " + weekDay() + ". JT is " + expected;
}
