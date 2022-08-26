import { useEffect } from "react"
import { useJwt } from "react-jwt";
import { useRecoilState } from "recoil";
import { adminAtom, jwtAtom } from "../atoms/jwtAtom";


export const useJwtAdmin = () => {
    const [isAdmin, setIsAdmin] = useRecoilState(adminAtom)
	const [token, setToken] = useRecoilState(jwtAtom);

    const { decodedToken } = useJwt(token)
    
    useEffect(() => {
        setIsAdmin(false)
    }, [token])

    useEffect(() => {
        if (decodedToken) {
            setIsAdmin(decodedToken.isAdmin)
            console.log('isAdmin => ',isAdmin);
        }
    }, [decodedToken])
    console.log('isAdmin => ',isAdmin);
    return { isAdmin }
}
