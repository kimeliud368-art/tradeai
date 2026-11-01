import {useEffect, usestate }from 'react';
import { getTraderConfig } from '../api/trading';

export default function AiTrader() {
    const [config,setconfig]=useState(null);

    useEffect(()=> {
        getTraderConfifg().then(setconfig);
    },[] );
    return(
        <div>
            <h1 className="page-title">AI Trader</h1>
            <pre>{JSON.stringify(config,null, 2)}</pre>
        </div>
    );
}