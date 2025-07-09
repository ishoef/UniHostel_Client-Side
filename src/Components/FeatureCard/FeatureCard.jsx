function FeatureCard({ icon, title, description }) {
  return (
    <div className="border border-gray-300 rounded-lg p-8 text-center shadow-md hover:shadow-md transition">
      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-orange-100">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default FeatureCard;
