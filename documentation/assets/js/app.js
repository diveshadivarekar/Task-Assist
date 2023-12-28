/*
Template: Documentation - Responsive Bootstrap 4 Admin Dashboard Template
Author: iqonic.design
Design and Developed by: iqonic.design
NOTE: This file contains the styling for responsive Template.
*/

/*----------------------------------------------
Index Of Script
------------------------------------------------

------- Plugin Init --------

:: Tooltip
:: Popover
:: Circle Progress
:: NoUiSlider
:: CopyToClipboard
:: Vanila Datepicker
:: SliderTab

------ Functions --------

:: Loader Init
:: Resize Plugins
:: Sidebar Toggle

------- Listners ---------

:: DOMContentLoaded
:: Window Resize
------------------------------------------------
Index Of Script
----------------------------------------------*/


"use strict"

/*---------------------------------------------------------------------
              Popover
-----------------------------------------------------------------------*/

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

/*---------------------------------------------------------------------
                Tooltip
-----------------------------------------------------------------------*/

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-sidebar-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})



/*---------------------------------------------------------------------
              Circle Progress
-----------------------------------------------------------------------*/

const progressBar = document.getElementsByClassName('circle-progress')
Array.from(progressBar, (elem) => {
    const minValue = elem.getAttribute('data-min-value')
    const maxValue = elem.getAttribute('data-max-value')
    const value = elem.getAttribute('data-value')
    const  type = elem.getAttribute('data-type')
    if (elem.getAttribute('id') !== '' && elem.getAttribute('id') !== null) {
      new CircleProgress('#'+elem.getAttribute('id'), {
        min: minValue,
        max: maxValue,
        value: value,
        textFormat: type,
    });
    }
})

/*---------------------------------------------------------------------
                 noUiSlider
-----------------------------------------------------------------------*/

const rangeSlider = document.querySelectorAll('.range-slider');

Array.from(rangeSlider, (elem) => {
  noUiSlider.create(elem, {
    start: [20, 80],
    connect: true,
    range: {
        'min': 0,
        'max': 100
    }
  })
})

const slider = document.querySelectorAll('.slider');

Array.from(slider, (elem) => {
  noUiSlider.create(elem, {
    start: 50,
    connect: [true, false],
    range: {
        'min': 0,
        'max': 100
    }
  })
})

/*---------------------------------------------------------------------
              Copy To Clipboard
-----------------------------------------------------------------------*/
const copy = document.querySelectorAll('[data-toggle="copy"]')
Array.from(copy, (elem) => {
  elem.addEventListener('click', (e) => {
    const target = elem.getAttribute("data-copy-target");
    let value = elem.getAttribute("data-copy-value");
    const container = document.querySelector(target);
    if (container !== undefined && container !== null) {
      if (container.value !== undefined && container.value !== null) {
        value = container.value;
      } else {
        value = container.innerHTML;
      }
    }
    if (value !== null) {
      const elem = document.createElement("input");
      document.querySelector("body").appendChild(elem);
      elem.value = value;
      elem.select();
      document.execCommand("copy");
      elem.remove();
    }
  })
});

/*---------------------------------------------------------------------
              Vanila Datepicker
-----------------------------------------------------------------------*/
const datepickers = document.querySelectorAll('.vanila-datepicker')
Array.from(datepickers, (elem) => {
  new Datepicker(elem)
})
const daterangePickers = document.querySelectorAll('.vanila-daterangepicker')
Array.from(daterangePickers, (elem) => {
  new DateRangePicker(elem)
})

/*---------------------------------------------------------------------
              CounterUp 2
-----------------------------------------------------------------------*/

const counterUp2 = document.querySelectorAll( '.counter' )
Array.from(counterUp2, (el) => {
  new Waypoint( {
      element: el,
      handler: function() { 
          counterUp( el ) 
          this.destroy()
      },
      offset: 'bottom-in-view',
  })
})

/*---------------------------------------------------------------------
              SliderTab
-----------------------------------------------------------------------*/

