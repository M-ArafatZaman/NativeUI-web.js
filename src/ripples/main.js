/*
    - /ripples/main.js

    All the ripple components are imported here, combined and adjusted and then and exported
*/
import addStyles from './styles/styles.js';
import replaceContent from './replaceContent.js';
import attachRippleEventListener from './eventListener/attachRippleEventListener.js';
import {newRippleMutationObserver} from './mutations/mutationObservers.js';

// Initialize mutation
newRippleMutationObserver();


// Initialize Ripples
function initializeRipples() {
    // Add styles
    addStyles();
    
    // Get all ripples buttons
    var allRippless = $(".ripples").toArray().map(function(elem) { return $(elem); });
    
    // Iterate through all the rippless
    allRippless.forEach(function(elem) {
        
        // Replace content
        replaceContent(elem);

        // Attach ripples event listener
        attachRippleEventListener(elem);
    });
};

// Export ripples
export default initializeRipples;