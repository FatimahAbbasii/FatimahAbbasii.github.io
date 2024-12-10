import { renderImage } from "../js/main.js";

beforeAll(() => {
    document.addEventListener = jest.fn();
});

describe("renderImage", () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <img id="testImage" src="" />
            <p id="testPhotographer"></p>
        `;
    });

    test("should update the DOM with valid image data", () => {
        const testData = { imageUrl: "https://example.com/image.jpg", photographer: "Jane Doe" };

        renderImage("testImage", "testPhotographer", testData);

        const imageElement = document.getElementById("testImage");
        const photographerElement = document.getElementById("testPhotographer");

        expect(imageElement.src).toBe(testData.imageUrl);
        expect(photographerElement.textContent).toBe(`Photo by ${testData.photographer}`);
    });

    test("should handle missing image data gracefully", () => {
        const testData = { imageUrl: "", photographer: "Unknown" };

        renderImage("testImage", "testPhotographer", testData);

        const imageElement = document.getElementById("testImage");
        const photographerElement = document.getElementById("testPhotographer");

        expect(imageElement.src).toContain("default-image.jpg");
        expect(photographerElement.textContent).toBe(`Photo by ${testData.photographer}`);
    });
});
