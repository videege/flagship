import { CampaignUser } from './campaignUser';

export interface Invite {
    token: string;
    campaignId: string;
    campaignName: string;
    ownerName: string;
    acceptedUsers: CampaignUser[];
}
