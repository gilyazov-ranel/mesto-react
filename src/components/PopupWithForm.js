function PopupWithForm(props) {

    return (
        <>
            <div className={`popup popup__${props.name} ` + (props.isOpen && 'popup_opened')}>
                <div className="popup__container">

                    <button className="popup__close popup__close_form"
                        type="button"
                        aria-label="Закрыть всплывающее окно"
                        onClick={props.onClose}></button>

                    <h2 className="popup__title">
                        {props.title}
                    </h2>

                    {props.children}

                    <button type="submit"
                        className="popup__button"
                        name="buttonForm">
                        {props.nameButton}
                    </button>
                    
                </div>
            </div>
        </>
    )
}
export default PopupWithForm;