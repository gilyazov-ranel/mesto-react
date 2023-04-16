
import '../index.css';
import { useEffect, useState, useRef } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

function App() {

    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isDeleteCardPopup, setDeleteCardPopup] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [card, setCard] = useState([]);
    const nameCard = useRef();
    const linkCard = useRef();
    const userAvatar = useRef();

    useEffect(() => {
        api.getCurrentUser().then(items => {
            setCurrentUser(items)
        }).catch((err) => {
            console.log(err);
        });

        api.getCard().then(card => {
            setCards(card);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', onKeydown)
        return () => document.removeEventListener('keydown', onKeydown)
    })

    function onKeydown({ key }) {
        switch (key) {
            case 'Escape':
                closeAllPopups()
                break;
            // no default
        }
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleSelectedCard(card) {
        setCard(card)
    }

    function closeAllPopups(e) {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setDeleteCardPopup(false);
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

    function handleDeleteCardClick() {
        setDeleteCardPopup(true)
    }

    function handleCardLike(card) {

        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(cards.filter(item => card._id !== item._id));
                setDeleteCardPopup(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateUser(items) {
        api.editProfiles(items)
            .then(item => {
                setCurrentUser(item);
                setEditProfilePopupOpen(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(items) {
        api.instalAvatar(items)
            .then(item => {
                setCurrentUser(item);
                setEditAvatarPopupOpen(false);
                userAvatar.current.value = ''
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(card) {
        api.createCard(card)
            .then(newCard => {
                setCards([newCard, ...cards]);
                setAddPlacePopupOpen(false);
                nameCard.current.value = ''
                linkCard.current.value = ''
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <Header />
            <CurrentUserContext.Provider value={currentUser} >
                <Main onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onSelectedCard={handleCardClick}
                    onOpenDeleteCard={handleDeleteCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onSelectedCardToDelete={handleSelectedCard} />
            </CurrentUserContext.Provider>
            <Footer />

            <CurrentUserContext.Provider value={currentUser}  >
                <EditProfilePopup isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    nameP={currentUser.name}
                    aboutP={currentUser.about} />
            </CurrentUserContext.Provider>

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
                nameCard={nameCard}
                linkCard={linkCard}
            />
            <DeleteCardPopup
                isOpen={isDeleteCardPopup}
                onClose={closeAllPopups}
                onCardDelete={handleCardDelete}
                card={card} />

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                userAvatar={userAvatar} />

            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups} />
        </>
    );
}

export default App;
