'use client';

import React, { useEffect, useState } from 'react';
import { ADToBS } from 'bikram-sambat-js';

const convertToNepaliNumber = (num: string | number): string => {
    const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return num
        .toString()
        .split('')
        .map(digit => (/\d/.test(digit) ? nepaliDigits[parseInt(digit)] : digit))
        .join('');
};

const NepaliDateTime = () => {
    const [nepaliDate, setNepaliDate] = useState('');

    useEffect(() => {
        const now = new Date();

        const bsDate = ADToBS(now); // e.g., '2082-02-19'
        const [bsYear, bsMonth, bsDay] = bsDate.split('-');

        const nepaliDays = [
            'आइतबार',
            'सोमबार',
            'मंगलबार',
            'बुधबार',
            'बिहीबार',
            'शुक्रबार',
            'शनिबार',
        ];

        const nepaliMonths = [
            '',
            'बैशाख',
            'जेठ',
            'असार',
            'श्रावण',
            'भदौ',
            'असोज',
            'कार्तिक',
            'मंसिर',
            'पुष',
            'माघ',
            'फाल्गुण',
            'चैत्र',
        ];

        const time = now.toLocaleTimeString('ne-NP', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'America/New_York',
        });

        const nepaliTime = convertToNepaliNumber(time.replace(' ', ' ')); // fix thin space in some browsers
        const dayName = nepaliDays[now.getDay()];
        const nepaliDateString = `अपडेट गरिएको ${nepaliTime} EDT, ${dayName} ${nepaliMonths[parseInt(bsMonth, 10)]} ${convertToNepaliNumber(bsDay)}, ${convertToNepaliNumber(bsYear)}`;

        setNepaliDate(nepaliDateString);
    }, []);

    return (
        <div className="flex justify-center">
            <p className="text-gray-700 md:text-[12px] text-[10px]">{nepaliDate}</p>
        </div>
    );
};

export default NepaliDateTime;
