// Add styles
function addStyles() {
    // Styles
    var styles = `
        /* Actions */
        .ripples-action {
            display: block;
            position: absolute;
            z-index: 2;
            padding: 0 !important;
            margin: 0 !important;
        }
        /* The element itself */
        .ripples {
            position: relative;
            overflow: hidden;
        }

        /* Ripples content container */
        .ripples-content-container {
            display: inline-block;
            position: relative;
            background-color: transparent !important;
            z-index: 3;
        }
        
        /* button shadow */
        .ripples-btn {
            box-shadow: 0px 2px 5px #888888;
            border: none !important;
            cursor: pointer;
        }
        .ripples-btn:hover {
            box-shadow: 0px 4px 6px #888888;
        }
        .ripples-no-padding {
            padding: 0 !important;
        }
    `;

    // Create and prepend stylesheet
    var styleSheet = "<style>" + styles + "</style>";
    $('body').prepend(styleSheet);

}


// On document load
$(document).ready(function() {
    initializeRipples();
    addStyles();
});

// Initialize Ripples
function initializeRipples() {
    // Get all ripples buttons
    var allRippless = $(".ripples").toArray().map(function(elem) { return $(elem); });
    
    // Iterate through all the rippless
    allRippless.forEach(function(elem) {
        
        // Replace content
        replaceContent(elem);

        // Attach ripples event listener
        attachRippleEventListener(elem);
    });

    // Replace content with a container
    function replaceContent(elem) {
        // Replace content with a container
        var innerHTML = elem.html(); // Inner content
        var color = "rgba(255,255,255,0.5)"; // Ripples colour

        // If the ripples has a ripples-dark class
        if (elem.hasClass("ripples-dark")) {
            color = "rgba(0,0,0,0.3)";
        }

        // Store padding and delete elements padding
        var elementPadding = elem.css("padding");
        elem.css("padding", "0px");
        elem.addClass("ripples-no-padding");


        // Ripples HTML
        var rippleHTML = "<canvas class='ripples-action' data-backgroundColor='"+color+"'></canvas>";

        // Replaced content
        var replacedContent = rippleHTML + "<div class='ripples-content-container'>" + innerHTML + "</div>";

        // Replace the content
        elem.html(replacedContent);

        // Switch element padding to container
        elem.find(".ripples-content-container").css("padding", elementPadding);
        
        // Set canvas width and height
        var canvas = elem.find(".ripples-action")[0];
        canvas.height = elem.outerHeight();
        canvas.width = elem.outerWidth();
    }

    // Attach ripples event listener
    function attachRippleEventListener(elem) {
        // Global variables for function to share

        // State of event to share between mouseup and down
        var isMouseUpDone = false;
        var isMouseDownDone = false;

        // Animation interval id
        var fadeOutAnimation_id = null, rippleAnimations_id = null;

        // Attach event to the ripples container
        elem.find(".ripples-content-container").on("mousedown", rippleMouseDown);
        elem.find(".ripples-content-container").on("mouseup", rippleMouseUp);
        elem.find(".ripples-content-container").on("click", stopPropagation);

        // Stop the event from propagating
        function stopPropagation(event) {
            event.stopImmediatePropagation();
        }

        // Fade out background
        function fadeOutBackground(ctx, initialColor, width, height, elem) {
            ctx.globalAlpha = 1;
            // Activate animation only if there isnt any from the previous one
            if (!fadeOutAnimation_id) {
                fadeOutAnimation_id = setInterval(fadeOutBG, 20);
            }

            // Fade out
            function fadeOutBG() {
                // Decrease ctx and round it to 2dp
                ctx.globalAlpha -= 0.05;
                ctx.globalAlpha = Number(ctx.globalAlpha.toFixed(2)) ;
                ctx.clearRect(0, 0, width, height); // Clear the rectangle
                ctx.fillStyle = initialColor; // Set the color
                ctx.fillRect(0, 0, width, height); 

                // If the alpha is zero, clear the background
                if (ctx.globalAlpha <= 0) {
                    // Clear react and restore alpha to 1
                    ctx.clearRect(0, 0, width, height);
                    ctx.globalAlpha = 1;

                    // Clear interval and set animation id to null
                    clearInterval(fadeOutAnimation_id);
                    fadeOutAnimation_id = null;

                    // Call all the click eventlistener added to the button
                    elem.parent().click();
                }
            }

        }

        // On mouse down, ripples down
        function rippleMouseDown(event) {

            // Reset mouseup and down
            isMouseDownDone = false, isMouseUpDone = false;

            // Stop event propagation
            event.stopImmediatePropagation();

            // Get the x and y position of the pointer
            var currElem = $(this).siblings(".ripples-action");
            var x = event.pageX - currElem.offset().left;
            var y = event.pageY - currElem.offset().top;

            // Find canvas and its properties
            var canvas = currElem[0];
            var ctx = canvas.getContext("2d");
            var color = currElem.attr("data-backgroundColor");
            var height = currElem.parent().height()
            var width = currElem.parent().width();
            var radius = currElem.parent().height();


            // Set the radius equal to higher of width and height 
            if (currElem.width() > radius) {
                radius = currElem.width();
            }

            // Restore alpha to 1 and clear the canvas
            ctx.globalAlpha = 1;
            ctx.clearRect(0, 0, width, height);

            // Animate
            var startingRadius = 0;

            // Activate animation only if there isnt any from the previous one
            if (!rippleAnimations_id) {
                rippleAnimations_id = setInterval(rippleEffect, 1000/radius);
            }

            // Ripple Effect function
            function rippleEffect() {
                // Clear background
                ctx.clearRect(0, 0, width, height);
                ctx.fillStyle = "rgba(0,0,0,0)";
                ctx.fillRect(0, 0, width, height);

                // Create circle
                ctx.beginPath();
                ctx.arc(x, y, startingRadius, 0, 2*Math.PI);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.closePath();

                // Increase radius
                startingRadius += 5;
                
                // If the radius is over the set radius
                if (startingRadius > (radius + 50)) {
                    // Clear interval and set animation id to null
                    clearInterval(rippleAnimations_id);
                    rippleAnimations_id = null;

                    // If the "onmouseup" event is fired, fade out the background
                    if (isMouseUpDone) {
                        fadeOutBackground(ctx, color, width, height, currElem);
                    }
                    isMouseDownDone = true; // "onmousedown" event is completed
                }
            }
        }


        // When ripples button is up
        function rippleMouseUp() {
            var currElem = $(this).siblings(".ripples-action");
            // Find canvas and its properties
            var ctx = currElem[0].getContext("2d");
            var color = currElem.attr("data-backgroundColor");
            var height = currElem.height()
            var width = currElem.width();

            // If the "onmousedown" event is fired already, fade out the background
            if (isMouseDownDone) {
                fadeOutBackground(ctx, color, width, height, currElem);
            }
            isMouseUpDone = true; // "onmouseup" event is completed
        }
    }
}