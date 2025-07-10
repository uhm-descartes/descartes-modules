/**
 * Generate a unique ID for a course based on its name.
 * @param {string} name - The name of the course.
 * @returns {string} - The generated course ID.
 */
function generateCourseId(name) {
    // Generate a unique ID for the course based on its name
    return name.toLowerCase().replace(/\s+/g, '-');
}
/**
 * Generate a title for a course based on its name and full name.
 * @param {*} course 
 * @returns {string} - The generated course title.
 */
function generateCourseTitle(course) {
    // Generate a title for the course based on its full name
    return course.name + ': ' + course.title;
}

/**
 * Generate a label for a module based on its course ID and title.
 * @param {string} courseId - The ID of the course.
 * @param {string} moduleTitle - The title of the module.
 * @returns {string} - The generated module label.
 */
function generateModuleLabel(courseName, moduleTitle) {
    return courseName + ': ' + moduleTitle;
}

function generateModuleUrl(courseUrl, moduleUrl) {
    if (!courseUrl || !moduleUrl) {
        console.error('Invalid course URL or module URL:', courseUrl, moduleUrl);
        return '#'; // Return a placeholder URL if either is invalid
    }
    var courseUrlEnding = courseUrl.split('/').pop();
    if (moduleUrl.startsWith('/' + courseUrlEnding + '/')) {
        var newCourseUrl = courseUrl.replace('/' + courseUrlEnding, '');
        // Generate a URL for the module based on its course URL and module URL
        var newUrl = new URL(moduleUrl, newCourseUrl).toString();
        return newUrl;
    }
    return new URL(moduleUrl, courseUrl).toString();
}

/**
 * Generate a color palette with the specified number of colors.
 * @param {*} count The number of colors to generate.
 * @returns {Array} - An array of color hex codes.
 */
function generateColorPalette(count) {
    // Generate a color palette with the specified number of colors
    const colors = palette('tol', Math.min(count, 12)); // 'tol' supports up to 12 colors
    while (colors.length < count) {
        var color = Math.floor(Math.random() * 16777215).toString(16); // fallback random hex color
        // Ensure the color is unique and not already in the palette
        if (!colors.includes(color) && color !== '000000' && color.toLowerCase() !== 'ffffff') {
            colors.push(color);
        }
    }
    return colors;
}

/**
 * Load courses from a CSV file
 * This function fetches a CSV file containing course information,
 * parses it, and stores the course data in a global variable.
 * The CSV file is expected to have the following columns:
 * - name: The name of the course (used as a variable name)
 * - url: The URL to the course
 * - title: The full name of the course
 * - description: A description of the course
 * - prerequisites: Prerequisites for the course
 * - repo: The repository URL for the course
 * * The function handles quoted fields and ensures
 * 
 * @param {string} csvPath - The path to the CSV file containing course data.
 * @returns {Promise<Array|boolean>} - A promise that resolves to an array of course objects or false.
 * * Each course object contains the following properties:
 * - id: A unique identifier for the course (generated from the name)
 * - name: The name of the course
 * - url: The URL to the course
 * - title: The full name of the course
 * - description: A description of the course
 * - prerequisites: An array of prerequisite course IDs
 * - repo: The repository URL for the course
 * - moduleInfoUrl: The URL to the module information script for the course
 * - moduleInfo: The module information object (initially null)
 * @async
 */
async function loadCoursesCSV(csvPath) {
    // Regular expression to split CSV fields, handling quoted fields
    const csvRegex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
    // Array to hold the course objects
    const courses = new Array();
    const courseIds = new Set(); // Set to track unique course IDs
    // The Text of the CSV file - initially empty
    let csvText = "";
    // Fetch the CSV file
    try {
        // Fetch the CSV file from the specified path
        const response = await fetch(csvPath);
        // Check if the response is ok (status in the range 200-299)
        // If not, throw an error with the status code
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        // Read the response text as CSV
        csvText = await response.text();
    } catch (error) {
        console.error('Error fetching CSV:', error);
        return false;
    }

    // Split the CSV text into rows
    const rows = csvText.trim().split('\n');
    // Process each row in the CSV - There is no header row
    // so we can start processing from the first row
    for (const row of rows) {
        // Skip empty rows
        if (row.trim() === '') continue;
        // Split the row into fields using the regex, and trim whitespace
        // Also remove surrounding quotes from each field
        const fields = row.split(csvRegex).map(f => f.trim().replace(/^"|"$/g, ''));
        // Ensure we have exactly 6 fields
        if (fields.length !== 6) {
            console.error('Invalid row format:', row);
            continue; // Skip this row if it doesn't have exactly 6 fields
        }
        // Destructure the fields into variables
        const [name, url, title, description, prerequisites, repo] = fields;
        // Check if the name is valid (not empty)
        if (!name || name.trim() === '') {
            console.error('Invalid course name:', name);
            continue; // Skip this row if the name is invalid
        }
        // Check if the Course ID is unique
        if (courseIds.has(generateCourseId(name))) {
            console.error('Duplicate course ID found:', name);
            continue; // Skip this row if the course ID is a duplicate
        }
        // Check if the URL is valid (not empty)
        if (!url || url.trim() === '') {
            console.error('Invalid course URL:', url);
            continue; // Skip this row if the URL is invalid
        }
        // Check if the title is valid (not empty and not the same as name)
        if (!title || title.trim() === '' || title.trim() == name.trim()) {
            console.error('Invalid course title:', title);
            continue; // Skip this row if the title is invalid
        }
        // Push the course object into the courses array
        courses.push({
            id: generateCourseId(name), 
            name: name.trim(),
            url: url.trim(),
            title: title.trim(),
            description: description.trim(),
            prerequisites: prerequisites.trim().split(';').map(p => generateCourseId(p)), // Split by semicolon and trim each prerequisite
            repo: repo.trim(),
            moduleInfoUrl: url.trim() + '/module-info.js',
            moduleInfo: null // Initialize moduleInfo as null
        });
    }
    // Sort courses by id
    courses.sort((a, b) => a.id.localeCompare(b.id));
    // Return the courses array
    return courses;
}

/**
 * Load the module information for a specific course.
 * This function fetches the module information script for the course,
 * evaluates it, and stores the module information in the course object.
 * 
 * @param {*} course 
 * @returns {Promise<boolean>} - A promise that resolves when the module information is loaded.
 * @async
 */
async function loadCourseModuleInfo(course) {
    // Fetch the module info script for the course
    try {
        // Fetch the module info script from the course's moduleInfoUrl
        const response = await fetch(course.moduleInfoUrl);
        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        // Read the response text as a script
        const scriptText = await response.text();
        // Evaluate the script to define the course module
        var results = eval?.(scriptText);
        // Check if the results is an object and has the expected properties
        if (typeof results !== 'object' || !results || !results.modules || !results.prerequisites) {
            throw new Error('Invalid module info script format');
        }
        // Add the module information to the course object
        course.moduleInfo = results;
        // Ensure the modules array is sorted by sort_order
        course.moduleInfo.modules.sort((a, b) => a.sort_order - b.sort_order);
        // Ensure the prerequisites array is sorted by sort_order
        course.moduleInfo.prerequisites.sort((a, b) => a.sort_order - b.sort_order);
    } catch (error) {
        console.error(`Error loading module info for ${course.name}:`, error);
        return false; // Return false if there was an error loading the module info
    }
    return true; // Return true if the module info was loaded successfully
}