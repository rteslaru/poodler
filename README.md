Proof of concept of famous-components. Try it online at [poodler.meteor.com](http://poodler.meteor.com).

The aim of the exercise is to turn a simple Meteor app, with iron-router and [semantic-ui](http://semantic-ui.com/), into a famo.us powered app via [famous-components](https://github.com/gadicc/meteor-famous-components). The challenges below are listed in increasing order of difficulty -- although none of them is too difficult, really. 

You can `git checkout start` to get the basic non-famous app -- use that as the starting point. The final product with all challenges completed is on `master`, so use that for inspiration whenever needed. Also, if you would like to understand the challenge description better, you can always go to [poodler.meteor.com](http://poodler.meteor.com) and see exactly what is the expected result.

**Challenges:**

1. Enable *iron-router* to use transitions (e.g. edge swaps) when switching routes

2. Make the picture on the login screen swipeable. It should transition into another picture when swiped. Note that it's just the picture that must be swipeable, not the entire screen.

3. Make the main app screen swipeable; user should be able to swipe back and forth between the three screens

4. Make the menu bar slide down when first shown

5. Animate the login buttons; they should transition from outside the screen in a staggered fashion (i.e. not all at once)

6. Apply an animation to the number row when the `-` button (i.e. the one which decreases the number) is clicked. (hint: you will need to use `famousEach` instead of `each` to iterate through the cursor)

7. Cut up each row in the activity feed into its own `Surface`, making sure the semantic-ui formatting remains intact (hint: you need to apply the `ui feed` class to the enclosing `famous-group`), and make the activity feed screen scrollable

8. Create a set of icons at the bottom of the screen; they should be positioned in the bottom-center of the viewport. The buttons should have their own animation, e.g. when they first appear on the screen they should transition from off screen.

10. Animate the icons based on what screen the user swipes to.

11. Implement the 'Airbnb' sidebar and body transitions.