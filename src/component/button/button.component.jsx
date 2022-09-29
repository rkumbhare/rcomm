
import './button.styles.scss';

const BUTTON_TYPE_CLASSES= {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({label, buttonType, ...buttonProps}) => {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...buttonProps}>
            {label}
        </button>
    );
}

export default Button;