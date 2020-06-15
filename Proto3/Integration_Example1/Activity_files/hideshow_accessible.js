//Caroline Note (March 20th, 2013): This accessible toggle comes from http://www.mikeraynham.co.uk/articles/accessible-jquery-toggles
var create_name = function(text) {
  // Convert text to lower case.
  var name = text.toLowerCase();
  
  // Remove leading and trailing spaces, and any non-alphanumeric
  // characters except for ampersands, spaces and dashes.
  name = name.replace(/^\s+|\s+$|[^a-z0-9&\s-]/g, '');
  
  // Replace '&' with 'and'.
  name = name.replace(/&/g, 'and');
  
  // Replaces spaces with dashes.
  name = name.replace(/\s/g, '-');
  
  // Squash any duplicate dashes.
  name = name.replace(/(-)+\1/g, "$1");
  
  return name;
};

var add_link = function() {
  // Convert the p element text into a value that
  // is safe to use in a name attribute.
  var name = create_name($(this).text());
  
  // Create a name attribute in the following div.toggle
  // to act as a fragment anchor.
  $(this).next('div.toggle').attr('name', name);
  
  // Replace the p.toggle element with a link to the
  // fragment anchor.  Use the p text to create the
  // link title attribute.
  $(this).html(
    '<a href="#' + name + '" title="Reveal ' +
    $(this).text() + ' content">' +
    $(this).html() + '</a>');
};

var toggle = function(event) {
  event.preventDefault();

  // Toggle the 'expanded' class of the p.toggle
  // element, then apply the slideToggle effect
  // to div.toggle siblings.
  $(this).
    toggleClass('expanded').
    nextAll('div.toggle').slideToggle('normal');
};

var remove_focus = function() {
  // Use the blur() method to remove focus.
  $(this).blur();
};

$(document).ready (function (){
  // Replace the '_toggle' class with 'toggle'. 
  $('._toggle').
    removeClass('_toggle').
    addClass('toggle');
    
  // Replace the '_expanded' class with 'expanded'. 
  $('._expanded').
    removeClass('_expanded').
    addClass('expanded');
  
  // Hide all div.toggle elements that are not initially expanded.
  $('h4.toggle:not(.expanded)').nextAll('div.toggle').hide();
  
  // Add a link to each p.toggle element.
  $('h4.toggle').each(add_link);
  
  // Add a click event handler to all p.toggle elements.
  $('h4.toggle').click(toggle);
  
  // Remove the focus from the link tag when accessed with a mouse.
  $('h4.toggle a').mouseup(remove_focus);
});