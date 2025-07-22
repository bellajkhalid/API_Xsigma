// XSigma Theme Enhancement for Sphinx Documentation

(function() {
    'use strict';
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initXSigmaTheme);
    } else {
        initXSigmaTheme();
    }
    
    function initXSigmaTheme() {
        // Inject custom CSS
        injectCustomCSS();

        // Add back to home button
        addBackToHomeButton();

        // Enhance navigation
        enhanceNavigation();

        // Hook into existing theme system
        hookIntoExistingTheme();
    }
    
    function injectCustomCSS() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/sphinx-doc/xsigma-style.css';
        document.head.appendChild(link);
    }
    
    function addBackToHomeButton() {
        const backButtonHTML = `
            <div id="back-to-home-header" style="
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                background: linear-gradient(135deg, #00ff88 0%, #22c55e 100%);
                color: white;
                padding: 8px 16px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
                transition: all 0.3s ease;
                font-family: 'Geist', sans-serif;
                font-size: 14px;
                backdrop-filter: blur(10px);
            ">
                🏠 Back to XSigma
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', backButtonHTML);

        const backButton = document.getElementById('back-to-home-header');

        // Back button functionality
        backButton.addEventListener('click', function() {
            window.location.href = '/';
        });

        // Hover effects for back button
        backButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(0, 255, 136, 0.4)';
        });

        backButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 255, 136, 0.3)';
        });
    }

    function hookIntoExistingTheme() {
        // Hook into the existing Sphinx theme system
        const themeButtons = document.querySelectorAll('.theme-toggle');

        // Apply our custom styles based on current theme
        function applyCustomTheme() {
            const currentTheme = document.body.dataset.theme;
            const body = document.body;

            if (currentTheme === 'dark') {
                body.classList.remove('light-mode');
                body.style.background = 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)';
                body.style.color = '#ffffff';
            } else if (currentTheme === 'light') {
                body.classList.add('light-mode');
                body.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)';
                body.style.color = '#1f2937';
            } else {
                // Auto mode - detect system preference
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (prefersDark) {
                    body.classList.remove('light-mode');
                    body.style.background = 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)';
                    body.style.color = '#ffffff';
                } else {
                    body.classList.add('light-mode');
                    body.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)';
                    body.style.color = '#1f2937';
                }
            }

            // Update navigation colors
            updateNavigationColors();
        }

        // Apply theme on load
        applyCustomTheme();

        // Listen for theme changes
        themeButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Small delay to let the theme change take effect
                setTimeout(applyCustomTheme, 50);
            });
        });

        // Listen for system theme changes in auto mode
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
            if (document.body.dataset.theme === 'auto') {
                applyCustomTheme();
            }
        });

        function updateNavigationColors() {
            const isLightMode = document.body.classList.contains('light-mode');
            const navLinks = document.querySelectorAll('.sphinxsidebar a, .toctree-wrapper a, .sidebar-tree a');

            navLinks.forEach(link => {
                if (isLightMode) {
                    link.style.color = '#374151';
                } else {
                    link.style.color = '#ffffff';
                }
            });
        }
    }
    
    function enhanceNavigation() {
        // Add hover effects to navigation links
        const navLinks = document.querySelectorAll('.sphinxsidebar a, .toctree-wrapper a, .sidebar-tree a');

        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
                this.style.color = '#00ff88';
            });

            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                // Restore original color based on current theme
                const isLightMode = document.body.classList.contains('light-mode');
                this.style.color = isLightMode ? '#374151' : '#ffffff';
            });
        });
    }
    
})();
