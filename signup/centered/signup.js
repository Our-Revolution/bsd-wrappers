jQuery(document).ready(function() {
    jQuery.fn.extend({
        bsdTextWrap: function(notWrapped, elementType, elementClass) {
            var text = jQuery(this).text();
            jQuery(this).andSelf().contents().filter(function() {
                return this.nodeType === 3;
            }).filter(function() {
                return this.nodeValue.indexOf(notWrapped) != -1;
            }).each(function() {
                jQuery(this).wrapAll('<' + elementType + ' class="' + elementClass + '" />');
            });
            return notWrapped;
        }
    });
    jQuery.extend({
        replaceTag: function(currentElem, newTagObj, keepProps) {
            var jQuerycurrentElem = jQuery(currentElem);
            var i, jQuerynewTag = jQuery(newTagObj).clone();
            if (keepProps) {
                newTag = jQuerynewTag[0];
                newTag.className = currentElem.className;
                jQuery.extend(newTag.classList, currentElem.classList);
                jQuery.extend(newTag.attributes, currentElem.attributes);
            }
            jQuerycurrentElem.wrapAll(jQuerynewTag);
            jQuerycurrentElem.contents().unwrap();
            return this;
        }
    });
    jQuery.fn.extend({
        replaceTag: function(newTagObj, keepProps) {
            return this.each(function() {
                jQuery.replaceTag(this, newTagObj, keepProps);
            });
        }
    });
    jQuery.fn.makeEventCentral = function() {
        jQuery('<button type="button">Menu<span class="bar"></span><span class="bar"></span><span class="bar"></span></button>').insertBefore('#account_actions');
        jQuery('#control_set').insertBefore('.content');
        jQuery('#account_actions a:contains("Manage Your Events")').text('My Events');
        jQuery('#account_actions a:contains("Logout")').appendTo('#account_actions')
    };
    if (jQuery('.content h1').text() == 'Unsubscribe') {
        jQuery('body').addClass('unsub-page');
        jQuery('table, tbody, th, tr, td').replaceTag('<div>', true);
        jQuery('.content').bsdTextWrap('Please fill', 'h2', 'instruct');
        jQuery('#unsub_form div[class=""]').children().unwrap();
        jQuery('.content br').remove();
        jQuery('#unsub_form b, #unsub_form span').replaceWith(function() {
            return jQuery("<label />", {
                html: jQuery(this).html()
            });
        });
        jQuery('#unsub_form strong').replaceWith(function() {
            return jQuery("<span />", {
                html: jQuery(this).html()
            });
        });
        jQuery('label:contains("You must enter")').addClass('error');
        if (jQuery('.error').length > 0) {
            jQuery('.error').insertBefore('#unsub_form');
            jQuery('#unsub_form').css('margin-top', '-10px');
            jQuery('label:contains("You must enter your email address.")').text('You must enter your email address.');
            jQuery('label:contains("You must enter a valid email address.")').text('You must enter a valid email address.');
        }
        jQuery('<p>Grassroots mobilization is how we&#8217;ll level the playing field against candidates with SuperPACs and wealthy donors. We hope you&#8217;ll reconsider leaving, <a href="https://secure.actblue.com/contribute/page/ourrevolution?refcode=unsub-content"><strong>make a contribution to Our Revolution</strong></a>, or join us on social media at:<ul><li><a class="facebook" href="https://www.facebook.com/PoliticalRevolution">Facebook</a></li><li><a class="twitter" href="https://twitter.com/OurRevolution">Twitter</a></li></ul></p><p>You can also <a href="https://go.ourrevolution.com.com/page/s/fewer-emails?source=unsub"><strong>choose to receive fewer emails</strong></a> and we will only send you what we think are the most important messages.</p>').insertAfter('h2');
        jQuery('.instruct').html('We&#8217;re sad to see you go!');
        jQuery('<h3 class="leader">Process Unsubscribe</h3>').prependTo('form');
    }
    if ((jQuery('.box').length > 0) && (jQuery('.bsd-event').length > 0)) {
        jQuery('body').addClass('event-central create-pending').makeEventCentral();
    }
    if (jQuery('#forgotpw').length > 0) {
        jQuery('body').addClass('reset-password');
        jQuery('table, tbody, th, tr, td').replaceTag('<div>', true);
        jQuery('#forgotpw_form div[class=""]').children().unwrap();
        jQuery('.forgotpwbutton').prev().remove();
        if (jQuery('.error').length > 0) {
            jQuery('.error').insertBefore('#forgotpw_form');
            jQuery('#forgotpw_form').css('margin-top', '-10px');
        }
    }
    if (jQuery('.login-widget').length > 0) {
        jQuery('body').addClass('access-account');
        jQuery(window).load(function() {
            jQuery('.login-description p').text('Login');
            jQuery('.access-account .login-widget').show();
            jQuery('#login-remember-me').wrapAll('<div class="checkboxgroup" />');
            jQuery('.login-login-form h2').html('Sign In to Your Account');
            jQuery('.login-forgot-link a').text('Forgot Your Password?');
            jQuery('.login-register-link').insertBefore('.login-login-form form');
            jQuery('.login-login-link').insertBefore('.login-register-form form');
            jQuery('.login-register-form label#email').insertBefore('label#zip');
            jQuery('.login-register-form label').addClass('col-2');
            jQuery('label#lastname, label#zip, label#password2').addClass('col-2-2');
            jQuery('<div class="clear"></div>').insertAfter('.col-2-2');
            jQuery('.login-error').insertBefore('.login-login-form form');
            var str = jQuery('.login-error').text();
            if (str.indexOf("enter") >= 0) {
                jQuery('.login-error').show();
            }
        });
    }
    if (jQuery('#signupheader').length > 0) {
        jQuery('body').addClass('signup-page');
        jQuery('table, tbody, th, tr, td').replaceTag('<div>', true);
        jQuery('#signup div[class=""]').children().unwrap();
        jQuery("#signup :checkbox").each(function() {
            jQuery(this).nextUntil(':checkbox').addBack().wrapAll('<div class="checkboxgroup" />');
        });
        jQuery("#signup :radio").each(function() {
            jQuery(this).nextUntil(':radio').addBack().wrapAll('<div class="radiogroup" />');
        });
        jQuery("#signup select").wrap("<div class='select-wrapper'></div>");
        jQuery('h3.leader').prependTo('#signup');
        jQuery('#signupfooter').appendTo('#signup');
    }
    if (jQuery('#invitationpage').length > 0) {
        jQuery('body').addClass('share-page');
        jQuery('table, tbody, th, tr, td').replaceTag('<div>', true);
        jQuery('#invitationpage div[class=""]').children().unwrap();
        jQuery('.label .bsd-required-asterisk').each(function() {
            jQuery(this).parent().append(this);
        });
        jQuery('h3.leader').prependTo('#invitationpage');
        jQuery('.content').children().first().nextUntil('#invitationpage').andSelf().wrapAll('<div class="share-pitch" />');
    }
    if (jQuery('#myeventslogin').length > 0) {
        jQuery('body').addClass('event-central login').makeEventCentral();
        jQuery('#control_set h1').nextAll().addBack().wrapAll('<div class="bsd-page-header-content" />');
        jQuery('table, tbody, th, tr, td').replaceTag('<div>', true);
        jQuery('#login_form div[class=""]').children().unwrap();
        jQuery('.subhead').text('Login').insertBefore('.header');
        jQuery("#login_form :checkbox").each(function() {
            jQuery(this).nextUntil('br').addBack().wrapAll('<div class="checkboxgroup" />');
        });
        jQuery('.content br').remove();
        jQuery('.loginforgotlink').insertAfter('#loginform');
        jQuery('.header').text('Sign In to Access Your Events');
        if (jQuery('.error').length > 0) {
            jQuery('.error').insertBefore('#login_form');
            jQuery('#login_form').css('margin-top', '-10px');
        }
        jQuery('.bsd-page-header-content button').on('click', function() {
            jQuery('#account_actions').slideToggle("fast");
        });
    }
    if (jQuery('#event_simple_search_form').length > 0) {
        jQuery('body').addClass('event-central search').makeEventCentral();
        jQuery('table, tbody, th, tr, td').replaceTag('<div>', true);
        jQuery('form div[class=""]').children().unwrap();
        jQuery('.bsd-page-header h2').text('Find An Event Near You');
        jQuery('<h1>Search</h1>').insertBefore('.bsd-page-header h2');
        jQuery('.formlink:contains("Go to advanced search")').insertBefore('#event_simple_search_form');
        jQuery('.formlink:contains("Go to basic")').insertBefore('#event_advanced_search_form');
        jQuery("select:not([multiple])").wrap("<div class='select-wrapper'></div>");
        jQuery('#event_simple_search_form .form_label:contains("Search Radius")').nextUntil('#event_simple_search_form #event_radius_unit').addBack().wrapAll('<div class="search-radius-group" />');
        jQuery('#event_advanced_search_form .form_label:contains("Search Radius")').nextUntil('#event_advanced_search_form #event_radius_unit').addBack().wrapAll('<div class="search-radius-group" />');
        jQuery('#event_zip_txt').parent().nextUntil('.search-radius-group').addBack().wrapAll('<div class="zip-group" />');
        jQuery('#event_zip_txt_adv').parent().nextUntil('.search-radius-group').addBack().wrapAll('<div class="zip-group" />');
        jQuery('#event_zip_txt_adv, #event_zip_txt').text('Zip Code:');
        jQuery('.form_label:contains("Province")').text('State:');
        jQuery('.form_label:contains("Events From:")').nextUntil('.form_label').wrapAll('<div class="date-group from-date" />');
        jQuery('.form_label:contains("Until:")').nextUntil('.form_label').wrapAll('<div class="date-group until-date" />');
        jQuery('.form_label:contains("Country")').next().addBack().wrapAll('<div class="country-group" />');
        jQuery('.form_label:contains("State")').next().addBack().wrapAll('<div class="state-group" />').insertBefore('#event_advanced_search_form .zip-group');
        jQuery('<div class="clear"></div>').insertAfter('#event_simple_search_form #event_radius_unit, #event_advanced_search_form #event_radius_unit');
        jQuery('.formlink:contains("advanced")').addClass('adv-toggle');
        jQuery('.formlink:contains("basic")').addClass('simple-toggle');
        jQuery('.formlink a').prop("onclick", null);
        jQuery('#simpleform').show();
        jQuery('.adv-toggle a').click(function(event) {
            event.preventDefault();
            jQuery('.adv-toggle, #event_simple_search_form, .error').hide();
            jQuery('.simple-toggle, #event_advanced_search_form').show();
            jQuery('#advancedform').show();
        });
        jQuery('.simple-toggle a').click(function(event) {
            event.preventDefault();
            jQuery('.simple-toggle, #event_advanced_search_form, .error').hide();
            jQuery('.adv-toggle, #event_simple_search_form').show();
        });
        jQuery('.from-date').find('[name="date_start[Y]"]').parent().addClass('year').appendTo('.from-date');
        jQuery('.until-date').find('[name="date_end[Y]"]').parent().addClass('year').appendTo('.until-date');
        jQuery('<div class="clear"></div>').insertAfter('.date-group');
        jQuery('.form_label:contains("Sort By")').next().addBack().wrapAll('<div class="col-2" />');
        jQuery('.form_label:contains("Max Results")').next().addBack().wrapAll('<div class="col-2 col-2-2" />');
        jQuery('<div class="clear"></div>').insertAfter('#advancedform .col-2-2');
        jQuery('#simpleform .error').insertAfter('.adv-toggle');
        jQuery('select[name="event_type[]"] option[value="2"],select[name="event_type[]"] option[value="11"],select[name="event_type[]"] option[value="15"],select[name="event_type[]"] option[value="10"],select[name="event_type[]"] option[value="12"],select[name="event_type[]"] option[value="3"],select[name="event_type[]"] option[value="9"]').remove();
        jQuery('.bsd-page-header-content button').on('click', function() {
            jQuery('#account_actions').slideToggle("fast");
        });
    }
    if (jQuery('.bsd-event-manageevents').length > 0) {
        jQuery('body').addClass('event-central manage-events').makeEventCentral();
        jQuery('table, tbody, th, tr, td').replaceTag('<div>', true);
        jQuery('.ui-widget-content div[class=""]').children().unwrap();
        jQuery('.button_actions').remove();
        jQuery('.pledge').parent().addClass('pledge-notify')
        jQuery('#myevents .odd .event_title,#myevents .even .event_title').each(function() {
            jQuery(this).next().addClass('date');
        });
        jQuery('.odd, .even').each(function() {
            jQuery(this).children('input').first().nextAll().addBack().wrapAll('<div class="actions" />')
        });
        jQuery('<button type="button" class="action-btn">Event Menu</>').insertBefore('.actions');
        jQuery('.action-btn').on('click', function() {
            jQuery(this).next().slideToggle("fast")
        });
        jQuery('.bsd-page-header-content button').on('click', function() {
            jQuery('#account_actions').slideToggle("fast");
        });
    }
    if (jQuery('#calendar-nav').length > 0) {
        jQuery('body').addClass('event-central results').makeEventCentral();
        jQuery('#event_list table, #event_list tbody,#event_list th, #event_list tr, #event_list td').replaceTag('<div>', true);
        jQuery('.event_group div[class=""]').children().unwrap();
        jQuery('#event_map').insertAfter('#control_set');
        jQuery('#control_set').addClass('clear');
        jQuery('.content').wrap('<div class="wrapper" />');
        jQuery('<h1>Results</h1>').insertBefore('#eventsearch h2');
        jQuery('.event_official').each(function() {
            var eventDesc = jQuery(this).find('.description');
            jQuery('<span class="official">Official Event</span>').insertBefore(eventDesc);
        });
        jQuery('#order-by-date-link, #order-by-distance-link').on('click', function() {
            jQuery(window).load(function() {
                jQuery('#event_list table, #event_list tbody,#event_list th, #event_list tr, #event_list td').replaceTag('<div>', true);
                jQuery('.event_group div[class=""]').children().unwrap();
            });
        });
        jQuery('.detail_button a').text('Details');
        jQuery('<ul id="new-event_order"><li id="new-order-by-date"><a id="new-order-by-date-link" href="#">Order By Date</a></li><li id="new-order-by-distance"><a id="new-order-by-distance-link" href="#">Order By Distance</a></li></ul>').insertBefore('#event_order');
        var orderDateUrl = jQuery('#order-by-date-link').attr('href');
        var orderDistUrl = jQuery('#order-by-distance-link').attr('href');
        jQuery('#new-order-by-date-link').attr('href', orderDateUrl);
        jQuery('#new-order-by-distance-link').attr('href', orderDistUrl);
        if (jQuery('#order-by-distance').is('.active')) {
            jQuery('#new-order-by-distance').addClass('active');
        } else if (jQuery('#order-by-date').is('.active')) {
            jQuery('#new-order-by-date').addClass('active');
        }
        jQuery('<button id="new-date-filter">go</button>').insertBefore('#date-filter');
        jQuery('#new-date-filter').on('click', function() {
            var s = YAHOO.util.Dom.get("date-start").value.split('/');
            var e = YAHOO.util.Dom.get("date-end").value.split('/');
            if (e.length == 1) {
                e = s;
            }
            if (s.length > 1 && e.length > 1) {
                window.location = window.location.toString().replace(/&date_(start|end)=\d*/g, '') + '&date_start=' + (new Date(s[2], s[0] - 1, s[1]).getTime() / 1000) + '&date_end=' + (new Date(e[2], e[0] - 1, e[1]).getTime() / 1000 + 86399);
            }
        });
        jQuery('.bsd-page-header-content button').on('click', function() {
            jQuery('#account_actions').slideToggle("fast");
        });
        jQuery('#event_list .event').each(function() {
            if (jQuery(this).find('.location:contains("#PENDING#")').length > 0) {
                jQuery(this).find('.location .venue').text('Location pending');
            }
        });
        jQuery('#map_container').on('click', function() {
            jQuery('body').on('DOMNodeInserted', function() {
                jQuery('.gm-style-iw div div div div div:contains("#PENDING#")').text('The location for this event is pending.')
            });
        });
    }
    if (jQuery('#sectionheader:contains("The Details")').length > 0) {
        jQuery('body').addClass('event-central details').makeEventCentral();
        jQuery("select").wrap("<div class='select-wrapper'></div>");
        var noCreateStyle = jQuery('#id_type_nocreate').attr("style");
        if (typeof noCreateStyle !== 'undefined' && noCreateStyle.indexOf("display:none") >= 0) {
            jQuery('#id_type_nocreate').addClass('no-show');
        }
        var createStyle = jQuery('#id_type_create').attr("style");
        if (typeof createStyle !== 'undefined' && createStyle.indexOf("display:none") >= 0) {
            jQuery('#id_type_create').addClass('no-show');
        }
        var loginStyle = jQuery('#id_type_login').attr("style");
        if (typeof loginStyle !== 'undefined' && loginStyle.indexOf("display:none") >= 0) {
            jQuery('#id_type_login').addClass('no-show');
        }
        jQuery('table, tbody, th, tr, td').replaceTag('<div>', true);
        jQuery('#eventdetail div[class=""]').children().unwrap();
        jQuery('.form_label:contains("Time:")').next().append(jQuery('#event_detail_xml_link'));
        jQuery('#eventdetail .ui-widget-content').first().addClass('detail-container');
        jQuery('.bsd-identification-type').each(function() {
            jQuery(this).next().addBack().wrapAll('<div class="radiogroup" />');
        });
        jQuery('input[name=login_remember_me]').next().addBack().wrapAll('<div class="checkboxgroup" />');
        jQuery('#rsvp_nocreate_firstname').parent().attr('id', 'id_type_nocreate');
        jQuery('#loginform').parent().attr('id', 'id_type_login');
        jQuery('#signupform').parent().attr('id', 'id_type_create');
        jQuery('.event_official').each(function() {
            var eventDesc = jQuery(this).find('.bsd-widget-inner-content > .description');
            jQuery('<span class="official">Official Event</span>').insertBefore(eventDesc);
        });
        jQuery('#event_rsvp').bsdTextWrap('(required)', 'span', 'explain');
        jQuery('#event_rsvp').bsdTextWrap('Phone Number:', 'div', 'form_label');
        jQuery('#event_rsvp').bsdTextWrap('Will you attend', 'div', 'form_label');
        jQuery('#event_rsvp').bsdTextWrap('How many attendees total', 'div', 'form_label');
        jQuery('#event_rsvp div').bsdTextWrap('Add a comment', 'div', 'form_label');
        jQuery('.form_label:contains("Add a comment")').html('Add a comment: <span>(Optional)</span>');
        jQuery('.event-central.details #SKIN .basic .main #rsvp_container h2#sectionheader').text('RSVP to this Event');
        jQuery('th.form_label, td').remove();
        jQuery('.form_label:empty').remove();
        jQuery('#otherrsvps_container').appendTo('.detail-container');
        jQuery('<div class="clear"></div>').insertBefore('.detailtable_container .form_label');
        jQuery('<div class="clear"></div>').appendTo('.detailtable_container');
        jQuery('.detailtable_container .clear').first().remove();
        jQuery('.maplinks a:contains("Google")').text('Google');
        jQuery('.maplinks a:contains("Yahoo")').text('Yahoo!');
        jQuery('.form_label:contains("Add a comment")').parent().nextUntil('br').addBack().hide();
        jQuery('.button').show();
        jQuery('.form_label:contains("Volunteer-led event")').nextUntil('.clear').wrapAll('<div />');
        if (jQuery('#shift_information').length > 0) {
            jQuery('.shiftstable .bsd-rsvp-datetime').each(function() {
                jQuery(this).next().addBack().wrapAll('<div class="checkboxgroup" />');
                var bsdShift = jQuery(this).next().text();
                var bsdShiftSplit = bsdShift.split(" ");
                var newBsdShiftSplit = bsdShiftSplit.filter(function(e) {
                    return e.replace(/(\r\n|\n|\r)/gm, "")
                });
                var adjustStart = newBsdShiftSplit[2].substring(0, newBsdShiftSplit[2].length - 3);
                var adjustEnd = newBsdShiftSplit[4].substring(0, newBsdShiftSplit[4].length - 3);
                jQuery(this).next().text(newBsdShiftSplit[0] + " " + newBsdShiftSplit[1] + " " + adjustStart + newBsdShiftSplit[3] + " â€“ " + adjustEnd + newBsdShiftSplit[5])
            })
        }
        if (jQuery('#volunteer_box').length > 0) {
            jQuery('#volunteer_box div:contains("Country:"), #volunteer_box div:contains("Address:"), #volunteer_box div:contains("City:"), #volunteer_box div:contains("Province"), #volunteer_box div:contains("Phone:"), #volunteer_box div:contains("Zip")').addClass('vol-label');
            jQuery('#volunteer_box div:contains("Province")').text('State:');
            jQuery('.vol-label:contains("Code:")').text('Zip Code:');
            jQuery('#volunteer_box').insertBefore(':submit');
            jQuery('.vol-label:contains("Country")').nextUntil('.vol-label').addBack().wrapAll('<div class="vol-country-group" />');
            jQuery('.vol-label:contains("Address")').nextUntil('.vol-label').addBack().wrapAll('<div class="vol-addr-group" />');
            jQuery('.vol-label:contains("Zip")').next().addBack().wrapAll('<div class="vol-zip-group" />');
            jQuery('.vol-label:contains("City")').next().addBack().wrapAll('<div class="vol-city-group vol-details" />');
            jQuery('.vol-label:contains("State")').next().addBack().wrapAll('<div class="vol-state-group vol-details" />');
            if (jQuery('#volunteer_box input[name="phone"]').length > 0) {
                jQuery('.vol-label:contains("Phone")').next().addBack().wrapAll('<div class="vol-phone-group vol-details" />');
            }
            jQuery('.vol-addr-group, .vol-country-group, .vol-zip-group').hide();
            jQuery('<div class="clearfix" style="clear: both;">').insertAfter('.col2-3');
            jQuery('#volunteer_box .checkboxgroup').insertAfter('#volunteer_box h3');
            jQuery('#is_potential_volunteer_checkbox').parent().addClass('checkboxgroup');
            jQuery('<div class="clear"></div>').insertAfter('.vol-state-group');
            jQuery('.vol-details').hide();
            jQuery('.hideabletable input, .hideabletable select').on("keyup keypress paste mouseup", function() {
                jQuery('.vol-city-group input').val(jQuery('#addr-city').val())
                jQuery('.vol-state-group select').val(jQuery('#addr-state_cd').val())
            });
        }
        if (jQuery('#is_potential_volunteer_checkbox').is(":checked")) {
            jQuery('.vol-details').show();
            jQuery('#zip').val(jQuery('#rsvp_nocreate_zip').val());
        }
        jQuery('.radiogroup').show();
        if (jQuery('.type:contains("(Rally)")').length > 0 || jQuery('.type:contains("(Town Meeting)")').length > 0) {
            var myStr = jQuery('.detailtable_container div:contains(", 2015")').text();
            if (jQuery('.detailtable_container div:contains(", 2016")').length > 0) {
                myStr = jQuery('.detailtable_container div:contains(", 2016")').text();
            }
            var clnStr = myStr.trim();
            var newStr = clnStr.split(" ");
            var newEl = '<div class="date-only">' + newStr[0] + ' ' + newStr[1] + ' ' + newStr[2] + ' ' + newStr[3] + '</div>';
            jQuery('<div class="form_label rally-date">Date:</div>').prependTo('.detailtable_container');
            jQuery(newEl).insertAfter('.rally-date');
            jQuery('<div class="clear"/>').insertAfter('.date-only');
            jQuery('#event_detail_xml_link').appendTo('.date-only');
            jQuery('.form_label:contains("Time:")').nextUntil('.form_label').addBack().remove();
        }
        if (jQuery('#begin').length > 0) {
            jQuery('<div class="form_label prog-begin">Program Begins:</div>').prependTo('.detailtable_container');
            jQuery('#begin').insertAfter('.prog-begin');
            jQuery('<div class="clear"/>').insertAfter('#begin');
        }
        if (jQuery('#doors-open').length > 0) {
            jQuery('<div class="form_label dopen-label">Doors Open:</div>').prependTo('.detailtable_container');
            jQuery('#doors-open').insertAfter('.dopen-label');
            jQuery('<div class="clear"/>').insertAfter('#doors-open');
        }
        jQuery('#is_potential_volunteer_checkbox').on('change', function() {
            if (jQuery('#is_potential_volunteer_checkbox').is(":checked")) {
                jQuery('.vol-details').show();
                jQuery('#zip').val(jQuery('#rsvp_nocreate_zip').val());
            } else {
                jQuery('.vol-details').hide();
            }
        });
        jQuery('.bsd-page-header-content button').on('click', function() {
            jQuery('#account_actions').slideToggle("fast");
        });
        jQuery('.form_label:contains("Directions")').nextUntil('.clear').wrapAll('<div />');
        if (jQuery('.date-only:contains(undefined)').length > 0) {
            jQuery('.date-only').html('This event has already occured. <a href="https://go.ourrevolution.com.com/page/event/search_simple">Click here to search for a different event</a>.')
        }
        if (jQuery('.explain:contains("If you would like to make a contribution pledge, use the box below.")')) {
            jQuery('#event_rsvp').bsdTextWrap('I pledge $', 'div', 'pledge');
            jQuery('.pledge').text('I pledge');
            jQuery('#event_rsvp').bsdTextWrap('(USD) and I will fulfill my pledge ', 'span', 'x');
            jQuery('div.explain:contains("If you would like to make a contribution pledge, use the box below.")').nextUntil('.x').addBack().wrapAll('<div class="pledge-commit clear" />');
            jQuery('.x').remove();
            jQuery('[name=pledge_method]').parent().hide();
            jQuery('.pledge-commit').prepend('<label class="form_label">Pledge to Donate</label>');
            jQuery('.explain').bsdTextWrap('A contribution pledge is required.', 'div', 'pledge-required');
            jQuery('.explain').bsdTextWrap('Pledges must be between', 'div', 'pledge-amount');
            jQuery('.explain').bsdTextWrap('If you would like to make a contribution pledge, use the box below.', 'div', 'pledge-instruct');
            jQuery('.pledge-commit br').remove();
            if (jQuery('.pledge-required').length > 0) {
                jQuery('.pledge-instruct').hide()
            }
            var pledgeReq = jQuery('.pledge-amount').text();
            var pledgeReqSplit = pledgeReq.split('.00 USD');
            var cleanPledgeReq = pledgeReqSplit[0] + pledgeReqSplit[1];
            jQuery('.pledge-amount').text(cleanPledgeReq);
        }
        if (jQuery('.location.vcard:contains("#PENDING#")')) {
            jQuery('.location.vcard:contains("#PENDING#")').text('The location for this event is pending. We will let you know when the location is determined')
        }
        var reportTag = '<p class="flag-event"><a></a></p>';
        var sourceEventUrl = window.location.href;
        var cleanUrl = encodeURI(sourceEventUrl);
        var mailTo = 'mailto:help@ourrevolution.com?Subject=Inappropriate%20Event%20Report&Body=Please%20review%20the%20content%20for%20the%20following%20event%3A%20' + cleanUrl + '%0A%0ANotes%3A%0A';
        var flag_parent_sel = "#eventdetail > .ui-widget-content.detail-container";
        $flag_parent = jQuery(flag_parent_sel);
        $flag_parent.append(reportTag);
        jQuery(flag_parent_sel + ' > .flag-event a').text('Flag Event as Inappropriate').attr('href', mailTo);
    }
    if (jQuery('.bsd-widget-inner-content h2:contains("Event Creation Coming Soon")').length > 0) {
        jQuery('body').addClass('event-central disabled').makeEventCentral();
    }
    if (jQuery('.ui-widget-header:contains("1 of")').length > 0) {
        jQuery('body').addClass('event-central step1').makeEventCentral();
        var interior = jQuery('.ui-widget-header h2').text();
        var int_arr = interior.split(" -- ");
        if (int_arr.length == 2) {
            jQuery('.ui-widget-header h2').text(int_arr[0]);
            jQuery('.ui-widget-header').append('<h3>' + int_arr[1] + '</h3>');
        }
        jQuery('table, tbody, th, tr, td').replaceTag('<div>', true);
        jQuery('#eventcreate div[class=""]').children().unwrap();
        jQuery("#event_rsvp select").wrap("<div class='select-wrapper'></div>");
        jQuery('.ui-widget-header h3').prependTo('#event_rsvp');
        jQuery('<h1>Create Event</h1>').prependTo('.ui-widget-header');
        jQuery('#event_rsvp').insertAfter('.bsd-widget-inner-content');
        jQuery('.ui-widget-header').next().addBack().wrapAll('<div class="intro-content" />');
        jQuery('.typedesc').appendTo('.intro-content');
        jQuery('.button').prev().remove();
        jQuery('.typedesc .even, .typedesc .odd').each(function() {
            jQuery(this).children().first().addClass('type-title');
        });
        jQuery('#event_rsvp .firstform div:contains("Event Venue"), #event_rsvp .firstform div:contains("Event Type")').addClass('form_label');
        jQuery("#event_rsvp select").wrap("<div class='select-wrapper'></div>");
        jQuery('.bsd-page-header-content button').on('click', function() {
            jQuery('#account_actions').slideToggle("fast");
        });

        function querySt(ji) {
            hu = window.location.search.substring(1);
            gy = hu.split("&");
            for (i = 0; i < gy.length; i++) {
                ft = gy[i].split("=");
                if (ft[0] == ji) {
                    return ft[1];
                }
            }
        }
        var eventType = querySt("event_type_id");
        if (typeof eventType != 'undefined') {
            jQuery('select[name="event_type_id"]').val(eventType);
        } else {}
    }
    if (jQuery('.ui-widget-header:contains("2 of 2")').length > 0) {
        jQuery('body').addClass('event-central step2').makeEventCentral();
        var interior = jQuery('.ui-widget-header h2').text();
        var int_arr = interior.split(" -- ");
        if (int_arr.length == 2) {
            jQuery('.ui-widget-header h2').text(int_arr[0]);
            jQuery('.ui-widget-header').append('<h3>' + int_arr[1] + '</h3>');
        }
        jQuery('table, tbody, th, tr, td').replaceTag('<div>', true);
        jQuery('#eventcreate div[class=""]').children().unwrap();
        jQuery("#secondform select").wrap("<div class='select-wrapper'></div>");
        jQuery('<h1>Create Event</h1>').prependTo('.ui-widget-header');
        jQuery('input[name=venue_addr1]').attr('required', 'required');
        var form = document.getElementById('secondform');
        form.noValidate = true;
        form.addEventListener('submit', function(event) {
            if (!event.target.checkValidity()) {
                event.preventDefault();
                jQuery('<div class="error" id="addr-error" />').text('Please provide an address for your event').insertBefore(jQuery('[name=submit_button]'));
                jQuery('input[name=venue_addr1]').css({
                    backgroundColor: "#ffe2c0",
                    border: "2px solid #f9b363"
                })
            } else {
                if (typeof eventSourceTracking == "object" && eventSourceTracking.hostField) eventSourceTracking.inject();
            }
        }, false);
        jQuery(".label").each(function() {
            var spaceCheck = jQuery(this);
            spaceCheck.html(spaceCheck.html().replace(/&nbsp;/g, ''));
        });
        jQuery('.sectionheader h3:contains("What:")').parent().addClass('section-what');
        jQuery('.sectionheader h3:contains("Where:")').parent().addClass('section-where');
        jQuery('.sectionheader h3:contains("When:")').parent().addClass('section-when');
        jQuery('.sectionheader h3:contains("Who:")').parent().addClass('section-who');
        jQuery('form > div > td').remove();
        jQuery('#secondform div').bsdTextWrap('The host mailing address is required', 'div', 'explain');
        jQuery('#secondform div').bsdTextWrap('A contact phone number is required', 'div', 'explain');
        jQuery('.section-what').nextUntil('.section-when').addBack().wrapAll('<div class="section-wrap" />');
        jQuery('.section-when').nextUntil('.section-where').addBack().wrapAll('<div class="section-wrap" />');
        jQuery('.section-where').nextUntil('.section-who').addBack().wrapAll('<div class="section-wrap" />');
        jQuery('.section-who').nextAll().addBack().wrapAll('<div class="section-wrap" />');
        jQuery('.form_label span').each(function() {
            var spanTarget = jQuery(this).closest('.label').next();
            jQuery(this).insertAfter(spanTarget);
        });
        jQuery('.form_label:contains("Receive email when users sign up?")').parent().next().addBack().wrapAll('<div class="checkboxgroup" />');
        jQuery('.form_label:contains("Receive email when users sign up?")').unwrap();
        jQuery('input[name="host_receive_rsvp_emails"]').unwrap();
        jQuery('.table_container').insertAfter('.bsd-widget-inner-content');
        jQuery('.ui-widget-header').next().addBack().wrapAll('<div class="intro-content" />');
        jQuery('#secondform').prepend(jQuery('.ui-widget-header h3'));
        jQuery('.section-wrap > .label').each(function() {
            jQuery(this).next().addBack().wrapAll('<div class="inputgroup" />');
        });
        jQuery('.form_label:contains("Province")').text('State:');
        jQuery('.form_label:contains("Postal")').text('ZIP Code:');
        jQuery('.form_label:contains("City:")').closest('.inputgroup').addClass('col city-col');
        jQuery('.form_label:contains("State:")').closest('.inputgroup').addClass('col state-col');
        jQuery('.form_label:contains("ZIP Code:")').closest('.inputgroup').addClass('col zip-col');
        jQuery('<div class="clear"></div>').insertAfter('.zip-col');
        jQuery('.form_label:contains("Do you want your event to be public?")').closest('.inputgroup').each(function() {
            jQuery('.section-where').parent().append(jQuery(this));
        });
        jQuery('h3:contains("Contact Phone:")').closest('.sectionheader').remove();
        jQuery('input[name="venue_addr2"], input[name="host_addr_addr2"]').css('margin-top', '10px').parent().prev().remove();
        jQuery('h3:contains("Host Mailing Address:")').parent().remove();
        jQuery('.explain:contains("A contact phone number is required.")').prev().next().addBack().wrapAll('<div class="phone-instruct" />');
        jQuery('.explain:contains("The host mailing address is required.")').prev().next().addBack().wrapAll('<div class="address-instruct" />');
        jQuery('select[name="rsvp_use_reminder_email"]').change(function() {
            if (jQuery('select[name="rsvp_use_reminder_email"] option:selected').attr('value') == 1) {
                jQuery('.hideabletable').show();
            } else {
                jQuery('.hideabletable').hide();
            }
        });
        jQuery('.ui-widget-header h2').text('Step 2 of 2');
        jQuery('form > h3').remove();
        jQuery('input[name="host_addr_addr2"]').closest('.inputgroup').append(jQuery('.address-instruct'));
        jQuery('input[name="contact_phone"]').closest('.inputgroup').append(jQuery('.phone-instruct'));
        jQuery('.bsd-page-header-content button').on('click', function() {
            jQuery('#account_actions').slideToggle("fast");
        });
        jQuery('.bsd-when').first().show();
        var whatSection = jQuery('.section-what').parent();
        var whenSection = jQuery('.section-when').parent();
        var whereSection = jQuery('.section-where').parent();
        var whoSection = jQuery('.section-who').parent();
        jQuery(whenSection).insertAfter(whatSection);
        jQuery(whereSection).insertAfter(whenSection);
        jQuery(whoSection).insertAfter(whereSection);
        jQuery('select[name="start_time[h]"], select[name="start_time[i]"], select[name="start_time[a]"], select[name="start_day[Y]"], select[name="start_day[M]"], select[name="start_day[d]"]').parent().addClass('col-3');
        jQuery('select[name="start_time[a]"], select[name="start_day[Y]"]').parent().addClass('col-3-3');
        jQuery('.form_label:contains("Event Length:")').closest('.inputgroup').addClass('event-length');
        jQuery('[name="attendee_volunteer_show"]').closest('.inputgroup').addClass('checkboxgroup');
        jQuery('.form_hide_table:contains("Volunteer message:")').attr('id', 'avm_block');
        jQuery('.section-wrap div:contains("The host mailing address is requested")').remove();
        if (jQuery('#shifts_interface').length > 0) {
            jQuery('.event_shifts_list li').bsdTextWrap('Shift', 'span', 'shift');
            jQuery('.event_shifts_list li').bsdTextWrap(':', 'span', 'colon');
            jQuery('.event_shifts_list li').bsdTextWrap('Or ', 'span', 'x');
            jQuery('.start_time_interface').bsdTextWrap(':', 'span', 'colon');
            jQuery('#event_shifts_list .select-wrapper').each(function() {
                jQuery(this).addClass('col-3')
            });
            jQuery('#event_shifts_list .select-wrapper select[name="shifts_start[][a]"], #event_shifts_list .select-wrapper select[name="shifts_end[][a]"]').parent().addClass('col-3-3');
            jQuery('#shifts_interface input').next().addBack().wrapAll('<div class="checkboxgroup shifts" />');
            jQuery('.shift').next().addBack().wrapAll('<div class="group" />');
            jQuery('#shifts_interface label').addClass('form_label');
            jQuery('.shifts_interface .checkboxgroup').insertBefore('.start_time_interface');
            jQuery('.colon:contains("Cap Limit")').addClass('limit-label').text('Capacity Limit:');
            jQuery('select[name="shifts_start[][h]"]').each(function() {
                var target = jQuery(this).parent()
                jQuery('<label class="shift-label">Shift Start Time:</>').insertBefore(target)
            });
            jQuery('select[name="shifts_end[][h]"]').each(function() {
                var target = jQuery(this).parent()
                jQuery('<label class="shift-label">Shift End Time:</>').insertBefore(target)
            });
        }
        var eType = jQuery('.static').text()
        if (eType.indexOf('Phonebank') >= 0) {
            var capLimitLabel = jQuery('.label:contains("Capacity Limit")')
            var capSpan = document.createElement("span");
            jQuery(capSpan).insertAfter(capLimitLabel);
            jQuery(capLimitLabel).next('span').addClass('cap-notification')
            jQuery('.cap-notification').text('Set the event capacity to TWICE what your event can accommodate. Itâ€™s common for some people who RSVP to attend to cancel before the event.')
        }
    }
    if (jQuery('.bsd-widget-header-content:contains("Edit Your Event")').length > 0) {
        jQuery('body').addClass('event-central edit-event').makeEventCentral();
        jQuery('table, tbody, th, tr, td').replaceTag('<div>', true);
        jQuery('#secondform div[class=""]').children().unwrap();
        jQuery("#secondform select").wrap("<div class='select-wrapper'></div>");
        jQuery('<h1>Manage Event</h1>').prependTo('.ui-widget-header');
        jQuery(".label").each(function() {
            var spaceCheck = jQuery(this);
            spaceCheck.html(spaceCheck.html().replace(/&nbsp;/g, ''));
        });
        jQuery('.sectionheader h3:contains("What:")').parent().addClass('section-what');
        jQuery('.sectionheader h3:contains("Where:")').parent().addClass('section-where');
        jQuery('.sectionheader h3:contains("When:")').parent().addClass('section-when');
        jQuery('.sectionheader h3:contains("Who:")').parent().addClass('section-who');
        jQuery('form > div > td').remove();
        jQuery('#secondform div').bsdTextWrap('The host mailing address is required', 'div', 'explain');
        jQuery('#secondform div').bsdTextWrap('A contact phone number is required', 'div', 'explain');
        jQuery('.section-what').nextUntil('.section-when').addBack().wrapAll('<div class="section-wrap" />');
        jQuery('.section-when').nextUntil('.section-where').addBack().wrapAll('<div class="section-wrap" />');
        jQuery('.section-where').nextUntil('.section-who').addBack().wrapAll('<div class="section-wrap" />');
        jQuery('.section-who').nextAll().addBack().wrapAll('<div class="section-wrap" />');
        jQuery('.form_label span').each(function() {
            var spanTarget = jQuery(this).closest('.label').next();
            jQuery(this).insertAfter(spanTarget);
        });
        jQuery('.form_label:contains("Receive email when users sign up?")').parent().next().addBack().wrapAll('<div class="checkboxgroup" />');
        jQuery('.form_label:contains("Receive email when users sign up?")').unwrap();
        jQuery('input[name="host_receive_rsvp_emails"]').unwrap();
        jQuery('.table_container').insertAfter('.bsd-widget-inner-content');
        jQuery('.ui-widget-header').next().addBack().wrapAll('<div class="intro-content" />');
        jQuery('#secondform').prepend(jQuery('.ui-widget-header h3'));
        jQuery('.section-wrap > .label').each(function() {
            jQuery(this).next().addBack().wrapAll('<div class="inputgroup" />');
        });
        jQuery('.form_label:contains("Province")').text('State:');
        jQuery('.form_label:contains("Postal")').text('ZIP Code:');
        jQuery('.form_label:contains("City:")').closest('.inputgroup').addClass('col city-col');
        jQuery('.form_label:contains("State:")').closest('.inputgroup').addClass('col state-col');
        jQuery('.form_label:contains("ZIP Code:")').closest('.inputgroup').addClass('col zip-col');
        jQuery('<div class="clear"></div>').insertAfter('.zip-col');
        jQuery('.form_label:contains("Do you want your event to be public?")').closest('.inputgroup').each(function() {
            jQuery('.section-where').parent().append(jQuery(this));
        });
        jQuery('h3:contains("Contact Phone:")').closest('.sectionheader').remove();
        jQuery('input[name="venue_addr2"], input[name="host_addr_addr2"]').css('margin-top', '10px').parent().prev().remove();
        jQuery('h3:contains("Host Mailing Address:")').parent().remove();
        jQuery('.explain:contains("A contact phone number is required.")').prev().next().addBack().wrapAll('<div class="phone-instruct" />');
        jQuery('.explain:contains("The host mailing address is required.")').prev().next().addBack().wrapAll('<div class="address-instruct" />');
        if (jQuery('select[name="rsvp_use_reminder_email"] option:selected').attr('value') == 0) {
            jQuery('.hideabletable').hide();
        }
        jQuery('select[name="rsvp_use_reminder_email"]').change(function() {
            if (jQuery('select[name="rsvp_use_reminder_email"] option:selected').attr('value') == 1) {
                jQuery('.hideabletable').show();
            } else {
                jQuery('.hideabletable').hide();
            }
        });
        jQuery('.ui-widget-header h2').text('Edit Your Event Details');
        jQuery('form > h3').remove();
        jQuery('input[name="host_addr_addr2"]').closest('.inputgroup').append(jQuery('.address-instruct'));
        jQuery('input[name="contact_phone"]').closest('.inputgroup').append(jQuery('.phone-instruct'));
        jQuery('#secondform').insertAfter('.intro-content');
        jQuery('.bsd-page-header-content button').on('click', function() {
            jQuery('#account_actions').slideToggle("fast");
        });
        jQuery('.bsd-when').first().show();
        var whatSection = jQuery('.section-what').parent();
        var whenSection = jQuery('.section-when').parent();
        var whereSection = jQuery('.section-where').parent();
        var whoSection = jQuery('.section-who').parent();
        jQuery(whenSection).insertAfter(whatSection);
        jQuery(whereSection).insertAfter(whenSection);
        jQuery(whoSection).insertAfter(whereSection);
        jQuery('select[name="start_time[h]"], select[name="start_time[i]"], select[name="start_time[a]"]').parent().addClass('col-3');
        jQuery('select[name="start_time[a]"]').parent().addClass('col-3-3');
        jQuery('.form_label:contains("Event Length:")').closest('.inputgroup').addClass('event-length');
        jQuery('.section-wrap div:contains("The host mailing address is requested")').remove();
    }
    if (jQuery('.bsd-widget-header:contains("Delete the event")').length > 0) {
        jQuery('body').addClass('event-central delete-event').makeEventCentral();
        jQuery('table, tbody, th, tr, td').replaceTag('<div>', true);
        jQuery('#eventdetail div[class=""]').children().unwrap();
        jQuery('p:contains("Are you sure you want to delete this event?")').next().addBack().wrapAll('<div class="confirm-box" />');
        jQuery('.confirm-box').insertAfter('#eventdetail');
        jQuery('#delete_event, #eventdetail').addClass('clear');
        jQuery('#eventdetail div div:contains("Event Name:")').addClass('form_label');
        jQuery('#eventdetail div div:contains("Host:")').addClass('form_label');
        jQuery('#eventdetail div div:contains("Time:")').addClass('form_label');
        jQuery('#eventdetail div div:contains("Contact Phone:")').addClass('form_label').text('Phone:');
        jQuery('#eventdetail div div:contains("Location:")').addClass('form_label');
        jQuery('<div class="clear" />').insertBefore('#eventdetail .form_label');
        jQuery('#sectionheader:contains("Delete the event")').text('Event Details');
        jQuery('.table_container .clear').first().remove();
        jQuery('.bsd-page-header-content button').on('click', function() {
            jQuery('#account_actions').slideToggle("fast");
        });
    }
    if (jQuery('.bsd-event-manageevent .bsd-widget-header:contains("Event Attendees")').length > 0) {
        jQuery('body').addClass('event-central manage-event').makeEventCentral();
        jQuery('table, tbody, th, tr, td').replaceTag('<div>', true);
        jQuery('#eventdetail div[class=""]').children().unwrap();
        jQuery('.detailtable_container').addClass('clear');
        jQuery('<div class="clear" />').insertBefore('.detailtable_container .form_label');
        jQuery('#eventdetail div .form_label:contains("Contact Phone:")').text('Phone:');
        jQuery('#eventdetail .ui-widget-header:contains("Event Details")').prependTo('.detailtable_container');
        jQuery('h2:contains("Event Attendees")').parent().insertBefore('.dayheader');
        jQuery('.bsd-widget-inner-content').next().addClass('sidebar');
        jQuery('.sidebar').insertAfter('#eventdetail');
        jQuery('.sidebar .form_button_group').insertAfter(jQuery('.day_attendee_count').first());
        jQuery('.bsd-page-header-content button').on('click', function() {
            jQuery('#account_actions').slideToggle("fast");
        });
    }
    if (jQuery('#sectionheader:contains("Send Event Invitations")').length > 0) {
        jQuery('body').addClass('event-central invite').makeEventCentral();
        jQuery('#control_set > h1').nextAll().addBack().wrapAll('<div class="bsd-page-header-content" />');
        jQuery('table, tbody, th, tr, td').replaceTag('<div>', true);
        jQuery('#inviteform div[class=""]').children().unwrap();
        jQuery('.table_container div').filter(function() {
            return jQuery.trim(jQuery(this).text()) === '' && jQuery(this).children().length == 0
        }).remove();
        jQuery('.form_button_group').insertBefore('#eventdetail');
        jQuery('.form_button_group').next().addBack().wrapAll('<div class="invite-block" />');
        jQuery('<div class="clearfix" style="clear: both;">').insertAfter('a#contact_importer_button');
        jQuery('.bsd-page-header-content button').on('click', function() {
            jQuery('#account_actions').slideToggle("fast");
        });
    }
    if (jQuery('#sectionheader:contains("Email Event Attendees")').length > 0) {
        jQuery('body').addClass('event-central email').makeEventCentral();
        jQuery('table, tbody, th, tr, td').replaceTag('<div>', true);
        jQuery('#event_manage_email_form div[class=""]').children().unwrap();
        jQuery('.bsd-page-header-content button').on('click', function() {
            jQuery('#account_actions').slideToggle("fast");
        });
    }
    if (jQuery('.bsd-widget-header:contains("Edit your signup")').length > 0) {
        jQuery('body').addClass('event-central edit-signup').makeEventCentral();
        jQuery('table, tbody, th, tr, td').replaceTag('<div>', true);
        jQuery('#eventdetail div[class=""]').children().unwrap();
        jQuery("#eventdetail select").wrap("<div class='select-wrapper'></div>");
        jQuery('#event_rsvp').bsdTextWrap('(required)', 'span', 'explain');
        jQuery('#event_rsvp').bsdTextWrap('Phone Number:', 'div', 'form_label');
        jQuery('#event_rsvp').bsdTextWrap('Will you attend', 'div', 'form_label');
        jQuery('#event_rsvp').bsdTextWrap('How many attendees total', 'div', 'form_label');
        jQuery('#event_rsvp div').bsdTextWrap('Add a comment', 'div', 'form_label');
        jQuery('.form_label:contains("Add a comment")').html('Add a comment: <span>(Optional)</span>');
        if (jQuery('#volunteer_box').length > 0) {
            jQuery('#volunteer_box div:contains("Country:"), #volunteer_box div:contains("Address:"), #volunteer_box div:contains("City:"), #volunteer_box div:contains("Province"), #volunteer_box div:contains("Phone:"), #volunteer_box div:contains("Zip")').addClass('vol-label');
            jQuery('#volunteer_box div:contains("Province")').text('State:');
            jQuery('.vol-label:contains("Code:")').text('Zip Code:');
            jQuery('#volunteer_box').insertBefore(':submit');
            jQuery('.vol-label:contains("Country")').nextUntil('.vol-label').addBack().wrapAll('<div class="vol-country-group" />');
            jQuery('.vol-label:contains("Address")').nextUntil('.vol-label').addBack().wrapAll('<div class="vol-addr-group" />');
            jQuery('.vol-label:contains("Zip")').next().addBack().wrapAll('<div class="vol-zip-group" />');
            jQuery('.vol-label:contains("City")').next().addBack().wrapAll('<div class="vol-city-group vol-details" />');
            jQuery('.vol-label:contains("State")').next().addBack().wrapAll('<div class="vol-state-group vol-details" />');
            if (jQuery('#volunteer_box input[name="phone"]').length > 0) {
                jQuery('.vol-label:contains("Phone")').next().addBack().wrapAll('<div class="vol-phone-group vol-details" />');
            }
            jQuery('.vol-addr-group, .vol-country-group, .vol-zip-group').hide();
            jQuery('<div class="clearfix" style="clear: both;">').insertAfter('.col2-3');
            jQuery('#volunteer_box .checkboxgroup').insertAfter('#volunteer_box h3');
            jQuery('#is_potential_volunteer_checkbox').parent().addClass('checkboxgroup');
            jQuery('<div class="clear"></div>').insertAfter('.vol-state-group');
            jQuery('.vol-details').hide();
            jQuery('.hideabletable input, .hideabletable select').on("keyup keypress paste mouseup", function() {
                jQuery('.vol-city-group input').val(jQuery('#addr-city').val())
                jQuery('.vol-state-group select').val(jQuery('#addr-state_cd').val())
            });
        }
        if (jQuery('#is_potential_volunteer_checkbox').is(":checked")) {
            jQuery('.vol-details').show();
            jQuery('#zip').val(jQuery('#rsvp_nocreate_zip').val());
        }
        jQuery('#is_potential_volunteer_checkbox').on('change', function() {
            if (jQuery('#is_potential_volunteer_checkbox').is(":checked")) {
                jQuery('.vol-details').show();
                jQuery('#zip').val(jQuery('#rsvp_nocreate_zip').val());
            } else {
                jQuery('.vol-details').hide();
            }
        });
        jQuery('.bsd-page-header-content button').on('click', function() {
            jQuery('#account_actions').slideToggle("fast");
        });
    }
    if (jQuery('.bsd-widget-header-content:contains("Thanks for signing up!")').length > 0) {
        jQuery('body').addClass('event-central signup-success').makeEventCentral();
        jQuery('table, tbody, th, tr, td').replaceTag('<div>', true);
        jQuery('#invite_form div[class=""]').children().unwrap();
        jQuery('.detailtable_container div[class=""]').children().unwrap();
        jQuery('<h1>Event RSVP</h1>').insertBefore('#sectionheader');
        jQuery('<div class="clear"></div>').insertBefore('.detailtable_container .form_label');
        jQuery('<div class="clear"></div>').appendTo('.detailtable_container');
        jQuery('.detailtable_container .clear').first().remove();
        jQuery("#invite_form div").each(function() {
            var spaceCheck = jQuery(this);
            spaceCheck.html(spaceCheck.html().replace(/&nbsp;/g, ''));
        });
        jQuery("#homepagelink").each(function() {
            var spaceCheck = jQuery(this);
            spaceCheck.html(spaceCheck.html().replace(/Â·/g, ''));
        });
        jQuery('<div class="clearfix" style="clear: both;">').insertAfter('a#contact_importer_button');
        jQuery('.bsd-page-header-content button').on('click', function() {
            jQuery('#account_actions').slideToggle("fast");
        });
        if (jQuery('#begin').length > 0 || jQuery('#doors-open').length > 0) {
            var myStr = jQuery('.detailtable_container div:contains(", 2015")').text();
            if (jQuery('.detailtable_container div:contains(", 2016")').length > 0) {
                myStr = jQuery('.detailtable_container div:contains(", 2016")').text();
            }
            var clnStr = myStr.trim();
            var newStr = clnStr.split(" ");
            var newEl = '<div class="date-only">' + newStr[0] + ' ' + newStr[1] + ' ' + newStr[2] + ' ' + newStr[3] + '</div>';
            jQuery('<div class="form_label rally-date">Date:</div>').prependTo('.detailtable_container');
            jQuery(newEl).insertAfter('.rally-date');
            jQuery('<div class="clear"/>').insertAfter('.date-only');
            jQuery('#event_detail_xml_link').appendTo('.date-only');
            jQuery('.form_label:contains("Time:")').nextUntil('.form_label').addBack().remove();
        }
        if (jQuery('#begin').length > 0) {
            jQuery('<div class="form_label prog-begin">Program Begins:</div>').prependTo('.detailtable_container');
            jQuery('#begin').insertAfter('.prog-begin');
            jQuery('<div class="clear"/>').insertAfter('#begin');
        }
        if (jQuery('#doors-open').length > 0) {
            jQuery('<div class="form_label dopen-label">Doors Open:</div>').prependTo('.detailtable_container');
            jQuery('#doors-open').insertAfter('.dopen-label');
            jQuery('<div class="clear"/>').insertAfter('#doors-open');
        }
        jQuery('input[value="Final Step: Fulfill Your Pledge Now >>"]').attr('id', 'fulfill-pledge').appendTo('#eventdetail > .ui-widget-header');
        if (jQuery('#fulfill-pledge').length > 0) {
            var pledgeOnClick = document.getElementById('fulfill-pledge').getAttribute('onclick');
            var targetUrl = pledgeOnClick.split('href=');
            var cleanedUrl = targetUrl[1].split("'");
            window.location.replace(cleanedUrl[1]);
        }
        if (jQuery('.location.vcard:contains("#PENDING#")')) {
            jQuery('.location.vcard:contains("#PENDING#")').text('The location for this event is pending. We will let you know when the location is determined')
        }
    }
    if (jQuery('#cookieerror').length > 0) {
        jQuery('body').addClass('cookie-error').makeEventCentral();
        jQuery('.bsd-page-header-content button').on('click', function() {
            jQuery('#account_actions').slideToggle("fast");
        });
    }
    if (jQuery('#titletext:contains("Personal Fundraising")').length > 0) {
        jQuery('body').addClass('fundraise');
        jQuery('table, tbody, th, tr, td').replaceTag('<div>', true);
        jQuery('.bsd-page-header-content div[class=""]').children().unwrap();
        jQuery('#outreachlogin div[class=""]').children().unwrap();
        jQuery('#signupform form div[class=""]').children().unwrap();
        jQuery('<div class="clear"></div>').insertAfter('.bsd-page-header-content');
        jQuery('.bsd-page-header').insertBefore('.content');
        jQuery('.logintitle, .logindesc').prependTo('#loginform');
        jQuery('.signuptitle, .signupdesc').prependTo('#signupform');
        jQuery('.bsd-page-header-content').bsdTextWrap(' - ', 'span', 'x');
        jQuery('.bsd-page-header-content').bsdTextWrap('You are logged in as:', 'span', 'logged-in-as');
        jQuery('.bsd-page-header-content br, .x').remove();
        jQuery('.logged-in-as').next().addBack().wrapAll('<div class="login-status">');
        jQuery('.login-status').insertBefore('#bsd-header');
        if (jQuery('.login-status').length > 0) {
            jQuery('#bsd-header').css('marginTop', 0)
        }
    }
    if (jQuery('.bsd-outreach-settings').length > 0) {
        jQuery('body').addClass('settings');
        jQuery('.vspacer').remove();
        jQuery('#outreach_content h2').text('Edit Your Fundraising Page');
        jQuery('<h1>Settings</h1>').insertBefore('#outreach_content h2');
        jQuery('#cancel_button').insertAfter('#submit_button')
        jQuery('#outreach_content').bsdTextWrap('Use the form below to customize your personal fundraising page.', 'p', '');
        jQuery('span:contains("denotes required field")').parent().addClass('req-text');
        jQuery('input[name="goal_amt"],label:contains("Short Name:"),input[name="page_title"],label:contains("Page Text:")').parent().parent().addClass('inputgroup');
        jQuery('#submit_button').parent().parent().addClass('button-group')
        jQuery('.wysiwygeditlinkwrap').parent().parent().addClass('text-editor');
        jQuery('.inputgroup div[class=""], .picture_upload_control div[class=""], .button-group div[class=""]').children().unwrap();
        jQuery('label:contains("Page Text:")').closest('.inputgroup').next().addClass('text-edit');
        jQuery('.button-group td').remove();
        jQuery('.inputgroup').each(function() {
            jQuery(this).children('span').appendTo(jQuery(this).children('label'));
            jQuery(this).find('.description').appendTo(jQuery(this))
        });
        jQuery('.picture_upload_control').each(function() {
            jQuery(this).find('.description').appendTo(jQuery(this))
        });
        jQuery('.text-edit').prev().find('.description').appendTo('.text-edit');
        jQuery('.inputgroup:contains("Goal (USD):")').addClass('my-goal');
        jQuery('.inputgroup:contains("Short Name:")').addClass('my-short');
        jQuery('.inputgroup:contains("Page Title:")').addClass('my-title');
        jQuery('<h3 class="leader">Details</h3>').prependTo('#outreachsettings');
        jQuery('<div class="clear" />').insertAfter('.my-title');
        jQuery('.picture_upload_control').addClass('col-2');
        jQuery('.picture_upload_control').last().addClass('col-2-2');
        jQuery('<div class="clear" />').insertAfter('.picture_upload_control.col-2-2');
        jQuery('.my-short td, .picture_upload_control td').remove();
        jQuery('.button-group label').remove();
        jQuery('.my-goal label:contains("USD")').text('Goal:*');
        jQuery('.my-short input').focus(function() {
            jQuery('.my-short .description span').slideDown('fast');
        });
        jQuery('.picture_upload_control').each(function() {
            jQuery(this).find('.description strong').appendTo(jQuery(this).find('label'));
        });
        jQuery('.picture_upload_control.col-2.col-2-2').remove();
        if (jQuery('label:contains("Picture File:")').length > 0) {
            jQuery('<h3 class="leader">Photo</h3>').insertBefore('.picture_upload_control:contains("Picture File")');
        } else {
            jQuery('#currentImage').parent().parent().addClass('inputgroup col-2');
            jQuery('.picture_action_control').nextUntil('.picture_upload_control').addBack().wrapAll('<div class="photo-actions col-2 col-2-2" />');
            jQuery('.picture_action_control').each(function() {
                jQuery(this).find('label').next().addBack().wrapAll('<div class="radiogroup" />')
            });
            jQuery('label:contains("Current Picture:")').insertBefore('#currentImage');
            jQuery('.text-edit').next().remove();
            jQuery('<div class="clear" />').insertAfter('.photo-actions');
        }
        jQuery('.my-short .description').html(' <span>Letters and Numbers only -- no spaces. <br>You will not be able to change this after your page is created.</span>Used to create an easy to remember URL for your page.');
        jQuery('#titletext').wrap('<a id="splash-link" />');
        var pageUrl = window.location.href
        var pageUrlSplit = pageUrl.split('/')
        var splashUrl = "//secure.berniesanders.com/page/outreach/splash/" + pageUrlSplit[6]
        jQuery('#splash-link').attr('href', splashUrl);
    }
    if (jQuery('.intro h2:contains("Contribution Processed")').length > 0) {
        jQuery('body').addClass('contrib-success');
    }
    if (jQuery('.bsd-outreach-login').length > 0) {
        jQuery('body').addClass('login');
        jQuery('.bsd-outreach-login #outreach_content h2').text('Login');
        jQuery('#outreach_content').bsdTextWrap('To join our effort', 'div', 'instruct');
        jQuery('.loginforgotlink').appendTo('#loginform');
        jQuery('.logindesc a, .signupdesc a').on('click', function() {
            jQuery('#loginform, #signupform').toggle();
        });
        jQuery('#signupform form div:contains("Your First Name:"), #signupform form div:contains("Your Last Name:"), #signupform form div:contains("Zip Code:"), #signupform form div:contains("Email Address:"), #signupform form div:contains("Password:"), #signupform form div:contains("Password (again):")').each(function() {
            jQuery(this).next().addBack().wrapAll('<div class="col-2" />');
        });
        jQuery('#signupform div:contains("Your Last Name:"), #signupform div:contains("Email Address:"), #signupform div:contains("Password (again):")').parent().addClass('col-2-2');
        jQuery('<div class="clear" />').insertBefore('.signupbutton');
        jQuery('.bsd-page-header-content').bsdTextWrap('You are logged in as:', 'span', 'logged-in-as');
        jQuery('.bsd-page-header-content br').remove();
    }
    if (jQuery('#outreachinvite').length > 0) {
        jQuery('body').addClass('invite');
        jQuery('#outreachinvite').unwrap();
        jQuery('.fundraise.invite label:contains("Subject")').parent().next().addBack().wrapAll('<div class="email-preview" />');
        jQuery('.fundraise.invite label:contains("To:")').parent().nextUntil('.email-preview').addBack().wrapAll('<div class="contacts-input" />');
        jQuery('#invite-button-submit').nextAll().addBack().wrapAll('<div class="inputs" />');
        jQuery('#outreachinvite').addClass('clear');
        jQuery('.omheadfloat').insertBefore('#outreachinvite');
        jQuery('input[type=checkbox]').each(function() {
            jQuery(this).next().addBack().wrapAll('<div class="checkboxgroup"/>')
        });
        if (jQuery('.omhead:contains("Thank You")').length > 0) {
            jQuery('<p>Use the form below to send thank you emails to people who have contributed on your page. <strong>All of the people listed below have contributed but have not yet been sent a thank you message.</strong> You can uncheck the box next to the names of any people who you do not wish to receive the message.</p>').insertAfter('.omheaddesc');
        }
    }
    if (jQuery('#odprogress').length > 0) {
        jQuery('<div id="cont" data-pct="0"><svg id="svg" width="200" height="200" viewPort="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle r="90" cx="100" cy="100" fill="transparent" stroke-dasharray="565.48" stroke-dashoffset="0"></circle><circle id="bar" r="90" cx="100" cy="100" fill="transparent" stroke-dasharray="565.48" stroke-dashoffset="0"></circle></svg></div>').prependTo('#odstats .bsd-widget-inner-content');
        jQuery.fn.extend({
            fundProg: function() {
                var val = parseInt(jQuery('#cont').attr('data-pct'));
                var jQuerycircle = jQuery('#svg #bar');
                if (isNaN(val)) {
                    val = 0;
                } else {
                    var r = jQuerycircle.attr('r');
                    var c = Math.PI * (r * 2);
                    if (val < 0) {
                        val = 0;
                    }
                    if (val > 100) {
                        val = 100;
                    }
                    var pct = ((100 - val) / 100) * c;
                    jQuerycircle.css({
                        strokeDashoffset: pct
                    });
                    jQuery('#cont').attr('data-pct', val);
                }
            }
        });
        jQuery('#cont').fundProg();
    }
    if (jQuery('.bsd-outreach-dashboard').length > 0) {
        jQuery('body').addClass('dashboard');
        jQuery('#breadcrumb, #odprogress').remove();
        jQuery('#odyourpage').insertBefore('#odshare');
        jQuery('#odyourpage').next().addBack().wrapAll('<div class="page-admin" />');
        jQuery('.odaddressdates div[class=""]').children().unwrap();
        if (jQuery('#odgettingstarted').length > 0) {
            jQuery('#odgettingstarted').prependTo('.page-admin');
        }
        jQuery('#odyourpage .bsd-widget-header-content').text('Page Admin');
        jQuery('#odstats .bsd-widget-header-content').text('Progress');
        jQuery('#odyourpage br').remove();
        jQuery('#odyourpage').addClass('clear');
        jQuery('#odstats div[class=""]').children().unwrap();
        jQuery('#odstats .bsd-widget-inner-content div:contains("$")').addClass('currency');
        jQuery('.odaddressitem').addClass('clear');
        var startPercent = jQuery('label:contains("% of Goal")').next().text();
        var newPercent = startPercent.split(" / ");
        var finalPercent = newPercent[1].split(".");
        jQuery('#cont').attr('data-pct', finalPercent[0]).fundProg();
        jQuery('#titletext').wrap('<a id="splash-link" />');
        var pageUrl = window.location.href
        var pageUrlSplit = pageUrl.split('/')
        var splashUrl = "//secure.berniesanders.com/page/outreach/splash/" + pageUrlSplit[6]
        jQuery('#splash-link').attr('href', splashUrl);
    }
    if (jQuery('.bsd-outreach-splash').length > 0) {
        jQuery('body').addClass('splash');
        jQuery('#outreachsplashcallout').insertBefore('#outreachsplashsearch');
        jQuery('#outreachsplashright br').remove();
        jQuery('#outreachsplashsearch .leadersheader').prependTo('#outreach_search_form');
        jQuery('<div class="clear" />').appendTo('#outreachsplash');
        jQuery('.leadersheader:contains("(amount raised)")').parent().addClass('leader-amount col-2');
        jQuery('.leadersheader:contains("(# of contributions)")').parent().addClass('leader-contribs col-2 col-2-2');
        jQuery('.leader-amount, .leader-contribs').appendTo('#outreachsplash');
        jQuery('#outreachsplashright').insertBefore('#outreachsplash .clear');
        jQuery('#outreachsplash').children().first().nextUntil('#outreachsplashright').addBack().wrapAll('<div class="intro-content" />');
        jQuery('<div class="leadersheader">Create Your Own</div>').prependTo('#outreachsplashcallout');
        jQuery('#outreachsplashleaders a').parent().addClass('leader-item');
        jQuery('.leader-item').next().addClass('metric');
        jQuery('#outreachsplashleaders div[class=""]').children().unwrap();
        jQuery('.leader-item').each(function() {
            jQuery(this).next().addBack().wrapAll('<div class="leader-group" />');
        });
    }
    jQuery('.content').css('visibility', 'visible');
    if (jQuery('#event_rsvp').length > 0 && jQuery('#event_rsvp').attr('action').indexOf('https://secure.berniesanders.com/page/event/detail/rally/4vmcc') >= 0) {
        jQuery('input[name=guests]').prev().hide();
        jQuery('input[name=guests]').hide();
        jQuery('input[name=guests]').next().hide();
    }
});
jQuery('.content').css('visibility', 'visible');
jQuery('.bsd-page-header-content button').on('click', function() {
    jQuery('#account_actions').slideToggle("fast");
});
jQuery(document).ready(function() {
    var eventState = jQuery('.bsd-event-details .location .region').text();
    var labelDiv = '<div class="form_label" />';
    var earlyStates = ['SC', 'IA', 'NH', 'NV'];
    var addrFields = [
        ['input', 'text', 'email'],
        ['input', 'text', 'addr1'],
        ['input', 'text', 'addr2'],
        ['input', 'text', 'city'],
        ['select', 'select', 'state_cd'],
        ['input', 'text', 'zip'],
        ['input', 'text', 'phone']
    ]
    var addrStates = ['', 'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY', 'AA', 'AE', 'AP', 'AS', 'FM', 'GU', 'MH', 'MP', 'PR', 'PW', 'VI']
    if (earlyStates.indexOf(eventState) > -1) {
        var addrFormDiv = '<div id="addr-form" class="clear" />'
        var bsdError = '<div id="bsd-error" />'
        jQuery('#event_rsvp').addClass('early-state').append(addrFormDiv);
        for (var i = 0; i < addrFields.length; i += 1) {
            var input;
            if (addrFields[i][0] == 'input') {
                input = '<input type="' + addrFields[i][1] + '" name="' + addrFields[i][2] + '" id="addr-' + addrFields[i][2] + '"/>';
            } else {
                input = '<div class="select-wrapper"><select name="' + addrFields[i][2] + '" id="addr-' + addrFields[i][2] + '"></select></div>';
            }
            document.getElementById('addr-form').innerHTML += input
        }
        for (var i = 0; i < addrStates.length; i += 1) {
            var option = '<option value="' + addrStates[i] + '">' + addrStates[i] + '</option>';
            document.getElementById('addr-state_cd').innerHTML += option
        }
        jQuery('#addr-addr1, #addr-city').each(function() {
            jQuery(labelDiv).insertBefore(jQuery(this))
            if (jQuery(this).attr('id') == 'addr-addr1') {
                jQuery(this).prev().text('Address');
            } else if (jQuery(this).attr('id') == 'addr-city') {
                jQuery(this).prev().text('City');
            }
        });
        jQuery(labelDiv).insertBefore(jQuery('#addr-state_cd').parent())
        jQuery('#addr-state_cd').parent().prev().text('State')
        jQuery('#addr-form').insertAfter('#rsvp_nocreate_email');
        jQuery(bsdError).insertBefore('.button');
        jQuery('#bsd-error').text('Please Complete All Fields').hide();
        jQuery('#addr-phone').val(jQuery('#event_rsvp > input[name="phone"]').val());
        jQuery('#addr-zip').val(jQuery('#rsvp_nocreate_zip').val());
        jQuery('#addr-email').val(jQuery('#rsvp_nocreate_email').val());
        jQuery('body').on('mouseup', function() {
            if (jQuery('#id_type_nocreate').length > 0) {
                jQuery('#addr-zip').val(jQuery('#rsvp_nocreate_zip').val());
                jQuery('#addr-email').val(jQuery('#rsvp_nocreate_email').val());
            }
            jQuery('.vol-city-group input').val(jQuery('#addr-city').val());
            jQuery('.vol-state-group select').val(jQuery('#addr-state_cd').val());
            if (jQuery('#event_rsvp > input[name="phone"]').length > 0) {
                jQuery('#addr-phone').val(jQuery('#event_rsvp > input[name="phone"]').val());
            }
        });
        jQuery('#addr-form .form_label:contains("City")').next().addBack().wrapAll('<div class="col-1-3" />');
        jQuery('#addr-form .form_label:contains("State")').next().addBack().wrapAll('<div class="col-2-3" />');
        jQuery('#addr-phone, #addr-zip, #addr-email').hide();
        if (jQuery('#event_rsvp > input[name="phone"]').length == 0) {
            jQuery('#addr-phone').addClass('clear').show();
            jQuery(labelDiv).insertBefore(jQuery('#addr-phone'));
            jQuery('#addr-phone').prev().text('Phone Number').next().addBack().insertAfter('#addr-email');
        }
        if (jQuery('.vol-addr-group').length > 0 && jQuery('#addr-addr1').length > 0) {
            jQuery('.vol-addr-group').remove();
        }
        jQuery('body').on('mouseup', function() {
            if (jQuery('#volunteer_box .vol-phone-group').length > 0) {
                if (jQuery('#event_rsvp > input[name="phone"]').length > 0) {
                    jQuery('.vol-phone-group input').val(jQuery('#event_rsvp > input[name="phone"]').val());
                } else {
                    jQuery('.vol-phone-group input').val(jQuery('#addr-phone').val());
                }
                jQuery('.vol-phone-group').hide();
            }
            if (jQuery('#volunteer_box .vol-zip-group').length > 0) {
                jQuery('.vol-zip-group input').val(jQuery('#rsvp_nocreate_zip').val())
            }
        });
        if (jQuery('#id_type_nocreate').length == 0) {
            var labelDiv = '<div class="form_label" />';
            jQuery('#addr-zip, #addr-email').show();
            jQuery('#addr-zip, #addr-email').each(function() {
                jQuery(labelDiv).insertBefore(jQuery(this))
                if (jQuery(this).attr('id') == 'addr-zip') {
                    var styles = {
                        paddingTop: '1rem',
                        clear: 'both'
                    }
                    jQuery(this).prev().text('Zip Code').css(styles);
                } else if (jQuery(this).attr('id') == 'addr-email') {
                    jQuery(this).prev().text('Email Address');
                }
            })
            jQuery('#addr-form').insertBefore('.button');
        }
        'use strict';
        (function registerModule(factory) {
            window.myForm = factory(jQuery);
        })(function factory($) {
            var myForm;
            $(function() {
                $(".button > input").click(function() {
                    var form = $('#event_rsvp');
                    form.data('data', form.serialize());
                    $.ajax({
                        url: '/page/sapi/event-attendee-address',
                        type: 'POST',
                        dataType: 'json',
                        data: form.data('data'),
                        success: function() {
                            console.log('Successful form submission');
                            form.submit();
                        },
                        error: function(data) {
                            console.log('Failed form submission')
                            jQuery('#bsd-error').show();
                            console.log(data)
                        }
                    });
                    return false;
                });
            });
        });
    }
    jQuery('.event-central.details #rsvp_container .form_label').each(function() {
        var labelText = jQuery(this).text();
        var requiredLabel = labelText + "*";
        jQuery(this).text(requiredLabel);
    });
});

