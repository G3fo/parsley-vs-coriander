// Game State
const gameState = {
    currentImage: null,
    learnMode: false,
    score: {
        correct: 0,
        total: 0
    },
    answerSubmitted: false,
    imagePool: [],
    usedImages: []
};

// DOM Elements
const elements = {
    herbImage: document.getElementById('herbImage'),
    imageLoader: document.getElementById('imageLoader'),
    parsleyBtn: document.getElementById('parsleyBtn'),
    corianderBtn: document.getElementById('corianderBtn'),
    feedback: document.getElementById('feedback'),
    feedbackMessage: document.getElementById('feedbackMessage'),
    feedbackDescription: document.getElementById('feedbackDescription'),
    nextBtn: document.getElementById('nextBtn'),
    scoreDisplay: document.getElementById('scoreDisplay'),
    accuracyDisplay: document.getElementById('accuracyDisplay'),
    learnModeCheckbox: document.getElementById('learnModeCheckbox'),
    educationalPanel: document.getElementById('educationalPanel'),
    answerReveal: document.getElementById('answerReveal'),
    revealedAnswer: document.getElementById('revealedAnswer')
};

// Initialize the game
function init() {
    setupEventListeners();
    populateEducationalContent();
    loadImagePool();
    loadNewImage();
}

// Setup event listeners
function setupEventListeners() {
    // Answer buttons
    elements.parsleyBtn.addEventListener('click', () => handleAnswer('parsley'));
    elements.corianderBtn.addEventListener('click', () => handleAnswer('coriander'));

    // Next button
    elements.nextBtn.addEventListener('click', loadNewImage);

    // Learn mode toggle
    elements.learnModeCheckbox.addEventListener('change', toggleLearnMode);

    // Image load event
    elements.herbImage.addEventListener('load', hideImageLoader);
    elements.herbImage.addEventListener('error', handleImageError);
}

// Populate educational content from images.js
function populateEducationalContent() {
    // Parsley info
    document.getElementById('parsleyLeafShape').textContent = educationalContent.parsley.leafShape;
    document.getElementById('parsleyStems').textContent = educationalContent.parsley.stems;
    document.getElementById('parsleyTaste').textContent = educationalContent.parsley.taste;
    document.getElementById('parsleyAppearance').textContent = educationalContent.parsley.appearance;
    document.getElementById('parsleyTip').textContent = educationalContent.parsley.tips;

    // Coriander info
    document.getElementById('corianderLeafShape').textContent = educationalContent.coriander.leafShape;
    document.getElementById('corianderStems').textContent = educationalContent.coriander.stems;
    document.getElementById('corianderTaste').textContent = educationalContent.coriander.taste;
    document.getElementById('corianderAppearance').textContent = educationalContent.coriander.appearance;
    document.getElementById('corianderTip').textContent = educationalContent.coriander.tips;

    // Key differences
    const differencesList = document.getElementById('differencesList');
    educationalContent.differences.forEach(diff => {
        const li = document.createElement('li');
        li.textContent = diff;
        differencesList.appendChild(li);
    });
}

// Load image pool with all images
function loadImagePool() {
    gameState.imagePool = [...imageDatabase];
    gameState.usedImages = [];
    shuffleArray(gameState.imagePool);
}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Toggle learn mode
function toggleLearnMode() {
    gameState.learnMode = elements.learnModeCheckbox.checked;

    if (gameState.learnMode) {
        elements.educationalPanel.style.display = 'block';
        showAnswerReveal();
    } else {
        elements.educationalPanel.style.display = 'none';
        elements.answerReveal.style.display = 'none';
    }
}

// Show answer reveal in learn mode
function showAnswerReveal() {
    if (gameState.currentImage && gameState.learnMode && !gameState.answerSubmitted) {
        elements.answerReveal.style.display = 'block';
        elements.revealedAnswer.textContent = gameState.currentImage.answer.charAt(0).toUpperCase() +
                                              gameState.currentImage.answer.slice(1);
    } else {
        elements.answerReveal.style.display = 'none';
    }
}

// Load a new image
function loadNewImage() {
    // Reset state
    gameState.answerSubmitted = false;
    elements.feedback.style.display = 'none';
    elements.nextBtn.style.display = 'none';

    // Reset button states
    elements.parsleyBtn.disabled = false;
    elements.corianderBtn.disabled = false;
    elements.parsleyBtn.classList.remove('correct', 'incorrect');
    elements.corianderBtn.classList.remove('correct', 'incorrect');

    // Check if we need to reload the pool
    if (gameState.imagePool.length === 0) {
        loadImagePool();
    }

    // Get next image from pool
    gameState.currentImage = gameState.imagePool.pop();
    gameState.usedImages.push(gameState.currentImage);

    // Show loader
    showImageLoader();

    // Load image
    elements.herbImage.src = gameState.currentImage.url;

    // Update learn mode display
    if (gameState.learnMode) {
        showAnswerReveal();
    }
}

// Show image loader
function showImageLoader() {
    elements.imageLoader.style.display = 'block';
    elements.herbImage.style.opacity = '0';
}

// Hide image loader
function hideImageLoader() {
    elements.imageLoader.style.display = 'none';
    elements.herbImage.style.opacity = '1';
}

// Handle image load error
function handleImageError() {
    elements.imageLoader.textContent = 'Failed to load image. Click "Next Image" to continue.';
    elements.nextBtn.style.display = 'block';
}

// Handle answer submission
function handleAnswer(userAnswer) {
    if (gameState.answerSubmitted) return;

    gameState.answerSubmitted = true;
    const correctAnswer = gameState.currentImage.answer;
    const isCorrect = userAnswer === correctAnswer;

    // Update score
    gameState.score.total++;
    if (isCorrect) {
        gameState.score.correct++;
    }
    updateScoreDisplay();

    // Disable buttons
    elements.parsleyBtn.disabled = true;
    elements.corianderBtn.disabled = true;

    // Visual feedback on buttons
    const userButton = userAnswer === 'parsley' ? elements.parsleyBtn : elements.corianderBtn;
    const correctButton = correctAnswer === 'parsley' ? elements.parsleyBtn : elements.corianderBtn;

    if (isCorrect) {
        userButton.classList.add('correct');
    } else {
        userButton.classList.add('incorrect');
        correctButton.classList.add('correct');
    }

    // Show feedback
    showFeedback(isCorrect, correctAnswer);

    // Show next button
    elements.nextBtn.style.display = 'block';

    // Hide answer reveal if in learn mode
    elements.answerReveal.style.display = 'none';
}

// Show feedback message
function showFeedback(isCorrect, correctAnswer) {
    elements.feedback.style.display = 'block';
    elements.feedback.className = 'feedback ' + (isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
        elements.feedbackMessage.textContent = '✓ Correct!';
        elements.feedbackDescription.textContent = `Well done! That was ${correctAnswer}.`;
    } else {
        elements.feedbackMessage.textContent = '✗ Incorrect';
        elements.feedbackDescription.textContent = `That was actually ${correctAnswer}. ${gameState.currentImage.description}`;
    }
}

// Update score display
function updateScoreDisplay() {
    const { correct, total } = gameState.score;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    elements.scoreDisplay.textContent = `${correct} / ${total}`;
    elements.accuracyDisplay.textContent = `${accuracy}%`;
}

// Initialize the game when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
