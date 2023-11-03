"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface IProps {
	signIn: (data: { Email: string, Password: string }) => void;
}

type TLoginUserFormData = z.infer<typeof loginUserFormSchema>;

const loginUserFormSchema = z.object({
	Email: z.string(),
	Password: z.string(),
});

export const LoginForm: React.FC<IProps> = ({ signIn }) => {

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<TLoginUserFormData>({
		resolver: zodResolver(loginUserFormSchema),
	});

	return (
		<>
			<div className="bg-slate-50 w-[380px] h-[500px] rounded-md px-12 shadow-lg">

				<div className="flex justify-center py-8">
					<svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
						<rect width="90" height="90" fill="url(#pattern0)" />
						<defs>
							<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
								<use xlinkHref="#image0_109_16" transform="scale(0.01)" />
							</pattern>
							<image id="image0_109_16" width="100" height="100" xlinkHref="data:image/png;base64,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" />
						</defs>
					</svg>
				</div>

				<form
					autoComplete="off"
					onSubmit={handleSubmit(signIn)}
					className="flex flex-col justify-center gap-12 align-middle"
				>
					<div className="relative">
						<input
							type="text"
							className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-black bg-blue-dark border-0 appearance-none focus:outline-none focus:ring-0 peer"
							placeholder=" "
							autoFocus
							{...register("Email")}
						/>
						<label
							htmlFor="Email"
							className="pointer-events-none absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
						>
							E-mail
						</label>

						{
							errors.Email &&
							<span className="absolute px-3 mt-1 text-xs text-red-500">
								{errors.Email.message}
							</span>
						}

					</div>

					<div className="relative">
						<input
							type="password"
							className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-black bg-blue-dark border-0 appearance-none focus:outline-none focus:ring-0 peer"
							placeholder=" "
							{...register("Password")}
						/>
						<label
							htmlFor="Password"
							className="pointer-events-none absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
						>
							Senha
						</label>

						{
							errors.Password &&
							<span className="absolute px-3 mt-1 text-xs text-red-500">
								{errors.Password.message}
							</span>
						}
					</div>

					<div className="w-full">
						{
							errors.root &&
							<span className="px-3 mt-1 text-xs text-red-500">
								{errors.root.message}
							</span>
						}
						<button
							type="submit"
							className="flex items-center justify-center w-full px-5 py-4 text-sm font-semibold text-white transition duration-200 rounded-md bg-gradient-to-r to-orange-400 from-pink-500 active:scale-95 focus:outline-none focus:ring-red-500 hover:brightness-90"
						>
							Login
							<svg
								aria-hidden="true"
								className="w-5 h-5 ml-2 -mr-1"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</button>
					</div>
				</form>

			</div>
		</>
	)
};
