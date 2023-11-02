export default function Bucket() {
  return (
    <div className="absolute top-28 right-0 h-20 w-20">
      <button
        style={{ width: "5rem", height: "5rem", position: "relative" }}
        className="rounded-circle relative" // Add relative class
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5} // Reduced stroke width
          stroke="currentColor"
          className="w-10 h-10" // Increased SVG size
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        <div
          className="rounded-circle bg-danger d-flex justify-content-center align-items-center font-bold text-md"
          style={{
            color: "red",
            width: "2rem", // Increased number size
            height: "2rem", // Increased number size
            position: "absolute",
            top: 0, // Position at the top
            right: 0,
            transform: "translate(-135%, 105%)", // Center the number
          }}
        >
          3
        </div>
      </button>
    </div>
  );
}
