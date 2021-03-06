$(document).ready(function(){
    helpers.backToTop();
    helpers.ScrollTo('#marketing', '.learn-more-btn');
    helpers.ScrollTo('#feedbackFeature', '#feedbackBtn');
    helpers.ScrollTo('#communityFeature', '#communityBtn');
    helpers.ScrollTo('#forecastFeature', '#forecastingBtn');
    helpers.closeFlashMessage();
    helpers.handleAccountDeletion();
    helpers.toggleEmailRegistrationForm();
    helpers.searchSpot();
    helpers.toggleActive();
    helpers.showSpots();
    helpers.hideSpots();
    helpers.showUser();
    helpers.hideUser();
    helpers.multiLevelDropdown();
    // helpers.handleSpotDropDownClick();
});

//Create Helpers Object
const helpers = {};

// HELPER METHODS //

/*
  Functionality for Homepage back to top button
 */
helpers.backToTop = () => {
    $('#backToTop').click(function(){
        $('html,body').animate({scrollTop: 0}, 500);
        return false;
    });
}

/*
  Functionality to animate scroll to desired div with desired trigger
 */
helpers.ScrollTo = (el, btn) => {
    $(btn).click(function(){
        $('body, html').animate({
            scrollTop: $(el).position().top - 100
        }, 500);
    });
}

helpers.closeFlashMessage = () => {
    $('#close-flash').on('click', function(e){
        e.preventDefault();
        $('#flash-message').remove();
    });
}

helpers.handleAccountDeletion = () => {
    $('#delete-account').click((e) => {
        e.preventDefault();
        if(confirm('Are you sure you want to delete your account? All of your data will be lost.')){
            $('#delete-form').submit();
        } else return false;
    });
}

helpers.toggleEmailRegistrationForm = () => {
    $('#registerEmailBtn').click(e => {
       e.preventDefault();
       $('.google-button').hide();
       $('.facebook-button').hide();
       $('.email-form-field').fadeIn(500);
    });
}

helpers.searchSpot = () => {
    $('#searchInput').keyup(e => {
        let search = $('#searchInput').val();
        $.ajax({
            url: '/spot/search',
            data: {search: search},
            datatype: "json",
            type: "POST",
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            success: (result) => {
                console.log(result);
            }
        })
    });
}

helpers.toggleActive = () => {
    $('#spot-nav-links .nav-item .nav-link').click(e => {
        const path = e.target.dataset.path;
        $('a.nav-link.active').removeClass('active');
        switch(path){
            case 'today':
                $("#spot-nav-links .nav-item [data-path='today']").addClass('active');
                break;
            case 'forecast':
                $("#spot-nav-links .nav-item [data-path='forecast']").addClass('active');
                break;
            case 'media':
                $("#spot-nav-links .nav-item [data-path='media']").addClass('active');
                break;
            case 'reviews':
                $("#spot-nav-links .nav-item [data-path='reviews']").addClass('active');
                break;
        }
    });
}

helpers.showSpots = () => {
    $('body').on('mouseenter', '#toggleSpotDropdown', (e) => {
        const dropdown = $('#toggleSpotDropdown');
        const menu = $('#toggleSpotDropdown #main-dropdown-menu');
        dropdown.addClass('show');
        menu.addClass('show');
        $('#spotDropdown').attr('aria-expanded', true);
    });
}

helpers.hideSpots = () => {
    $('#toggleSpotDropdown').on('mouseleave', (e) => {
        const dropdown = $('#toggleSpotDropdown');
        const menu = $('#toggleSpotDropdown #main-dropdown-menu');
        dropdown.removeClass('show');
        menu.removeClass('show');
        $('#spotDropdown').attr('aria-expanded', false);
    });
}

helpers.showUser = () => {
    $('body').on('mouseenter', '#toggleUserDropdown', (e) => {
        const dropdown = $('#toggleUserDropdown');
        const menu = $('#toggleUserDropdown .dropdown-menu');
        dropdown.addClass('show');
        menu.addClass('show');
        $('#spotDropdown').attr('aria-expanded', true);
    });
}

helpers.hideUser = () => {
    $('#toggleUserDropdown').on('mouseleave', (e) => {
        const dropdown = $('#toggleUserDropdown');
        const menu = $('#toggleUserDropdown .dropdown-menu');
        dropdown.removeClass('show');
        menu.removeClass('show');
        $('#spotDropdown').attr('aria-expanded', false);
    });
}

helpers.multiLevelDropdown = () => {
    $('#toggleSpotDropdown .dropdown-menu a.dropdown-toggle').on('mouseenter', function(e) {
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }

        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass('show');

        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
            $('.dropdown-submenu .show').removeClass("show");
        });

        return false;
    });
}

helpers.handleSpotDropDownClick = () => {
    $('#toggleSpotDropdown').on('click', (e) => {
       e.preventDefault();
       console.log('hey');
    });
}