import './FavoriteAdvicesModal.css';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const FavoiteAdvicesModal = (props) => {
    return (
        <div onClick={props.closeModal} className="favorite-advices-modal-container">
            <div className="favorite-advices-modal-card">
                <div className='favorite-advices-modal-title'>
                    <AutoAwesomeIcon />
                    <h2> Favorite Advices </h2>
                </div>
                <div>
                    {props.advices.map((advices) => (
                        <p> {advices.content} </p>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default FavoiteAdvicesModal;