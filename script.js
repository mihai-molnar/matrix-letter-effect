document.addEventListener('DOMContentLoaded', () => {
    const inputTextElement = document.getElementById('inputText');
    const startButton = document.getElementById('startButton');
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    const controlsContainer = document.getElementById('controlsContainer');
    const toggleControlsButton = document.getElementById('toggleControlsButton');

    let animationId;
    let columns;
    let drops = [];
    let charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Default char set
    const fontSize = 16;

    function setupCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / fontSize);
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0f0'; // Green text
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            if (charSet.length === 0) continue; // Skip if no characters to draw
            const text = charSet[Math.floor(Math.random() * charSet.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    function startEffect() {
        const userInput = inputTextElement.value.trim();
        if (userInput.length > 0) {
            charSet = userInput;
        } else {
            // Use a default set if input is empty, or alert user
            // For now, let's stick to the default if input is empty after trying to start
            // Or, we can re-initialize to default if it was changed and now input is empty
            charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        }

        setupCanvas();

        if (animationId) {
            cancelAnimationFrame(animationId);
        }

        function animate() {
            drawMatrix();
            animationId = requestAnimationFrame(animate);
        }
        animate();

        // Hide controls and show toggle button
        controlsContainer.classList.add('hidden');
        toggleControlsButton.classList.remove('hidden');
    }

    startButton.addEventListener('click', startEffect);

    // Initial setup
    setupCanvas();
    // Optionally, start with a default effect or wait for user input
    // startEffect(); // Uncomment to start immediately with default chars

    window.addEventListener('resize', () => {
        if (animationId) { // Only re-setup if effect is running
            setupCanvas();
        }
    });

    toggleControlsButton.addEventListener('click', () => {
        controlsContainer.classList.remove('hidden');
        toggleControlsButton.classList.add('hidden');
    });
});
