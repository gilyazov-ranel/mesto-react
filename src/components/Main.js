import React from 'react';
import { useEffect } from 'react';
import { api } from '../utils/Api';
import Card from './Card';


function Main(props) {

    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);

    useEffect(() => {
        api.getCurrentUser().then(item => {
            setUserName(item.name);
            setUserDescription(item.about);
            setUserAvatar(item.avatar);
        });

        api.getCard().then(card => {
            setCards(card);
        })
    }, [])


    return (

        <main className="main">
            <section className="profile">

                <div className="profile__shell"
                    onClick={props.onEditAvatar}>

                    <img className="profile__avatar"
                        src={userAvatar}
                        alt="Твоя аватарка" />

                </div>
                <div className="profile__info">

                    <h1 className="profile__title">
                        {userName}
                    </h1>

                    <button className="profile__info-button"
                        type="button"
                        aria-label="Редактировать профиль"
                        onClick={props.onEditProfile}></button>

                    <p className="profile__subtitle">
                        {userDescription}
                    </p>
                </div>

                <button className="profile__button"
                    type="button"
                    aria-label="Кнопка"
                    onClick={props.onAddPlace}></button>

            </section>

            <section className="cards">

                {cards.map((card, id) => {
                    return (
                        <Card card={card}
                            onCardClick={props.onSelectedCard}
                            key={id} />
                    )
                })}

            </section>
        </main>

    );
}

export default Main;