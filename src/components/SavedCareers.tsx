"use client";

import { useAppSelector } from "@/redux/hooks";




const SavedCareers = () => {

    const { pickedCareer } = useAppSelector(
        (state) => state.resumeProcessingSlice
    );


    return (
        <>
            <div className=" bg-blue-100 p-5 rounded-3xl	shadow-md grid grid-rows-3 items-center justify-center">
                <div>
                    <p className="font-bold text-lg text-center">Saved Careers</p>
                </div>
                <div className="row-span-2">
                    {pickedCareer ? (<div className="bg-blue-200 my-4 p-2 rounded-md">
                        {/* should be an array of saved careers */}
                        {pickedCareer}
                    </div>) : (null)}

                </div>
            </div>


        </>
    )
}

export default SavedCareers;