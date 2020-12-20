import Spinner from "./icons/Spinner"
import utils from "../utils/utils.module.css"
const Button = ({
    isLoading,
    title,
    children,
    ...buttonProps
}) => {
    return (
        <button
            className={`btn btn-block py-2 ${utils.buttonIcon}`}
            {...buttonProps}
        >
            {isLoading ? <Spinner width="20" fill="white" className="animate-spin" /> : title}
            {children}
        </button>
    );
};
export default Button;