---
title: "6. Module Development, Part 3"
published: true
morea_id: experience-morea-module-development-3
morea_type: experience
morea_summary: "Commit your changes and make a pull request"
morea_sort_order: 3
morea_labels:
  - 30min
---

# 6. Module Development, Part 3

In this section, you'll commit your changes and make a pull request so that the DESCARTES Modules administrators can merge your module into the published site. 

## Give GitPod permission to make pull requests at GitHub

The first step is to verify that GitPod can make pull requests to GitHub. To do this, open a new browser tab and go to <https://gitpod.io>:


<img src="./fig/gitpod-12.png" width="100%">

Now click on the avatar associated with you at the top right of the page to pull down a menu of items:

<img src="./fig/gitpod-13.png" width="100%">

Select "User Settings" to go to this page:

<img src="./fig/gitpod-14.png" width="100%">

Select "Git Providers" to go to this page:

<img src="./fig/gitpod-15.png" width="100%">

Now click the three vertical dots next to "GitHub":

<img src="./fig/gitpod-16.png" width="100%">

Select "Edit Permissions" to pop up the following dialog box:

<img src="./fig/gitpod-17.png" width="100%">

Make sure all of the permissions are selected, then click "Update Permissions". 

Now GitPod has all of the permissions necessary to commit your changes and make a pull request, which we'll do in the next step.

## Commit your changes to your forked repository

Now return to the browser tab that displays your repository.

After having edited files in the best-recipe-ever directory, you should see a notification disk on the left side of your browser window next to the Source Control icon. If you click on it, it should reveal the Source Control changes pane and a summary of what you've done. For example:

<img src="./fig/commit-1.png" width="100%">

Type an informative message into the Message text field, then click the down arrow beside the Commit button to reveal additional choices. You want to select "Commit and create pull request":

<img src="./fig/commit-2.png" width="100%">

Once you've selected that option, Gitpod will display a window with details on the pull request to be created:

<img src="./fig/commit-3.png" width="100%">

Replace the "Title" field with something informative, such as the name of your module and what is being committed. You can leave the description field blank, or else add more details there. 

Scroll down (if necessary) to reveal the "Create" button, and click it:

<img src="./fig/commit-4.png" width="100%">

If all goes well, you should see a summary of your pull request displayed in the window like this:

<img src="./fig/commit-5.png" width="100%">

You're done!  The DESCARTES Module administrators should be notified of your pull request. If you haven't heard anything within a day or two, please email them. (The current administrator is Philip Johnson, johnson@hawaii.edu)


{% include next-button.html
top-label="Demo Time! ->"
url="/morea/morea/experience-morea-module-demos.html" %}
