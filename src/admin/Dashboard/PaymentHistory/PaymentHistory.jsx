import useAuth from "../../../Hooks/useAuth.jsx/useAuth";
import usePaymentHistory from "../../../Hooks/usePaymentHistory/usePaymentHistory";

const PaymentHistory = () => {
    const { user } = useAuth();
    
     
  const { data: payments = [], isLoading } = usePaymentHistory(user?.email);

  if (isLoading) return <p>Loading...</p>;
  console.log(payments);
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">💳 Payment History</h2>
      {payments.length === 0 ? (
        <p className="text-gray-500">No payments found.</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="bg-orange-100 text-orange-700">
              <th className="p-3">#</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, idx) => (
              <tr key={p.transactionId} className="border-b hover:bg-orange-50">
                <td className="p-3">{idx + 1}</td>
                <td className="p-3 capitalize">{p.plan}</td>
                <td className="p-3">${p.amount.toFixed(2)}</td>
                <td className="p-3">{new Date(p.date).toLocaleDateString()}</td>
                <td className="p-3 text-xs text-gray-500">{p.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
