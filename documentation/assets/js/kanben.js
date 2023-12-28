"use strict";

var group1 = document.getElementById("group1");
var group2 = document.getElementById("group2");
var group3 = document.getElementById("group3");
var group4 = document.getElementById("group4");
var groups = ['group1','group2','group3','group4']
var sortableSpeed = 150;

var sortable1 = Sortable.create(group1, {
  group: {
    name: "group1",
    put: groups
  },
  cursor: 'move',
  animation: sortableSpeed,

  onMove: function(evt) {
    var dropGroup = evt.to;
    group2.classList.add("adding");
  },
  onSort: function(evt) {
    console.log("group1 on sort");
    evt.from.classList.remove("adding");
  },
  onEnd: function(evt) {
    group2.classList.remove("adding");
  },
  filter: ".remove",
  onFilter: function(evt) {
    var item = evt.item,
      ctrl = evt.target;
    if (Sortable.utils.is(ctrl, ".remove")) {
      // Click on remove button
      $(item).slideUp('400', function() {
         $(item).remove();
      });
    }
  }
});

var sortable2 = Sortable.create(group2, {
  group: {
    name: "group2",
    put: groups
  },
  cursor: 'move',
  animation: sortableSpeed,

  onSort: function(evt) {
    evt.to.classList.remove("adding");
  }
});

var sortable3 = Sortable.create(group3, {
  group: {
    name: "group3",
    put: groups
  },
  cursor: 'move',
  animation: sortableSpeed,
  onMove: function(evt) {
    var dropGroup = evt.to;
    dropGroup.classList.add("adding");
    evt.from.classList.remove("adding");
  },
  onSort: function(evt) {
    evt.from.classList.remove("adding");
  },
  onEnd: function(evt) {
    document.getElementById("group2").classList.remove("adding");
  }
});

var sortable4 = Sortable.create(group4, {
    group: {
      name: "group4",
      put: groups
    },
    cursor: 'move',
    animation: sortableSpeed,
    onMove: function(evt) {
      var dropGroup = evt.to;
      dropGroup.classList.add("adding");
      evt.from.classList.remove("adding");
    },
    onSort: function(evt) {
      evt.from.classList.remove("adding");
    },
    onEnd: function(evt) {
      document.getElementById("group2").classList.remove("adding");
    }
  });

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
}
