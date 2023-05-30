const $nextButton = document.querySelector(".slider-next");
const $preButton = document.querySelector(".slider-pre");
const $sliderDots = document.querySelector(".slider-dots");
const $sliderMain = document.querySelector(".slider-main");
const Direction = {
  Next: 1,
  Previous: -1,
};
let positionX = 0;
let index = 0;
let timeInterval;
let numberSlider = 5;
let listDots = [];

generateSlider(numberSlider);

function removeSlider(numberSlider) {
  let listDots = document.querySelectorAll("li");
  let listSlides = document.getElementsByClassName("slider-item");

  if (listDots.length > 0) {
    listDots.forEach((dot) => {
      dot.parentNode.removeChild(dot);
    });

    if (listDots.length > numberSlider) {
      for (let i = listSlides.length - 1; i >= numberSlider; i--) {
        listSlides[i].remove();
      }
    } else {
      for (let i = listSlides.length - 1; i >= 0; i--) {
        listSlides[i].remove();
      }
    }
  }
}

function generateSlider(numberSlider) {
  removeSlider(numberSlider);
  for (i = 0; i < numberSlider; i++) {
    let li = document.createElement("li");
    li.classList.add("slider-dot-item");
    $sliderDots.appendChild(li);

    let slideItem = document.createElement("div");
    slideItem.classList.add("slider-item");
    slideItem.appendChild(document.createTextNode(i + 1));
    $sliderMain.appendChild(slideItem);
  }
  setDot();
}

const $sliderItems = document.querySelectorAll(".slider-item");
const sliderItemWidth = $sliderItems[0].offsetWidth;

function setDot() {
  let dotItems = Array.from($sliderDots.children);
  listDots = [...dotItems];
  dotItems[0].classList.add("active");
  [...dotItems].forEach((item) =>
    item.addEventListener("click", function (e) {
      [...dotItems].forEach((el) => el.classList.remove("active"));
      e.target.classList.add("active");
      const slideIndex = dotItems.indexOf(item);
      index = slideIndex;
      positionX = -1 * index * sliderItemWidth;
      $sliderMain.style = `transform: translateX(${positionX}px)`;
    })
  );
}

function onSubmit() {
  let inputValue = document.getElementById("numberSlide").value;
  numberSlider = inputValue > 0 ? inputValue : 1;
  generateSlider(numberSlider);
}

$nextButton.addEventListener("click", function () {
  handleChangeSlide(Direction.Next);
});

$preButton.addEventListener("click", function () {
  handleChangeSlide(Direction.Previous);
});

function next() {
  if (index >= numberSlider - 1) {
    index = 0;
    positionX = 0;
  } else {
    positionX = positionX - sliderItemWidth;
    index++;
  }
}

function previous() {
  if (index <= 0) {
    index = numberSlider - 1;
    positionX = -1 * index * sliderItemWidth;
  } else {
    positionX = positionX + sliderItemWidth;
    index--;
  }
}

function handleChangeSlide(direction) {
  if (direction === Direction.Next) {
    next();
  } else if (direction === Direction.Previous) {
    previous();
  }
  $sliderMain.style = `transform: translateX(${positionX}px)`;
  [...listDots].forEach((el) => el.classList.remove("active"));
  listDots[index].classList.add("active");
}

function autoSliding() {
  timeInterval = setInterval(timer, 1500);
  function timer() {
    handleChangeSlide(Direction.Next);
  }
}

autoSliding();

function mouseoverSlider() {
  clearInterval(timeInterval);
}
