import Image from 'next/image';
import { Message } from '../../ui/components';
import { Button } from '../../ui/core';
import { getLayout } from '../../layouts';

export default function ThanksFailurePage() {
	return (
		<Message
			title='Oh no'
			content="Your payment hasn't been received"
			action={
				<a href={process.env.NEXT_PUBLIC_BASE_URL}>
					<Button className='bg-primary'>Return to home</Button>
				</a>
			}
			image={
				<Image src='/img/failure_people.png' alt='' width={280} height={280} />
			}
		/>
	);
}

ThanksFailurePage.getLayout = getLayout;
