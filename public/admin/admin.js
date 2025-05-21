document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    // Pagination variables
    const rowsPerPage = 15;
    let currentPage = 1;
    const storiesTableBody = document.getElementById('storiesTableBody');
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    const pageInfoSpan = document.getElementById('pageInfo');

    // Function to display a specific page of the table
    function displayPage(page) {
        currentPage = page;
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const rows = storiesTableBody.querySelectorAll('tr');

        rows.forEach((row, index) => {
            if (index >= start && index < end) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });

        updatePaginationControls();
    }

    // Function to update pagination button states and text
    function updatePaginationControls() {
        const rows = storiesTableBody.querySelectorAll('tr');
        const totalPages = Math.ceil(rows.length / rowsPerPage);

        pageInfoSpan.textContent = `Page ${currentPage} of ${totalPages || 1}`;

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages || totalPages === 0;
    }

    // Event listeners for pagination buttons
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            displayPage(currentPage - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        const rows = storiesTableBody.querySelectorAll('tr');
        const totalPages = Math.ceil(rows.length / rowsPerPage);
        if (currentPage < totalPages) {
            displayPage(currentPage + 1);
        }
    });

    // Initial display
    displayPage(1);

    // Function to show the active section and hide others (simplified for only stories)
    function showSection(id) {
        contentSections.forEach(section => {
            if ('#' + section.id === id) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }

    // Add click event listeners to sidebar links (only for stories link)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');

            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            showSection(targetId);
            history.pushState(null, null, targetId);
        });
    });

    // Show the section based on the initial URL hash or default to stories
    const initialHash = window.location.hash;
    if (initialHash && document.querySelector(initialHash) && initialHash === '#stories') {
        showSection(initialHash);
        navLinks.forEach(link => {
            if (link.getAttribute('href') === initialHash) {
                link.classList.add('active');
            }
        });
    } else {
        // Default to the stories section
        showSection('#stories');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === '#stories') {
                link.classList.add('active');
            }
        });
    }

    // Handle back/forward browser navigation (simplified for only stories)
    window.addEventListener('popstate', () => {
        const popStateHash = window.location.hash;
        if (popStateHash && document.querySelector(popStateHash) && popStateHash === '#stories') {
            showSection(popStateHash);
            navLinks.forEach(link => {
                if (link.getAttribute('href') === popStateHash) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        } else {
            // Default to the stories section if hash is cleared or invalid on popstate
            showSection('#stories');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === '#stories') {
                    link.classList.add('active');
                }
            });
        }
        // Re-display the current page of the table after popstate
        displayPage(currentPage);
    });

    // ** Placeholder for Add Story Form Submission **
    const addStoryForm = document.getElementById('addStoryForm');
    if (addStoryForm) {
        addStoryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real application, you would collect form data here
            // and send it to your backend to add a new story.
            console.log('Add Story form submitted.');
            alert('Add Story form submitted. (Backend integration needed)');
            // After successful backend operation, you would refresh the table data
            // and potentially reset the form.
            addStoryForm.reset();
            // Example: Refresh table data (you'll replace this with actual data fetching)
            // fetchStories().then(data => {
            //     populateTable(data);
            //     displayPage(1);
            // });
        });
    }

    // ** Placeholder for Update and Delete Actions **
    // You would add event listeners to the update/delete buttons within the table rows.
    // These listeners would capture the story data from the row
    // and interact with your backend to perform the update or delete operation.
    // After a successful operation, you would refresh the table.

    // Example: Event delegation for action buttons (add this inside DOMContentLoaded)
    storiesTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('update') || e.target.closest('.update')) {
            const updateButton = e.target.classList.contains('update') ? e.target : e.target.closest('.update');
            const row = updateButton.closest('tr');
            // In a real application, extract story data from the row or a data attribute
            const storyId = row.dataset.storyId; // Assuming you add data-story-id to rows
            console.log(`Update button clicked for story ID: ${storyId}`);
            alert(`Update story with ID: ${storyId} (Backend integration needed)`);
            // Implement logic to populate a modal or form for updating
        } else if (e.target.classList.contains('delete') || e.target.closest('.delete')) {
            const deleteButton = e.target.classList.contains('delete') ? e.target : e.target.closest('.delete');
            const row = deleteButton.closest('tr');
            // In a real application, extract story data from the row or a data attribute
            const storyId = row.dataset.storyId; // Assuming you add data-story-id to rows
            if (confirm(`Are you sure you want to delete story with ID: ${storyId}?`)) {
                console.log(`Delete button clicked for story ID: ${storyId}`);
                alert(`Delete story with ID: ${storyId} (Backend integration needed)`);
                // Implement logic to send delete request to backend
                // After successful deletion, remove the row from the table and refresh pagination
                row.remove();
                updatePaginationControls();
                displayPage(currentPage); // Stay on the current page or go back if last on page
            }
        }
    });
});
