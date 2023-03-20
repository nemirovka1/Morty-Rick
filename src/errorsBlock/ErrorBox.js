import '../charList/charList.scss'

const ErrorMessage = ({errorMessage}) => {
    return (
        <div className='error__box'>
            <iframe src="https://giphy.com/embed/kyKuZzsa6bShl3SaHe" className='error__box_image'></iframe>
            <h2 className='error__box_message'>{errorMessage}</h2>
        </div>
    )
}

export default ErrorMessage;
