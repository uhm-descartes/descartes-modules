---
layout: default
title: Course Sites
topdiv: container
---
{% include breadcrumb-2.html %}

# Course Sites

The following sites are made available for students wishing to review material from courses they have taken.  The materials at each site are taken from prior semesters; you may encounter new and different material if you are taking these courses now or in the future.

Click on the tiles below to go to the corresponding course.

{% include courses_info.html %}

<div id="course_cards_div" class="container"></div>

<script>
    const generateCourseCard = (course) => {
      return `
        <div class="col-sm-4">  <!-- Change to col-sm-4 for 3 columns -->
            <div class="card" style="margin-bottom: 20px;">  <!-- Bootstrap card class -->
                <div class="card-body">
                <a href="${course.url}" class="thumbnail">
                    <h4 style="text-align: center; margin-bottom: 0px">${course.num}</h4>
                    <h3 style="text-align: center; margin-top: 5px">${course.name}</h3>
                    <p>${course.description.split(" ").slice(0, 15).join(" ")}</p>
                </a>
                </div>
            </div>
        </div>
      `;
    };
    
    let rowOpen = false;  // Track if a row is currently open
    for (let i = 0; i < courses.length; i++) {
        if (i % 3 === 0) {
            if (rowOpen) {
                course_cards_div.innerHTML += '</div>'; // Close the previous row
            }
            course_cards_div.innerHTML += '<div class="row">'; // Start a new row
            rowOpen = true;  // Mark the row as open
        }
        course_cards_div.innerHTML += generateCourseCard(courses[i]);
    }
    if (rowOpen) {
        course_cards_div.innerHTML += '</div>'; // Close the last row if it was opened
    }
</script>