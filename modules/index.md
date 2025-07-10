---
layout: default
title: Modules
---
<script type="text/javascript" src="../js/courses.js"></script>

{% include breadcrumb-2.html %}

<div class="container">
  <h1>Modules <small class="header-small">Modules and other curriculum</small></h1>
  
  {% if site.morea_overview_modules %}
    {{ site.morea_overview_modules.content | markdownify }}
  {% endif %}
  
  <!-- Filter Section -->
  <div class="row mb-4">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Filter Modules</h5>
          <div class="input-group">
            <input type="text" class="form-control" id="moduleFilter" placeholder="Type to filter modules by title, description, or course...">
            <button class="btn btn-outline-secondary" type="button" id="clearFilter">Clear</button>
          </div>
          <small class="text-muted mt-2 d-block">
            <span id="moduleCount">Loading modules...</span>
          </small>
        </div>
      </div>
    </div>
  </div>
  
  <div class="row">
     {% for module in site.morea_module_pages %}
        <div class="col-md-6 col-lg-4 module-card-wrapper" style="padding-bottom: 20px"
             data-title="{{ module.title | downcase | escape }}"
             data-description="{{ module.morea_summary | strip_html | downcase | escape }}"
             data-course="descartes">
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
// Function to fetch CSV and load course modules
async function fetchAndLogCourseData() {
    try {
        // Ensure courses are loaded first
        const courses = await loadCoursesCSV('/descartes-modules/course-sites/descartes-courses.csv');
        if (courses === false) {
            console.error('Failed to load courses.');
            return;
        }
        
        var moduleCardsHTML = '';

        // Loop through the courese and process each course
        for (const course of courses) {
            if (!course.name || !course.url || !course.moduleInfoUrl) {
                console.error(`Course is not properly defined: ${course}`);
            }
            const success = await loadCourseModuleInfo(course);
            if (success === false) {
                console.error(`Failed to load module info for course: ${course.name}`);
                continue;
            }
            if (!course.moduleInfo || !course.moduleInfo.modules) {
                console.error(`No Modules for course: ${course.name}`);
                continue;
            }
            for (const idx in course.moduleInfo.modules) {
                const mod = course.moduleInfo.modules[idx];
                console.log(`Module ${mod}`)
                const moduleUrl = generateModuleUrl(course.url, mod.moduleUrl);
                moduleCardsHTML += `
                    <div class="col-md-6 col-lg-4 module-card-wrapper" style="padding-bottom: 20px" 
                            data-title="${mod.title.toLowerCase()}" 
                            data-description="${mod.description.toLowerCase()}" 
                            data-course="${mod.course.toLowerCase()}">
                        <div class="card h-100">
                            <div class="card-body">
                                <h3 class="card-title">${mod.title}</h3>
                                <p>${mod.description}</p>
                                <p>
                                    <span class="badge bg-primary">${mod.course}</span>
                                    <span class="badge bg-primary">${mod.label}</span>
                                </p>
                            </div>
                            <a href="${moduleUrl}" class="stretched-link"></a>
                        </div>
                    </div>`;
            }
            // Insert module cards into the DOM
            if (moduleCardsHTML && moduleCardsHTML.trim() != '') {
                const courseCardsDiv = document.getElementById('course_cards_div');
                if (courseCardsDiv) {
                    courseCardsDiv.innerHTML += `
                        <div class="row course-section" data-course="${course.name.toLowerCase()}">
                            <div class="col-12">
                                <h3 class="mt-4 mb-3 course-header">Modules from ${course.name}: ${course.title}</h3>
                            </div>
                            ${moduleCardsHTML}
                        </div>`;
                }
            }
        }
    } catch (error) {
        console.error('Error loading course data:', error);
        document.getElementById('course_cards_div').innerHTML = 
            '<p class="text-center text-muted">Error loading course data. Please try again later.</p>';
    }
}
fetchAndLogCourseData();

// Progressive filter functionality
function setupModuleFilter() {
    const filterInput = document.getElementById('moduleFilter');
    const clearButton = document.getElementById('clearFilter');
    const moduleCountSpan = document.getElementById('moduleCount');
    
    if (!filterInput || !clearButton || !moduleCountSpan) return;
    
    function updateModuleCount() {
        const allCards = document.querySelectorAll('.module-card-wrapper');
        const visibleCards = document.querySelectorAll('.module-card-wrapper:not([style*="display: none"])');
        moduleCountSpan.textContent = `Showing ${visibleCards.length} of ${allCards.length} modules`;
    }
    
    function filterModules() {
        const searchTerm = filterInput.value.toLowerCase().trim();
        const moduleCards = document.querySelectorAll('.module-card-wrapper');
        
        moduleCards.forEach(card => {
            const title = card.getAttribute('data-title') || '';
            const description = card.getAttribute('data-description') || '';
            const course = card.getAttribute('data-course') || '';
            
            const matches = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          course.includes(searchTerm);
            
            if (matches || searchTerm === '') {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Hide/show course section headers based on visible modules
        const courseSections = document.querySelectorAll('.course-section');
        courseSections.forEach(section => {
            const visibleCards = section.querySelectorAll('.module-card-wrapper:not([style*="display: none"])');
            const courseHeader = section.querySelector('.course-header');
            
            if (visibleCards.length === 0) {
                section.style.display = 'none';
            } else {
                section.style.display = '';
            }
        });
        
        updateModuleCount();
    }
    
    // Set up event listeners
    filterInput.addEventListener('input', filterModules);
    clearButton.addEventListener('click', function() {
        filterInput.value = '';
        filterModules();
        filterInput.focus();
    });
}
setupModuleFilter();
</script>