function queryParamPresent(field) {
    var url = window.location.href;
    if (url.indexOf('?' + field + '=') != -1 || url.indexOf('&' + field + '=') != -1)
        return true;
    return false
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
jQuery(document).ready(function() {
    if (queryParamPresent('staff')) {} else if (queryParamPresent('event_type_id')) {
        jQuery('select[name=event_type_id]').val(getParameterByName('event_type_id'));
        jQuery('select[name=event_type_id]').parent().parent().prev().hide();
        jQuery('select[name=event_type_id]').parent().parent().hide();
        jQuery('.step1 #SKIN .basic .main .typedesc thead').hide();
        jQuery('p.instructions').html('Groups and individuals are organizing all over the country. Post your events here on OurRevolution.com so that supporters in your area can get involved. Email <a href="mailto:info@ourrevolution.com?Subject=Events%20help">info@ourrevolution.com</a> for additional support.');
        var current_text = jQuery('select[name=event_type_id] option:selected').text();
        jQuery(".step1 #SKIN .basic .main .typedesc div[class='even'],.step1 #SKIN .basic .main .typedesc div[class='odd']").each(function(index) {
            if (jQuery(this).find('.type-title').text() != current_text) {
                jQuery(this).hide();
            }
        });
    } else {
        var events = {
            "53": "Phone Bank",
            "54": "Canvass for Our Revolution",
            "55": "Volunteer Activity or Meeting"
        }
        var select_str = '';
        jQuery(".step1 #SKIN .basic .main .typedesc div[class=even],.step1 #SKIN .basic .main .typedesc div[class=odd]").hide();
        jQuery.each(events, function(key, value) {
            select_str += '<option value="' + key + '">' + value + '</option>';
            jQuery(".step1 #SKIN .basic .main .typedesc div[class=even],.step1 #SKIN .basic .main .typedesc div[class=odd]").each(function(index) {
                var internal_text = jQuery(this).find('.type-title').text();
                if (internal_text == value) {
                    console.log('Showing: ' + internal_text);
                    jQuery(this).show();
                }
            });
        });
        jQuery('select[name=event_type_id]').html(select_str);
        jQuery('select[name=event_type_id] option[value=31]').attr("selected", "selected");
    }
    if (jQuery('.official').length > 0) {
        jQuery('.form_label:contains("Volunteer-led")').nextUntil('.clear').addBack().remove()
    }
    jQuery('.step1 .type-title:contains("Carpool")').parent().appendTo('.typedesc');
    jQuery('.step1 .type-title:contains("Jan. 17")').parent().appendTo('.typedesc');
});
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o), m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-80816425-1', 'auto');
ga('send', 'pageview');
jQuery(document).ready(function() {
    var $share_body = jQuery('body');
    if ($share_body.hasClass('event-central') && $share_body.hasClass('signup-success')) {
        var share_text = jQuery('textarea[name="body"]').text();
        var url_begin = share_text.search("https://");
        var url_end = share_text.search("#rsvp") + 5;
        var event_url = share_text.substring(url_begin, url_end);
        var fb_url = "http://www.facebook.com/sharer.php?u=" + encodeURI(event_url);
        var tw_url = "https://twitter.com/intent/tweet?text=Join%20me%20at%20this%20event%20to%20support%20%40OurRevolution&url=" + encodeURI(event_url);
        var fb_share = '<div class="new-button new-button-fb"><a href="' + fb_url + '" title="Share this event on Facebook" target="_blank"><span>Share on Facebook</span></a></div>';
        var tw_share = '<div class="new-button new-button-tw"><a href="' + tw_url + '" title="Share this event on Twitter" target="_blank"><span>Share on Twitter</span></a></div>';
        var share_links = "<div class='new-button-wrap'>" + fb_share + tw_share + "</div>";
        jQuery('#inviteform h3.bsd-widget-header-content').append(share_links);
    }
});
