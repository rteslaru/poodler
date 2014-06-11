var Transform = require('famous/core/Transform');
var Transitionable = require("famous/transitions/Transitionable");
var SpringTransition = require("famous/transitions/SpringTransition");
var StateModifier = require('famous/modifiers/StateModifier');
var Easing = require('famous/transitions/Easing');

a = new Transitionable(0);
b = new Transitionable(0);

Template.famousInit.rendered = function() {
    famousCmp.mainCtx.setPerspective(1000);   
};


a.set(1, {duration: 1000, curve: Easing.outElastic});
b.set(1, {duration: 1000, curve: Easing.outBounce});

famousCmp.transitions['slideUpSlow'] = {
    outTransformFrom: function(progress) {
        return Transform.translate(0, window.innerWidth * a.get() - window.innerWidth, 0);

    },
    inTransformFrom: function(progress) {
        return Transform.translate(0, window.innerWidth * (1-b.get()), 0);
    },
    inOriginFrom: function(progress) {
        // return [0.5, 0.5];
    }
};

// famousCmp.registerView('GridLayout', require('famous/views/GridLayout'));
// famousCmp.registerView('EdgeSwapper', require('famous/views/EdgeSwapper'));

require('famous/inputs/FastClick');

Transitionable.registerMethod('spring', SpringTransition);

UI.body.showContent = function() {
    return Template[Session.get('tpl')];
};

var queue = [];

Session.setDefault('tpl', 'page2');
Session.setDefault('openSidebar', false);

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
        Clienti.insert({
            numar: 1
        });
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
    'click .btn-decrease': function(e, tpl) {
        e.preventDefault();
        var id = famousCmp.dataFromTpl(tpl).component.parent.parent.data()._id;
        Clienti.update({
            _id: id
        }, {
            $inc: {
                numar: -1
            }
        });
        $(e.currentTarget).transition('tada');
    },
    'click .btn-increase': function(e, tpl) {
        e.preventDefault();
        var id = famousCmp.dataFromTpl(tpl).component.parent.parent.data()._id;
        Clienti.update({
            _id: id
        }, {
            $inc: {
                numar: 1
            }
        });
        $(e.currentTarget).transition('bounce');

    }
});

Template.sidebar.rendered = function() {
    // sidebar.setTransform(Transform.translate(0,0,0));    
};

var toggleSidebar = function() {
    var sidebar = famousCmp.dataFromElement($('.side')[0]).modifier;
    var menu = famousCmp.dataFromElement($('.main.menu')[0]).modifier;
    var bottomMenu = famousCmp.dataFromElement($('.bottom.menu')[0]).modifier;
    var openState = Session.get('openSidebar');
    var body = famousCmp.dataFromElement($('.btn-add')[0]).parent.parent.parent.parent.modifier;

    var transition = {
        duration: 300,
        // curve: Easing.outElastic,
        // curve: Easing.outBounce,
        curve: Easing.outBack,
    }
    if (openState === false) {
        sidebar.setTransform(Transform.translate(0, 0, 0), transition);
        // body.setTransform(Transform.thenMove(Transform.scale(0.8,0.8,2),[0.5*window.innerWidth,0,0]),transition);
        body.setOrigin([0.5,0.5]);
        body.setTransform(Transform.multiply(Transform.multiply(
            Transform.translate(window.innerWidth - (window.innerWidth*0.5), 0, 80), 
            Transform.rotateY(-1 * Math.PI / 6)
        ), Transform.scale(0.6, 0.6, 1)),transition);
        // body.setTransform(Transform.translate(0.35*window.innerWidth, 0, 0), transition);
        Session.set('openSidebar', true);
    } else if (openState === true) {
        sidebar.setTransform(Transform.translate(-200, 0, 100), transition);

        body.setTransform(Transform.translate(0, 0, 0), transition);
        Session.set('openSidebar', false);
    };
};

Template.mainTemplate.rendered = function() {

};

Template.menu.events({
    'click .sidebar-toggle': function(e) {
        toggleSidebar();
    }
});