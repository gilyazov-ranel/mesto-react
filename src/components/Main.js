import { useEffect, useState } from 'react';
import { api } from '../utils/Api';
import Card from './Card';


function Main({ onEditAvatar, onEditProfile, onAddPlace, onSelectedCard }) {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getCurrentUser().then(item => {
            setUserName(item.name);
            setUserDescription(item.about);
            setUserAvatar(item.avatar);
        }).catch((err) => {
            console.log(err);
        });

        api.getCard().then(card => {
            setCards(card);
        }).catch((err) => {
            console.log(err);
        });

    }, [])


    return (

        <main className="main">
            <section className="profile">

                <div className="profile__shell"
                    onClick={onEditAvatar}>

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
                        onClick={onEditProfile}></button>

                    <p className="profile__subtitle">
                        {userDescription}
                    </p>
                </div>

                <button className="profile__button"
                    type="button"
                    aria-label="Кнопка"
                    onClick={onAddPlace}></button>

            </section>

            <section className="cards">

                {cards.map((card) => {
                    return (
                        <Card card={card}
                            onCardClick={onSelectedCard}
                            key={card._id} />
                    )
                })}

            </section>
        </main>

    );
}

export default Main;