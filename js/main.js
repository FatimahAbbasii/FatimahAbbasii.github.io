document.addEventListener("DOMContentLoaded", () => {
  const CONFIG = {
    API_KEY: "OddHFyuSzeofUaPALP984l7owasNkQI8QHumG1HC1quiu2q9ztzR3A0T",
    IMAGE_IDS: {
      HOME: "4275885",
      BLOG: ["3278215", "428365"],
    },
  };

  const fetchImage = async (photoId) => {
    const response = await fetch(
      `https://api.pexels.com/v1/photos/${photoId}`,
      {
        headers: {
          Authorization: CONFIG.API_KEY,
        },
      }
    );
    const data = await response.json();
    return {
      imageUrl: data.src.original,
      photographer: data.photographer,
    };
  };

  const renderImage = (imageId, photographerId, imageData) => {
    const imageElement = document.getElementById(imageId);
    const photographerElement = document.getElementById(photographerId);
    if (imageElement) {
      imageElement.src = imageData.imageUrl;
      photographerElement.textContent = `Photo by ${imageData.photographer}`;
    }
  };

  const renderHomeImage = (imageData) => {
    renderImage("homeImage", "homePhotographer", imageData);
  };

  const renderBlogImages = (imageData1, imageData2) => {
    renderImage("blogImage1", "photographer1", imageData1);
    renderImage("blogImage2", "photographer2", imageData2);
  };

  const loadImages = async () => {
    const [homeImageData, blogImageData1, blogImageData2] = await Promise.all([
      fetchImage(CONFIG.IMAGE_IDS.HOME),
      fetchImage(CONFIG.IMAGE_IDS.BLOG[0]),
      fetchImage(CONFIG.IMAGE_IDS.BLOG[1]),
    ]);

    renderHomeImage(homeImageData);
    renderBlogImages(blogImageData1, blogImageData2);
  };

  loadImages();
});

function toggleReadMore(blogNumber) {
  const moreText = document.querySelector(`.read-more-${blogNumber}`);
  const button = event.target;

  if (moreText.classList.contains("hidden")) {
    moreText.classList.remove("hidden");
    button.textContent = "Read Less";
  } else {
    moreText.classList.add("hidden");
    button.textContent = "Read More";
  }
}
