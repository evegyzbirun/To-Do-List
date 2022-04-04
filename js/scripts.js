// UTILITY LOGIC 

// BUSINESS LOGIC FOR TODOLIST
function DailyChores() {
  this.chores = {};
  this.currentId = 0;
};

DailyChores.prototype.addChore = function (chore) {
  chore.id = this.assignId();
  this.chores[chore.id] = chore;
};

DailyChores.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

DailyChores.prototype.findChore = function (id) {
  if (this.chores[id] != undefined) {
    return this.chores[id];
  }
  return false;
};

DailyChores.prototype.deleteChore = function (id) {
  if (this.chores[id] === undefined) {
    return false;
  }
  delete this.chores[id];
  return true;
};

// BUSINESS LOGIC FOR CHORES
function Chore(morningChore, afternoonChore, eveningChore) {
  this.morningChore = morningChore;
  this.afternoonChore = afternoonChore;
  this.eveningChore = eveningChore;
}

Chore.prototype.allChores = function () {
  return this.morningChore + " " + this.afternoonChore + " " + this.eveningChore;
};
// USER INTERFACE LOGIC

let dailyChores = new DailyChores();

function displayChores(choresToDisplay) {
  let choresList = $("ul#chores");
  let htmlForChoreInfo = "";
  Object.keys(choresToDisplay.chores).forEach(function (key) {
    const chore = choresToDisplay.findChore(key);
    htmlForChoreInfo += "<li id=" + chore.id + ">" + chore.morningChore + " " + chore.afternoonChore + " " + chore.eveningChore + "</li>";
  });
  choresList.html(htmlForChoreInfo);
};

function showChore(choreId) {
  const chore = dailyChores.findChore(choreId);
  $("#show-chore").show();
  $(".morning-chore").html(chore.morningChore);
  $(".afternoon-chore").html(chore.afternoonChore);
  $(".evening-chore").html(chore.eveningChore);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + chore.id + ">Delete</button>");
};

function attachContactListeners() {
  $("ul#chores").on("click", "li", function () {
    showChore(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function () {
    dailyChores.deleteChore(this.id);
    $("#show-chore").hide();
    displayChores(dailyChores);
  });
};

$(document).ready(function () {
  $("form#new-chore").submit(function (event) {
    event.preventDefault();
    const inputtedMorningChore = $("input#new-morning-chore").val();
    console.log(inputtedMorningChore);
    const inputtedAfternoonChore = $("input#new-afternoon-chore").val();
    const inputtedEveningChore = $("input#new-evening-chore").val();
    let newChore = new Chore(inputtedMorningChore, inputtedAfternoonChore, inputtedEveningChore);
    console.log(newChore);
    dailyChores.addChore(newChore);
    displayChores(dailyChores);
  });
});
