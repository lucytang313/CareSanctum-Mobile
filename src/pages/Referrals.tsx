import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardFooter,
    CardTitle 
  } from "../components/ui/card";

import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import useReferral from "../hooks/use-refcode";
import useReferralRank from "../hooks/use-rankedreferrals";
import useReferralsData from "../hooks/use-refdata";
import useReferralStats from "../hooks/use-referralstats";

import * as Clipboard from "expo-clipboard";
import { ToastAndroid, Platform, Alert } from "react-native";

const ReferralScreen = () => {
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const {username} = useAppSelector((state) => state.auth);
    
    // Generate referral code
  
    const referralLink = useReferral()?.link;
    const referralcode = useReferral()?.code;
    
    const [copied, setCopied] = useState(false);
  
    // Sample data for referred users
    const referredUsers =useReferralsData(referralcode ? referralcode : '');
    const rankedData = useReferralRank();
    const statsData = useReferralStats(referralcode ? referralcode : '');
  
    // Current user's position in the leaderboard (index of Pawan Agarwal)
    const currentUserPosition = rankedData?.findIndex(entry => entry.username === username);

    const handleCopyLink = async (referralLink: string, setCopied: (value: boolean) => void) => {
        await Clipboard.setStringAsync(referralLink);
      
        setCopied(true);
      
        // Show toast notification
        if (Platform.OS === "android") {
          ToastAndroid.show("Referral link copied!", ToastAndroid.SHORT);
        } else {
          Alert.alert("Referral link copied!", "Share it with your friends and family");
        }
      
        setTimeout(() => setCopied(false), 2000);
      };
}
export default ReferralScreen;