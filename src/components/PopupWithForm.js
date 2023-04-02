function PopupWithForm({name, isOpen, title, nameButton, onClose, children}) {

    return (
        <>
            <div className={`popup popup__${name} ` + (isOpen && 'popup_opened')}>
                <div className="popup__container">

                    <button className="popup__close popup__close_form"
                        type="button"
                        aria-label="Закрыть всплывающее окно"
                        onClick={onClose}></button>

                    <h2 className="popup__title">
                        {title}
                    </h2>

                    <form className="popup__form" name="form" noValidate>
                        {children}
                    </form>

                    <button type="submit"
                        className="popup__button"
                        name="buttonForm">
                        {nameButton || 'Сохранить'}
                    </button>

                </div>
            </div>
        </>
    )
}
export default PopupWithForm;