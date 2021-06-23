import { useContext } from 'react';
import { AuthContext } from '../contexts/authContexts';

export function useAuth() {
    const value = useContext(AuthContext);
    return value
}