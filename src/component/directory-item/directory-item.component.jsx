import { Link } from 'react-router-dom';
import './directory-item.styles.scss';

const DirectoryItem = ({category}) => {
    return (
        <div className='directory-item-container'>
            <img className='background-image' style={{backgroundImage:  `url(${category.imageUrl})` }}/>
            <div className='directory-item-body-container'>
                <h2>{category.title}</h2>
                <p>
                    <Link to={`/shop/${category.title.toLowerCase()}`}>Shop Now</Link>
                </p>
            </div>
        </div>
    );

}

export default DirectoryItem;