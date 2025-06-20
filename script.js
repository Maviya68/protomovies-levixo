// --- Hardcoded Book Data ---
// In a real application, this would come from a database.
const books = [
    {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        genre: "Fantasy, Contemporary, Philosophical",
        description: "Between life and death, there is a library. Nora Seed has the chance to undo her regrets and live as if she had made different choices. But things aren't always as she imagined they'd be.",
        image: "https://m.media-amazon.com/images/I/41K71M-g5rL._SY445_SX342_.jpg", // Placeholder, replace with actual image URL
        interests: ["philosophical", "drama", "self-discovery", "realistic", "emotional", "contemporary", "reflection"]
    },
    {
        id: 2,
        title: "Project Hail Mary",
        author: "Andy Weir",
        genre: "Science Fiction, Adventure",
        description: "Ryland Grace is the sole survivor on a desperate, last-chance mission to save humanity—and he can't remember any of it. An intelligent and humorous sci-fi tale.",
        image: "https://m.media-amazon.com/images/I/51wXyK-5NLL._SY445_SX342_.jpg", // Placeholder
        interests: ["sci-fi", "adventure", "fast-paced", "mystery", "humor", "problem-solving", "futuristic"]
    },
    {
        id: 3,
        title: "The Guest List",
        author: "Lucy Fokley",
        genre: "Mystery, Thriller",
        description: "A wedding celebration on a remote island turns deadly. Everyone has a secret. Everyone has a motive. But only one of them is a killer.",
        image: "https://m.media-amazon.com/images/I/41-W6o1R5KL._SY445_SX342_.jpg", // Placeholder
        interests: ["mystery", "thriller", "suspenseful", "twists", "crime", "intrigue"]
    },
    {
        id: 4,
        title: "Red, White & Royal Blue",
        author: "Casey McQuiston",
        genre: "Romance, Contemporary, Humor",
        description: "America's First Son falls in love with a British prince. A charming, funny, and heartwarming story about love, politics, and finding your own path.",
        image: "https://m.media-amazon.com/images/I/51u2c-JqQ4L._SY445_SX342_.jpg", // Placeholder
        interests: ["romance", "humor", "contemporary", "lighthearted", "emotional", "relationships"]
    },
    {
        id: 5,
        title: "The Henna Artist",
        author: " Alka Joshi",
        genre: "Historical Fiction, Drama",
        description: "Seventeen-year-old Lakshmi escapes an arranged marriage and makes her way to Jaipur, where she becomes the most sought-after henna artist. Set in 1950s India.",
        image: "https://m.media-amazon.com/images/I/51x88Rj-JPL._SY445_SX342_.jpg", // Placeholder
        interests: ["historical", "drama", "self-discovery", "character-driven", "realistic"]
    },
    {
        id: 6,
        title: "Dune",
        author: "Frank Herbert",
        genre: "Science Fiction, Epic Fantasy",
        description: "Set in the distant future amidst a feudal interstellar society where various noble houses control planetary fiefs. The story explores politics, religion, ecology, technology, and human evolution.",
        image: "https://m.media-amazon.com/images/I/41d-tG5oVPL._SY445_SX342_.jpg", // Placeholder
        interests: ["sci-fi", "fantasy", "epic", "philosophical", "political", "adventure", "futuristic", "intrigue"]
    },
    {
        id: 7,
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        genre: "Mystery, Contemporary, Drama",
        description: "A young girl, abandoned by her family, raises herself in the marshes of North Carolina. When a local boy is found dead, she becomes the prime suspect.",
        image: "https://m.media-amazon.com/images/I/41Dq1eC4z1L._SY445_SX342_.jpg", // Placeholder
        interests: ["mystery", "drama", "self-discovery", "nature", "intrigue", "realistic", "emotional"]
    },
    {
        id: 8,
        title: "Circe",
        author: "Madeline Miller",
        genre: "Fantasy, Mythology, Historical Fiction",
        description: "In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is not like her family. This is her story of exile and transformation.",
        image: "https://m.media-amazon.com/images/I/51nJ7p8X7rL._SY445_SX342_.jpg", // Placeholder
        interests: ["fantasy", "mythology", "historical", "drama", "self-discovery", "character-driven"]
    },
    {
        id: 9,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        genre: "Thriller, Mystery, Psychological",
        description: "Alicia Berenson's life is seemingly perfect until she shoots her husband five times and then never speaks another word. A criminal psychotherapist is determined to unravel the mystery.",
        image: "https://m.media-amazon.com/images/I/41j1lE4Cj+L._SY445_SX342_.jpg", // Placeholder
        interests: ["thriller", "mystery", "psychological", "suspenseful", "twists", "crime", "intrigue"]
    },
    {
        id: 10,
        title: "Educated",
        author: "Tara Westover",
        genre: "Memoir, Non-fiction, Self-discovery",
        description: "Born to survivalists in the mountains of Idaho, Tara Westover left home at seventeen to pursue an education, transforming her life through learning.",
        image: "https://m.media-amazon.com/images/I/41n9b-Q2GmL._SY445_SX342_.jpg", // Placeholder
        interests: ["self-discovery", "drama", "realistic", "inspirational", "non-fiction", "personal-growth"]
    }
];


