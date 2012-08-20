$(document).ready(function() {
  $('body').localScroll();
  $('a[rel=popover]').popover();

  $('#speakers').rcarousel({auto: {enabled: true},
                            step: 3,
                            width: 170,
                            height: 270,
                            visible: 3,
                            navigation: {next: '.next.button',
                                         prev: '.previous.button'}
                           });
});
