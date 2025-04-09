export const Balance = ({balance}) => {
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            {balance} INR
        </div>
    </div>
}