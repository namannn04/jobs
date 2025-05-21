import React, { useState, useEffect, useRef } from "react";
import { UserCircle } from "lucide-react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Header: React.FC = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [user, setUser] = useState<any>(null); // user state
  const lastScrollY = useRef(0);

  const auth = getAuth();

  useEffect(() => {
    // Monitor scroll to hide/show header
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Listen for Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null); // Clear local user state
  };

  return (
    <>
      <header
        className={`bg-blue-900 flex w-full items-stretch gap-5 text-white flex-wrap justify-between px-10 py-3 max-md:max-w-full max-md:px-5 transition-transform duration-300 fixed top-0 left-0 z-50 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ willChange: "transform" }}
      >
        <div className="text-2xl font-bold uppercase my-auto">JobMatch AI</div>

        <nav className="flex items-center gap-5 text-lg font-normal">
          <a
            href="#"
            className="self-stretch my-auto hover:text-blue-200 transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="self-stretch my-auto hover:text-blue-200 transition-colors"
          >
            Contact
          </a>

          {!user ? (
            <a
              href="/signin"
              className="bg-white text-blue-900 font-semibold px-4 py-1 rounded hover:bg-blue-100 transition-colors"
            >
              Sign In
            </a>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-1 rounded transition-colors"
              >
                Logout
              </button>
              <a
                href="/profile"
                className="hover:text-blue-300 transition-colors ml-2"
                title="Profile"
              >
                <UserCircle className="w-8 h-8" />
              </a>
            </>
          )}
        </nav>
      </header>
      <div style={{ height: 72 }}></div>
    </>
  );
};

export default Header;
