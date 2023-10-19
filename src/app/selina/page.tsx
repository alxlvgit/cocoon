import * as fakeDatabase from "@/fakeDatabase";

export default function page() {
  const data = fakeDatabase.getAllJobData();
  console.log(data);
  return (
    <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
      <article className=" bg-blue-100 p-8 rounded-md shadow-md col-span-2">
        <div>
          <h1 className="font-semibold text-lg mb-3">{data.career.title}</h1>
        </div>
        <div>
          <p>{data.career.what_they_do}</p>
        </div>
      </article>
      <div>
        <article className=" bg-blue-100 p-8 rounded-md shadow-md">
          <div>
            <h1 className="font-semibold text-lg mb-3">{data.career.title}</h1>
          </div>
          <div>
            <p>{data.career.what_they_do}</p>
          </div>
        </article>
      </div>
    </div>
  );
}
