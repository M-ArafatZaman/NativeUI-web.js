/*
    Calculate the longest distance from x, y coordinates to the edges
    
    1st Quadrant - (+,+)
    2nd Quadrant - (-,+)
    3rd Quadrant - (-,-)
    4th Quadrant - (+,-)
*/


/**
 * 
 * @param {Number} x        - The x coordinate of the mouse pointer
 * @param {Number} y        - The y coordinate of the mouse pointer
 * @param {Number} width    - The Width of the container
 * @param {Number} height   - The height of the container
 */
function longestDistance(x, y, width, height) {
    // Calculate the distance between 2 points
    function calculateDistance(x1, y1, x2, y2) {
        var a = Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2);
        return Math.pow(a, 0.5);
    }

    // Calculate the distance from point to the diagonals for each quadrants
    var quadrants = [
        calculateDistance(x, y, width, 0), // First Quadrant
        calculateDistance(x, y, 0, 0), // Second Quadrant
        calculateDistance(x, y, 0, height), // Third Quadrant
        calculateDistance(x, y, width, height) // Fourth Quadrant 
    ]

    // Return the largest the number
    return Math.max.apply(null, quadrants);
}


export default longestDistance;