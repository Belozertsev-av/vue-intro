"use strict"

const ratings = document.querySelectorAll('.feedback__rating');
if (ratings.length > 0) {
    initRatings();
}
function initRatings() {
    let ratingActive;
    for (let i = 0; i < ratings.length; i++) {
        const rating = ratings[i];
        initRating(rating);
    }
    function initRating(rating) {
        initRatingActive(rating);
        setRatingActiveWidth();
        if (rating.classList.contains('rating_set')) {
            setRating(rating);
        }
    }
    function initRatingActive(rating) {
        ratingActive = rating.querySelector('.rating__active');
    }
    function setRatingActiveWidth(index = 0) {
        const ratingActiveWidth = index / 0.05;
        ratingActive.style.width = `${ratingActiveWidth}%`;
    }
    function setRating(rating) {
        const ratingItems = rating.querySelectorAll('.rating__item');

        for (let i = 0; i < ratingItems.length; i++) {
            const ratingItem = ratingItems[i];
            ratingItem.addEventListener("mouseenter", function (e) {
                initRatingActive(rating);
                setRatingActiveWidth(ratingItem.value);
            });
            ratingItem.addEventListener("click", function (e) {
                initRatingActive(rating);
                setRatingActiveWidth(ratingItem.value);
            });
            ratingItem.addEventListener("mouseleave", function (e) {
                initRatingActive(rating);
                const inp = rating.querySelectorAll('.rating__item');
                for (var i = 0; i < inp.length; i++) {
                    if (!inp[0].checked && !inp[1].checked && !inp[2].checked && !inp[3].checked && !inp[4].checked) {
                        setRatingActiveWidth();
                    }
                    if (inp[i].checked == true) {
                        setRatingActiveWidth(inp[i].value);
                    }
                }
            });

        }
    }

}
