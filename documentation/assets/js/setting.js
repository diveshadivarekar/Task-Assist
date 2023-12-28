"use strict";
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

:: Sidebar Setting

: Sidebar Type
: Color
: Item Design
------------------------------------------------
Index Of Script
----------------------------------------------*/

const sidebarTypes = document.querySelectorAll('[data-setting="sidebar"]')
Array.from(sidebarTypes, (sidebarType) => {
    sidebarType.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.querySelector('.sidebar-default').classList.add(sidebarType.value)
        } else {
            document.querySelector('.sidebar-default').classList.remove(sidebarType.value)
        }
    })
})

const allColorsTypes = document.querySelectorAll('[data-setting="sidebar"][name="sidebar-color"]')
Array.from(allColorsTypes, (colorType) => {
    colorType.addEventListener('change', (e) => {
        Array.from(allColorsTypes, (el) => {
            document.querySelector('.sidebar-default').classList.remove(el.value)
        })
        document.querySelector('.sidebar-default').classList.add(colorType.value)
    })
})

const allActiveType = document.querySelectorAll('[data-setting="sidebar"][name="sidebar-item"]')
Array.from(allActiveType, (activeType) => {
    activeType.addEventListener('change', (e) => {
        Array.from(allActiveType, (el) => {
            document.querySelector('.sidebar-default').classList.remove(el.value)
        })
        document.querySelector('.sidebar-default').classList.add(activeType.value)
    })
})