const UploadStatus = ({ done, text }: { done: boolean; text: string }) => {
  return (
    <>
      {done ? (
        <p className="w-3/4 mt-6 text-lg font-semibold">✅ {text}</p>
      ) : (
        <p className="w-3/4 mt-6 text-lg font-semibold">{text}</p>
      )}
    </>
  );
};

export default UploadStatus;
