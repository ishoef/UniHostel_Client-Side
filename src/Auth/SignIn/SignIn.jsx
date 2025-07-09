export default function SignIn() {
  return (
    <form className="space-y-4">
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full border border-gray-300 rounded-md p-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#F97316] transition"
      />
      <input
        type="password"
        placeholder="Enter your password"
        className="w-full border border-gray-300 rounded-md p-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#F97316] transition"
      />
      <select className="w-full border border-gray-300 rounded-md p-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#F97316] transition">
        <option>Customer</option>
        <option>Driver</option>
        <option>Merchant</option>
      </select>

      <div className="flex justify-between text-sm text-[#6B7280]">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="accent-[#F97316]" />
          Remember me
        </label>
        <a href="#" className="text-[#F97316] font-medium hover:underline">
          Forgot password?
        </a>
      </div>

      <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-md font-semibold hover:opacity-90 transition">
        Sign In
      </button>
    </form>
  );
}
