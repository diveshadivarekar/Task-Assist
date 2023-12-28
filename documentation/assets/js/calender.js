/*
Template: Documentation - Responsive Bootstrap 4 Admin Dashboard Template
Author: iqonic.design
Design and Developed by: iqonic.design
NOTE: This file contains the styling for responsive Template.
*/
"use strict"

if (jQuery('#calendar1').length) {
  document.addEventListener('DOMContentLoaded', function () {
    let calendarEl = document.getElementById('calendar1');
    let calendar1 = new FullCalendar.Calendar(calendarEl, {
      selectable: true,
      plugins: ["timeGrid", "dayGrid", "list", "interaction"],
      timeZone: "UTC",
      defaultView: "dayGridMonth",
      contentHeight: "auto",
      eventLimit: true,
      dayMaxEvents: 4,
      header: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
      },
      dateClick: function (info) {
          $('#schedule-start-date').val(info.dateStr)
          $('#schedule-end-date').val(info.dateStr)
          $('#date-event').modal('show')
      },
      events: [
          {
              title: 'Click for Google',
              url: 'http://google.com/',
              start: moment(new Date(), 'YYYY-MM-DD').add(-20, 'days').format('YYYY-MM-DD') + 'T05:30:00.000Z',
              color: '#4731b6'
          },
          {
              title: 'All Day Event',
              start: moment(new Date(), 'YYYY-MM-DD').add(-18, 'days').format('YYYY-MM-DD') + 'T05:30:00.000Z',
              color: '#465af7'
          },
          {
              title: 'Long Event',
              start: moment(new Date(), 'YYYY-MM-DD').add(-16, 'days').format('YYYY-MM-DD') + 'T05:30:00.000Z',
              end: moment(new Date(), 'YYYY-MM-DD').add(-13, 'days').format('YYYY-MM-DD') + 'T05:30:00.000Z',
              color: '#7858d7'
          },
          {
              groupId: '999',
              title: 'Repeating Event',
              start: moment(new Date(), 'YYYY-MM-DD').add(-14, 'days').format('YYYY-MM-DD') + 'T05:30:00.000Z',
              color: '#465af7'
          },
          {
              groupId: '999',
              title: 'Repeating Event',
              start: moment(new Date(), 'YYYY-MM-DD').add(-12, 'days').format('YYYY-MM-DD') + 'T05:30:00.000Z',
              color: '#5baa73'
          },
          {
              groupId: '999',
              title: 'Repeating Event',
              start: moment(new Date(), 'YYYY-MM-DD').add(-10, 'days').format('YYYY-MM-DD') + 'T05:30:00.000Z',
              color: '#01041b'
          },
          {
              title: 'Birthday Party',
              start: moment(new Date(), 'YYYY-MM-DD').add(-8, 'days').format('YYYY-MM-DD') + 'T05:30:00.000Z',
              color: '#4731b6'
          },
          {
              title: 'Meeting',
              start: moment(new Date(), 'YYYY-MM-DD').add(-6, 'days').format('YYYY-MM-DD') + 'T05:30:00.000Z',
              color: '#15ca92'
          },
          {
              title: 'Birthday Party',
              start: moment(new Date(), 'YYYY-MM-DD').add(-5, 'days').format('YYYY-MM-DD') + 'T05:30:00.000Z',
              color: '#f4a965'
          },
          {
              title: 'Birthday Party',
              start: moment(new Date(), 'YYYY-MM-DD').add(-2, 'days').format('YYYY-MM-DD') + 'T05:30:00.000Z',
              color: '#ea643f'
          },

          {
              title: 'Meeting',
              start: moment(new Date(), 'YYYY-MM-DD').add(0, 'days').format('YYYY-MM-DD') + 'T05:30:00.000Z',
              color: '#15ca92'
          },
          {
              title: 'Click for Google',
              url: 'http://google.com/',
              start: moment(new Date(), 'YYYY-MM-DD').add(0, 'days').format('YYYY-MM-DD') + 'T06:30:00.000Z',
              color: '#4731b6'
          },
          {
              groupId: '999',
              title: 'Repeating Event',
              start: moment(new Date(), 'YYYY-MM-DD').add(0, 'days').format('YYYY-MM-DD') + 'T07:30:00.000Z',
              color: '#5baa73'
          },
          {
              title: 'Birthday Party',
              start: moment(new Date(), 'YYYY-MM-DD').add(0, 'days').format('YYYY-MM-DD') + 'T08:30:00.000Z',
              color: '#f4a965'
          },
          {
              title: 'Doctor Meeting',
              start: moment(new Date(), 'YYYY-MM-DD').add(0, 'days').format('YYYY-MM-DD') + 'T05:30:00.000Z',
              color: '#f4a965'
          },
          {
              title: 'All Day Event',
              start: moment(new Date(), 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD') + 'T05:30:00.000Z',
              color: '#465af7'
          },
          {
              groupId: '999',
              title: 'Repeating Event',
              start: moment(new Date(), 'YYYY-MM-DD').add(8, 'days').format('YYYY-MM-DD') + 'T05:30:00.000Z',
              color: '#465af7'
          },
          {
              groupId: '999',
              title: 'Repeating Event',
              start: moment(new Date(), 'YYYY-MM-DD').add(10, 'days').format('YYYY-MM-DD') + 'T05:30:00.000Z',
              color: '#5baa73'
          }
      ]
  });
  calendar1.render();
  });
  
}