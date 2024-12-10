document.addEventListener("DOMContentLoaded", () => {
    const CONFIG = {
      API_KEY: "OddHFyuSzeofUaPALP984l7owasNkQI8QHumG1HC1quiu2q9ztzR3A0T",
      IMAGE_IDS: {
        HOME: "28386055",
        BLOG: ["3278215", "5664518"],
      },
    };
  
    /**
     * Fetch image data from the Pexels API.
     * @param {string} photoId - The ID of the photo to fetch.
     * @returns {object} Image URL and photographer name.
     */
    const fetchImage = async (photoId) => {
      try {
        const response = await fetch(`https://api.pexels.com/v1/photos/${photoId}`, {
          headers: {
            Authorization: CONFIG.API_KEY,
          },
        });
  
        if (!response.ok) {
          console.error(`Error fetching image: ${response.statusText}`);
          return { imageUrl: "", photographer: "Unknown" };
        }
  
        const data = await response.json();
        return { imageUrl: data.src.original, photographer: data.photographer };
      } catch (error) {
        console.error(`Network error: ${error}`);
        return { imageUrl: "", photographer: "Unknown" };
      }
    };
  
    /**
     * Render an image and its photographer information.
     * @param {string} imageId - The DOM ID of the image element.
     * @param {string} photographerId - The DOM ID of the photographer element.
     * @param {object} imageData - The data containing image URL and photographer name.
     */
    const renderImage = (imageId, photographerId, imageData) => {
      const imageElement = document.getElementById(imageId);
      const photographerElement = document.getElementById(photographerId);
      if (imageElement) {
        imageElement.src = imageData.imageUrl || "default-image.jpg"; // Fallback image
        photographerElement.textContent = `Photo by ${imageData.photographer}`;
      }
    };
  
    /**
     * Render the home image.
     * @param {object} imageData - The image data for the home page.
     */
    const renderHomeImage = (imageData) => {
      renderImage("homeImage", "homePhotographer", imageData);
    };
  
    /**
     * Render the blog images.
     * @param {object} imageData1 - The first blog image data.
     * @param {object} imageData2 - The second blog image data.
     */
    const renderBlogImages = (imageData1, imageData2) => {
      renderImage("blogImage1", "photographer1", imageData1);
      renderImage("blogImage2", "photographer2", imageData2);
    };
  
    /**
     * Load and render all images.
     */
    const loadImages = async () => {
      try {
        const [homeImageData, blogImageData1, blogImageData2] = await Promise.all([
          fetchImage(CONFIG.IMAGE_IDS.HOME),
          fetchImage(CONFIG.IMAGE_IDS.BLOG[0]),
          fetchImage(CONFIG.IMAGE_IDS.BLOG[1]),
        ]);
  
        renderHomeImage(homeImageData);
        renderBlogImages(blogImageData1, blogImageData2);
      } catch (error) {
        console.error(`Error loading images: ${error}`);
      }
    };
  
    loadImages();
  });
  
  /**
   * Toggle the "Read More" section of a blog post.
   * @param {number} blogNumber - The number of the blog post to toggle.
   */
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
