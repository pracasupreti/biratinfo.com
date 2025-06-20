'use client';

import React from 'react';

const convertToNepaliNumber = (num: string | number): string => {
    const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return num
        .toString()
        .split('')
        .map(digit => (/\d/.test(digit) ? nepaliDigits[parseInt(digit)] : digit))
        .join('');
};

const NepaliTimeDisplay = ({ timeText }: { timeText: string }) => {
    // Extract the number (works for "1 min", "5 mins", "10 minutes", etc.)
    const numberMatch = timeText.match(/\d+/);
    const number = numberMatch ? numberMatch[0] : "0";
    const nepaliNumber = convertToNepaliNumber(number);

    // Replace the original number with Nepali digits

    return <span>{nepaliNumber} मिनेटमा पढ्नुहोस</span>;
};

export default NepaliTimeDisplay;