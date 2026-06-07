import { transactions } from '../../data/dashboard'

export function TransactionsTable() {
  return (
    <section className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-base font-bold text-slate-950">
            Recent transactions
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Latest customer payments
          </p>
        </div>
        <button
          type="button"
          className="text-xs font-semibold text-blue-600 hover:text-blue-800"
        >
          View all
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.email}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
              >
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid size-9 place-items-center rounded-xl text-xs font-bold ${transaction.color}`}
                    >
                      {transaction.initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {transaction.customer}
                      </p>
                      <p className="text-xs text-slate-400">
                        {transaction.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3.5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      transaction.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        transaction.status === 'Completed'
                          ? 'bg-emerald-500'
                          : 'bg-amber-500'
                      }`}
                    />
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-xs font-medium text-slate-500">
                  {transaction.date}
                </td>
                <td className="px-6 py-3.5 text-right text-sm font-bold text-slate-900">
                  {transaction.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
