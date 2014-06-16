Template.sidebar.rendered = function() {
    var modifier = famousCmp.dataFromTemplate(this).modifier;
    modifier.setOpacity(0);
};

Template.homeBtn.rendered = function() {
    animateMenu(this);
}

Template.detailTemplate.created = function() {
    pullDown(this, 50, 0);
};
Template.calendarBtn.rendered = function() {
    animateMenu(this);
}
Template.hornBtn.rendered = function() {
    animateMenu(this);
}
Template.userBtn.rendered = function() {
    animateMenu(this);
}

Template.menu.rendered = function() {
    pullDown(this);
};

Template.mainScrollview.myVariables = function() {
    return Numbers.find();
};

Template.mainScrollview.isDanger = function() {
    return Meteor.status().connected ? 'btn-danger' : 'btn-primary';
};

Template.mainScrollview.dangerText = function() {
    return Meteor.status().connected ? 'disconnect' : 'reconnect';
};

Template.feed.rendered = function() {
    famousCmp.dataFromTpl(this).parent.viewNode.on('pageChange', function(scrollview) {
        var currentPos = Session.get('menuPos');
        if (scrollview.direction === 1) {
            Session.set('menuPos', ++currentPos);
            animateBottomIcons(currentPos);
        } else {
            Session.set('menuPos', --currentPos);
            animateBottomIcons(currentPos);
        }
    });
};

Deps.autorun(function() {
    if (Session.equals('menuPos', 1)) {
        bounceRows();
    };
});

Template.menu.events({
    'click .sidebar-toggle': function(e) {
        toggleSidebar();
    },
    'click .login-btn': function(e) {
        e.preventDefault();
        Router.go('/');
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

        var id = famousCmp.dataFromTpl(tpl).component.parent.parent.data()._id;

        Numbers.update({
            _id: id
        }, {
            $inc: {
                num: -1
            }
        });

        var famousData = famousCmp.dataFromTpl(tpl);

        famousData.modifier.setTransform(
            Transform.translate(0, 0),
            springTransition
        );
    },
    'click .btn-increase': function(e, tpl) {
        e.preventDefault();
        var id = famousCmp.dataFromTpl(tpl).component.parent.parent.data()._id;

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