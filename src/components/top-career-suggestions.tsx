import { useEffect, useState } from 'react';
import * as odotnet from '@/app/api/odotnet/fetch-api';
import * as enums from '@/app/api/odotnet/enums';

export default function TopCareerSuggestions() {
    const [careersData, setCareersData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchResult = await odotnet.odotnetKeyword(enums.JobKeyword.UXUIDesigner);
                setCareersData(fetchResult.career);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this effect runs once after the initial render

    return (
        <div>
            {careersData.splice(0,5).map((career: any) => (
                <div key={career.code} className='bg-blue-200 my-4 p-2 rounded-md'>
                    <h1>{career.title}</h1>
                </div>
            ))}
            <button className='bg-blue-300 my-4 p-2 rounded-md border border-gray-600'>See More</button>
        </div>
    );
}
