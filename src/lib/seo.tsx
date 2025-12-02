const baseUrl = "https://gifter.com";

export const seo = ({
	title,
	description,
	keywords,
	image,
	path = "",
}: {
	title: string;
	description?: string;
	image?:
		| string
		| {
				title: string;
				description?: string;
		  };
	keywords?: string;
	path?: string;
}) => {
	const canonicalUrl = `${baseUrl}${path}`;
	const ogImage = image
		? typeof image === "string"
			? `${baseUrl}${image}`
			: image.title && image.description
				? `${baseUrl}/og/v2?title=${encodeURIComponent(image.title)}&description=${encodeURIComponent(image.description)}`
				: `${baseUrl}/og/v1?title=${encodeURIComponent(image.title)}`
		: undefined;

	const tags = [
		{ title },
		{ name: "description", content: description },
		{ name: "keywords", content: keywords },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ name: "twitter:creator", content: "@mattsilx" },
		{ name: "twitter:site", content: "@mattsilx" },
		{ property: "og:type", content: "website" },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:url", content: canonicalUrl },
		...(ogImage
			? [
					{ name: "twitter:image", content: ogImage },
					{ name: "twitter:card", content: "summary_large_image" },
					{ property: "og:image", content: ogImage },
				]
			: []),
	];

	return tags;
};
