$(document).on('DOMNodeInserted', '.famous-group', function() {
    $('.header').parent().parent().parent().addClass('ui feed');
});  

Session.setDefault('openSidebar', false);
Session.setDefault('isMenuRendered', false);
Session.setDefault('menuPos', 0);
