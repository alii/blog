import Head from 'next/head';

type MetaProps = {
	title: string;
	description: string;
	image: string;
};

export function Meta({title, description, image}: MetaProps) {
	return (
		<Head>
			<title>{title}</title>
			<meta content={description} name="description" />
			<meta property="og:type" content="website" />
			<meta property="og:description" content={description} />
			<meta property="og:title" content={title} />
			<meta property="og:image" content={image} />
		</Head>
	);
}
