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

<style>
    .course-card {
        min-width: 280px;
        max-width: 400px;
        flex: 1;
        margin: 10px;
    }
    
    #course_cards_div {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: stretch;
        gap: 15px;
        padding: 20px 0;
    }
</style>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script>
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawCourseCards);

function drawCourseCards() {
    /*  SELECT columns:
        C  = Course Code
        D  = Course Title
        E  = Description
        G  = URL
        Tab name in the spreadsheet is “Classes” [If tab name changes, this must be updated]
    */
    const queryString = encodeURIComponent('SELECT C, D, E, G');
    const query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/1ohObymWxSQxkqOKnbd7lbXIGEqI6Y5S1Do0PaUt1BZg/gviz/tq?sheet=Classes&tq=' + queryString
    );
    query.send(handleResponse);
}

function handleResponse(response) {
    if (response.isError()) {
        console.log(response.getMessage(), response.getDetailedMessage());
        return;
    }

    const data = response.getDataTable();
    const numRows = data.getNumberOfRows();
    const div = document.getElementById('course_cards_div');
    
    let cardsHTML = '';

    for (let i = 0; i < numRows; i++) {
        const code = data.getValue(i, 0);          // C = Course Code
        const title = data.getValue(i, 1);         // D = Course Title
        const desc  = data.getValue(i, 2) || '';   // E = Description
        const url   = data.getValue(i, 3) || '#';  // G = URL

        // Generate course card with flexible layout
        cardsHTML += `
            <div class="course-card">
                <div class="card h-100">
                    <div class="card-body">
                        <a href="${url}" class="text-decoration-none">
                            <h4 class="text-center mb-0">${code}</h4>
                            <h3 class="text-center mt-2">${title}</h3>
                            <p class="card-text">${desc.split(' ').slice(0, 15).join(' ')}...</p>
                        </a>
                    </div>
                </div>
            </div>`;
    }

    div.innerHTML = cardsHTML;
    
    // Add resize listener to optimize layout
    window.addEventListener('resize', () => {
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(() => {
            // Force re-layout on resize
            div.style.display = 'none';
            div.offsetHeight; // Trigger reflow
            div.style.display = 'flex';
        }, 250);
    });
}
</script>
