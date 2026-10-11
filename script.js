
const noteText = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");

const MAX_CHARACTERS = 200;

// Update character and word counters
function updateCounts() {
    const text = noteText.value;
    const characters = text.length;

    const trimmedText = text.trim();
    const words = trimmedText === ""
        ? 0
        : trimmedText.split(/\s+/).length;

    charCount.textContent =
        `${characters} / ${MAX_CHARACTERS} characters`;

    wordCount.textContent = `${words} words`;

    charCount.classList.toggle("warning", characters > 180);
    charCount.classList.toggle("over", characters > 200);
}

// Save the note as a draft
function saveDraft() {
    localStorage.setItem("noteDraft", noteText.value);
}

// Clear the note and its saved draft
function clearNote() {
    noteText.value = "";
    localStorage.removeItem("noteDraft");
    updateCounts();
}

// Update the theme button label
function updateThemeLabel() {
    themeToggle.textContent = document.body.classList.contains("dark")
        ? "Light mode"
        : "Dark mode";
}

// Restore saved note and theme when the page loads
const savedDraft = localStorage.getItem("noteDraft");

if (savedDraft !== null) {
    noteText.value = savedDraft;
}

const savedTheme = localStorage.getItem("noteTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

updateThemeLabel();
updateCounts();

// Save the draft and update counters whenever text changes
noteText.addEventListener("input", () => {
    updateCounts();
    saveDraft();
});

// Clear button
clearBtn.addEventListener("click", clearNote);

// Escape key clears the note
noteText.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        clearNote();
    }
});

// Toggle and remember the theme
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    localStorage.setItem("noteTheme", isDark ? "dark" : "light");

    updateThemeLabel();
});
