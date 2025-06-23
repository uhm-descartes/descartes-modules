---
layout: default
title: Modules
---
{% include breadcrumb-2.html %}

<div class="container">
  <h1>Modules <small class="header-small">Modules and other curriculum</small></h1>
  
  {% if site.morea_overview_modules %}
    {{ site.morea_overview_modules.content | markdownify }}
  {% endif %}
  
  <div class="row">
     {% for module in site.morea_module_pages %}
        <div class="col-md-6 col-lg-4" style="padding-bottom: 20px">
          <div class="card h-100">
            <div class="text-center">
              <img alt="{{module.title}}" src="{{ site.baseurl }}{{ module.morea_icon_url }}" class="card-img-top rounded-circle" style="max-width: 100px; padding-top: 2px">
            </div>
            <div class="card-body">
              <h3 class="card-title">{{ forloop.index }}. {{ module.title }}</h3>
              {{ module.morea_summary | markdownify }}
              <p>
              {% for label in module.morea_labels %}
                <span class="badge bg-primary">{{ label }}</span>
              {% endfor %}
              </p>
            </div>
            {% if module.morea_coming_soon %}
              <div class="card-footer text-center">
                <span>Coming soon...</span>
              </div>
            {% else %}
              {% if module.morea_start_date_string %}
                <div class="card-footer text-center">
                  {{module.morea_start_date_string}} - {{module.morea_end_date_string}}
                </div>
              {% endif %}
              <a href="{{ module.morea_id }}" class="stretched-link"></a>
            {% endif %}
          </div>
        </div>
     {% endfor %}
  </div>
</div>

<div class="container-fluid">
    <div id="course_cards_div"></div>
</div>

<script>
// Load course data when page loads

// Function to fetch CSV and load course modules
async function fetchAndLogCourseData() {
    try {
        const url = '/descartes-modules/course-sites/descartes-courses.csv';
        
        // Fetch the CSV file from the current server
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        
        const csvText = await response.text();
        const rows = csvText.trim().split('\n');
        
        // Loop through the rows and process each course
        for (const row of rows) {
            if (row.trim() === '') continue; // Skip empty rows
            
            const [course, course_url, course_name, course_description] = row.split(',').map(field => field.trim());
            
            if (course && course_url) {
                // Fetch module-info.js from the course URL
                try {
                    const moduleInfoUrl = `${course_url}module-info.js`;
                    
                    const moduleResponse = await fetch(moduleInfoUrl);
                    
                    if (moduleResponse.ok) {
                        const moduleInfoContent = await moduleResponse.text();
                        
                        // Parse the module-info.js content to extract modules array using regex
                        try {
                            const modulesMatch = moduleInfoContent.match(/modules:\s*\[([\s\S]*?)\]/);
                            if (modulesMatch) {
                                const modulesArrayContent = modulesMatch[1];
                                
                                // Extract individual module objects using regex
                                const moduleObjectMatches = modulesArrayContent.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g);
                                
                                if (moduleObjectMatches) {
                                    
                                    // Parse each module object
                                    const moduleObjects = [];
                                    let moduleCardsHTML = '';
                                    
                                    moduleObjectMatches.forEach((moduleStr, index) => {
                                        try {
                                            // Convert JavaScript object format to JSON
                                            let jsonModuleStr = moduleStr
                                                .replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":')  // Quote property names
                                                .replace(/:\s*"([^"]*)"([^,}\]]*)/g, ': "$1$2"')  // Handle quoted strings
                                                .replace(/:\s*'([^']*)'/g, ': "$1"')  // Convert single quotes to double quotes
                                                .replace(/,(\s*[}\]])/g, '$1');  // Remove trailing commas
                                            
                                            const moduleObj = JSON.parse(jsonModuleStr);
                                            moduleObjects.push(moduleObj);
                                            
                                            // Create module card HTML
                                            const moduleUrl = moduleObj.moduleUrl || '#';
                                            let fullModuleUrl;
                                            
                                            if (moduleUrl.startsWith('http')) {
                                                // Absolute URL, use as-is
                                                fullModuleUrl = moduleUrl;
                                            } else {
                                                // Relative URL, combine with course_url
                                                let baseCourseUrl = course_url.endsWith('/') ? course_url.slice(0, -1) : course_url;
                                                let relativeModuleUrl = moduleUrl.startsWith('/') ? moduleUrl : '/' + moduleUrl;
                                                
                                                // Check for overlapping paths
                                                const courseUrlParts = baseCourseUrl.split('/');
                                                const moduleUrlParts = relativeModuleUrl.split('/').filter(part => part !== '');
                                                
                                                // Find if the last part of course URL matches the first part of module URL
                                                const lastCourseUrlPart = courseUrlParts[courseUrlParts.length - 1];
                                                const firstModuleUrlPart = moduleUrlParts[0];
                                                
                                                if (lastCourseUrlPart && firstModuleUrlPart && lastCourseUrlPart === firstModuleUrlPart) {
                                                    // Remove the overlapping part from module URL
                                                    const cleanModuleUrlParts = moduleUrlParts.slice(1);
                                                    relativeModuleUrl = cleanModuleUrlParts.length > 0 ? '/' + cleanModuleUrlParts.join('/') : '';
                                                }
                                                
                                                fullModuleUrl = baseCourseUrl + relativeModuleUrl;
                                            }
                                            
                                            const moduleTitle = moduleObj.title || 'Untitled Module';
                                            const moduleDescription = moduleObj.description || 'No description available';
                                            const moduleCourse = moduleObj.course || course;
                                            
                                            moduleCardsHTML += `
                                                <div class="col-md-6 col-lg-4" style="padding-bottom: 20px">
                                                    <div class="card h-100">
                                                        <div class="card-body">
                                                            <h5 class="card-title">${moduleTitle}</h5>
                                                            <h6 class="card-subtitle mb-2 text-muted">${moduleCourse}</h6>
                                                            <p class="card-text">${moduleDescription}</p>
                                                        </div>
                                                        <div class="card-footer">
                                                            <a href="${fullModuleUrl}" class="btn btn-primary btn-sm">View Module</a>
                                                        </div>
                                                    </div>
                                                </div>`;
                                            
                                        } catch (parseError) {
                                            // Skip modules that can't be parsed
                                        }
                                    });
                                    
                                    // Insert module cards into the DOM
                                    if (moduleCardsHTML) {
                                        const courseCardsDiv = document.getElementById('course_cards_div');
                                        if (courseCardsDiv) {
                                            courseCardsDiv.innerHTML += `
                                                <div class="row">
                                                    <div class="col-12">
                                                        <h3 class="mt-4 mb-3">Modules from ${course}</h3>
                                                    </div>
                                                    ${moduleCardsHTML}
                                                </div>`;
                                        }
                                    }
                                    
                                } else {
                                    // No module objects found in array
                                }
                            } else {
                                // Could not find modules array with regex
                            }
                        } catch (regexError) {
                            // Regex parsing failed
                        }
                    } else {
                        // Failed to fetch module-info.js
                    }
                } catch (moduleError) {
                    // Error fetching module-info.js
                }
                
                // Separator comment for next course processing
            }
        }
        
    } catch (error) {
        // Error fetching course data
    }
}

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    fetchAndLogCourseData();
});

// Also try calling it immediately in case DOM is already loaded
if (document.readyState === 'loading') {
    // Document still loading, waiting for DOMContentLoaded
} else {
    // Document already loaded, calling function immediately
    fetchAndLogCourseData();
}
</script>
