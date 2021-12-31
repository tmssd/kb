// Improving images in docs(https://github.com/squidfunk/mkdocs-material/issues/1635)
document.querySelectorAll('.zoom').forEach(item => {
    item.addEventListener('click', function () {
        this.classList.toggle('image-zoom-large');
    })
});

const video = document.querySelector('video');

video.addEventListener('seeking', (event) => {
    console.log('Video is seeking a new position.');
});

video.onseeking = (event) => {
    console.log('Video is seeking a new position.');
};
