queue = [];

Meteor.setInterval(function() {
    if (queue.length)
        queue.shift()();
}, 100);

UI.body.rendered = function() {
    $('body').addClass('login-bg');
    famousCmp.mainCtx.setPerspective(1000);
};