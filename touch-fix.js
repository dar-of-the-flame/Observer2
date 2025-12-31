// touch-fix.js - Исправление проблем с касанием на мобильных

document.addEventListener('DOMContentLoaded', function() {
    // Предотвращаем zoom при двойном касании
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Предотвращаем контекстное меню при долгом касании
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // Исправляем :active состояние на iOS
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    // Улучшаем реакцию на касания
    if ('ontouchstart' in window) {
        // Добавляем класс для стилей касания
        document.body.classList.add('touch-device');
        
        // Исправляем задержку на iOS
        document.addEventListener('touchstart', function(e) {
            if (e.target.tagName === 'BUTTON' || 
                e.target.tagName === 'A' || 
                e.target.closest('button') || 
                e.target.closest('a')) {
                e.target.classList.add('touched');
                setTimeout(() => {
                    if (e.target) e.target.classList.remove('touched');
                }, 300);
            }
        });
    }
    
    // Фиксируем высоту на мобильных устройствах
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
});
