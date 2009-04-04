(function($) {
  $(document).ready(function() {
    $('a.button').wrapInner('<span></span>').prepend(
      '<b class="gradient"></b>' +
      '<i class="top right"></i>' +
      '<i class="top left"></i>' +
      '<i class="bottom right"></i>' +
      '<i class="bottom left"></i>'
    )
  });
})(jQuery);
