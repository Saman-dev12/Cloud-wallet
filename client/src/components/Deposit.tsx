import { ArrowDownLeft } from 'react-feather';

interface UserDetails {
  publicKey: string;
}

const Deposit = ({ userDetails }: { userDetails: UserDetails }) => {
  return (
    <div>
      <div className="text-center p-8">
            <div className="mb-4">
              <ArrowDownLeft className="w-12 h-12 mx-auto text-blue-500 mb-2" />
              <h3 className="text-lg font-medium">Deposit SOL</h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600 mb-2">Your Wallet Address</p>
              <p className="font-mono text-sm">{userDetails.publicKey}</p>
            </div>
            <button onClick={()=>{
              navigator.clipboard.writeText(userDetails.publicKey);
            }} className="text-blue-500 hover:text-blue-600">
              Copy Address
            </button>
          </div>
    </div>
  )
}

export default Deposit
