/*
    -- Observe the DOM for any new .ripples class

*/
import replaceContent from '../replaceContent.js';
import attachEventListener from '../eventListener/attachRippleEventListener.js';


// Function which excutes once new ripple has been added to dom
function newRippleHasBeenAdded(elem) {
    elem = $(elem);

    // Replace content for the element
    replaceContent(elem);

    // Attach eventlistener
    attachEventListener(elem);

}



// Function which initializes ripple mutation observer
function startObservingForRipples() {
    // Config
    var config = {
        childList: true,
        characterData: true,
        subtree: true
    };

    // Callback function for mutation observer
    function checkForRipples(mutatedElements) {
        // Iterate through all mutated elements
        mutatedElements.forEach(element => {
            
            // If the element has addedNodes
            if (element.addedNodes.length > 0) {

                // Iterate through each nodes
                element.addedNodes.forEach(node => {

                    if ($(node).hasClass("ripples")) {
                        newRippleHasBeenAdded(node);
                    }

                });

            }

        });
    }

    // Initialize mutation
    var mutator = new MutationObserver(checkForRipples);
    mutator.observe(document.body, config);

}


export default startObservingForRipples;