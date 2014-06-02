Template.mainTemplate.myVariables = function() {
    return Clienti.find();
};

Template.mainTemplate.isDanger = function() {
    return Meteor.status().connected ? 'btn-danger' : 'btn-primary';
};

Template.mainTemplate.dangerText = function() {
    return Meteor.status().connected ? 'disconnect' : 'reconnect';
};

Template.mainTemplate.events({
    'click .btn-add': function(e) {
        e.preventDefault();
        Clienti.insert({numar: 1});
    },    
    'click .btn-disconnect': function(e) {
        e.preventDefault();
        if (Meteor.status().connected) {
            Meteor.disconnect();
        } else {
            Meteor.reconnect();
        }
    }
});

Template.detailTemplate.events({
    'click .btn-decrease': function(e) {
        e.preventDefault();
        Clienti.update({_id: this._id}, {$inc: {numar: -1}});
        $(e.currentTarget).transition('tada');
    },
    'click .btn-increase': function(e) {
        e.preventDefault();
        Clienti.update({_id: this._id}, {$inc: {numar: 1}});
        $(e.currentTarget).transition('bounce');

    }
});


UI.body.rendered = function() {
    $('.ui.sidebar').sidebar();
};

UI.body.events({
    'click .button': function() {
        $('.ui.sidebar').sidebar('toggle');
    }
});