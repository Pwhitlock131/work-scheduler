 var timeDisplayEl = $('#time-display');
 var eventDisplayEl = $('#event-display');
 var eventInputEl = $('#event-input');
 var saveBttn = $('#save')
 // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
function displayTime() {
  var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  timeDisplayEl.text(rightNow);
}

function readEventsFromStorage() {
  var events = localStorage.getItem('events');
  if (events) {
    events = JSON.parse(events);
  } else {
    events = [];
  }
  return events;
}

function saveEventsToStorage(events) {
  localStorage.setItem('events', JSON.stringify(events));
}

function printEventData() {
  eventDisplayEl.empty();

  var events = readEventsFromStorage();

  for (var i = 0; i < events.length; i += 1) {
    var event = events[i];
    var eventDate = dayjs(event.date);
    var today = dayjs().startOf('day');
  }
}

function handleEventFormSubmit(event) {
  event.preventDefault();

  var newEvent = {
    date: dayjs().format(),
    description: eventInputEl.val()
  };

  var events = readEventsFromStorage();
  events.push(newEvent);
  saveEventsToStorage(events);

  printEventData();
}

saveBttn.on('click', handleEventFormSubmit);






$(function () {

  var now = dayjs();

  $('.time-block').each(function() {
var blockHour = parseInt($(this).attr('id').split('-')[1]);
if (blockHour < now.hour()) {
  $(this).addClass('past').removeClass('present future');
} else if (blockHour === now.hour()) {
  $(this).addClass('present').removeClass('past future');
} else {
  $(this).addClass('future').removeClass('past present');
}
  });

  $('.description').each(function () {
    var blockId = $(this).closest('.time-block').attr('id');
    var savedEvent = events.find(function(event) {
      return event.date === blockId;
    });
    if (savedEvent) {
      $(this).val(savedEvent.description);
    }
  });

  });
  
  displayTime();
  setInterval(displayTime, 1000);

    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?