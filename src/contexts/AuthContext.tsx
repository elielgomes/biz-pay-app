'use client'
import {
	createContext,
	useEffect,
	useState,
	useCallback,
} from "react";

import { useRouter, usePathname, useParams } from "next/navigation";

import {
	parseCookies,
	setCookie,
	destroyCookie,
} from "nookies";
import api from "@/api";

import { axiosApi } from "@/services/api";

import { IEmployee, IPermitions, ISignInData } from "@/interfaces";
import { toast } from "@/components/ui/use-toast";

export interface IAuthProvider {
	children: React.ReactNode;
}

export interface IAuthContext {
	user: IEmployee | null;
	isAuthenticated: boolean;
	signIn: ({ Email, Password }: ISignInData) => Promise<void>;
	signOut: () => void;
}

export const AuthContext = createContext({} as IAuthContext);
export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {

	const router = useRouter();
	const params = useParams();
	const [user, setUser] = useState<IEmployee | null>(null);
	const pathName = usePathname();
	const isAuthenticated = !!user;

	const validateRoutes = useCallback((user: IEmployee) => {
		if (pathName === "/") {
			router.push("/dashboard");
		};

		if (pathName === `/dashboard/perfil/detalhes/${params?.cpf}`
			&& user.permitionId !== IPermitions.admin) {
			router.push("/dashboard/perfil");
		};

	}, [pathName, router, params.cpf]);

	const recoverUserInfo = useCallback(async () => {
		const { "bizpay.token": token } = parseCookies();
		if (token) {
			try {
				const user = await api.employee.getUserByToken(token);
				if (user) {
					setUser(user);
					validateRoutes(user);
				} else {
					router.push("/");
				}
			} catch (error) {
				router.push("/");
			}
		}
	}, [router, validateRoutes]);

	useEffect(() => {
		recoverUserInfo();
	}, [recoverUserInfo]);

	const signIn = async ({ Email, Password }: ISignInData) => {
		try {
			const response = await api.employee.authenticateUser({ Email, Password });
			setCookie(undefined, "bizpay.token", response.token, {
				maxAge: 60 * 60 * 1, // Validade: 1 hora
				//httpOnly: true,
			});
			const user = await api.employee.getUserByToken(response.token);
			setUser(user);
			axiosApi.defaults.headers['Authorization'] = `Bearer ${response.token}`;
			router.push("/dashboard");
		} catch (error: any) {
			toast({
				variant: "error",
				title: "Acesso negado!",
				description: error.message ? error.message : "Usuário ou	senha incorretos.",
			});
		}
	}

	const signOut = () => {
		destroyCookie(undefined, 'bizpay.token');
		router.push("/");
		window.location.reload();
	}

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	)
};