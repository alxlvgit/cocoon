export default function Footer() {
  return (
    <footer className="bg-[#6DB8C5]">
      <div className="w-full max-w-screen-xl sticky mx-auto p-4 md:py-8 flex items-center justify-between">
        <img src="/assets/newlogo.svg" alt="logo" className="w-20 h-20" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400 mt-">
          © 2023{" "}
          <a href="#" className="hover:underline">
            Cocoon™ All Rights Reserved.
          </a>
        </span>

        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400 mt-"></span>
      </div>
    </footer>
  );
}
