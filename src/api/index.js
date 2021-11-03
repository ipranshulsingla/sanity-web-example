import sanity from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = sanity({
	useCdn: false,
	projectId: 'fnojoid5',
	dataset: 'production',
	apiVersion: '2021-11-02',
	token: 'skXldNGkGh1TbdtQlQUP4D8FWrKrdrtxzM4aSnhS1IZG2vl6JvPMvidS8c7XgkfCQUZbuORfAMJVapDRlBxj4hXWuf7fumPXskMxUvSS1Y5TL3OIIXJ3DLCicCVcsn4pujilqeKacjKtKDyPDk8lckcCePvqlt4aU1jCawPMwlqpEbVLeYbB',
});

const builder = imageUrlBuilder(client);

export async function getCampaigns() {
	const data = await client.fetch('*[_type == "campaign"]{title, image}');
	return data.map((each) => ({ ...each, image: builder.image(each.image).url() }));
}

export function getCoupons() {
	return client.fetch('*[_type == "coupon"]{coupon_code, description, expiry}');
}
