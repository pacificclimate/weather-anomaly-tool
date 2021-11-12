import React from 'react';

import ThrottledInputRange from '../ThrottledInputRange';

const monthNames = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
const formatLabel = value => monthNames[value];

function MonthSelector(props) {
    return (
        <ThrottledInputRange
            minValue={0}
            maxValue={11}
            formatLabel={formatLabel}
            {...props}
        />
    );
}

export default MonthSelector;
