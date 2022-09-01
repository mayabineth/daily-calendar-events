export const events = [
  { id: 1, start: 90, end: 130 }, // an event from 10:30am to 11.10am
  { id: 2, start: 105, end: 135 }, // an event from 10:45am to 11:15am
  { id: 3, start: 120, end: 240 }, // an event from 11:00am to 1:00pm
  { id: 4, start: 180, end: 260 }, // an event from 12:00pm to 1:20pm
  { id: 5, start: 500, end: 560 }, // an event from 5:20pm to 6:20pm
];

export function renderDivs(events) {
  let eventsLength = events.length;
  let intervals = new Array(720);
  let fullSet = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]); //set to next available index
  let event, i, j;
  let uiItems = []; // divs list
  // sort events to verify inner array in accending order
  events = events.sort(function (a, b) {
    return a.id - b.id; //sort a after b
  });
  // initialize intervals arrays
  for (i = 0; i < intervals.length; i++) {
    intervals[i] = [];
  }
  // place events in each intervals row
  for (i = 0; i < eventsLength; i++) {
    event = events[i];
    for (j = event.start; j < event.end; j++) {
      intervals[j].push(event.id - 1);
    }
  }

  // get each event it's horizontal position, and figure out the max number of conflicts it has
  for (i = 0; i < intervals.length; i++) {
    let timeslotLength = intervals[i].length;
    const indexList = new Set();
    if (timeslotLength > 0) {
      for (j = 0; j < timeslotLength; j++) {
        event = events[intervals[i][j]];
        //update count of events if first time or more events in line
        if (!event.cevt || event.cevt < timeslotLength) {
          event.cevt = timeslotLength;
          //update position only in the first time
          if (!event.index) {
            // set first available value to index
            let temp = new Set(
              [...fullSet].filter((element) => !indexList.has(element))
            );
            event.index = Math.min(...temp);
          }
        }
        indexList.add(event.index);
      }
    }
  }

  // use the maximum width as possible without overlapping
  for (i = 0; i < intervals.length; i++) {
    let taken = [];
    let cevt;
    let max_cevt = 0;
    let index, next_index, count;
    for (j = 0; j < intervals[i].length; j++) {
      cevt = events[intervals[i][j]].cevt;
      if (cevt > max_cevt) max_cevt = cevt;
      taken.push(events[intervals[i][j]].index);
    }
    for (j = 0; j < intervals[i].length; j++) {
      if (events[intervals[i][j]].cevt < max_cevt) {
        index = events[intervals[i][j]].index;
        next_index = Math.min(...taken.filter((x) => x > index));
        if (next_index) {
          count = next_index - index;
          events[intervals[i][j]].cevt = max_cevt / count;
        }
      }
    }
  }

  //  calculate event dimensions and generate new div elements
  for (i = 0; i < events.length; i++) {
    event = events[i];
    event.pxh = event.end - event.start;
    event.pxt = event.start;
    event.pxw = 600 / event.cevt;
    event.pxl = event.index * event.pxw;

    let styleObj = {
      width: event.pxw + "px",
      height: event.pxh + "px",
      top: event.pxt + "px",
      left: event.pxl + "px",
    };

    uiItems.push(
      <div key={i} style={styleObj} className="event">
        Sample Item <div className="location">Sample Location</div>
      </div>
    );
  }
  return uiItems;
}
