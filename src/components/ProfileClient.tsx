"use client"
import TopCareerSuggestions from "@/components/TopCareerSuggestions";
import SkillsProgress from "@/components/SkillsProgress";
import MatchedSkills from "@/components/MatchedSkills";
import MissingSkills from "@/components/MissingSkills";
import SavedCareers from "@/components/SavedCareers";


export default function ProfileClient({user}: {user: any}) {
    return (
        <>      
            <SkillsProgress />
            <MatchedSkills />
            <MissingSkills />

            {/* Statistics: Not sure what to do with this yet */}

            {/* <div className=" bg-blue-100 p-5 rounded-3xl	shadow-md grid grid-rows-3 items-center justify-center">
                <div>
                    <p className="font-bold text-lg text-center">Statistics</p>
                </div>
                <div className="row-span-2">
                    <p className="text-base">wtf idk</p>
                </div>
            </div> */}

            <TopCareerSuggestions />
            <SavedCareers  />
        </>
    );
}

