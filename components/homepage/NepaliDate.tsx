'use client';

import React, { useEffect, useState } from 'react';
// import { ADToBS } from 'bikram-sambat-js';

const convertToNepaliNumber = (num: string | number): string => {
    const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return num
        .toString()
        .split('')
        .map(digit => (/\d/.test(digit) ? nepaliDigits[parseInt(digit)] : digit))
        .join('');
};

interface NepaliDateTimeProps {
    updatedAt: Date | string; // Accepts either Date object or ISO string
}

const NepaliDateTime: React.FC<NepaliDateTimeProps> = ({ updatedAt }) => {
    // const [nepaliDate, setNepaliDate] = useState('');
    const [relativeTime, setRelativeTime] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const updatedDate = new Date(updatedAt);
            const diffInSeconds = Math.floor((now.getTime() - updatedDate.getTime()) / 1000);

            // Calculate relative time
            let relativeTimeStr = '';
            if (diffInSeconds < 60) {
                relativeTimeStr = `${convertToNepaliNumber(diffInSeconds)} सेकेण्ड अघि`;
            } else if (diffInSeconds < 3600) {
                const minutes = Math.floor(diffInSeconds / 60);
                relativeTimeStr = `${convertToNepaliNumber(minutes)} मिनेट अघि`;
            } else if (diffInSeconds < 86400) {
                const hours = Math.floor(diffInSeconds / 3600);
                relativeTimeStr = `${convertToNepaliNumber(hours)} घण्टा अघि`;
            } else if (diffInSeconds < 2592000) {
                const days = Math.floor(diffInSeconds / 86400);
                relativeTimeStr = `${convertToNepaliNumber(days)} दिन अघि`;
            } else if (diffInSeconds < 31536000) {
                const months = Math.floor(diffInSeconds / 2592000);
                relativeTimeStr = `${convertToNepaliNumber(months)} महिना अघि`;
            } else {
                const years = Math.floor(diffInSeconds / 31536000);
                relativeTimeStr = `${convertToNepaliNumber(years)} वर्ष अघि`;
            }
            setRelativeTime(relativeTimeStr);

            // Convert to Nepali date
            //     const bsDate = ADToBS(updatedDate);
            //     const [bsYear, bsMonth, bsDay] = bsDate.split('-');

            //     const nepaliDays = [
            //         'आइतबार',
            //         'सोमबार',
            //         'मंगलबार',
            //         'बुधबार',
            //         'बिहीबार',
            //         'शुक्रबार',
            //         'शनिबार',
            //     ];

            //     const nepaliMonths = [
            //         '',
            //         'बैशाख',
            //         'जेठ',
            //         'असार',
            //         'श्रावण',
            //         'भदौ',
            //         'असोज',
            //         'कार्तिक',
            //         'मंसिर',
            //         'पुष',
            //         'माघ',
            //         'फाल्गुण',
            //         'चैत्र',
            //     ];

            //     const time = updatedDate.toLocaleTimeString('ne-NP', {
            //         hour: '2-digit',
            //         minute: '2-digit',
            //         hour12: true,
            //     });

            //     const nepaliTime = convertToNepaliNumber(time.replace(' ', ' '));
            //     const dayName = nepaliDays[updatedDate.getDay()];
            //     const monthName = nepaliMonths[parseInt(bsMonth, 10)];
            //     const nepaliDateString = `${dayName}, ${monthName} ${convertToNepaliNumber(bsDay)}, ${convertToNepaliNumber(bsYear)} ${nepaliTime}`;

            //     setNepaliDate(nepaliDateString);
        };

        updateDateTime();
        // Update every minute for relative time
        const interval = setInterval(updateDateTime, 60000);
        return () => clearInterval(interval);
    }, [updatedAt]);

    return (
        <div className="flex justify-center">
            <p className="text-[#808080] font-roboto text-sm">
                {relativeTime}
            </p>
        </div>
    );
};

export default NepaliDateTime;