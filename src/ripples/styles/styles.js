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

export default addStyles;