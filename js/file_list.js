//const urls = require('./urls');
import { URLS } from './urls.js';


async function get_files(url, token) {
    try {
        const response = await fetch(url, {
            method: 'GET', // Change to POST if needed
            headers: {
                'X-Token': token,
                'Content-Type': 'application/json' // Adjust if needed
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('There was a problem with the fetch operation:', error);
    }
}



//A function responsible for creating the tr and td elements to represent the file table
function create_file_table_elements(files) {
    // const dataContainer = document.getElementById('data-container');
    // dataContainer.innerHTML = ''; // Clear loading text
    // Reference to the container where items will be added
    const container = document.querySelector('.container');

    // Loop through the filenames array
    files.forEach(file => {
        // Create a div element with class 'item'
        if (!file.parentId) {
            const itemDiv = document.createElement('div');
            const options = document.createElement('div')
            itemDiv.classList.add('item');
            options.classList.add('file-folder-options');
            // Create an img element for the SVG
            const logo = document.createElement('img');
            // Create the hidden ellipsis that appears when the pointer is hovered over the item
            const ellipsis = document.createElement('img');
            ellipsis.src = '../assets/ellipsis-vertical.svg';
            // Add a click event listener
            ellipsis.addEventListener('click', () => {
                console.log(file);
                // You can add any action you want here
            });
            if (file.type === 'file') {
                logo.src = '../assets/file.svg'; // Update the path as needed
            } else if (file.type === 'folder') {
                logo.src = '../assets/folder.svg';
            }
            logo.alt = 'Icon';
            logo.classList.add('icon');
            ellipsis.alt = 'Options';
            ellipsis.classList.add('ellipsis');
            ellipsis.addEventListener('click', (event) => {
                const rect = ellipsis.getBoundingClientRect();
                const dropdown = document.getElementsByClassName("file-folder-options");
                const update = document.getElementById('update');
                //close any open dropdown
                dropdown[0].style.display = "none";
                // Calculate the coordinates relative to the viewport
                const x = rect.left + window.scrollX; // X coordinate
                const y = rect.top + window.scrollY;   // Y coordinate
                const height = rect.height;
                // for (let i = 0; i < dropdown.length; i++) {
                dropdown[0].style.position = 'absolute'; // Set position to absolute
                dropdown[0].style.top = `${y}px`; // Position each div vertically spaced
                dropdown[0].style.left = `${x}px`; // Set a fixed left position
                // }
                // Toggle display
                dropdown[0].style.display = dropdown[0].style.display === "block" ? "none" : "block";
                update.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.href = `update?id=${file.id}&userId=${file.userId}&isPublic=${file.isPublic}&type=${file.type}&parentId=${file.parentId}&name=${file.name}`;
                    event.stopPropagation();
                })
                event.stopPropagation();
            })

            itemDiv.addEventListener('click', (event) => {
                if (file.type === 'folder') {
                    view_folder(files, file.id);
                } else if (file.type === 'file') {
                    view_file(file.id);
                }
            })
            //add an event listener for the edit option

            // Close dropdown on clicking anywhere outside
            document.addEventListener('click', (event) => {
                document.getElementsByClassName("file-folder-options")[0].style.display = "none";
            })
            // Create a text node for the filename
            const textNode = document.createTextNode(file.name);

            // Append the img and text to the item div
            itemDiv.appendChild(ellipsis);
            itemDiv.appendChild(logo);
            itemDiv.appendChild(textNode);

            // Append the item div to the container
            container.appendChild(itemDiv);
        }

    });
}

//This function will handle all click events on a file and display what is in it.
function view_file(file_id) {
    //We first need to clear the contents of the container window
    const container = document.querySelector('.container');
    container.innerHTML = '';
    console.log('A file has indeed been selected ', file_id);
}

function view_folder(files, selected_folder_id) {
    // const dataContainer = document.getElementById('data-container');
    // Reference to the container where items will be added
    const container = document.querySelector('.container');
    //clear the contents of the container
    container.innerHTML = ''
    container.innerHTML = `<div class="file-folder-options">
    <a href="/update" id='update' class="dropdown-item">Edit</a>
    <a href="/" class="dropdown-item">Delete</a>
    <a href="/" class="dropdown-item">Publish</a>
</div>`
    //The repopulate with the new information 
    files.forEach(file => {
        // Create a div element with class 'item'
        if (file.parentId === selected_folder_id) {
            const itemDiv = document.createElement('div');
            const options = document.createElement('div')
            itemDiv.classList.add('item');
            options.classList.add('file-folder-options');
            // Create an img element for the SVG
            const logo = document.createElement('img');
            // Create the hidden ellipsis that appears when the pointer is hovered over the item
            const ellipsis = document.createElement('img');
            ellipsis.src = '../assets/ellipsis-vertical.svg';
            // Add a click event listener
            // ellipsis.addEventListener('click', () => {
            //     console.log(file);
            //     // You can add any action you want here
            // });
            if (file.type === 'file') {
                logo.src = '../assets/file.svg'; // Update the path as needed
            } else if (file.type === 'folder') {
                logo.src = '../assets/folder.svg';
            }

            logo.alt = 'Icon';
            logo.classList.add('icon');
            ellipsis.alt = 'Options';
            ellipsis.classList.add('ellipsis');
            ellipsis.addEventListener('click', (event) => {
                const rect = ellipsis.getBoundingClientRect();
                const dropdown = document.getElementsByClassName("file-folder-options");
                console.log(dropdown);
                //close any open dropdown
                dropdown[0].style.display = "none";
                // Calculate the coordinates relative to the viewport
                const x = rect.left + window.scrollX; // X coordinate
                const y = rect.top + window.scrollY;   // Y coordinate
                const height = rect.height;
                // for (let i = 0; i < dropdown.length; i++) {
                dropdown[0].style.position = 'absolute'; // Set position to absolute
                dropdown[0].style.top = `${y}px`; // Position each div vertically spaced
                dropdown[0].style.left = `${x}px`; // Set a fixed left position
                // }
                // Toggle display
                dropdown[0].style.display = dropdown[0].style.display === "block" ? "none" : "block";
                update.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.href = `update?id=${file.id}&userId=${file.userId}&isPublic=${file.isPublic}&type=${file.type}&parentId=${file.parentId}&name=${file.name}`;
                    event.stopPropagation();
                })
                event.stopPropagation();
            })
            //call the function again if an item is clicked
            itemDiv.addEventListener('click', (event) => {
                view_folder(files, file.id);
            })
            // Close dropdown on clicking anywhere outside
            document.addEventListener('click', (event) => {
                document.getElementsByClassName("file-folder-options")[0].style.display = "none";
            })
            // Create a text node for the filename
            const textNode = document.createTextNode(file.name);

            // Append the img and text to the item div
            itemDiv.appendChild(ellipsis);
            itemDiv.appendChild(logo);
            itemDiv.appendChild(textNode);

            // Append the item div to the container
            container.appendChild(itemDiv);
        }

    });
}


document.addEventListener('DOMContentLoaded', function () {

    const token = sessionStorage.getItem('authToken'); // Replace with your session storage key
    if (!token) {
        console.error('Token not found in session storage.');
        return;
    }
    try {
        let files = get_files(URLS.API_FILES_GET, token).then(data => {
            create_file_table_elements(data);
        }).catch(error => {
            console.log('Error', error);
        });
    } catch (e) {
        console.log(e);
    }
});

