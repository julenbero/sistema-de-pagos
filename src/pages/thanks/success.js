import Image from 'next/image';
import { getLayout } from '../../layouts';

import { Message } from '../../ui/components';
import { Button } from '../../ui/core';

export default function ThanksSuccessPage() {
	return (
		<Message
			title='Thank you'
			content='Your payment has been received successfully'
			action={
				<a href={process.env.NEXT_PUBLIC_BASE_URL}>
					<Button className='bg-primary'>Return to home</Button>
				</a>
			}
			image={
				<Image src='/img/success_people.png' alt='' width={280} height={280} />
			}
		/>
	);
}

ThanksSuccessPage.getLayout = getLayout;
