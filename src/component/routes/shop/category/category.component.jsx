import {useParams} from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../../../../contexts/products.context';

import './category.styles.scss';

const Category = () => {
    const pathParams = useParams();
    const {category} = pathParams;

    return <div>{pathParams.category}</div>
}

export default Category;