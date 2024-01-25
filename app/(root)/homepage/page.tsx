import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
	const client = createClient();
	const page = await client.getSingle("homepage");

	return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
	const client = createClient();
	let page;
	try {
		page = await client.getSingle("homepage");
	} catch (error) {
		console.error("Error fetching page data:", error);
		throw error;
	}

	return {
		title: page.data.meta_title,
		description: page.data.meta_description,
	};
}