Array.from(document.querySelectorAll('[data-toggle="slider-tab"]'), (elem) => {
  new SliderTab(elem)
})

// Smooth Scollbar
let Scrollbar
  if (jQuery(".data-scrollbar").length) {
    Scrollbar = window.Scrollbar
    Scrollbar.init(document.querySelector('.data-scrollbar'), {
      continuousScrolling: false,
    })
  }

/*---------------------------------------------------------------------
              Resize Plugins
-----------------------------------------------------------------------*/

const resizePlugins = () => {
  const tabs = document.querySelectorAll('.nav')
  if (window.innerWidth < 991) {
    Array.from(tabs, (elem) => {
      if (!elem.classList.contains('flex-column') && elem.classList.contains('nav-tabs') && elem.classList.contains('nav-pills')) {
        elem.classList.add('flex-column', 'on-resize');
      }
    })
  } else {
    Array.from(tabs, (elem) => {
      if (elem.classList.contains('on-resize')) {
        elem.classList.remove('flex-column', 'on-resize');
      }
    })
  }
}


/*---------------------------------------------------------------------
              LoaderInit
-----------------------------------------------------------------------*/

const loaderInit = () => {
  const loader = document.querySelector('.loader')
  setTimeout(() => {
    loader.classList.add('animate__animated', 'animate__fadeOut')
    setTimeout(() => {
      loader.classList.add('d-none')
    }, 500)
  }, 500)
}

/*---------------------------------------------------------------------
              Sidebar Toggle
-----------------------------------------------------------------------*/
const sidebarToggle = (elem) => {
  elem.addEventListener('click', (e) => {
    const sidebar = document.querySelector('.sidebar')
    console.log(sidebar)
    if (sidebar.classList.contains('sidebar-mini')) {
      sidebar.classList.remove('sidebar-mini')
    } else {
      sidebar.classList.add('sidebar-mini')
    }
  })
}

const sidebarToggleBtn = document.querySelectorAll('[data-toggle="sidebar"]')
Array.from(sidebarToggleBtn, (sidebarBtn) => {
  sidebarToggle(sidebarBtn)
})

/*---------------------------------------------------------------------
              DOMContentLoaded
-----------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', (event) => {
  resizePlugins()
  loaderInit()
});

/*---------------------------------------------------------------------
              Window Resize
-----------------------------------------------------------------------*/

window.addEventListener('resize', function(event) {
  resizePlugins()
});


/*-------------------------------
| | | | | DropDown
--------------------------------*/

function darken_screen(yesno){
  if( yesno == true ){
    document.querySelector('.screen-darken').classList.add('active');
  }
  else if(yesno == false){
    document.querySelector('.screen-darken').classList.remove('active');
  }
}
	
function close_offcanvas(){
  darken_screen(false);
  document.querySelector('.mobile-offcanvas.show').classList.remove('show');
  document.body.classList.remove('offcanvas-active');
}

function show_offcanvas(offcanvas_id){
  darken_screen(true);
  document.getElementById(offcanvas_id).classList.add('show');
  document.body.classList.add('offcanvas-active');
}

document.addEventListener("DOMContentLoaded", function(){
  
  document.querySelectorAll('[data-trigger]').forEach(function(everyelement){
    let offcanvas_id = everyelement.getAttribute('data-trigger');
    everyelement.addEventListener('click', function (e) {
      e.preventDefault();
          show_offcanvas(offcanvas_id);
    });
  });
  if(document.querySelectorAll('.btn-close')) {
    document.querySelectorAll('.btn-close').forEach(function(everybutton){
      everybutton.addEventListener('click', function (e) { 
            close_offcanvas();
        });
    });
  }
  if(document.querySelector('.screen-darken')) {
    document.querySelector('.screen-darken').addEventListener('click', function(event){
      close_offcanvas();
    });
  }
});
if (document.querySelector('#navbarSideCollapse'))  {
  document.querySelector('#navbarSideCollapse').addEventListener('click', function () {
    document.querySelector('.offcanvas-collapse').classList.toggle('open')
  })
}