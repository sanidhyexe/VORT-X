
'use client';

import { redirect, useParams } from 'next/navigation';

export default function CommunityPage() {
    const params = useParams();
    const communityName = params.communityName as string;

    // Redirect to the default channel for the community
    redirect(`/communities/${communityName}/general-chat`);

    return null;
}
