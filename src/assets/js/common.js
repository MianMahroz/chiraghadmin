$(document).ready(function(){
  $(window).scrollTop(0);
  $(function(){
    $('.sub-links-wrap li .sub-prop-links-wrap li').click(function(){
      $('a').removeClass('active show');
      $(this).addClass('active show');
    });
  });
  $('#ucSlider .carousel-item').each(function(){
    var next = $(this).next();
    if (!next.length) {
    next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    for (var i=0;i<1;i++) {
      next=next.next();
      if (!next.length) {
          next = $(this).siblings(':first');
      }

      next.children(':first-child').clone().appendTo($(this));
    }
  });
  $('#caSlider .carousel-item').each(function(){
    var next = $(this).next();
    if (!next.length) {
    next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    for (var i=0;i<1;i++) {
      next=next.next();
      if (!next.length) {
          next = $(this).siblings(':first');
      }

      next.children(':first-child').clone().appendTo($(this));
    }
  });
  $('#simsSlider .carousel-item').each(function(){
    var next = $(this).next();
    if (!next.length) {
    next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    for (var i=0;i<1;i++) {
      next=next.next();
      if (!next.length) {
          next = $(this).siblings(':first');
      }

      next.children(':first-child').clone().appendTo($(this));
    }
  });
  
  var date_input=$('input[for="date"]'); 
  var container=$('.bootstrap-iso').length>0 ? $('.bootstrap-iso').parent() : "body";
  var options={
    format: 'mm/dd/yyyy',
    container: container,
    orientation: "top right",
    todayHighlight: true,
    autoclose: true,
  };
  date_input.datepicker(options);


  var checkitem = function() {
    var $this;
    $this = $("#caSlider");
    if ($("#caSlider .block-inner3 .block-item3:first").hasClass("active")) {
      $this.children(".carousel-control-prev").hide();
      $this.children(".carousel-control-next").show();
    } else if ($("#caSlider .block-inner3 .block-item3:last").hasClass("active")) {
      $this.children(".carousel-control-next").hide();
      $this.children(".carousel-control-prev").show();
    } else {
      $this.children(".control-btn").show();
    }
  };

  checkitem();

  $("#caSlider").on("slid.bs.carousel", "", checkitem);

  var checkitem = function() {
    var $this;
    $this = $("#ucSlider");
    if ($("#ucSlider .block-inner .block-item:first").hasClass("active")) {
      $this.children(".carousel-control-prev").hide();
      $this.children(".carousel-control-next").show();
    } else if ($("#ucSlider .block-inner .block-item:last").hasClass("active")) {
      $this.children(".carousel-control-next").hide();
      $this.children(".carousel-control-prev").show();
    } else {
      $this.children(".control-btn").show();
    }
  };
  checkitem();
  $("#ucSlider").on("slid.bs.carousel", "", checkitem);

  var checkitem = function() {
    var $this;
    $this = $("#simsSlider");
    if ($("#simsSlider .block-inner2 .block-item2:first").hasClass("active")) {
      $this.children(".carousel-control-prev").hide();
      $this.children(".carousel-control-next").show();
    } else if ($("#simsSlider .block-inner2 .block-item2:last").hasClass("active")) {
      $this.children(".carousel-control-next").hide();
      $this.children(".carousel-control-prev").show();
    } else {
      $this.children(".control-btn").show();
    }
  };
  checkitem();
  $("#simsSlider").on("slid.bs.carousel", "", checkitem);

  (function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('common-form');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();

  $(function(){
   var shrinkHeader = 300;
    $(window).scroll(function() {
      var scroll = getCurrentScroll();
        if ( scroll >= shrinkHeader ) {
            $('.header').addClass('shrink');
          }
          else {
            $('.header').removeClass('shrink');
          }
    });
  function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
    }
  });


  $('.btn-view-images').click(function(){
    $('body').addClass('overflow-hidden');
  });
  $('.close').click(function(){
    $('body').removeClass('overflow-hidden');
  });


  $('select').change(function() {
    if ($(this).children('option:first-child').is(':selected')) {
      $(this).addClass('placeholder');
    } else {
     $(this).removeClass('placeholder');
    }
  });

  $('.ud-sidebar > ul > li').click(function(){
    $('a').removeClass('active show');
    $(this).addClass('active show');
  });
});

$('.advance-search-link').click(function() {
  $('.slider-search-btn-top').toggle();
  $('html, body').animate({
    scrollTop: ($('.main-search-row').offset().top)
  },1000);
});
$('.circle-plus').on('click', function(){
  $(this).toggleClass('opened');
});
$("mat-cell").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});


$(".facilities-checkboxes-wrap > div:gt(0)").hide();
$("#facilities-shows").click(function(){
    $(this).siblings("div:gt(0)").slideToggle('slow');
    $(this).text($(this).text() == "Show all" ? "Show less" : "Show all");
});

$(".features-checkboxes-wrap > div:gt(0)").hide();
$("#features-shows").click(function(){
    $(this).siblings("div:gt(0)").slideToggle('slow');
    $(this).text($(this).text() == "Show all" ? "Show less" : "Show all");
});

$(".features-checkboxes-wrap > div:gt(0)").hide();
$("#features-shows-round").click(function(){
    $(this).siblings("div:gt(0)").slideToggle('slow');
    $(this).text($(this).text() == "Show all" ? "Show less" : "Show all");
});

$(".facilities-checkboxes-wrap > div:gt(0)").hide();
$("#facilities-shows-round").click(function(){
    $(this).siblings("div:gt(0)").slideToggle('slow');
    $(this).text($(this).text() == "Show all" ? "Show less" : "Show all");
});

$(".ni-checkboxes-wrap > div:gt(0)").hide();
$("#ni-shows-round").click(function(){
    $(this).siblings("div:gt(0)").slideToggle('slow');
    $(this).text($(this).text() == "Show all" ? "Show less" : "Show all");
});



