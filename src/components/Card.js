function Card( {onCardClick, card, }) {

    function handleClick() {
        onCardClick(card);
    }

    return (
        <article className="card">

            <button className="card__delete"
                type="button"
                aria-label="Удаление карточки"></button>

            <img className="card__image"
                alt="Картинка"
                src={card.link}
                onClick={handleClick} />

            <div className="card__group">

                <h2 className="card__title">
                    {card.name}
                </h2>
                <button className="card__button"
                    type="button"
                    aria-label="Лайк"></button>

                <p className="card__counter">
                    {card.likes.length}
                </p>

            </div>
        </article>
    )

};

export default Card;