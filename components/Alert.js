const Alert = ({ message, closeAlert }) => {
    return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}
export default Alert