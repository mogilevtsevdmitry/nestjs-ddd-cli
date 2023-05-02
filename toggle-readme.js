(function () {
    var language = localStorage.getItem('readme-language') || 'en';

    function toggleLanguage() {
        var toggleButton = document.getElementById('readme-toggle-button');
        var readmeContainer = document.getElementById('readme-container');

        if (language === 'en') {
            readmeContainer.innerHTML =
                '<!-- markdown start -->\n\n' + readme_ru_md_content + '\n\n<!-- markdown end -->';
            toggleButton.innerHTML = 'English';
            language = 'ru';
        } else {
            readmeContainer.innerHTML =
                '<!-- markdown start -->\n\n' + readme_en_md_content + '\n\n<!-- markdown end -->';
            toggleButton.innerHTML = 'Русский';
            language = 'en';
        }

        localStorage.setItem('readme-language', language);
    }

    document.getElementById('readme-toggle-button').addEventListener('click', toggleLanguage);

    if (language === 'ru') {
        toggleLanguage();
    }
})();
