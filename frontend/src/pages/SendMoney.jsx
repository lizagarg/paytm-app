import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");

    const [amount, setAmount] = useState(0);
    const [oldBalance, setOldBalance] = useState(null);
    const [newBalance, setNewBalance] = useState(null);

    useEffect(() => {
        // Fetch balance when component mounts
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setOldBalance(res.data.balance);
            setNewBalance(res.data.balance);
        });
    }, []);

    const handleTransfer = async () => {
        try {
            await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: id,
                amount: Number(amount)
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            alert("Transfer successful!");

            // Fetch new balance after transfer
            const res = await axios.get("http://localhost:3000/api/v1/account/balance", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            setNewBalance(res.data.balance);
        } catch (err) {
            alert(err.response?.data?.message || "Transfer failed");
        }
    };

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0]}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>

                        {oldBalance !== null && (
                            <div className="text-center text-md font-small text-gray-700 mb-4">
                                Your Old Balance: Rs {oldBalance} <br />
                                Your New Balance: Rs {newBalance}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Amount (in Rs)</label>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <button
                                onClick={handleTransfer}
                                className="rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                            >
                                Initiate Transfer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
