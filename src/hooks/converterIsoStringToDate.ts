import React from 'react'

const converterIsoStringToDate = (isoString: Date) => {

    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return (
        formattedDate
    )
}

export default converterIsoStringToDate