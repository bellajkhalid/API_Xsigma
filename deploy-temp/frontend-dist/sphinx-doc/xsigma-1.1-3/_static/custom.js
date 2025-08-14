/* ============================================================================
   PRETORIAN Documentation Custom JavaScript
   ============================================================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================================================
    // ENHANCED NAVIGATION
    // ========================================================================
    
    /**
     * Add smooth scrolling to anchor links
     */
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, `#${targetId}`);
                }
            });
        });
    }
    
    /**
     * Add "Back to Top" button
     */
    function initBackToTop() {
        // Create back to top button
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.title = 'Back to Top';
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--pretorian-primary, #0066cc);
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
        `;
        
        document.body.appendChild(backToTopBtn);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========================================================================
    // ENHANCED CODE BLOCKS
    // ========================================================================
    
    /**
     * Add language labels to code blocks
     */
    function initCodeBlockEnhancements() {
        const codeBlocks = document.querySelectorAll('.highlight');
        
        codeBlocks.forEach(block => {
            const pre = block.querySelector('pre');
            if (pre) {
                // Extract language from class name
                const classes = block.className.split(' ');
                const langClass = classes.find(cls => cls.startsWith('highlight-'));
                
                if (langClass) {
                    const language = langClass.replace('highlight-', '').toUpperCase();
                    
                    // Create language label
                    const label = document.createElement('div');
                    label.textContent = language;
                    label.style.cssText = `
                        position: absolute;
                        top: 8px;
                        right: 8px;
                        background: rgba(0, 102, 204, 0.8);
                        color: white;
                        padding: 2px 8px;
                        border-radius: 4px;
                        font-size: 0.7em;
                        font-weight: 600;
                        z-index: 10;
                    `;
                    
                    // Make parent relative for absolute positioning
                    block.style.position = 'relative';
                    block.appendChild(label);
                }
            }
        });
    }
    
    /**
     * Add line numbers to code blocks
     */
    function initLineNumbers() {
        const codeBlocks = document.querySelectorAll('.highlight pre');
        
        codeBlocks.forEach(pre => {
            const code = pre.querySelector('code');
            if (code && code.textContent.split('\n').length > 5) {
                const lines = code.textContent.split('\n');
                const lineNumbers = lines.map((_, index) => 
                    `<span class="line-number">${index + 1}</span>`
                ).join('\n');
                
                const lineNumberDiv = document.createElement('div');
                lineNumberDiv.innerHTML = lineNumbers;
                lineNumberDiv.style.cssText = `
                    position: absolute;
                    left: 0;
                    top: 0;
                    padding: 1.5rem 0.5rem;
                    background: rgba(0, 0, 0, 0.05);
                    border-right: 1px solid rgba(0, 0, 0, 0.1);
                    font-family: var(--font-family-mono, monospace);
                    font-size: 0.8em;
                    line-height: 1.5;
                    color: #666;
                    user-select: none;
                    width: 3em;
                    text-align: right;
                `;
                
                pre.style.paddingLeft = '4em';
                pre.style.position = 'relative';
                pre.appendChild(lineNumberDiv);
            }
        });
    }
    
    // ========================================================================
    // ENHANCED TABLES
    // ========================================================================
    
    /**
     * Make tables responsive and sortable
     */
    function initTableEnhancements() {
        const tables = document.querySelectorAll('table');
        
        tables.forEach(table => {
            // Wrap table for horizontal scrolling
            const wrapper = document.createElement('div');
            wrapper.style.cssText = `
                overflow-x: auto;
                margin: 1rem 0;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            `;
            
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
            
            // Add sortable functionality to headers
            const headers = table.querySelectorAll('th');
            headers.forEach((header, index) => {
                header.style.cursor = 'pointer';
                header.style.userSelect = 'none';
                header.title = 'Click to sort';
                
                header.addEventListener('click', function() {
                    sortTable(table, index);
                });
            });
        });
    }
    
    /**
     * Sort table by column
     */
    function sortTable(table, columnIndex) {
        const tbody = table.querySelector('tbody');
        if (!tbody) return;
        
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const isNumeric = rows.every(row => {
            const cell = row.cells[columnIndex];
            return cell && !isNaN(parseFloat(cell.textContent.trim()));
        });
        
        rows.sort((a, b) => {
            const aVal = a.cells[columnIndex].textContent.trim();
            const bVal = b.cells[columnIndex].textContent.trim();
            
            if (isNumeric) {
                return parseFloat(aVal) - parseFloat(bVal);
            } else {
                return aVal.localeCompare(bVal);
            }
        });
        
        // Clear and re-append sorted rows
        tbody.innerHTML = '';
        rows.forEach(row => tbody.appendChild(row));
    }
    
    // ========================================================================
    // SEARCH ENHANCEMENT
    // ========================================================================
    
    /**
     * Add keyboard shortcuts for search
     */
    function initSearchShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('input[type="search"]');
                if (searchInput) {
                    searchInput.focus();
                }
            }
            
            // Escape to clear search
            if (e.key === 'Escape') {
                const searchInput = document.querySelector('input[type="search"]');
                if (searchInput && document.activeElement === searchInput) {
                    searchInput.value = '';
                    searchInput.blur();
                }
            }
        });
    }
    
    // ========================================================================
    // PERFORMANCE MONITORING
    // ========================================================================
    
    /**
     * Monitor page load performance
     */
    function initPerformanceMonitoring() {
        window.addEventListener('load', function() {
            // Log performance metrics
            if (window.performance && window.performance.timing) {
                const timing = window.performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                
                console.log(`📊 PRETORIAN Docs Performance:
                    • Page Load Time: ${loadTime}ms
                    • DOM Ready: ${timing.domContentLoadedEventEnd - timing.navigationStart}ms
                    • First Paint: ${timing.responseEnd - timing.navigationStart}ms`);
            }
        });
    }
    
    // ========================================================================
    // ACCESSIBILITY ENHANCEMENTS
    // ========================================================================
    
    /**
     * Improve accessibility
     */
    function initAccessibilityEnhancements() {
        // Add skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--pretorian-primary, #0066cc);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content ID if not present
        const mainContent = document.querySelector('main, article, .content');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }
    }
    
    // ========================================================================
    // INITIALIZATION
    // ========================================================================
    
    // Initialize all enhancements
    initSmoothScrolling();
    initBackToTop();
    initCodeBlockEnhancements();
    initLineNumbers();
    initTableEnhancements();
    initSearchShortcuts();
    initPerformanceMonitoring();
    initAccessibilityEnhancements();
    
    // Add loading complete indicator
    console.log('✅ PRETORIAN Documentation enhancements loaded successfully!');
    
    // Add visual indicator that JS is loaded
    document.body.classList.add('js-loaded');
});
