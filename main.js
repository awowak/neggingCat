	

	(function($, window, document, undefined) {

  // our plugin constructor
  var OnePageNav = function(elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
    this.metadata = this.$elem.data('plugin-options');
    this.$win = $(window);
    this.sections = {};
    this.didScroll = false;
    this.$doc = $(document);
    this.docHeight = this.$doc.height();
  };

  // the plugin prototype
  OnePageNav.prototype = {
    defaults: {
      navItems: 'a',
      currentClass: 'current',
      changeHash: false,
      easing: 'swing',
      filter: '',
      scrollSpeed: 750,
      scrollThreshold: 0.5,
      begin: false,
      end: false,
      scrollChange: false
    },

    init: function() {
      this.config = $.extend({}, this.defaults, this.options, this.metadata);

      this.$nav = this.$elem.find(this.config.navItems);
      if (this.config.filter !== '') {
        this.$nav = this.$nav.filter(this.config.filter);
      }

      this.$nav.on('click.onePageNav', $.proxy(this.handleClick, this));

      this.getPositions();

      this.bindInterval();

      this.$win.on('resize.onePageNav', $.proxy(this.getPositions, this));

      return this;
    },

    adjustNav: function(self, $parent) {
      self.$elem.find('.' + self.config.currentClass).removeClass(self.config.currentClass);
      $parent.addClass(self.config.currentClass);
    },

    bindInterval: function() {
      var self = this;
      var docHeight;

      self.$win.on('scroll.onePageNav', function() {
        self.didScroll = true;
      });

      self.t = setInterval(function() {
        docHeight = self.$doc.height();

        //If it was scrolled
        if (self.didScroll) {
          self.didScroll = false;
          self.scrollChange();
        }

        //If the document height changes
        if (docHeight !== self.docHeight) {
          self.docHeight = docHeight;
          self.getPositions();
        }
      }, 250);
    },

    getHash: function($link) {
      return $link.attr('href').split('#')[1];
    },

    getPositions: function() {
      var self = this;
      var linkHref;
      var topPos;
      var $target;

      self.$nav.each(function() {
        linkHref = self.getHash($(this));
        $target = $('#' + linkHref);

        if ($target.length) {
          topPos = $target.offset().top;
          self.sections[linkHref] = Math.round(topPos);
        }
      });
    },

    getSection: function(windowPos) {
      var returnValue = null;
      var windowHeight = Math.round(this.$win.height() * this.config.scrollThreshold);

      for (var section in this.sections) {
        if ((this.sections[section] - windowHeight) < windowPos) {
          returnValue = section;
        }
      }

      return returnValue;
    },

    handleClick: function(e) {
      var self = this;
      var $link = $(e.currentTarget);
      var $parent = $link.parent();
      var newLoc = '#' + self.getHash($link);

      if (!$parent.hasClass(self.config.currentClass)) {
        if (self.config.begin) {
          self.config.begin();
        }

        //Change the highlighted nav item
        self.adjustNav(self, $parent);

        //Removing the auto-adjust on scroll
        self.unbindInterval();

        //Scroll to the correct position
        self.scrollTo(newLoc, function() {
          //Do we need to change the hash?
          if (self.config.changeHash) {
            window.location.hash = newLoc;
          }

          //Add the auto-adjust on scroll back in
          self.bindInterval();

          //End callback
          if (self.config.end) {
            self.config.end();
          }
        });
      }

      e.preventDefault();
    },

    scrollChange: function() {
      var windowTop = this.$win.scrollTop();
      var position = this.getSection(windowTop);
      var $parent;

      if (position !== null) {
        $parent = this.$elem.find('a[href$="#' + position + '"]').parent();

        if (!$parent.hasClass(this.config.currentClass)) {
          this.adjustNav(this, $parent);
          if (this.config.scrollChange) {
            this.config.scrollChange($parent);
          }
        }
      }
    },

    scrollTo: function(target, callback) {
      var offset = $(target).offset().top;

      $('html, body').animate({
        scrollTop: offset
      }, this.config.scrollSpeed, this.config.easing, callback);
    },

    unbindInterval: function() {
      clearInterval(this.t);
      this.$win.unbind('scroll.onePageNav');
    }
  };

  OnePageNav.defaults = OnePageNav.prototype.defaults;

  $.fn.onePageNav = function(options) {
    return this.each(function() {
      new OnePageNav(this, options).init();
    });
  };

})(jQuery, window, document);

$('nav').onePageNav({
  scrollThreshold: 0.4,
  navItems: 'a:not(.submenu a)'
});

function toggleNav() {
  $('nav ul').slideToggle();
}

$('#menu-button').click(toggleNav);

function windowResized() {
  var width = $(window).width();
  var menu = $('nav ul');
  if (width > 768 && menu.is(':hidden')) {
    menu.removeAttr('style');
  }
}

$(window).resize(windowResized);


//begin JS for the clickity-stuff

$("#catInfo").bind("keyup", function () {
	if (keyCode == 13) {
		preventDefault();
	}
});

$("#clickIt").click(function () {
	$("#home").fadeOut(2000);
	$("#query").fadeOut(2000);
	$("#bored").fadeIn(4000);
  	$("#behaveDrop").fadeIn(4000);
		var behaviorDefined = ["Your cat thinks your mother was a hamster and your father smelled of elderberries. This means your cat is almost certainly negging you and is deciding what part of your body to eat first when you die. Your cat's unwavering stare is what it is using to make the Sophie's choice between your face and your throat. Oh, wait. Of course, it's your face.", "Your cat believes you are an empty-headed animal food trough wiper. And your cat is correct. This means your cat is almost certainly negging you and is deciding what part of your body to eat first when you die. Your cat's unwavering stare is what it is using to make the Sophie's choice between your stomach and your thigh. Oh, wait. Of course, it's your face.", "Your cat is trying to tell you to go get your shine box. This means your cat is almost certainly negging you and is deciding what part of your body to eat first when you die. Your cat's unwavering stare is what it is using to make the Sophie's choice between your throat and your calf muscle. Oh, wait. Of course, it's your face.", "Your cat thinks you are a stuck up, half-witted, scruffy looking nerfherder. This means your cat is almost certainly negging you and is deciding what part of your body to eat first when you die. Your cat's unwavering stare is what it is using to make the Sophie's choice between your face and your heart. Oh, wait. Of course, it's your face.", "Your cat takes you for a dirt-eating piece of slime, a scum-sucking pig, and a son of a motherless goat. While uncertain as to how you are able to be all of these things at once, your cat is almost certainly negging you and is deciding what part of your body to eat first when you die. Your cat's unwavering stare is what it is using to make the Sophie's choice between your heart and your lower intestine. Oh, wait. Of course, it's your face.", "Your cat thinks you are a virgin who can't drive. Your cat is almost certainly negging you and is deciding what part of your body to eat first when you die. Your cat's unwavering stare is what it is using to make the Sophie's choice between your thigh and your small intestine. Oh, wait. Of course, it's your face.", "Your cat is drinking your milkshake. Your cat is almost certainly negging you and is deciding what part of your body to eat first when you die. Your cat's unwavering stare is what it is using to make the Sophie's choice between your brain and your throat. Oh, wait. Of course, it's your face.", "Your cat is not negging you; it is just aloof."];
		var definition = behaviorDefined[Math.floor(Math.random()*behaviorDefined.length)];
			result = definition;
		document.getElementById("behave").innerHTML=result;

	});
