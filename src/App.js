import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { getCampaigns, getCoupons } from './api';
import useFetch from './hooks/useFetch';
import styled from 'styled-components';

const Image = styled('img')({
	width: '100%',
	height: '350px',
	objectFit: 'cover',
});

const ImageCaption = styled('div')({
	textAlign: 'center',
	width: '100%',
	backgroundColor: '#FFFFFF99',
	position: 'absolute',
	bottom: 0,
	padding: '10px',
	color: 'black',
	fontWeight: '600',
});

const Slide = styled('div')({
	position: 'relative',
});

const CouponsContainer = styled('div')({
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	width: '90%',
	margin: '0 auto',
	gap: '50px 6.66%',
	justifyContent: 'stretch',
});

const Coupon = styled('div')({
	width: '20%',
	border: '1px solid #000000DD',
	borderRadius: '5px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '10px',
});

const CouponCode = styled('span')({
	border: '1px dashed #000000DD',
	padding: '5px 10px',
});

function App() {
	const [requestCampaigns, campaigns] = useFetch(getCampaigns, []);
	const [requestCoupons, coupons] = useFetch(getCoupons, []);

	useEffect(() => {
		requestCampaigns();
		requestCoupons();
	}, [requestCampaigns, requestCoupons]);

	return (
		<main style={{ marginBottom: 150 }}>
			<h1 style={{ textAlign: 'center' }}>Campaigns</h1>

			<h2>Slider</h2>
			<Slider arrows={false} autoplay autoplaySpeed={2000} dots>
				{campaigns.map((campaign) => (
					<Slide key={campaign.image}>
						<Image src={campaign.image} alt='' />
						<ImageCaption>{campaign.title}</ImageCaption>
					</Slide>
				))}
			</Slider>

			<h2>Coupons</h2>
			<CouponsContainer>
				{coupons.map((coupon) => (
					<Coupon key={coupon.coupon_code}>
						<CouponCode>{coupon.coupon_code}</CouponCode>
						<h4 style={{ margin: '15px 0' }}>{coupon.description}</h4>
						<h4 style={{ margin: 0, color: '#FF0000CC' }}>{coupon.expiry}</h4>
					</Coupon>
				))}
			</CouponsContainer>
		</main>
	);
}

export default App;
