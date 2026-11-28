function setupCarousel({
    carouselSelector,
    itemSelector,
    itemSelectedClass,
    navSelector,
    buttonSelector,
    buttonSelectedClass
}) {
    document.querySelectorAll(carouselSelector).forEach(carousel => {
        const items = Array.from(carousel.querySelectorAll(itemSelector));
        if (!items.length) return;

        let nav = carousel.querySelector(navSelector);
        if (!nav) {
            nav = document.createElement("div");
            nav.className = navSelector.slice(1);
            carousel.appendChild(nav);
        }

        nav.replaceChildren(...items.map(() => {
            const button = document.createElement("span");
            button.className = buttonSelector.slice(1);
            button.setAttribute("role", "button");
            button.setAttribute("tabindex", "0");
            return button;
        }));

        const buttons = Array.from(nav.querySelectorAll(buttonSelector));
        let selectedIndex = 0;

        const previousButton = document.createElement("button");
        previousButton.type = "button";
        previousButton.className = "carousel__arrow carousel__arrow--previous";
        previousButton.setAttribute("aria-label", "Previous slide");

        const nextButton = document.createElement("button");
        nextButton.type = "button";
        nextButton.className = "carousel__arrow carousel__arrow--next";
        nextButton.setAttribute("aria-label", "Next slide");

        carousel.append(previousButton, nextButton);

        const selectSlide = index => {
            const normalizedIndex = (index + items.length) % items.length;
            items.forEach(item => item.classList.remove(itemSelectedClass));
            buttons.forEach(button => button.classList.remove(buttonSelectedClass));

            items[normalizedIndex].classList.add(itemSelectedClass);
            buttons[normalizedIndex].classList.add(buttonSelectedClass);
            selectedIndex = normalizedIndex;
        };

        previousButton.addEventListener("click", () => selectSlide(selectedIndex - 1));
        nextButton.addEventListener("click", () => selectSlide(selectedIndex + 1));

        buttons.forEach((button, index) => {
            const activate = () => selectSlide(index);
            button.addEventListener("click", activate);
            button.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    activate();
                }
            });
        });

        selectSlide(0);

        let pointerStartX = null;
        let pointerStartY = null;

        carousel.addEventListener("pointerdown", event => {
            if (event.button !== 0 || event.target.closest(buttonSelector)) return;
            pointerStartX = event.clientX;
            pointerStartY = event.clientY;
            carousel.setPointerCapture(event.pointerId);
        });

        carousel.addEventListener("pointerup", event => {
            if (pointerStartX === null || pointerStartY === null) return;

            const deltaX = event.clientX - pointerStartX;
            const deltaY = event.clientY - pointerStartY;
            pointerStartX = null;
            pointerStartY = null;

            if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) return;
            selectSlide(selectedIndex + (deltaX < 0 ? 1 : -1));
        });

        carousel.addEventListener("pointercancel", () => {
            pointerStartX = null;
            pointerStartY = null;
        });

        carousel.addEventListener("dragstart", event => event.preventDefault());
        carousel.addEventListener("keydown", event => {
            if (event.key === "ArrowLeft") selectSlide(selectedIndex - 1);
            if (event.key === "ArrowRight") selectSlide(selectedIndex + 1);
        });

        carousel.setAttribute("tabindex", "0");
        carousel.setAttribute("aria-label", "Image carousel");
    });
}

setupCarousel({
    carouselSelector: ".carousel",
    itemSelector: ".carousel__item",
    itemSelectedClass: "carousel__item--selected",
    navSelector: ".carousel__nav",
    buttonSelector: ".carousel__button",
    buttonSelectedClass: "carousel__button--selected"
});

setupCarousel({
    carouselSelector: ".carousel2",
    itemSelector: ".carousel__item2",
    itemSelectedClass: "carousel__item--selected2",
    navSelector: ".carousel__nav2",
    buttonSelector: ".carousel__button2",
    buttonSelectedClass: "carousel__button--selected2"
});