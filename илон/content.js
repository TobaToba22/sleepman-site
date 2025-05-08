// content.js — вставь это в своё расширение

console.log("Elon Chat Visual Patch Activated");

// Константы
const TARGET_USERNAME = '@DpdododK39734';
const REPLACE_USERNAME = '@elonmusk';
const DEBOUNCE_DELAY = 1;

// SVG для синей галочки
const VERIFIED_BADGE_SVG = `
    <svg viewBox="0 0 24 24" aria-label="Verified account" width="18" height="18" style="display:inline-block;vertical-align:middle;">
        <g>
            <path fill="#1d9bf0" d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
        </g>
    </svg>
`;

// Debounce функция
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// Рекурсивная замена только в текстовых узлах
function replaceInTextNodes(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.includes(TARGET_USERNAME)) {
            const parts = node.textContent.split(TARGET_USERNAME);
            const frag = document.createDocumentFragment();
            parts.forEach((part, idx) => {
                if (part) frag.appendChild(document.createTextNode(part));
                if (idx < parts.length - 1) {
                    // Вставляем handle с бейджем
                    const handleSpan = document.createElement('span');
                    handleSpan.textContent = REPLACE_USERNAME;
                    handleSpan.style.display = 'inline';
                    // SVG-бейдж
                    const badge = document.createElement('span');
                    badge.className = 'elon-verified-badge';
                    badge.style.display = 'inline-block';
                    badge.style.verticalAlign = 'middle';
                    badge.style.marginLeft = '2px';
                    badge.innerHTML = VERIFIED_BADGE_SVG;
                    handleSpan.appendChild(badge);
                    frag.appendChild(handleSpan);
                }
            });
            node.replaceWith(frag);
        }
    } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes) {
        node.childNodes.forEach(replaceInTextNodes);
    }
}

function onBodyReady(callback) {
    if (document.body) {
        callback();
    } else {
        new MutationObserver((_, obs) => {
            if (document.body) {
                obs.disconnect();
                callback();
            }
        }).observe(document.documentElement, {childList: true});
    }
}

// Селекторы блоков, где появляется handle (Messages, профиль, диалоги)
const BLOCK_SELECTORS = [
    '[data-testid="DMDrawer"]', // Messages/чаты
    '[data-testid="primaryColumn"]', // Профиль и основной контент
    '[role="dialog"]' // Всплывающие окна
];

function hideTargetBlocks() {
    BLOCK_SELECTORS.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            el.style.visibility = 'hidden';
        });
    });
}

function showTargetBlocks() {
    BLOCK_SELECTORS.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            el.style.visibility = '';
        });
    });
}

onBodyReady(() => {
    // Скрываем только нужные блоки
    hideTargetBlocks();

    const debouncedReplace = debounce(() => {
        replaceInTextNodes(document.body);
    }, DEBOUNCE_DELAY);

    const observer = new MutationObserver(debouncedReplace);
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });

    // Первая замена и показ блоков
    replaceInTextNodes(document.body);
    showTargetBlocks();
});
  