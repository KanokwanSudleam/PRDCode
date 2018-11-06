import React from 'react';
import PropTypes from 'prop-types';

const CategoryProblem = ({field,TypeCategory,sub}) => (

<div>
    <div className="col-12">
        <div>{TypeCategory(sub)}</div>
    </div>
</div> 
);
CategoryProblem.propTypes = {
    field: PropTypes.object.isRequired,
    TypeCategory: PropTypes.func.isRequired,
    sub: PropTypes.array.isRequired
    
};

export default CategoryProblem;