// --- Quiz Logic (for quiz.html) ---
document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quizForm');

    if (quizForm) {
        quizForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(quizForm);
            const userInterests = new Set(); // Use a Set to avoid duplicate interests

            for (let [name, value] of formData.entries()) {
                // Split the value by comma as some answers provide multiple interests
                value.split(',').forEach(interest => {
                    if (interest.trim() !== '') {
                        userInterests.add(interest.trim());
                    }
                });
            }

            // Convert Set to Array and store in sessionStorage
            // sessionStorage is used so interests are available for the current browser session,
            // but cleared when the tab/browser is closed.
            sessionStorage.setItem('userInterests', JSON.stringify(Array.from(userInterests)));

            // Redirect to the recommendations page
            window.location.href = 'recommendations.html';
        });
    }

    // --- Recommendation Logic (for recommendations.html) ---
    const recommendationsContainer = document.getElementById('recommendations-container');
    const noRecommendationsMessage = document.getElementById('no-recommendations-message');

    if (recommendationsContainer) {
        const storedInterests = sessionStorage.getItem('userInterests');
        let selectedInterests = [];

        if (storedInterests) {
            selectedInterests = JSON.parse(storedInterests);
        }

        console.log("User Interests:", selectedInterests); // For debugging

        const recommendedBooks = filterBooksByInterests(selectedInterests);
        console.log("Recommended Books:", recommendedBooks); // For debugging

        if (recommendedBooks.length > 0) {
            displayBooks(recommendedBooks, recommendationsContainer);
            noRecommendationsMessage.style.display = 'none';
        } else {
            recommendationsContainer.innerHTML = ''; // Clear any existing content
            noRecommendationsMessage.style.display = 'block';
        }
    }
});


/**
 * Filters the list of books based on the user's selected interests.
 * A book is recommended if it matches at least one of the user's interests.
 * @param {string[]} interests - An array of interest strings from the quiz.
 * @returns {Array} - An array of book objects that match the interests.
 */
function filterBooksByInterests(interests) {
    if (interests.length === 0) {
        // If no specific interests, recommend a diverse set or all books
        // For now, return an empty array if no interests are found from quiz
        // or if the quiz wasn't taken.
        return [];
    }

    const matchedBooks = new Set(); // Use a Set to ensure unique books

    // Loop through each book
    books.forEach(book => {
        // Check if any of the book's interests are in the user's interests
        const bookInterestArray = book.interests || []; // Ensure it's an array

        const hasMatch = bookInterestArray.some(bookInterest =>
            interests.includes(bookInterest)
        );

        if (hasMatch) {
            matchedBooks.add(book);
        }
    });

    // Convert Set back to Array for display
    return Array.from(matchedBooks);
}

/**
 * Dynamically creates and appends book cards to the specified container.
 * @param {Array} booksToDisplay - An array of book objects.
 * @param {HTMLElement} containerElement - The DOM element to append books to.
 */
function displayBooks(booksToDisplay, containerElement) {
    containerElement.innerHTML = ''; // Clear previous content

    if (booksToDisplay.length === 0) {
        containerElement.innerHTML = '<p class="no-recommendations">No books found for your interests. Try taking the quiz again!</p>';
        return;
    }

    booksToDisplay.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title} Cover">
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <p class="book-description">${book.description}</p>
                <span class="book-genre">${book.genre.split(',')[0].trim()}</span>
            </div>
        `;
        containerElement.appendChild(bookCard);
    });
}
