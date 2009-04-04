(function($) {
  $(document).ready(function() {
    $('a.button').wrapInner('<span></span>').prepend(
      '<b class="gradient"></b>'
    )
  });
})(jQuery);