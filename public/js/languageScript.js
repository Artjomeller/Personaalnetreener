function setLanguageCookie(language) {
    document.cookie = `language=${language}; path=/; max-age=31536000`;
}

document.getElementById('et-language').addEventListener('click', function () {
    document.cookie = `language=et; path=/; max-age=31536000`;
});

document.getElementById('ru-language').addEventListener('click', function () {
    document.cookie = `language=ru; path=/; max-age=31536000`;
});