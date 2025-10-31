import { useEffect, useState } from "react";



const useFinance = () => {

    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(()=>setLoading(false), 1000);
    }, []);

    return {
        balance,
        loading,
    }

}

export default useFinance;