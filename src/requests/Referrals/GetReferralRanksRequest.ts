import axios from "axios";
import { ReferralRankType } from "../../hooks/use-rankedreferrals";

export const getreferralsrankRequest = async () => {
    try{
        const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/referrals/ranked-b2c-users/`);
        
        const ReferralRankData: ReferralRankType[] = response.data.map(({ rank, username, total_earnings }: any) => ({
            rank,
            username,
            total_earnings,
        }));

        console.log(ReferralRankData);
        return ReferralRankData;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}