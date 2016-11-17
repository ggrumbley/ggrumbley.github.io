//LOREM IPUSM GENERATOR
var firstWorldIpsum;
$.getJSON("http://www.reddit.com/r/firstworldproblems/.json", function(data) {
		JSON = data.data;
		firstWorldIpsum = [];
		var paragraph = "";
		for (var x = 0; x <=5; x++) {
			for (var i = 0; i <= x; i++) {
				var randomNumber = Math.floor(Math.random() * (24 - 5 + 1)) + 5;
				paragraph += "<p>" + JSON.children[randomNumber].data.title + JSON.children[randomNumber-1].data.title + JSON.children[randomNumber-2].data.title + JSON.children[randomNumber-3].data.title + JSON.children[randomNumber-4].data.title + "</p>";
			}
			firstWorldIpsum.push(paragraph);
			paragraph = "";
		}
	});

//TAB FUNCTIONALITY
$(document).ready(
	$("body").on("click", ".tabs li", function() {
		var selectedIndex = ($(this).index());
		var wrapper = $(this).parents("div.subMain");
		var selectedContent = ($(wrapper).find(".content")[selectedIndex]);

	 	$(this).addClass('active');
		$(this).siblings('.tabs li.active').removeClass('active');
		$(wrapper).find('.display').removeClass('display');
		$(selectedContent).addClass('display');
		return false;
	}));


//ELEMENT GENERATOR ON FORM SUBMIT
function createTabBox(numTabs, defaultTab) {
	var tabs = "";
	var content = "";
	for (var i=1; i <= numTabs; i++){
		if(defaultTab == i) {
			content += "<div class='content display'><h2>Content for Tab " + i + "</h2>" + firstWorldIpsum[i-1] + "</div>";
			tabs += "<li class='active'><a href='#'>Tab " + i + "</a></li>";
		} else {
			content += "<div class='content'><h2>Content for Tab " + i + "</h2>" + firstWorldIpsum[i-1] + "</div>";
			tabs += "<li><a href='#'>Tab " + i + "</a></li>";
		}
	};
	
	var tabBox = "<div class='subMain'><div class='nav'><ul class='tabs clearfix'>" + tabs + "</ul></div><div class='container'>" + content + "</div></div>";
	return tabBox
};

//SET RANDOM COLOR ON TABBOX
function randomColor(div) {
	var randomNumber = Math.floor(Math.random() * 3);
	var colors = ['red', 'blue', 'green'];
	div = $(div).addClass(colors[randomNumber]);
	return div
};