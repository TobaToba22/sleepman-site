let userHasNFT = false;

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const introScreen = document.getElementById('intro-screen');
    const mainScreen = document.getElementById('main-screen');
    const terminal = document.getElementById('terminal');
    const decryptionKey = document.getElementById('decryptionKey');
    const unlockButton = document.getElementById('unlockButton');
    const accessDenied = document.getElementById('accessDenied');
    const mainUI = document.getElementById('mainUI');
    const lampZone = document.getElementById('lampZone');
    const terminalButton = document.querySelector('.terminal-button');
    const matrixTexts = document.querySelectorAll('.matrix-text');

    // Show intro screen first
    setTimeout(() => {
        introScreen.style.opacity = '0';
        setTimeout(() => {
            introScreen.classList.remove('active');
            mainScreen.classList.add('active');
            mainScreen.style.opacity = '1';
        }, 1000);
    }, 6000); // Total time for all typing animations

    // Handle secret zone click
    lampZone.addEventListener('click', () => {
        mainScreen.style.opacity = '0';
        setTimeout(() => {
            mainScreen.style.display = 'none';
            terminal.style.display = 'block';
            setTimeout(() => {
                terminal.style.opacity = '1';
                // Animate matrix text appearance
                matrixTexts.forEach((text, index) => {
                    setTimeout(() => {
                        text.style.animation = 'matrixAppear 0.5s ease-in forwards';
                    }, index * 200);
                });
            }, 50);
        }, 500);
    });

    // Terminal input logic
    unlockButton.addEventListener('click', () => {
        if (decryptionKey.value === 'protocol19') {
            // Correct key logic here
            console.log('Access granted');
        } else {
            // Store original terminal content
            const originalContent = terminal.innerHTML;
            
            // System failure animation
            terminal.innerHTML = `
                <div class="terminal-content">
                    <div class="terminal-text">
                        <span class="matrix-text" style="color: #ff0033">! MEMORY CORE BREACH</span><br><br>
                        <span class="matrix-text" style="color: #ff0033">&gt;&gt; Decryption key invalid.</span><br>
                        <span class="matrix-text" style="color: #ff0033">&gt;&gt; Emergency protocol engaged.</span><br>
                        <span class="matrix-text" style="color: #ff0033">&gt;&gt; Interface lockdown in progress...</span><br><br>
                        <span class="matrix-text" style="color: #ff0033">Rebooting security protocols...</span><br>
                        <span class="blink" style="color: #ff0033">█</span>
                    </div>
                </div>
            `;
            
            // Disable all interactive elements
            mainUI.style.pointerEvents = 'none';
            lampZone.style.pointerEvents = 'none';
            
            // Reboot sequence
            setTimeout(() => {
                // Restore original content
                terminal.innerHTML = originalContent;
                
                // Re-enable interactive elements
                mainUI.style.pointerEvents = 'auto';
                lampZone.style.pointerEvents = 'auto';
            }, 13000);
        }
    });

    // Allow Enter key to submit
    decryptionKey.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            unlockButton.click();
        }
    });

    // Add hover effect to buttons
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
}); 