function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <article className="card">

            <button className="card__delete"
                type="button"
                aria-label="Удаление карточки"></button>

            <img className="card__image"
                alt="Картинка"
                src={props.card.link}
                onClick={handleClick} />

            <div className="card__group">

                <h2 className="card__title">
                    {props.card.name}
                </h2>
                <button className="card__button"
                    type="button"
                    aria-label="Лайк"></button>

                <p className="card__counter">
                    {props.card.likes.length}
                </p>

            </div>
        </article>
    )

};

export default Card;