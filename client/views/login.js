Template.goInBtn.events({
    'click .positive': function(e) {
        e.preventDefault();
        Router.go('/app');
    }
});


Template.facebookBtn.rendered = function() {
    animateLoginButtons(this);
};

Template.googleBtn.rendered = function() {
    animateLoginButtons(this);
};

Template.goInBtn.rendered = function() {
    animateLoginButtons(this);
};