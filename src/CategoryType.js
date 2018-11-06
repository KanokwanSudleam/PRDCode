import React from 'react';
import PropTypes from 'prop-types';

const CategoryType = ({field,change,TypeCategory,sub}) => (

<div>       
        <div className="col-12">
            <div>{TypeCategory(sub)}</div>
        </div>
</div> 
);
CategoryType.propTypes = {
    field: PropTypes.object.isRequired,
    change: PropTypes.func.isRequired,
    TypeCategory : PropTypes.func.isRequired,
    sub : PropTypes.array.isRequired
    
};

export default CategoryType;
