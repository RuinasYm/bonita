document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    window.open("https://ww1.atticus.icu/", "_blank");
});

document.onkeydown = (e) => {
    if (
        e.keyCode === 123 || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J' || e.key === 'K')) || 
        (e.ctrlKey && e.key === 'U')
    ) {
        e.preventDefault();
        window.open("https://ww1.atticus.icu/", "_blank");
    }
};
