document.querySelectorAll(".grid-item img, .carousel__item img, .carousel__item2 img").forEach(image => {
    image.addEventListener("pointermove", event => {
        const x = Math.max(0, Math.min(100, (event.offsetX / image.clientWidth) * 100));
        const y = Math.max(0, Math.min(100, (event.offsetY / image.clientHeight) * 100));
        image.style.setProperty("--zoom-x", `${x}%`);
        image.style.setProperty("--zoom-y", `${y}%`);
    });

    image.addEventListener("pointerleave", () => {
        image.style.removeProperty("--zoom-x");
        image.style.removeProperty("--zoom-y");
    });
});

document.querySelectorAll(".carousel").forEach(carousel => {

    const items = carousel.querySelectorAll(".carousel__item");
    const buttonsHtml = Array.from(items, () => {
        return `<span class="carousel__button"></span>`;
    });

    carousel.insertAdjacentHTML("beforeend", `
        
       <div class="carousel__nav"> 
       ${ buttonsHtml.join("") }
        </div>
    `);

    const buttons = carousel.querySelectorAll(".carousel__button");

    buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
        items.forEach(item => item.classList.remove("carousel__item--selected"));
        buttons.forEach(button => button.classList.remove("carousel__button--selected"));

        items[i].classList.add("carousel__item--selected");
        button.classList.add("carousel__button--selected");
        });
    });
        items[0].classList.add("carousel__item--selected");
        buttons[0].classList.add("carousel__button--selected");
});

document.querySelectorAll(".carousel2").forEach(carousel => {

    const items = carousel.querySelectorAll(".carousel__item2");
    const buttonsHtml = Array.from(items, () => {
        return `<span class="carousel__button2"></span>`;
    });

    carousel.insertAdjacentHTML("beforeend", `
        
       <div class="carousel__nav2"> 
       ${ buttonsHtml.join("") }
        </div>
    `);

    const buttons = carousel.querySelectorAll(".carousel__button2");

    buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
        items.forEach(item => item.classList.remove("carousel__item--selected2"));
        buttons.forEach(button => button.classList.remove("carousel__button--selected2"));

        items[i].classList.add("carousel__item--selected2");
        button.classList.add("carousel__button--selected2");
        });
    });
        items[0].classList.add("carousel__item--selected2");
        buttons[0].classList.add("carousel__button--selected2");
});