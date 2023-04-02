function ImagePopup(props) {

    return (

        <div className={'popup popup_opacity popup_image ' + (props.card.link && 'popup_opened')}>
            <div className='popup__container-image'>

                <button className='popup__close popup__close_image'
                    type='button'
                    aria-label='Закрыть всплывающее окно'
                    onClick={props.onClose}></button>

                <img alt={props.card.link && props.card.name}
                    className='popup__open-image'
                    src={props.card.link && props.card.link} />

                <h2 className='popup__image-title'>
                    {props.card.link && props.card.name}
                </h2>

            </div>
        </div>

    )
}

export default ImagePopup;