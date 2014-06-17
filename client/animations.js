Transform = require('famous/core/Transform');
var Transitionable = require("famous/transitions/Transitionable");
var SpringTransition = require("famous/transitions/SpringTransition");
var StateModifier = require('famous/modifiers/StateModifier');
var Easing = require('famous/transitions/Easing');

Transitionable.registerMethod('spring', SpringTransition);


a = new Transitionable(0);
b = new Transitionable(0);

a.set(1, {
    duration: 1000,
    curve: Easing.outElastic
});

b.set(1, {
    duration: 1000,
    curve: Easing.outBounce
});

springTransition = {
    method: "spring",
    period: 200,
    dampingRatio: .5,
    velocity: 0.01
}

famousCmp.transitions['slideUpSlow'] = {
    outTransformFrom: function(progress) {
        return Transform.translate(0, window.innerWidth * a.get() - window.innerWidth, 0);

    },
    inTransformFrom: function(progress) {
        return Transform.translate(0, window.innerWidth * (1 - b.get()), 0);
    },
    inOriginFrom: function(progress) {
        // return [0.5, 0.5];
    }
};

famousCmp.registerView('GridLayout', require('famous/views/GridLayout'));
famousCmp.registerView('ContainerSurface', require('famous/surfaces/ContainerSurface'));

require('famous/inputs/FastClick');

Transitionable.registerMethod('spring', SpringTransition);

animateMenu = function(tpl) {
    var modifier = famousCmp.dataFromTemplate(tpl).modifier;

    modifier.setTransform(Transform.translate(0, 100, 0));

    queue.push(function() {
        modifier.setTransform(
            Transform.translate(0, 0, 1), {
                duration: 1000,
                curve: 'easeInOut'
            }
        );
    });

};

animateLoginButtons = function(tpl) {
    var modifier = famousCmp.dataFromTemplate(tpl).modifier;

    modifier.setTransform(Transform.translate(0, -500));

    queue.push(function() {
        modifier.setTransform(
            Transform.translate(0, 0), {
                duration: 2000,
                curve: Easing.outBounce
            }
        );
    });

};

bounceRows = function() {
    $('.btn-decrease').each(function(i, val) {
        var modifier = famousCmp.dataFromElement(val).modifier;
        modifier.setOrigin([0.5, 0]);
        modifier.setTransform(Transform.scale(0, 0, 1));
        queue.push(function() {
            modifier.setTransform(
                Transform.scale(1, 1, 1), {
                    duration: 1000,
                    curve: Easing.outExpo
                }
            );
        });
    });
};

pullDown = function(tpl, offset, zOffset) {
    var modifier = famousCmp.dataFromTemplate(tpl).modifier;
    var offset = offset || 100;
    var zOffset = zOffset || 1;
    modifier.setTransform(Transform.translate(0, -1 * offset));
    queue.push(function() {
        modifier.setTransform(
            Transform.translate(0, 0, zOffset), {
                duration: 1000,
                curve: 'easeInOut'
            }
        );
    });
};

scaleUp = function(tpl) {
    var modifier = famousCmp.dataFromTemplate(tpl).modifier;
    var offset = offset || 100;
    var zOffset = zOffset || 1;
    modifier.setTransform(Transform.scale(0, 0, 0));
    queue.push(function() {
        modifier.setTransform(
            Transform.scale(1, 1, 1), {
                duration: 1000,
                curve: 'easeInOut'
            }
        );
    });    
};

animateBottomIcons = function(menuPos) {
    var $targetElement = $($('.custom-nav')[menuPos]);
    var currentModifier = famousCmp.dataFromElement($('.custom-nav.red')[0]).modifier;
    var targetModifier = famousCmp.dataFromElement($targetElement[0]).modifier;

    $('.custom-nav').removeClass('red');
    $targetElement.addClass('red');

    var bounceTransition = {
        duration: 500,
        curve: Easing.outBounce,
    };

    var fastTransition = {
        duration: 300,
        curve: Easing.outQuart
    }


    currentModifier.setTransform(Transform.translate(0, 0, 0));
    targetModifier.setTransform(Transform.translate(0, -20, 0), fastTransition);
    targetModifier.setTransform(Transform.translate(0, 0, 0), bounceTransition);
};

toggleSidebar = function() {
    var sidebar = famousCmp.dataFromElement($('.side')[0]).modifier;
    var openState = Session.get('openSidebar');
    var body = famousCmp.dataFromElement($('.list.icon')[0]).parent.modifier;

    var transition = {
        duration: 300,
        curve: Easing.outBack,
    }
    if (openState === false) {
        sidebar.setOpacity(1);
        sidebar.setTransform(Transform.translate(0, 0, 0), {
            duration: 300,
            curve: Easing.outQuart
        });
        body.setOrigin([0.5, 0.5]);
        body.setTransform(Transform.multiply(Transform.multiply(
            Transform.translate(window.innerWidth - (window.innerWidth * 0.5), 0, 80),
            Transform.rotateY(-1 * Math.PI / 6)
        ), Transform.scale(0.6, 0.6, 1)), transition);
        Session.set('openSidebar', true);
    } else if (openState === true) {
        sidebar.setTransform(Transform.translate(-200, 0, 100), {
            duration: 300,
            curve: Easing.outQuart
        });
        sidebar.setOpacity(0);
        body.setTransform(Transform.translate(0, 0, 0), transition);
        Session.set('openSidebar', false);
    };
};