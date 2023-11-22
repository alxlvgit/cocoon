export default function UploadBackground() {
    return (
        <div className="bg-neutral-600 flex flex-col justify-center items-center m-5 h-30 md:m-6 rounded-xl w-5/6 md:h-60 overflow-hidden" style={{ backgroundImage: "url('/assets/uploadPageBG.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <p className="text-2xl md:text-6xl mb-2 font-bold text-white overflow-hidden md:text-center">Cocoon</p>
            {/* <br /> */}
            <p className="text-xs text-center text-white overflow-hidden">
                Step 1 - Upload resume → Step 2 - AI analyzes your resume → Step 3 - Browse careers
            </p>
        </div>

    )
}