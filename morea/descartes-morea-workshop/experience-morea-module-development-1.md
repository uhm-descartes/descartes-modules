---
title: "4. Module Development, Part 1"
published: true
morea_id: experience-morea-module-development-1
morea_type: experience
morea_summary: "Unlock the Best Ever Recipe module"
morea_sort_order: 3
morea_labels:
  - 20min
---

# 4. Module Development, Part 1

If you've gotten this far, you should now have your own personal version of the UHM DESCARTES module site running in your own browser. 

In this section, you'll start to learn how to add content to build your own module. 

<div class="alert alert-success mt-3" role="alert" markdown="1">
<i class="fa-solid fa-globe fa-xl"></i> **Best Recipe Ever!**
<hr/>

There is a "secret" module in the UHM DESCARTES Modules repository called "Best Recipe Ever". It is unpublished by default.  In this part of the module, you are going to edit this module to create a simple module that teaches everyone how to cook (what you consider to be) the best recipe ever!
</div>

## Publish the Best Recipe Ever module

Open the morea directory in your browser-based VS Code editor, then open the file named "module-best-recipe-ever.md". You should see something like the following displayed in your browser:

<img src="./fig/recipe-1.png" width="100%">

Line 2 of this file contains `published: false`.  That's why this module is secret. Edit this line to be `published: true`, then type command-S to save the file. 

Now, do the following:

 * Click the mouse inside the Terminal window to make it the active window
 * Type `control-c` (to stop the running process)
 * Type `control-p` (to redisplay the last command).
 * Press `return` (to re-run the last command (`bundle exec jekyll serve`))

If all goes well, you've restarted Jekyll and the last line in the Terminal window is "Server running... press control-c to stop".

Switch to your browser tab displaying the site, click on the "Modules" link, and you should now see the Best Recipe Ever module:

<img src="./fig/recipe-2.png" width="100%">

Click this link to see the contents:

<img src="./fig/recipe-3.png" width="100%">

## Code walkthrough

<div class="alert alert-success mt-3" role="alert" markdown="1">
<i class="fa-solid fa-globe fa-xl"></i> **Sit back and relax**
<hr/>

Let the instructor give you a guided tour of the Best Recipe Ever module.
</div>


<div class="alert alert-warning" role="alert" markdown="1">
<i class="fa-solid fa-circle-info fa-xl"></i> **Bio Break!**
<hr/>
Let's take a brief break to stretch before moving on to the next page.  See you in a few minutes.
</div>


{% include next-button.html
top-label="Experience Module Development, Part 2 ->"
url="/morea/morea/experience-morea-module-development-2.html" %}
