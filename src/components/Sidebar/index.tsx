"use client"

import React, { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { IPermitions } from "@/interfaces";

export const Sidebar: React.FC = () => {

	const auth = useContext(AuthContext);

	return (
		<>
			<aside className="h-screen w-[70px] fixed left-0 top-0 bg-white shadow-lg inline-block py-8">

				<div className="flex justify-center mb-10">
					<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
						<rect width="50" height="50" fill="url(#pattern0)" />
						<defs>
							<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
								<use xlinkHref="#image0_109_16" transform="scale(0.01)" />
							</pattern>
							<image id="image0_109_16" width="100" height="100" xlinkHref="data:image/png;base64,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" />
						</defs>
					</svg>
				</div>

				<menu className="flex gap-8 flex-col">
					{auth?.user?.permitionId === IPermitions.admin && (
						<li>
							<Link href="/dashboard" className="group flex items-center justify-center py-3 relative">
								<span className="text-slate-500 text-lg absolute left-2 py-2 px-4">
									<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 15 15" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.8 1L2.74967 0.99997C2.52122 0.999752 2.32429 0.999564 2.14983 1.04145C1.60136 1.17312 1.17312 1.60136 1.04145 2.14983C0.999564 2.32429 0.999752 2.52122 0.99997 2.74967L1 2.8V5.2L0.99997 5.25033C0.999752 5.47878 0.999564 5.67572 1.04145 5.85017C1.17312 6.39864 1.60136 6.82688 2.14983 6.95856C2.32429 7.00044 2.52122 7.00025 2.74967 7.00003L2.8 7H5.2L5.25033 7.00003C5.47878 7.00025 5.67572 7.00044 5.85017 6.95856C6.39864 6.82688 6.82688 6.39864 6.95856 5.85017C7.00044 5.67572 7.00025 5.47878 7.00003 5.25033L7 5.2V2.8L7.00003 2.74967C7.00025 2.52122 7.00044 2.32429 6.95856 2.14983C6.82688 1.60136 6.39864 1.17312 5.85017 1.04145C5.67572 0.999564 5.47878 0.999752 5.25033 0.99997L5.2 1H2.8ZM2.38328 2.01382C2.42632 2.00348 2.49222 2 2.8 2H5.2C5.50779 2 5.57369 2.00348 5.61672 2.01382C5.79955 2.05771 5.94229 2.20045 5.98619 2.38328C5.99652 2.42632 6 2.49222 6 2.8V5.2C6 5.50779 5.99652 5.57369 5.98619 5.61672C5.94229 5.79955 5.79955 5.94229 5.61672 5.98619C5.57369 5.99652 5.50779 6 5.2 6H2.8C2.49222 6 2.42632 5.99652 2.38328 5.98619C2.20045 5.94229 2.05771 5.79955 2.01382 5.61672C2.00348 5.57369 2 5.50779 2 5.2V2.8C2 2.49222 2.00348 2.42632 2.01382 2.38328C2.05771 2.20045 2.20045 2.05771 2.38328 2.01382ZM9.8 1L9.74967 0.99997C9.52122 0.999752 9.32429 0.999564 9.14983 1.04145C8.60136 1.17312 8.17312 1.60136 8.04145 2.14983C7.99956 2.32429 7.99975 2.52122 7.99997 2.74967L8 2.8V5.2L7.99997 5.25033C7.99975 5.47878 7.99956 5.67572 8.04145 5.85017C8.17312 6.39864 8.60136 6.82688 9.14983 6.95856C9.32429 7.00044 9.52122 7.00025 9.74967 7.00003L9.8 7H12.2L12.2503 7.00003C12.4788 7.00025 12.6757 7.00044 12.8502 6.95856C13.3986 6.82688 13.8269 6.39864 13.9586 5.85017C14.0004 5.67572 14.0003 5.47878 14 5.25033L14 5.2V2.8L14 2.74967C14.0003 2.52122 14.0004 2.32429 13.9586 2.14983C13.8269 1.60136 13.3986 1.17312 12.8502 1.04145C12.6757 0.999564 12.4788 0.999752 12.2503 0.99997L12.2 1H9.8ZM9.38328 2.01382C9.42632 2.00348 9.49222 2 9.8 2H12.2C12.5078 2 12.5737 2.00348 12.6167 2.01382C12.7995 2.05771 12.9423 2.20045 12.9862 2.38328C12.9965 2.42632 13 2.49222 13 2.8V5.2C13 5.50779 12.9965 5.57369 12.9862 5.61672C12.9423 5.79955 12.7995 5.94229 12.6167 5.98619C12.5737 5.99652 12.5078 6 12.2 6H9.8C9.49222 6 9.42632 5.99652 9.38328 5.98619C9.20045 5.94229 9.05771 5.79955 9.01382 5.61672C9.00348 5.57369 9 5.50779 9 5.2V2.8C9 2.49222 9.00348 2.42632 9.01382 2.38328C9.05771 2.20045 9.20045 2.05771 9.38328 2.01382ZM2.74967 7.99997L2.8 8H5.2L5.25033 7.99997C5.47878 7.99975 5.67572 7.99956 5.85017 8.04145C6.39864 8.17312 6.82688 8.60136 6.95856 9.14983C7.00044 9.32429 7.00025 9.52122 7.00003 9.74967L7 9.8V12.2L7.00003 12.2503C7.00025 12.4788 7.00044 12.6757 6.95856 12.8502C6.82688 13.3986 6.39864 13.8269 5.85017 13.9586C5.67572 14.0004 5.47878 14.0003 5.25033 14L5.2 14H2.8L2.74967 14C2.52122 14.0003 2.32429 14.0004 2.14983 13.9586C1.60136 13.8269 1.17312 13.3986 1.04145 12.8502C0.999564 12.6757 0.999752 12.4788 0.99997 12.2503L1 12.2V9.8L0.99997 9.74967C0.999752 9.52122 0.999564 9.32429 1.04145 9.14983C1.17312 8.60136 1.60136 8.17312 2.14983 8.04145C2.32429 7.99956 2.52122 7.99975 2.74967 7.99997ZM2.8 9C2.49222 9 2.42632 9.00348 2.38328 9.01382C2.20045 9.05771 2.05771 9.20045 2.01382 9.38328C2.00348 9.42632 2 9.49222 2 9.8V12.2C2 12.5078 2.00348 12.5737 2.01382 12.6167C2.05771 12.7995 2.20045 12.9423 2.38328 12.9862C2.42632 12.9965 2.49222 13 2.8 13H5.2C5.50779 13 5.57369 12.9965 5.61672 12.9862C5.79955 12.9423 5.94229 12.7995 5.98619 12.6167C5.99652 12.5737 6 12.5078 6 12.2V9.8C6 9.49222 5.99652 9.42632 5.98619 9.38328C5.94229 9.20045 5.79955 9.05771 5.61672 9.01382C5.57369 9.00348 5.50779 9 5.2 9H2.8ZM9.8 8L9.74967 7.99997C9.52122 7.99975 9.32429 7.99956 9.14983 8.04145C8.60136 8.17312 8.17312 8.60136 8.04145 9.14983C7.99956 9.32429 7.99975 9.52122 7.99997 9.74967L8 9.8V12.2L7.99997 12.2503C7.99975 12.4788 7.99956 12.6757 8.04145 12.8502C8.17312 13.3986 8.60136 13.8269 9.14983 13.9586C9.32429 14.0004 9.52122 14.0003 9.74967 14L9.8 14H12.2L12.2503 14C12.4788 14.0003 12.6757 14.0004 12.8502 13.9586C13.3986 13.8269 13.8269 13.3986 13.9586 12.8502C14.0004 12.6757 14.0003 12.4788 14 12.2503L14 12.2V9.8L14 9.74967C14.0003 9.52122 14.0004 9.32429 13.9586 9.14983C13.8269 8.60136 13.3986 8.17312 12.8502 8.04145C12.6757 7.99956 12.4788 7.99975 12.2503 7.99997L12.2 8H9.8ZM9.38328 9.01382C9.42632 9.00348 9.49222 9 9.8 9H12.2C12.5078 9 12.5737 9.00348 12.6167 9.01382C12.7995 9.05771 12.9423 9.20045 12.9862 9.38328C12.9965 9.42632 13 9.49222 13 9.8V12.2C13 12.5078 12.9965 12.5737 12.9862 12.6167C12.9423 12.7995 12.7995 12.9423 12.6167 12.9862C12.5737 12.9965 12.5078 13 12.2 13H9.8C9.49222 13 9.42632 12.9965 9.38328 12.9862C9.20045 12.9423 9.05771 12.7995 9.01382 12.6167C9.00348 12.5737 9 12.5078 9 12.2V9.8C9 9.49222 9.00348 9.42632 9.01382 9.38328C9.05771 9.20045 9.20045 9.05771 9.38328 9.01382Z" fill="currentColor"></path></svg>
								</span>
								<div className="bg-gradient-to-r to-[#FF9B44] from-[#FC6075] py-2 px-4 rounded-2xl gap-2 absolute left-2 items-center invisible opacity-0 flex transition-all group-hover:visible group-hover:opacity-100 duration-300">
									<span className="text-white text-lg">
										<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 15 15" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.8 1L2.74967 0.99997C2.52122 0.999752 2.32429 0.999564 2.14983 1.04145C1.60136 1.17312 1.17312 1.60136 1.04145 2.14983C0.999564 2.32429 0.999752 2.52122 0.99997 2.74967L1 2.8V5.2L0.99997 5.25033C0.999752 5.47878 0.999564 5.67572 1.04145 5.85017C1.17312 6.39864 1.60136 6.82688 2.14983 6.95856C2.32429 7.00044 2.52122 7.00025 2.74967 7.00003L2.8 7H5.2L5.25033 7.00003C5.47878 7.00025 5.67572 7.00044 5.85017 6.95856C6.39864 6.82688 6.82688 6.39864 6.95856 5.85017C7.00044 5.67572 7.00025 5.47878 7.00003 5.25033L7 5.2V2.8L7.00003 2.74967C7.00025 2.52122 7.00044 2.32429 6.95856 2.14983C6.82688 1.60136 6.39864 1.17312 5.85017 1.04145C5.67572 0.999564 5.47878 0.999752 5.25033 0.99997L5.2 1H2.8ZM2.38328 2.01382C2.42632 2.00348 2.49222 2 2.8 2H5.2C5.50779 2 5.57369 2.00348 5.61672 2.01382C5.79955 2.05771 5.94229 2.20045 5.98619 2.38328C5.99652 2.42632 6 2.49222 6 2.8V5.2C6 5.50779 5.99652 5.57369 5.98619 5.61672C5.94229 5.79955 5.79955 5.94229 5.61672 5.98619C5.57369 5.99652 5.50779 6 5.2 6H2.8C2.49222 6 2.42632 5.99652 2.38328 5.98619C2.20045 5.94229 2.05771 5.79955 2.01382 5.61672C2.00348 5.57369 2 5.50779 2 5.2V2.8C2 2.49222 2.00348 2.42632 2.01382 2.38328C2.05771 2.20045 2.20045 2.05771 2.38328 2.01382ZM9.8 1L9.74967 0.99997C9.52122 0.999752 9.32429 0.999564 9.14983 1.04145C8.60136 1.17312 8.17312 1.60136 8.04145 2.14983C7.99956 2.32429 7.99975 2.52122 7.99997 2.74967L8 2.8V5.2L7.99997 5.25033C7.99975 5.47878 7.99956 5.67572 8.04145 5.85017C8.17312 6.39864 8.60136 6.82688 9.14983 6.95856C9.32429 7.00044 9.52122 7.00025 9.74967 7.00003L9.8 7H12.2L12.2503 7.00003C12.4788 7.00025 12.6757 7.00044 12.8502 6.95856C13.3986 6.82688 13.8269 6.39864 13.9586 5.85017C14.0004 5.67572 14.0003 5.47878 14 5.25033L14 5.2V2.8L14 2.74967C14.0003 2.52122 14.0004 2.32429 13.9586 2.14983C13.8269 1.60136 13.3986 1.17312 12.8502 1.04145C12.6757 0.999564 12.4788 0.999752 12.2503 0.99997L12.2 1H9.8ZM9.38328 2.01382C9.42632 2.00348 9.49222 2 9.8 2H12.2C12.5078 2 12.5737 2.00348 12.6167 2.01382C12.7995 2.05771 12.9423 2.20045 12.9862 2.38328C12.9965 2.42632 13 2.49222 13 2.8V5.2C13 5.50779 12.9965 5.57369 12.9862 5.61672C12.9423 5.79955 12.7995 5.94229 12.6167 5.98619C12.5737 5.99652 12.5078 6 12.2 6H9.8C9.49222 6 9.42632 5.99652 9.38328 5.98619C9.20045 5.94229 9.05771 5.79955 9.01382 5.61672C9.00348 5.57369 9 5.50779 9 5.2V2.8C9 2.49222 9.00348 2.42632 9.01382 2.38328C9.05771 2.20045 9.20045 2.05771 9.38328 2.01382ZM2.74967 7.99997L2.8 8H5.2L5.25033 7.99997C5.47878 7.99975 5.67572 7.99956 5.85017 8.04145C6.39864 8.17312 6.82688 8.60136 6.95856 9.14983C7.00044 9.32429 7.00025 9.52122 7.00003 9.74967L7 9.8V12.2L7.00003 12.2503C7.00025 12.4788 7.00044 12.6757 6.95856 12.8502C6.82688 13.3986 6.39864 13.8269 5.85017 13.9586C5.67572 14.0004 5.47878 14.0003 5.25033 14L5.2 14H2.8L2.74967 14C2.52122 14.0003 2.32429 14.0004 2.14983 13.9586C1.60136 13.8269 1.17312 13.3986 1.04145 12.8502C0.999564 12.6757 0.999752 12.4788 0.99997 12.2503L1 12.2V9.8L0.99997 9.74967C0.999752 9.52122 0.999564 9.32429 1.04145 9.14983C1.17312 8.60136 1.60136 8.17312 2.14983 8.04145C2.32429 7.99956 2.52122 7.99975 2.74967 7.99997ZM2.8 9C2.49222 9 2.42632 9.00348 2.38328 9.01382C2.20045 9.05771 2.05771 9.20045 2.01382 9.38328C2.00348 9.42632 2 9.49222 2 9.8V12.2C2 12.5078 2.00348 12.5737 2.01382 12.6167C2.05771 12.7995 2.20045 12.9423 2.38328 12.9862C2.42632 12.9965 2.49222 13 2.8 13H5.2C5.50779 13 5.57369 12.9965 5.61672 12.9862C5.79955 12.9423 5.94229 12.7995 5.98619 12.6167C5.99652 12.5737 6 12.5078 6 12.2V9.8C6 9.49222 5.99652 9.42632 5.98619 9.38328C5.94229 9.20045 5.79955 9.05771 5.61672 9.01382C5.57369 9.00348 5.50779 9 5.2 9H2.8ZM9.8 8L9.74967 7.99997C9.52122 7.99975 9.32429 7.99956 9.14983 8.04145C8.60136 8.17312 8.17312 8.60136 8.04145 9.14983C7.99956 9.32429 7.99975 9.52122 7.99997 9.74967L8 9.8V12.2L7.99997 12.2503C7.99975 12.4788 7.99956 12.6757 8.04145 12.8502C8.17312 13.3986 8.60136 13.8269 9.14983 13.9586C9.32429 14.0004 9.52122 14.0003 9.74967 14L9.8 14H12.2L12.2503 14C12.4788 14.0003 12.6757 14.0004 12.8502 13.9586C13.3986 13.8269 13.8269 13.3986 13.9586 12.8502C14.0004 12.6757 14.0003 12.4788 14 12.2503L14 12.2V9.8L14 9.74967C14.0003 9.52122 14.0004 9.32429 13.9586 9.14983C13.8269 8.60136 13.3986 8.17312 12.8502 8.04145C12.6757 7.99956 12.4788 7.99975 12.2503 7.99997L12.2 8H9.8ZM9.38328 9.01382C9.42632 9.00348 9.49222 9 9.8 9H12.2C12.5078 9 12.5737 9.00348 12.6167 9.01382C12.7995 9.05771 12.9423 9.20045 12.9862 9.38328C12.9965 9.42632 13 9.49222 13 9.8V12.2C13 12.5078 12.9965 12.5737 12.9862 12.6167C12.9423 12.7995 12.7995 12.9423 12.6167 12.9862C12.5737 12.9965 12.5078 13 12.2 13H9.8C9.49222 13 9.42632 12.9965 9.38328 12.9862C9.20045 12.9423 9.05771 12.7995 9.01382 12.6167C9.00348 12.5737 9 12.5078 9 12.2V9.8C9 9.49222 9.00348 9.42632 9.01382 9.38328C9.05771 9.20045 9.20045 9.05771 9.38328 9.01382Z" fill="currentColor"></path></svg>
									</span>
									<span className="text-[11px] text-white font-black uppercase">Dashboard</span>
								</div>
							</Link>
						</li>
					)
					}

					<li>
						<Link href="/dashboard/perfil" className="group flex items-center justify-center py-3 relative">
							<span className="text-slate-500 text-lg absolute left-2 py-2 px-4">
								<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path></svg>
							</span>
							<div className="bg-gradient-to-r to-[#FF9B44] from-[#FC6075] py-2 px-4 rounded-2xl gap-2 absolute left-2 items-center invisible opacity-0 flex transition-all group-hover:visible group-hover:opacity-100 duration-300">
								<span className="text-white text-lg">
									<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path></svg>
								</span>
								<span className="text-[11px] text-white font-black uppercase">Perfil</span>
							</div>
						</Link>
					</li>

					<li>
						<Link href="/dashboard/holerites" className="group flex items-center justify-center py-3 relative">
							<span className="text-slate-500 text-lg absolute left-2 py-2 px-4">
								<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 32 32" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M 22.853516 6.0078125 C 20.164121 6.0816133 18.078828 6.8123281 16.048828 7.5175781 C 13.877828 8.2715781 11.828234 8.9827188 8.9902344 9.0117188 C 7.0932344 9.0417187 5.1931719 8.7143594 3.3261719 8.0683594 L 2 7.609375 L 2 24.691406 L 2.6660156 24.927734 C 4.4050156 25.542734 6.183125 25.897422 7.953125 25.982422 C 8.234125 25.995422 8.5092969 26.001953 8.7792969 26.001953 C 11.792297 26.001953 14.098938 25.202687 16.335938 24.429688 C 18.693937 23.613688 20.918125 22.843328 23.953125 22.986328 C 25.527125 23.061328 27.112016 23.379687 28.666016 23.929688 L 30 24.402344 L 30 7.3144531 L 29.341797 7.0742188 C 27.616797 6.4492188 25.834922 6.0945781 24.044922 6.0175781 C 23.634422 5.9993281 23.237715 5.9972695 22.853516 6.0078125 z M 22.908203 7.9941406 C 23.247131 7.9836484 23.595781 7.9837969 23.957031 7.9980469 C 24.330995 8.0142703 24.705197 8.0481553 25.078125 8.0917969 C 25.344924 9.1855072 26.323979 10 27.5 10 C 27.671 10 27.838 9.9812188 28 9.9492188 L 28 19.050781 C 27.838 19.018781 27.671 19 27.5 19 C 26.264201 19 25.245058 19.898153 25.042969 21.076172 C 24.710892 21.041393 24.378543 21.017795 24.046875 21.001953 C 20.631875 20.851953 18.113688 21.710687 15.679688 22.554688 C 13.318688 23.372687 11.081828 24.145953 8.0488281 24.001953 C 7.6729998 23.983858 7.2965195 23.94781 6.9199219 23.902344 C 6.650967 22.811694 5.67385 22 4.5 22 C 4.329 22 4.162 22.018781 4 22.050781 L 4 12.949219 C 4.162 12.981219 4.329 13 4.5 13 C 5.7444763 13 6.7671584 12.088686 6.9589844 10.898438 C 7.6438975 10.970039 8.3294829 11.011452 9.0117188 11 C 12.176719 10.968 14.478078 10.166578 16.705078 9.3925781 C 18.665953 8.7100781 20.535709 8.0675859 22.908203 7.9941406 z M 16 11 C 13.794 11 12 13.243 12 16 C 12 18.757 13.794 21 16 21 C 18.206 21 20 18.757 20 16 C 20 13.243 18.206 11 16 11 z M 16 13 C 17.084 13 18 14.374 18 16 C 18 17.626 17.084 19 16 19 C 14.916 19 14 17.626 14 16 C 14 14.374 14.916 13 16 13 z M 23.5 13 A 1.5 1.5 0 0 0 23.5 16 A 1.5 1.5 0 0 0 23.5 13 z M 8.5 16 A 1.5 1.5 0 0 0 8.5 19 A 1.5 1.5 0 0 0 8.5 16 z"></path></svg>
							</span>
							<div className="bg-gradient-to-r to-[#FF9B44] from-[#FC6075] py-2 px-4 rounded-2xl gap-2 absolute left-2 items-center invisible opacity-0 flex transition-all group-hover:visible group-hover:opacity-100 duration-300">
								<span className="text-white text-lg">
									<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 32 32" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M 22.853516 6.0078125 C 20.164121 6.0816133 18.078828 6.8123281 16.048828 7.5175781 C 13.877828 8.2715781 11.828234 8.9827188 8.9902344 9.0117188 C 7.0932344 9.0417187 5.1931719 8.7143594 3.3261719 8.0683594 L 2 7.609375 L 2 24.691406 L 2.6660156 24.927734 C 4.4050156 25.542734 6.183125 25.897422 7.953125 25.982422 C 8.234125 25.995422 8.5092969 26.001953 8.7792969 26.001953 C 11.792297 26.001953 14.098938 25.202687 16.335938 24.429688 C 18.693937 23.613688 20.918125 22.843328 23.953125 22.986328 C 25.527125 23.061328 27.112016 23.379687 28.666016 23.929688 L 30 24.402344 L 30 7.3144531 L 29.341797 7.0742188 C 27.616797 6.4492188 25.834922 6.0945781 24.044922 6.0175781 C 23.634422 5.9993281 23.237715 5.9972695 22.853516 6.0078125 z M 22.908203 7.9941406 C 23.247131 7.9836484 23.595781 7.9837969 23.957031 7.9980469 C 24.330995 8.0142703 24.705197 8.0481553 25.078125 8.0917969 C 25.344924 9.1855072 26.323979 10 27.5 10 C 27.671 10 27.838 9.9812188 28 9.9492188 L 28 19.050781 C 27.838 19.018781 27.671 19 27.5 19 C 26.264201 19 25.245058 19.898153 25.042969 21.076172 C 24.710892 21.041393 24.378543 21.017795 24.046875 21.001953 C 20.631875 20.851953 18.113688 21.710687 15.679688 22.554688 C 13.318688 23.372687 11.081828 24.145953 8.0488281 24.001953 C 7.6729998 23.983858 7.2965195 23.94781 6.9199219 23.902344 C 6.650967 22.811694 5.67385 22 4.5 22 C 4.329 22 4.162 22.018781 4 22.050781 L 4 12.949219 C 4.162 12.981219 4.329 13 4.5 13 C 5.7444763 13 6.7671584 12.088686 6.9589844 10.898438 C 7.6438975 10.970039 8.3294829 11.011452 9.0117188 11 C 12.176719 10.968 14.478078 10.166578 16.705078 9.3925781 C 18.665953 8.7100781 20.535709 8.0675859 22.908203 7.9941406 z M 16 11 C 13.794 11 12 13.243 12 16 C 12 18.757 13.794 21 16 21 C 18.206 21 20 18.757 20 16 C 20 13.243 18.206 11 16 11 z M 16 13 C 17.084 13 18 14.374 18 16 C 18 17.626 17.084 19 16 19 C 14.916 19 14 17.626 14 16 C 14 14.374 14.916 13 16 13 z M 23.5 13 A 1.5 1.5 0 0 0 23.5 16 A 1.5 1.5 0 0 0 23.5 13 z M 8.5 16 A 1.5 1.5 0 0 0 8.5 19 A 1.5 1.5 0 0 0 8.5 16 z"></path></svg>
								</span>
								<span className="text-[11px] text-white font-black uppercase">Holerites</span>
							</div>
						</Link>
					</li>

					{auth?.user?.permitionId === IPermitions.admin && (
						<li>
							<Link href="/dashboard/funcionarios" className="group flex items-center justify-center py-3 relative">
								<span className="text-slate-500 text-lg absolute left-2 py-2 px-4">
									<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"></path><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path><path d="M17 10h2a2 2 0 0 1 2 2v1"></path><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path><path d="M3 13v-1a2 2 0 0 1 2 -2h2"></path></svg>
								</span>
								<div className="bg-gradient-to-r to-[#FF9B44] from-[#FC6075] py-2 px-4 rounded-2xl gap-2 absolute left-2 items-center invisible opacity-0 flex transition-all group-hover:visible group-hover:opacity-100 duration-300">
									<span className="text-white text-lg">
										<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"></path><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path><path d="M17 10h2a2 2 0 0 1 2 2v1"></path><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path><path d="M3 13v-1a2 2 0 0 1 2 -2h2"></path></svg>
									</span>
									<span className="text-[11px] text-white font-black uppercase">Funcionários</span>
								</div>
							</Link>
						</li>
					)}

				</menu>
			</aside >
		</>
	)
}