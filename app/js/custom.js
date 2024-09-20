document.addEventListener("DOMContentLoaded", () => {
    let cardOne, cardTwo;
    let disableDeck;
    let cardsMatched = 0;
    const cardsContainer = document.querySelector(".cards");
    const cards = document.querySelectorAll(".card");
    const cardsArray = Array.from(cards);

    function shuffleCard(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    const shuffleCards = shuffleCard(cardsArray);
    shuffleCards.forEach((cardShuffled) =>
        cardsContainer.appendChild(cardShuffled)
    );

    cards.forEach((card) => card.addEventListener("click", flipCard));

    function flipCard() {
        if (disableDeck || this === cardOne) return;
        this.classList.add("flip");
        if (!cardOne) {
            cardOne = this;
        } else {
            cardTwo = this;
            disableDeck = true;
            let cardOneImg = cardOne.querySelector(".back-img").src,
                cardTwoImg = cardTwo.querySelector(".back-img").src;
            matchCards(cardOneImg, cardTwoImg);
        }
    }
    function matchCards(imageOne, imageTwo) {
        if (imageOne === imageTwo) {
            cardsMatched++;
            console.log(cardsMatched);
            if (cardsMatched === 8) {
                return endGame();
            }
            disableCards();
        } else {
            setTimeout(() => {
                cardOne.classList.add("shake");
                cardTwo.classList.add("shake");
            }, 400);
            setTimeout(() => {
                cardOne.classList.remove("flip", "shake");
                cardTwo.classList.remove("flip", "shake");
                cardOne = cardTwo = "";
                disableDeck = false;
            }, 1000);
        }
    }
    function disableCards() {
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        disableDeck = false;
        cardOne = cardTwo = "";
    }
    // function endGame() {
    //     // cards.classList.remove("flip");
    // }
});
