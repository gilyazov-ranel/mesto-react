
import '../index.css';
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {

    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState();
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState();
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState();
    const [selectedCard, setSelectedCard] = React.useState([]);

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard({});
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    return (
        <>
            <Header />
            <Main onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onSelectedCard={handleCardClick} />
            <Footer />

            <PopupWithForm name='name'
                title='Редактировать профиль'
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                nameButton={"Сохранить"}>

                <form className="popup__form" name="form" noValidate>
                    <input id="name-input" type="text" className="popup__input popup__input_text_name" defaultValue="Жак-Ив Кусто"
                        name="name" placeholder="Имя" required minLength="2" maxLength="40" />
                    <span className="name-input-error popup__input-error"></span>
                    <input id="job-input" type="text" className="popup__input popup__input_text_job"
                        defaultValue="Исcледователь океана" name="about" placeholder="О себе" required minLength="2"
                        maxLength="200" />
                    <span className="job-input-error popup__input-error"></span>

                </form>

            </PopupWithForm>
            <PopupWithForm name='mesto'
                title='Новое место'
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                nameButton={"Создать"}>

                <form className="popup__form" name="form" noValidate>
                    <input id="text-input" type="text" className="popup__input popup__input_text_mesto" defaultValue='' name="formMesto"
                        placeholder="Название" required minLength="2" maxLength="30" />
                    <span className="text-input-error popup__input-error"></span>
                    <input id="link-input" type="url" className="popup__input popup__input_text_link" defaultValue="" name="formLink"
                        placeholder="Ссылка на картинку" required />
                    <span className="link-input-error popup__input-error"></span>
                </form>

            </PopupWithForm>

            <PopupWithForm name='delete'
                title='Вы уверены?'
                isOpen={false}
                nameButton={"Да"} />

            <PopupWithForm name='avatar'
                title='Обновить аватар'
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                nameButton={"Сохранить"}>

                <form className="popup__form" name="form" noValidate>
                    <input id="link-avatar" type="url" className="popup__input popup__input_text_link" defaultValue='' name="avatar"
                        placeholder="Ссылка на аватарку" required />
                    <span className="link-avatar-error popup__input-error"></span>
                </form>

            </PopupWithForm>

            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups} />
        </>
    );
}

export default App;
