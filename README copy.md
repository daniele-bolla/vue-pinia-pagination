# JavaScript Coding Assessment

## Overview

This assessment is designed to evaluate your JavaScript skills in a frontend development context.

### Guidance for the assignment

We recommend spending approximately 1-2 hours on this assignment. Additionally, here are some guidelines on what we're looking for:

* Craft a simple, well-defined solution tailored to the problem at hand.
* Do prioritise code structure and where appropriate explain your reasoning about any interesting decisions you made.
* Do make sure your code compiles, runs, and any tests you've added pass.
* Don't overcomplicate your solution — we don't need an "enterprise" system.
* Don't feel pressured to showcase every skill you have.
* We should be able to quickly and easily run your code.

Remember that elegant code often hides the careful thought that went into making it. We're looking for code that's easy to read because we know it probably wasn't easy to write!

## Requirements

### Task

wireframe.png outlines a view that contains a display of products, with an input next to the pagination to change the number of items displayed per page.

Plese build this wireframe with Vue 3, making a call to an API like https://dummyjson.com/ to fetch products.

### Image Display & Styling

Each product is displayed with a thumbnail, product description, and price.

1. Style the image with these requirements:
    * The image should stretch horizontally to fill its container.
    * It must maintain a fixed height of 200px.
    * Preserve the image's original aspect ratio (avoid stretching or squishing).

2. Style the text with these requirements:
    * The description should not exceed five lines in length
    * The text align should be justify
    * The price must be on the bottom right

### Pagination

1. Highlight the currently selected page using a background color of `#aaaaaa`.
1. Implement these pagination rules:
    * Each page can display between 5 and 25 items.
    * If an incorrect value is provided, log a console warning and default to the nearest acceptable value (either 5 or 25).
    * Items should be retrieved dynamically from the API when either the current page changes or the amount of items to display changes.

### Submitting Your Solution

Please create a zip file of your the finished solution and send it back to us. The name of the zip file should contain your name and the date of submission. For example, `jane_doe_1970-01-01.zip`.

Make sure to delete the `node_modules` directory **before** creating the zip file!
