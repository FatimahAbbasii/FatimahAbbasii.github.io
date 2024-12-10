import { toggleReadMore } from "../js/main.js";

beforeAll(() => {
    document.addEventListener = jest.fn();
});


describe("toggleReadMore", () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <span class="read-more-1 hidden">Extra Content</span>
            <button id="toggleButton">Read More</button>
        `;
        global.event = { target: document.getElementById("toggleButton") };
    });

    test("should show more content and update button text", () => {
        toggleReadMore(1);

        const moreText = document.querySelector(".read-more-1");
        const button = event.target;

        expect(moreText.classList.contains("hidden")).toBe(false);
        expect(button.textContent).toBe("Read Less");
    });

    test("should hide more content and update button text", () => {
        const moreText = document.querySelector(".read-more-1");
        moreText.classList.remove("hidden");

        toggleReadMore(1);

        const button = event.target;
        expect(moreText.classList.contains("hidden")).toBe(true);
        expect(button.textContent).toBe("Read More");
    });
});
