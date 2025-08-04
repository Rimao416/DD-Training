import { createContext, useContext } from "react";

// Créer le contexte
export const UserContext = createContext(undefined);

// Hook personnalisé
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};