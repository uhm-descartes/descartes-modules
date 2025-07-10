---
layout: default
title: Course Sites
topdiv: container
---
<script type="text/javascript" src="../js/courses.js"></script>

{% include breadcrumb-2.html %}

# Course Sites

The following sites are made available for students wishing to review material from courses they have taken. The materials at each site are taken from prior semesters; you may encounter new and different material if you are taking these courses now or in the future.

Click on the tiles below to go to the corresponding course.

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

<script>
// Load course data when page loads
document.addEventListener('DOMContentLoaded', drawCourseCards);

async function drawCourseCards() {
    try {
        // Ensure courses are loaded first
        const courses = await loadCoursesCSV('/descartes-modules/course-sites/descartes-courses.csv');
        if (courses === false) {
            console.error('Failed to load courses.');
            return;
        }
        
        const div = document.getElementById('course_cards_div');
        let cardsHTML = '';

        // Process each row (name, url, fullname, desc)
        for (const course of courses) {            
            if (course.name && course.url) {
                // Generate course card with flexible layout
                cardsHTML += `
                    <div class="course-card">
                        <div class="card h-100">
                            <div class="card-body">
                                <a href="${course.url}" class="text-decoration-none">
                                    <h4 class="text-center mb-0">${course.name}</h4>
                                    <h3 class="text-center mt-2">${course.title}</h3>
                                    <p class="card-text">${course.description}</p>
                                </a>
                            </div>
                        </div>
                    </div>`;
            }
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
        
    } catch (error) {
        console.error('Error loading course data:', error);
        document.getElementById('course_cards_div').innerHTML = 
            '<p class="text-center text-muted">Error loading course data. Please try again later.</p>';
    }
}
</script>
