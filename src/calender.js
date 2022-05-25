(() => {
    const todayBtn = document.querySelector("#today");
    const nextWeekBtn = document.querySelector("#nextWeek");
    const prevWeekBtn = document.querySelector("#prevWeek");
    const DAY_IN_MS = 86400000;
    const DAY_HEIGHT = 200;
  
    // data from API
    const events = [
      { fromTs: 1586309212166, dur: 3600000, desc: "event1" },
      { fromTs: 1586309212166, dur: 3600000, desc: "event2" },
      { fromTs: 1586334613000, dur: 3600000, desc: "event3" },
      { fromTs: 1586421013000, dur: 12000000, desc: "event4" },
      { fromTs: 1586507413000, dur: 3600000, desc: "event5" },
      { fromTs: 1586538413000, dur: 24600000, desc: "drinking beer" },
      { fromTs: 1587371413000, dur: 7200000, desc: "event6" },
      { fromTs: 1586314800000, dur: 3600000, desc: "event7" }
    ];
  
    // group overlapping events
    const groupIntervals = (events) => {
      const enrichedEvents = events.map((e) => ({
        ...e,
        toTs: e.fromTs + e.dur
      }));
      const sortedEvents = enrichedEvents.sort((a, b) => a.fromTs - b.fromTs);
      const groups = {};
      let groupNo = 1;
      let top = sortedEvents[0];
      groups[groupNo] = [top];
      for (let i = 1; i < sortedEvents.length; i++) {
        if (top.toTs >= sortedEvents[i].fromTs) {
          if (groups[groupNo]) {
            groups[groupNo].push(sortedEvents[i]);
            top = sortedEvents[i];
          } else {
            groupNo++;
            groups[groupNo] = [top];
            top = sortedEvents[i];
          }
        } else {
          top = sortedEvents[i];
          groupNo++;
          groups[groupNo] = [top];
        }
      }
      return groups;
    };
  
    // get the Monday of the week of the given date object
    const getMondayOfCurrentWeek = (d) => {
      const day = d.getDay();
      return new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate() + (day == 0 ? -6 : 1) - day
      );
    };
  
    // get the Sunday of the week of the given date object
    const getSundayOfCurrentWeek = (d) => {
      const day = d.getDay();
      return new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate() + (day == 0 ? 0 : 7) - day
      );
    };
  
    // Currently displayed time, acts like a state
    let DISPLAYED_TIME = getMondayOfCurrentWeek(
      new Date(1586309212166)
    ).getTime();
  
    // calculate the position and the height of the events
    const calculatePosition = (ts) => (DAY_HEIGHT / DAY_IN_MS) * ts;
    const calculateHeight = (dur) => (DAY_HEIGHT / DAY_IN_MS) * dur;
  
    // create event
    const createEventContainer = (event, num) => {
      const eventContainer = document.createElement("div");
      const d = new Date(event.fromTs);
      const timInMs =
        (d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds()) * 1000 +
        d.getMilliseconds();
  
      const pos = calculatePosition(timInMs);
      const h = calculateHeight(event.dur);
      eventContainer.setAttribute("class", "eventContainer");
      const eventDescription = document.createElement("div");
      eventDescription.setAttribute("class", "eventDescription");
      eventDescription.innerText = event.desc;
      eventContainer.setAttribute(
        "style",
        `top:${pos}px; height:${h}px; background-color: #${Math.floor(
          ((num + 1) / 10) * 16777215
        ).toString(16)};`
      );
      eventContainer.appendChild(eventDescription);
      return eventContainer;
    };
  
    // add events to calendar
    const addEventsToCalendar = (events) => {
      if (events.length > 0) {
        const enrichedEvents = events.map((e) => ({
          ...e,
          dayOfWeek: new Date(e.fromTs).getDay()
        }));
        const groupedEvents = groupIntervals(enrichedEvents);
        Object.values(groupedEvents).forEach((group) => {
          const groupContainer = document.createElement("div");
          groupContainer.setAttribute("class", "groupContainer");
          let dayOfTheWeek = "";
          group.forEach((e, i) => {
            groupContainer.appendChild(createEventContainer(e, i));
            dayOfTheWeek = e.dayOfWeek;
          });
          const day = document.querySelector(`#day_${dayOfTheWeek}`);
          day.appendChild(groupContainer);
        });
      }
    };
  
    // set calendat for the week
    const setCalendar = (displayTime, events) => {
      const currentMonday = getMondayOfCurrentWeek(new Date(displayTime));
      const currentSunday = getSundayOfCurrentWeek(new Date(displayTime));
      const filteredEvents = events.filter(
        (e) =>
          e.fromTs >= currentMonday.getTime() &&
          e.fromTs <= currentSunday.getTime()
      );
      addEventsToCalendar(filteredEvents);
    };
  
    // clear the content of the calendar
    const clearcalendar = () => {
      document.querySelectorAll(".day").forEach((d) => {
        d.innerHTML = "";
      });
    };
  
    // event handlers for the buttons
    todayBtn.addEventListener("click", () => {
      const currentDate = Date.now();
      clearcalendar();
      setCalendar(currentDate, events);
    });
  
    nextWeekBtn.addEventListener("click", () => {
      DISPLAYED_TIME = DISPLAYED_TIME + 7 * 24 * 60 * 60 * 1000;
      clearcalendar();
      setCalendar(DISPLAYED_TIME, events);
    });
  
    prevWeekBtn.addEventListener("click", () => {
      DISPLAYED_TIME = DISPLAYED_TIME - 7 * 24 * 60 * 60 * 1000;
      clearcalendar();
      setCalendar(DISPLAYED_TIME, events);
    });
  
    // init weekly calendar app
    clearcalendar();
    setCalendar(DISPLAYED_TIME, events);
  })();
  