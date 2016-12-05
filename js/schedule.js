function weekDay(){
   thisDate = new Date();
   var thisWDay = thisDate.getDay();
   var wdName = new Array("Sunday", "Monday", "Tuesday", "Wednesday",
       "Thursday", "Friday", "Saturday");
   return wdName[thisWDay];
}

var expected;

if (weekDay() == "Sunday") {
	expected = "scheduled to stream from 1:00 PM to 8:00 PM EST.";
}
else if (weekDay() == "Monday") {
	expected = "not scheduled to stream today. <br />The next scheduled stream is Thursday, starting at 7:00 PM EST.";
}
else if (weekDay() == "Tuesday") {
	expected = "not scheduled to stream today. <br />The next scheduled stream is Thursday, starting at 7:00 PM EST.";
}
else if (weekDay() == "Wednesday") {
	expected = "not scheduled to stream today. <br />The next scheduled stream is tomorrow, starting at 7:00 PM EST.";
}
else if (weekDay() == "Thursday") {
	expected = "scheduled to stream from 7:00 PM to 11:00 PM EST.";
}
else if (weekDay() == "Friday") {
	expected = "scheduled to stream for an undecided amount of time, starting at 3:00 PM EST.";
}
else if (weekDay() == "Saturday") {
	expected = "scheduled to stream from 1:00 PM to 8:00 PM EST.";
}

window.onload = function() {
document.getElementById('todayNotice').innerHTML = "Today is " + weekDay() + ". JT is " + expected;
}