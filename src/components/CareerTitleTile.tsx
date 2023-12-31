import Link from "next/link";

const CareerTile = ({ career }: { career: CareerData }) => {
  return (
    <Link href={`/career/${career.code}`}>
      <div className="group mx-auto p-4 w-full lg:w-full max-w-xs justify-center items-center align-middle rounded-2xl bg-custom-gradient relative shadow-custom-shadow cursor-pointer z-30 border-0 text-black hover:bg-custom-gradient-dark h-48">
        {" "}
        {/* Setting a fixed height */}
        <div className="bg-custom-bg flex flex-col h-full w-full rounded-lg mx-auto p-2 text-center shadow-custom-shadow align-middle items-center justify-center">
          <h1 className="text-md md:text-base lg:text-lg text-center w-full">
            {career.title}
          </h1>
        </div>
      </div>
    </Link>
  );
};

export type CareerData = {
  code: string;
  title: string;
};

export default CareerTile;
