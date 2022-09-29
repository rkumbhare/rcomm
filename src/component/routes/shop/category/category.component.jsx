import {useParams} from 'react-router-dom';

import './category.styles.scss';

const Category = () => {
    const pathParams = useParams();
    const {category} = pathParams;

    return <div>{pathParams.category}</div>
}

export default Category;