import Link from "next/link";

const CareerTile = ({ career }: { career: CareerData }) => {
  return (
    <div className="flex mx-auto p-4 w-full lg:w-4/5  justify-center items-center align-middle rounded-2xl shadow-xl bg-gradient-to-t from-indigo-300 cursor-pointer hover:bg-indigo-400 z-30 border-0 text-black">
      <Link href={`/career/${career.code}`} className="w-full h-full">
        <div className="bg-indigo-100 h-full w-full rounded-lg mx-auto p-3 text-center shadow-2xl flex align-middle items-center justify-center">
          <h1 className="text-xs md:text-base lg:text-lg text-center hover:font-semibold w-full">
            {career.title}
          </h1>
        </div>
      </Link>
    </div>
  );
};

export type CareerData = {
  code: string;
  title: string;
};

export default CareerTile;
