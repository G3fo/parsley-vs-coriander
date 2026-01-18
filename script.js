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
    usedImages: [],
    questionsAnswered: 0,
    maxQuestions: 20
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
    // Check if quiz is complete
    if (gameState.questionsAnswered >= gameState.maxQuestions) {
        showCompletion();
        return;
    }

    // Reset state
    gameState.answerSubmitted = false;
    elements.feedback.style.display = 'none';
    elements.nextBtn.style.display = 'none';

    // Reset button states
    elements.parsleyBtn.disabled = false;
    elements.corianderBtn.disabled = false;
    elements.parsleyBtn.classList.remove('correct', 'incorrect');
    elements.corianderBtn.classList.remove('correct', 'incorrect');

    // Check if we have images left in pool
    if (gameState.imagePool.length === 0) {
        // Should not happen with max 20 questions, but just in case
        showCompletion();
        return;
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
    gameState.questionsAnswered++;

    const correctAnswer = gameState.currentImage.answer;
    const isCorrect = userAnswer === correctAnswer;

    // Update score (only if NOT in learn mode)
    if (!gameState.learnMode) {
        gameState.score.total++;
        if (isCorrect) {
            gameState.score.correct++;
        }
        updateScoreDisplay();
    }

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

    // Update next button text for last question
    if (gameState.questionsAnswered >= gameState.maxQuestions) {
        elements.nextBtn.textContent = 'See Results →';
    }

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
        let description = `Well done! That was ${correctAnswer}.`;
        if (gameState.learnMode) {
            description += ' (Not counted - Learn Mode)';
        }
        elements.feedbackDescription.textContent = description;
    } else {
        elements.feedbackMessage.textContent = '✗ Incorrect';
        let description = `That was actually ${correctAnswer}. ${gameState.currentImage.description}`;
        if (gameState.learnMode) {
            description += ' (Not counted - Learn Mode)';
        }
        elements.feedbackDescription.textContent = description;
    }
}

// Update score display
function updateScoreDisplay() {
    const { correct, total } = gameState.score;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    elements.scoreDisplay.textContent = `${correct} / ${total}`;
    elements.accuracyDisplay.textContent = `${accuracy}%`;
}

// Show completion screen
function showCompletion() {
    // Hide game elements
    elements.feedback.style.display = 'none';
    elements.nextBtn.style.display = 'none';
    elements.answerReveal.style.display = 'none';
    elements.parsleyBtn.style.display = 'none';
    elements.corianderBtn.style.display = 'none';
    elements.herbImage.style.display = 'none';
    elements.imageLoader.style.display = 'none';

    // Calculate final results
    const { correct, total } = gameState.score;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Determine performance message
    let performanceMessage = '';
    let performanceEmoji = '';

    if (gameState.learnMode || total === 0) {
        performanceMessage = 'You completed the quiz in Learn Mode!';
        performanceEmoji = '📚';
    } else if (accuracy === 100) {
        performanceMessage = 'Perfect score! You\'re a herb identification expert!';
        performanceEmoji = '🏆';
    } else if (accuracy >= 80) {
        performanceMessage = 'Excellent work! You know your herbs well!';
        performanceEmoji = '🌟';
    } else if (accuracy >= 60) {
        performanceMessage = 'Good job! Keep practicing to improve!';
        performanceEmoji = '👍';
    } else {
        performanceMessage = 'Nice try! Practice makes perfect!';
        performanceEmoji = '🌱';
    }

    // Create completion screen
    const completionHTML = `
        <div class="completion-screen">
            <h2>${performanceEmoji} Quiz Complete! ${performanceEmoji}</h2>
            <div class="completion-stats">
                ${!gameState.learnMode && total > 0 ? `
                    <div class="completion-stat">
                        <div class="stat-number">${correct}/${total}</div>
                        <div class="stat-label">Correct Answers</div>
                    </div>
                    <div class="completion-stat">
                        <div class="stat-number">${accuracy}%</div>
                        <div class="stat-label">Accuracy</div>
                    </div>
                ` : `
                    <div class="completion-stat">
                        <div class="stat-number">${gameState.questionsAnswered}</div>
                        <div class="stat-label">Questions Reviewed</div>
                    </div>
                `}
            </div>
            <p class="completion-message">${performanceMessage}</p>
            <button class="restart-btn" onclick="restartQuiz()">🔄 Try Again</button>
        </div>
    `;

    // Insert completion screen
    const gameArea = document.querySelector('.game-area');
    const existingCompletion = gameArea.querySelector('.completion-screen');
    if (existingCompletion) {
        existingCompletion.remove();
    }
    gameArea.insertAdjacentHTML('afterbegin', completionHTML);
}

// Restart the quiz
function restartQuiz() {
    // Reset game state
    gameState.currentImage = null;
    gameState.score.correct = 0;
    gameState.score.total = 0;
    gameState.answerSubmitted = false;
    gameState.questionsAnswered = 0;
    gameState.usedImages = [];

    // Reset UI
    elements.parsleyBtn.style.display = 'inline-block';
    elements.corianderBtn.style.display = 'inline-block';
    elements.herbImage.style.display = 'block';
    elements.nextBtn.textContent = 'Next Image →';

    // Remove completion screen
    const completionScreen = document.querySelector('.completion-screen');
    if (completionScreen) {
        completionScreen.remove();
    }

    // Update score display
    updateScoreDisplay();

    // Reload image pool and start fresh
    loadImagePool();
    loadNewImage();
}

// Initialize the game when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
