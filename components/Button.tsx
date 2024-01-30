import { KeyTextField, LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import React from "react";
import { MdArrowOutward } from "react-icons/md";

type ButtonProps = {
	linkField: LinkField;
	label: KeyTextField;
	showIcon?: boolean;
	className?: string;
};

const Button = ({
	linkField,
	label,
	showIcon = true,
	className,
}: ButtonProps) => {
	return (
		<PrismicNextLink
			field={linkField}
			className={clsx(
				"group relative flex w-fit text-slate-800 items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50 px-4 py-2 font-bold transition-transform ease-out hover:scale-105",
				className
			)}
		>
			<span className="absolute inset-0 z-0 h-full translate-y-9 bg-teal-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0"></span>
			<span className="relative flex justify-center items-center gap-2">
				{label} {showIcon && <MdArrowOutward className="inline-block" />}
			</span>
		</PrismicNextLink>
	);
};

export default Button;
