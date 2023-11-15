import { useEffect, useState } from 'react';
import * as odotnet from '@/app/api/odotnet/fetch-api';
import * as enums from '@/app/api/odotnet/enums';
import Link from 'next/link';

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
        <>
            <div className=" bg-blue-100 p-5 rounded-3xl md:row-span-2 	shadow-md grid grid-rows-3 items-center justify-center">
                    <div>
                        <p className="font-bold text-lg text-center">
                            Top career suggestions
                        </p>
                    </div>

                    
                    {careersData.splice(0,5).map((career: any) => (
                        <div key={career.code} className='bg-blue-200 my-4 p-2 rounded-md'>
                            <h1>{career.title}</h1>
                        </div>
                    ))}
                    <Link href="/careers">
                        <button className='bg-blue-300 w-1/2 my-4 p-2 rounded-md border border-gray-600'>See More</button>
                    </Link>

            </div>
        </>
        
    );
}
