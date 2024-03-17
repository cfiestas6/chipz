import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// Define the shape of the context
interface CeloContextType {
  isCelo: boolean;
}

const CeloContext = createContext<CeloContextType | undefined>(undefined);

export const useCelo = () => {
  const celoContext = useContext(CeloContext);
  if (celoContext === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return celoContext;
};

interface CeloProviderProps {
  children: ReactNode;
}

export const CeloProvider = ({ children }: CeloProviderProps) => {
  const [isCelo, setIsCelo ] = useState(false);

  useEffect(() => {
    function checkCelo() {
      if (typeof window !== "undefined" && window.ethereum && window.ethereum.isMiniPay) {
        setIsCelo(true);
      }
    }
    checkCelo();
  }, []);

    return (
      <CeloContext.Provider value={{ isCelo }}>
        {children}
      </CeloContext.Provider>
    );
  };