---
layout: default
title: Course Sites
topdiv: container
---
{% include breadcrumb-2.html %}

# Course Sites

The following sites are made available for students wishing to review material from courses they have taken. The materials at each site are taken from prior semesters; you may encounter new and different material if you are taking these courses now or in the future.

Click on the tiles below to go to the corresponding course.

<div id="course_cards_div" class="container"></div>

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
    let rowOpen = false;

    for (let i = 0; i < numRows; i++) {
        const code = data.getValue(i, 0);          // C = Course Code
        const title = data.getValue(i, 1);         // D = Course Title
        const desc  = data.getValue(i, 2) || '';   // E = Description
        const url   = data.getValue(i, 3) || '#';  // G = URL

        if (i % 3 === 0) {
            if (rowOpen) div.innerHTML += '</div>';   //close the previous row
            div.innerHTML += '<div class="row">';   //start a new row
            rowOpen = true;    //mark the row as open
        }

        // Generate and append a course card
        div.innerHTML += `
            <div class="col-sm-4">
                <div class="card" style="margin-bottom:20px;">
                    <div class="card-body">
                        <a href="${url}" class="thumbnail">
                            <h4 style="text-align:center;margin-bottom:0">${code}</h4>
                            <h3 style="text-align:center;margin-top:5px">${title}</h3>
                            <p>${desc.split(' ').slice(0, 15).join(' ')}</p>
                        </a>
                    </div>
                </div>
            </div>`;
    }

    if (rowOpen) div.innerHTML += '</div>';
}
</script>
