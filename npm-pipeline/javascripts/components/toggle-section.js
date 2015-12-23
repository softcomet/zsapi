/*

Toggle Sections

Addordian-like functionality for page sections

Notes:
- transition on height is handled via css

*/





var toggleSections = $('.toggle-section')
var height
var sectionHeight
var sectionToShow
var currentID
var nextBtns = $('.toggle-section_btn-next')
var prevBtns = $('.toggle-section_btn-prev')



module.exports = function() {

  // First, remove first and last btns

  removeFirstAndLastBtns() 


  // Once images have loaded, set the toggle
  // sections

  $(window).on("load", function() {

    toggle()

  })


  // Set event listeners on the next/prev btns

  setButtons()

} // end exports





var toggle = function() {

  toggleSections.each(function(i) {
      var section = $(this)


      // Grab height
      // height = section.height()
      // Store it for later use
      // when done... hide sections
      section.attr('data-height', section.height()).promise().done( function() {
        // Collapse all sections
        section.attr('style', 'height:0')
      })


      // Prepare the section:
      // - add id with the section's index
      section.attr('data-toggle-target', 'toggle-'+i)


      // Prepare the heading:
      // add class (for proper styling)
      // (note: this could be done in advance in the dom, 
      // but I'm unsure if this is worth the effort...
      // as the current rails helper doesn't yet allow for this)
      section.prev().find('h2')
        .attr('id', 'toggle-'+i)
        .addClass('section-toggle')






      // Click Listener
      // Scoped to the document, making use of jQuery's convience-behavior 
      // which prevents the need for a closure (otherwise needed when 
      // attaching event handlers inside of a loop, as JS evaluates functions
      // at the time of execution)

      $(document).on('click', ('#toggle-'+i), function() {
        var $this = $(this)
        
        updateToggle($this)

      }) // end click handler  

    }) // end loop


  /*
  Set first to open
  */

  var fistSection = $('#toggle-0')
  updateToggle(fistSection)

      
}









var updateToggle = function(target) {


  // Close previously open section
  $('.toggle-section').attr('style', 'height: 0')
  $('.section-toggle').removeClass('open')


  /*
  Open clicked section
  */

  // Add open class to heading (which effectively changes 
  // the plus to a minus, via the css)

  target.addClass('open')


  // Grab the clicked heading's id

  currentID = target.attr('id')
  

  // cache the section to show,
  // selecting via the data-toggle-target, which is set to 
  // it's respective heading's id

  sectionToShow = $('[data-toggle-target="'+currentID+'"]')


  // grab the target section's height

  sectionHeight = sectionToShow.data('height') + 'px';


  // show it

  sectionToShow.attr('style', 'height: '+sectionHeight)


}





var setButtons = function() {

  nextBtns.each(function(i) {
    $(this).on('click', function(e) {

      e.preventDefault()

      nextIndex = i + 1

      var nextTarget = $('#toggle-'+nextIndex)
      updateToggle(nextTarget)

    })
  })

  prevBtns.each(function(i) {
    $(this).on('click', function(e) {

      e.preventDefault()

      prevIndex = i - 1

      var prevTarget = $('#toggle-'+prevIndex)
      updateToggle(prevTarget)

    })
  })

}



var removeFirstAndLastBtns = function() {
  prevBtns.first().addClass('hidden')
  nextBtns.last().addClass('hidden')
}