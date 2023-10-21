import Link from "next/link";

const CareerTile = ({ career }: { career: CareerData }) => {
  return (
    <div className="flex w-full rounded-md shadow-lg border bg-gray-300 border-gray-300 cursor-pointer hover:bg-gray-600 hover:text-white text-black">
      <Link href={`/career/${career.code}`} className="w-full h-full">
        <div className="flex w-full p-6">
          <h1>{career.title}</h1>
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
