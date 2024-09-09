---
layout: default
title: Course Sites
---
{% include breadcrumb-2.html %}

# Course Sites

The following sites are made available for students wishing to review material from courses they have taken.  The materials at each site are taken from prior semesters; you may encounter new and different material if you are taking these courses now or in the future.

Click on the tiles below to go to the corresponding course.

{% include courses_info.html %}

<div id="course_cards_div" class="container d-flex justify-content-center align-items-center"></div>

<script>

const generateCourseCard = (course) => {
    return `
        <div class="col-md-6 col-lg-4" style="padding-bottom: 20px">
        <div class="card h-100">
            <div class="text-center">
                <a href="${course.url}" class="thumbnail">
                    <h4 style="text-align: center; margin-bottom: 0px">${course.num}</h4>
                    <h3 style="text-align: center; margin-top: 5px">${course.name}</h3>
                    <p>${course.description.split(" ").slice(0,15).join(" ")}</p>
                </a>
            </div>
        </div>
    </div>
    `;
};
</script>
<div class="row">

<script>
    for(let i in courses) {
    course_cards_div.innerHTML += generateCourseCard(courses[i]);
    }
</script>

</div>