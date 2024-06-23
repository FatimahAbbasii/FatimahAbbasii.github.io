document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'OddHFyuSzeofUaPALP984l7owasNkQI8QHumG1HC1quiu2q9ztzR3A0T';
    const homeImageId = '4275885';
    const blogImageIds = ['3278215', '428365'];

    const fetchImage = async (photoId) => {
        const response = await fetch(`https://api.pexels.com/v1/photos/${photoId}`, {
            headers: {
                Authorization: apiKey
            }
        });
        const data = await response.json();
        return {
            imageUrl: data.src.original,
            photographer: data.photographer
        };
    };

    const loadImages = async () => {
        const [homeImageData, blogImageData1, blogImageData2] = await Promise.all([
            fetchImage(homeImageId),
            fetchImage(blogImageIds[0]),
            fetchImage(blogImageIds[1])
        ]);

        const homeImage = document.getElementById('homeImage');
        const homePhotographer = document.getElementById('homePhotographer');
        if (homeImage) {
            homeImage.src = homeImageData.imageUrl;
            homePhotographer.textContent = `Photo by ${homeImageData.photographer}`;
        }

        const blogImage1 = document.getElementById('blogImage1');
        const photographer1 = document.getElementById('photographer1');
        if (blogImage1) {
            blogImage1.src = blogImageData1.imageUrl;
            photographer1.textContent = `Photo by ${blogImageData1.photographer}`;
        }

        const blogImage2 = document.getElementById('blogImage2');
        const photographer2 = document.getElementById('photographer2');
        if (blogImage2) {
            blogImage2.src = blogImageData2.imageUrl;
            photographer2.textContent = `Photo by ${blogImageData2.photographer}`;
        }
    };

    loadImages();
});

function toggleReadMore(blogNumber) {
    const moreText = document.querySelector(`.read-more-${blogNumber}`);
    const button = event.target;

    if (moreText.classList.contains('hidden')) {
        moreText.classList.remove('hidden');
        button.textContent = 'Read Less';
    } else {
        moreText.classList.add('hidden');
        button.textContent = 'Read More';
    }
}
