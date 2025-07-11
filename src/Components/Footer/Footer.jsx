import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Logo from "../Logo/Logo";

export default function Footer() {
  return (
    <footer className="bg-[#0e1525] text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-10 border-b border-gray-700 pb-8">
        {/* Logo & About */}
        <div>
          <Logo />
          <p className="mt-4 text-sm text-gray-400">
            Your premier university hostel management system, providing quality
            meals and exceptional dining experiences for students.
          </p>
          <div className="flex gap-4 mt-4 text-xl text-gray-400">
            <FaFacebookF className="hover:text-white" />
            <FaTwitter className="hover:text-white" />
            <FaInstagram className="hover:text-white" />
            <FaLinkedinIn className="hover:text-white" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                All Meals
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Upcoming Meals
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Join Us
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Meal Planning
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Nutrition Consultation
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Special Dietary Options
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Event Catering
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                24/7 Support
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-orange-500" />
              123 University Ave, Campus City, CC 12345
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-orange-500" />
              +1 (555) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-orange-500" />
              info@unihostel.edu
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto mt-6 flex flex-col sm:flex-row items-center justify-center sm:justify-between text-sm text-gray-500 px-2">
        <p>© 2024 UniHostel. All rights reserved.</p>
        <p>
          Developed by{" "}
          <span className="text-primary underline cursor-pointer">
            <a href="https://portfolio-rose-two-uimck3sec9.vercel.app/" target="_blank">
              Ismail Nayef
            </a>
          </span>
        </p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
