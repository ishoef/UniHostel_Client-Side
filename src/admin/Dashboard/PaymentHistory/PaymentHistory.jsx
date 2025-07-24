import useAuth from "../../../Hooks/useAuth.jsx/useAuth";
import usePaymentHistory from "../../../Hooks/usePaymentHistory/usePaymentHistory";

const PaymentHistory = () => {
  const { user } = useAuth();
  const { data: payments = [], isLoading } = usePaymentHistory(user?.email);

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-orange-600 flex items-center gap-2">
        💳 Payment History
      </h2>
      {payments.length === 0 ? (
        <p className="text-gray-500">No payments found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-left">
                  #
                </th>
                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-left">
                  Plan
                </th>
                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-left">
                  Amount
                </th>
                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-left">
                  Date
                </th>
                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-left">
                  Transaction ID
                </th>
                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-left">
                  Receipt
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {payments.map((p, idx) => (
                <tr
                  key={p.transactionId}
                  className="hover:bg-orange-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-800">{idx + 1}</td>
                  <td className="px-6 py-4 text-sm capitalize text-gray-700 font-medium">
                    {p.plan}
                  </td>
                  <td className="px-6 py-4 text-sm text-green-600 font-semibold">
                    ${p.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(p.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400 break-all">
                    {p.transactionId}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`/api/payments/receipt/${p.transactionId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-3 py-1 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-md transition duration-200"
                      download
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
