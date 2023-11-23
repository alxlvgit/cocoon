"use client";

function capitalizeSentences(sentences: string[]): string[] {
  return sentences.map((sentence) => {
    // Trim the sentence to remove leading and trailing spaces
    const trimmedSentence = sentence.trim();

    // Check if the sentence is not empty
    if (trimmedSentence.length > 0) {
      // Capitalize the first letter of the sentence and concatenate the rest
      return trimmedSentence.charAt(0).toUpperCase() + trimmedSentence.slice(1);
    }

    // If the sentence is empty, return it as is
    return trimmedSentence;
  });
}

const SkillsContainer = ({
  skillsType,
  skills,
}: {
  skillsType: string;
  skills: string[];
}) => {
  return (
    <>
      <div className="bg-main-bg p-3 shadow-xl rounded-2xl flex-col flex items-center justify-center w-full h-96">
        <div>
          <p className="font-bold text-lg mb-2 text-center">{skillsType}</p>
        </div>
        <div className="overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 w-full border shadow-lg border-gray-300 rounded-xl px-3 pt-1 pb-3 bg-bright-main">
          {capitalizeSentences(skills).map((skill) => (
            <div
              className="bg-button-bg my-2 p-3 text-xs font-medium rounded-md"
              key={skill}
            >
              <p key={skill}>{skill}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SkillsContainer;
