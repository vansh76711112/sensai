import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import DashboardView from "./_components/dashboard-view";

const IndustryInsightsPage=async() =>{
      console.log("🔍 Entered IndustryInsightsPage"); // 1️⃣ confirm page loads
    
  const { isOnboarded } = await getUserOnboardingStatus();
  //fetching the data from industry Insight
   if (!isOnboarded) {
    redirect("/onboarding");
  }

  const insights=await getIndustryInsights();

 
  return (
    <div className="container mx-auto">
      {/* creating another page because server component */}
      <DashboardView insights={insights}/>
    </div>
  );
}
export default IndustryInsightsPage;
