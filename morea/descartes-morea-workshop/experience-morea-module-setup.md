---
title: "3. Module Setup"
published: true
morea_id: experience-morea-module-setup
morea_type: experience
morea_summary: "Set up a local copy of the Module repo"
morea_sort_order: 3
morea_labels:
  - 15min
---

# 3. Module Setup

Now that you've learned a bit about best practices for module design, we're going to dive into the weeds with the mechanics of building a module for the DESCARTES NRT module series. 

## Workflow overview

In general, the process looks like this:

1. You will make a *fork* of the uhm-descartes/descartes-modules GitHub repository.
2. You create the contents of your module within your local fork.
3. When you have a version ready to use or review, you create a *pull request*. Your pull request will be reviewed by a UHM-DESCARTES administrator, and if there are no significant problems, your pull request will be *merged* into the uhm-descartes/descartes-modules repository.
4. After merging, your module is *published* and ready for use at <https://descartes.manoa.hawaii.edu/descartes-modules>.


<div class="alert alert-info" role="alert" markdown="1">
<i class="fa-solid fa-circle-info fa-xl"></i> **Fork? Pull request?**
<hr/>

If you'd like to learn more about these concepts, see GitHub's documentation on [About Forks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks) and [Creating a Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

</div>

Let's now step through each of these steps.

## Make a fork

In a browser, go to <https://github.com/uhm-descartes/descartes-modules>. Make sure you are logged in to your GitHub account. (If you don't have a GitHub account, you need to create one now by going to <https://github.com/join>.) The page looks like this:

<img src="./fig/fork-1.png" width="100%">

Click the "Fork" button in the top right of the page to bring up the fork window:

<img src="./fig/fork-2.png" width="100%">


You can see that this window selects your personal account by default, which is typically where you'll want the fork of the repository to go. Click "Create fork" which results in a new copy of the repo in your own personal account. For example:

<img src="./fig/fork-3.png" width="100%">

## Set up Gitpod

We recommend that you develop your module using a cloud-based based package called Gitpod. Basically, Gitpod provides a unix box pre-installed with all the tools you need to develop your Morea site in the cloud. You access everything through a browser, and edit your site using a browser-based version of Visual Studio Code.  (If, at some later point, you want to switch to local development, you can find out more at [Morea Framework Local Development](https://morea-framework.github.io/docs/category/local-development)).

### Login to GitPod

To start, go to <https://gitpod.io/>:

<img src="./fig/gitpod-1.png" width="100%">

Click the Login button to go to the Login page:


<img src="./fig/gitpod-2.png" width="100%">

You want to "Continue with GitHub". (In my case, since I've used Gitpod before, it suggests that path automatically).

### Create a Gitpod workspace 

After continuing with GitHub, you should be on the "Workspaces" page:

<img src="./fig/gitpod-3.png" width="100%">

Click the "New Workspace" button. This will display a new window and ask that you select one of your repositories. You want to select your forked version of uhm-descartes/descartes-modules:

<img src="./fig/gitpod-4.png" width="100%">

After you do that, you should see a page like this containing the options for creating a new workspace:

<img src="./fig/gitpod-5.png" width="100%">

The default options (VS Code, Standard) are perfectly fine. You can go ahead and click the "Autostart with these options for this repository", and then click "Continue". 

A new screen will pop up that displays a cloud-based version of the VS Code editor.  There will be an open Terminal window with some green text scrolling by as various tools and libraries are installed. Just sit tight (1-2 minutes) until this installation finishes. You'll know it's done because you'll see a unix command prompt (in blue) at the bottom of the screen:

<img src="./fig/gitpod-6.png" width="100%">



## Build and view the site

Now you can type `bundle exec jekyll serve` to build the site:

<img src="./fig/gitpod-8.png" width="100%">

<div class="alert alert-warning" role="alert" markdown="1">
<i class="fa-solid fa-triangle-exclamation fa-xl"></i> **Yikes! What is this "nokogiri" stuff?**
<hr/>

It's unlikely, but possible to get an error such as "Could not find nokogiri-1.13.8-x86_64-linux in locally installed gems" after you run `bundle exec jekyll serve`. If that happens, try typing the following into your Terminal window:

```shell
rm Gemfile.lock
bundle install
bundle exec jekyll serve
```
This should fix the problem. 
</div>

You may see a pop up window noting that "A service is available on port 4000". Click the orange button labeled "Make public".

After that, the terminal window should look like the following, where the last line is "Server running... press control-c to stop":

<img src="./fig/gitpod-9.png" width="100%">

If you put your mouse over the Server address, you will get a "Follow link" popup:

<img src="./fig/gitpod-10.png" width="100%">

Click the "Follow link" popup button and your own, personal, local copy of the uhm-descartes/descartes-modules repo will be displayed in your browser:

<img src="./fig/gitpod-11.png" width="100%">

Congratulations!  You have now installed your own copy of the module repo and you are ready to start adding the content for your module.

{% include next-button.html
top-label="4. Module development, Part 1 ->"
url="/morea/morea/experience-morea-module-development-1.html" %}
