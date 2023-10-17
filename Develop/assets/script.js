var timeDisplayEl = $('#time-display');
var eventDisplayEl = $('#event-display');
var eventInputEl = $('#event-input');
var saveBttn = $('#save')

//defines a function to display current time and date using the dayjs library, updates elements using id: time-display.
function displayTime() {
  var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  timeDisplayEl.text(rightNow);
}


//sets up a click event handler for all bttns and logs the parent ID and the value to the console when a bttn is clicked. Done for tutoring 
console.log($(':button').on(
  "click", function () {
    var parentId = $(this).parent().attr('id')
    console.log(parentId);
    var value = $(this).siblings('.description').val()
    console.log(value)
    localStorage.setItem(parentId, value)
  }
))

//reads events in local storage
function readEventsFromStorage() {
  var events = localStorage.getItem('events');
  if (events) {
    events = JSON.parse(events);
  } else {
    events = [];
  }
  return events;
}

//saves events to local storage
function saveEventsToStorage(events) {
  localStorage.setItem('events', JSON.stringify(events));
}

//handles form submission, stores event data in local storage and updates textarea
function handleEventFormSubmit(event) {
  event.preventDefault();

  var newEvent = {
    date: dayjs().format(),
    description: eventInputEl.val()
  };

  var events = readEventsFromStorage();
  events.push(newEvent);
  saveEventsToStorage(events);

  eventInputEl.siblings('.description').val(newEvent.description);

  displaySavedEvents();
}
//adds a click event listener to the save bttn which triggers handleEventFormSubmit on click
saveBttn.on('click', handleEventFormSubmit);

function displaySavedEvents() {
  var events = readEventsFromStorage();

  eventDisplayEl.empty();

  events.forEach(function(event) {
    var eventItem = $('<div>');
    eventItem.text(event.description);
    eventDisplayEl.append(eventItem);
  });

  $(document).ready(function() {
    displaySavedEvents();
  });
}



//sets up the page, reads events from local storage and changes the css according to current time
$(function () {

  var events = readEventsFromStorage();

  var now = dayjs();


  $('.time-block').each(function () {
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
    var savedEvent = events.find(function (event) {
      return event.date === blockId;
    });
    if (savedEvent) {
      $(this).val(savedEvent.description);
    }
  });

});

//calls displayTime function to display current time and date
displayTime();
//updates timer display every second by calling the displayTime function repeatedly
setInterval(displayTime, 1000);