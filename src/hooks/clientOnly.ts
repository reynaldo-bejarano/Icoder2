// ClientOnly.js
import { useEffect, useState } from 'react';

const ClientOnly = ({ children }: any) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return children;
};

export default ClientOnly;