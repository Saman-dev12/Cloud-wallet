import { ArrowDownLeft, ArrowUpRight } from 'react-feather'



interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap';
  amount: number;
  date: string;
  status: 'completed' | 'pending';
  address: string;
}

const Transactions = () => {
    const transactions :Transaction[]= [
//     {
//       id: '1',
//       type: 'send',
//       amount: 0.5,
//       date: '2024-01-01',
//       status: 'completed',
//       address: '8xzt...3kj9'
//     },
//     {
//       id: '2',
//       type: 'receive',
//       amount: 1.0,
//       date: '2024-01-02',
//       status: 'completed',
//       address: '9kzt...4m21'
// }
    ]
  return (
    <div>
      <div className="space-y-3">
        {transactions.length === 0 && (
          <p className="text-gray-500">No transactions found</p>)}
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                {tx.type === 'send' ? (
                  <ArrowUpRight className="w-4 h-4 text-red-500 mr-3" />
                ) : (
                  <ArrowDownLeft className="w-4 h-4 text-green-500 mr-3" />
                )}
                <div>
                  <p className="font-medium">
                    {tx.type === 'send' ? 'Sent' : 'Received'} SOL
                  </p>
                  <p className="text-sm text-gray-500">{tx.address}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {tx.type === 'send' ? '-' : '+'}{tx.amount} SOL
                </p>
                <p className="text-sm text-gray-500">{tx.date}</p>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Transactions
