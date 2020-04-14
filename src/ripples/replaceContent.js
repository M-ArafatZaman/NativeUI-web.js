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

    // Set the container width and height 100%;
    elem.find(".ripples-content-container").css({"width": "100%", "height": "100%"});
};

export default replaceContent;