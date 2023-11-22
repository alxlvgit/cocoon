import Link from "next/link";

const CareerTile = ({ career }: { career: CareerData }) => {
  // const [addedToBucket, setAddedToBucket] = useState(false);
  // const [bucketItems, setBucketItems] = useState([]);
  // const [bucketString, setBucketString] = useState("Add to Bucket");
  // const [quantity, setQuantity] = useState(0);

  // const clickHandler = (e: any) => {
  // setAddedToBucket((prevValue) => !prevValue);
  // setBucketString((prevString) =>
  // prevString === "Add to Bucket" ? "Added to Bucket" : "Add to Bucket"
  // );
  // console.log(e.target);

  // setQuantity((prevQuantity) => (e.target ? prevQuantity + 1 : prevQuantity - 1));
  // };

  return (
   
    <div className="group m-3 mx-auto p-4 w-full lg:w-4/5 justify-center items-center align-middle rounded-2xl bg-custom-gradient shadow-custom-shadow cursor-pointer z-30 border-0 text-black hover:bg-custom-gradient-dark">
      <div className="bg-custom-bg flex flex-col h-full w-full rounded-lg mx-auto p-1 text-center shadow-custom-shadow align-middle items-center justify-center ">
        <div>
          <h1 className="text-md md:text-base lg:text-lg text-center w-full mt-2 ">
            {career.title}
          </h1>
        </div>


        <div className="flex flex-cols-2">
          <div className=" invisible group-hover:visible grid grid-cols-1 lg:grid-cols-1 pt-2 lg:gap-4 gap-1 ">
            <Link
              href={`/career/${career.code}`}
              className={`  text-black bg-button-bg hover:bg-button-bg-hover focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
            >
              Show Detail
            </Link>
          </div>
          <div className=" invisible group-hover:visible grid grid-cols-1 lg:grid-cols-1 pt-2 lg:gap-4 gap-1 ">
            <Link
              href={`/uploads/${career.code}`}
            className={`group-hover:block hidden text-black bg-button-bg hover:bg-button-bg-hover focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
            >
              Start 
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export type CareerData = {
  code: string;
  title: string;
};

export default CareerTile;
