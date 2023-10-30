export default function CareerInfo({
  title,
  whatTheyDo,
}: {
  title: string;
  whatTheyDo: string;
}) {
  return (
    <div className="bg-blue-100 p-10 rounded-3xl	 shadow-md flex flex-col items-center">
        <div>
          <h1 className="font-semibold text-base mb-3">{title}</h1>
        </div>
        <div>
          <p className="text-sm">{whatTheyDo}</p>
        </div>
      </div>
  );
}
