"use strict"

var Mercedes = {} || "";

(function() {
    Mercedes.Init = function() {
        Mercedes.PageLoad();
        Mercedes.FormValidate();
        Mercedes.scrollForm();
        Mercedes.assign();
    }
    Mercedes.PageLoad = function() {
        var gaID = 'UA-53471595-XX';

        // Init Components
        Mercedes.i18n();
        Mercedes.Message();
        Mercedes.GoogleAnalytics(gaID);
        Mercedes.Devices();
    }
    Mercedes.Message = function() {
    }
    Mercedes.GoogleAnalytics = function(id) {
        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
        ga('create', id, 'auto');
        ga('send', 'pageview');
    }
    Mercedes.i18n = function() {
        
    }
    Mercedes.Devices = function() {

    }
    Mercedes.FormValidate = function() {
        var form = jQuery('form');
        var validateForm = function() {
            var errorMessages = {
                required: 'This field is required',
                phone: {
                    invalid: 'Enter a valid phone'
                },
                emailValid: 'Enter a valid e-mail address'
            };
            /**
            * validate email
            */
            var validateEmail = function(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            };
            /**
             * Add methods
             */
            jQuery.validator.addMethod('emailValid', function(value, element) {
                return this.optional(element) || validateEmail(value);
            }, errorMessages.emailValid);
            
            form.validate({
                errorPlacement: function(label, elem) {
                    var formGroup = elem.closest('.form-group');
                    formGroup.find('.field-error').append(label);
                    formGroup.addClass('group-error');
                },
                rules: {
                    name: 'required',
                    phone: {
                        required: true,
                        number: true,
                        minlength: 8,
                        maxlength: 15
                    },
                    email: {
                        required: true,
                        emailValid: true
                    }
                },
                messages: {
                    name: errorMessages.required,
                    phone: {
                        required: errorMessages.required,
                        number: errorMessages.phone.invalid
                    },
                    email: {
                        required: errorMessages.required,
                        emailValid: errorMessages.emailValid
                    }
                }
            });
        };
        var hilightTitle = function(input) {
            if (input.hasClass('error')) {
                input.closest('.form-group').addClass('group-error');
            } else {
                input.closest('.form-group').removeClass('group-error');
            }
        };
        jQuery(document).off('keyup').on('keyup', '.validate [type="text"]', function() {
            var input = jQuery(this);
            hilightTitle(input);
        });

        jQuery(document).off('focusout').on('focusout', '.validate [type="text"]', function() {
            var input = jQuery(this);
            hilightTitle(input);
        });

        validateForm();

    };
    Mercedes.scrollForm = function() {
        var navForm = document.querySelector('.page-nav.secondary');
        var header = navForm && navForm.closest('[data-name="header"]');
        var fixed = header && header.offsetTop;
        

        window.onscroll = function() {
            if(navForm) {
                if (window.pageYOffset >= fixed) {
                    header.classList.add('fixed');
                } else {
                    header.classList.remove('fixed');
                }
            }
        };
    };
    Mercedes.assign = function () {
        var headerLink = jQuery('.corp-link');
        var body = jQuery('body');
        if ( body.hasClass('individual')) {
            headerLink.find('.individual a').attr('href', 'javascript:void(0);');
        } else if (body.hasClass('corporate')) {
            headerLink.find('.corporate a').attr('href', 'javascript:void(0);');
        }

        // init dropdown veihicle type
        var selectedChange = function () {
            var vehicleGroup = jQuery('.vehicle-type');
            var dropdownLabel = vehicleGroup && vehicleGroup.length && vehicleGroup.find('[data-toggle]');
            vehicleGroup.off('click.selectItem').on('click.selectItem', 'a', function (event) {
                var that = jQuery(event.target);
                dropdownLabel && dropdownLabel.length && dropdownLabel.html(that.data('name'));
            });
        };
        selectedChange();
    };

    var collapseNavButton = $('nav.page-nav .navbar-toggle');
    var collapseNav = $('nav.page-nav .navbar-collapse');
    collapseNavButton.unbind('click').bind('click', function() {
        collapseNavButton.toggleClass('collapsed');
        collapseNav.toggleClass('in');
    })

    var isSticked = false;
    var nav = $('nav.page-nav:not(".secondary")'),
        tab = $('.tab-content'),
        containerForm = $('.row[data-name="container"]'),
        link = $('.corp-header .corp-link');
        console.log(containerForm);
    var navThreshold = 0;

    // $('.corp-header .corp-link li').on('click', function(){
    //     $("html, body").animate({ scrollTop: 0 }, 500);
    // });

    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();

        if (scroll > navThreshold && !isSticked) {
            isSticked = true;
            nav.addClass('sticky');
            tab.css('margin-top', nav.height()+'px');
            containerForm.css('margin-top', nav.height()+'px');
        } else if (scroll <= navThreshold && isSticked) {
            isSticked = false;
            nav.removeClass('sticky');
            tab.css('margin-top', 0);
            containerForm.css('margin-top', 0);
        }
    })

})(jQuery)

$(document).ready(function() {
    Mercedes.Init();
});