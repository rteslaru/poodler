Template.mainScrollview.myVariables = function() {
    return Numbers.find();
};

Template.mainScrollview.isDanger = function() {
    return Meteor.status().connected ? 'btn-danger' : 'btn-primary';
};

Template.mainScrollview.dangerText = function() {
    return Meteor.status().connected ? 'disconnect' : 'reconnect';
};

Template.sidebar.rendered = function() {
    $('.ui.sidebar').sidebar();
};

Template.menu.events({
    'click .login-btn': function(e) {
        e.preventDefault();
        Router.go('/');
    },
    'click .sidebar-toggle': function(e) {
        e.preventDefault();
        $('.ui.sidebar').sidebar('toggle');
    }
});

Template.insertBtn.events({
    'click .btn-add': function(e) {
        e.preventDefault();
        Numbers.insert({
            num: 1
        });
    }
});

Template.detailTemplate.events({
    'click .btn-decrease': function(e, tpl) {
        e.preventDefault();

        Numbers.update({
            _id: id
        }, {
            $inc: {
                num: -1
            }
        });
    },
    'click .btn-increase': function(e, tpl) {
        e.preventDefault();

        Numbers.update({
            _id: id
        }, {
            $inc: {
                num: 1
            }
        });

        $(e.currentTarget).transition('bounce');

    }
});