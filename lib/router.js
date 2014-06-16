Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('home', {
        path: '/app'
    });
    this.route('loginScreen', {
        path: '/'
    });
    this.route('waitAMinute');
});