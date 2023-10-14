'use client'
import {
	createContext,
	useEffect,
	useState
} from "react";

import { useRouter } from "next/navigation";

import {
	parseCookies,
	setCookie,
	destroyCookie,
} from "nookies";
import api from "@/api";

import { axiosApi } from "@/services/api";

import { IEmployee, ISignInData, IUser } from "@/interfaces";

export interface IAuthProvider {
	children: React.ReactNode;
}

export interface IAuthContext {
	user: IUser | null;
	isAuthenticated: boolean;
	signIn: ({ Email, Password }: ISignInData) => Promise<void>;
	signOut: () => void;
}

export const AuthContext = createContext({} as IAuthContext);
export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {

	const router = useRouter();
	const [user, setUser] = useState<IUser | null>(null);
	const isAuthenticated = !!user;

	useEffect(() => {
		recoverUserInfo().then((user) => {
			if (user) {
				setUser(user);
				console.log("Usuario autenticado")
				router.push("/dashboard");
			} else {
				router.push("/");
			}
		}).catch(() => {
			router.push("/");
		})
	}, [router]);

	const signIn = async ({ Email, Password }: ISignInData) => {
		try {
			const response = await api.authenticateUser({ Email, Password });
			console.log(Email, Password)
			setCookie(undefined, "bizpay.token", response.token, {
				maxAge: 60 * 60 * 1, // Validade: 1 hora
				//httpOnly: true,
			});
			const user = {
				email: response.email,
				permition: response.permition,
			}
			setUser(user);
			axiosApi.defaults.headers['Authorization'] = `Bearer ${response.token}`;
			router.push("/dashboard");
		} catch (error) {
			console.log(Email, Password)

			console.log(error);
			throw new Error("Acesso negado!");
		}
	}

	const signOut = () => {
		destroyCookie(undefined, 'bizpay.token');
		router.push("/");
		window.location.reload();
	}

	const recoverUserInfo = async () => {
		const { "bizpay.token": token } = parseCookies();
		if (token) {
			try {
				const response = await api.getUserByToken(token);
				const recoveryUser = {
					email: response.email,
					permition: response.permition,
				}
				return recoveryUser;
			} catch (error) {
				console.log(error)
				throw new Error("Acesso negado!");
			}
		}
		throw new Error("Acesso negado!");
	}

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	)
};