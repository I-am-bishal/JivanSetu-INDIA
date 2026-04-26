import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Landing } from "./pages/Landing";
import { RegistrationFlow } from "./pages/RegistrationFlow";
import { UrgencyDashboard } from "./pages/UrgencyDashboard";
import { SevaAIPage } from "./pages/SevaAIPage";
import { DonorCard } from "./pages/DonorCard";
import { About } from "./pages/About";
import { Login } from "./pages/Login";
import { LiveHeatmap } from "./pages/LiveHeatmap";
import { ProximityAlerts } from "./pages/ProximityAlerts";
import { ReportScanner } from "./pages/ReportScanner";
import { DoctorPortal } from "./pages/DoctorPortal";
import { NOTTOGuide } from "./pages/NOTTOGuide";
import { PledgeWall } from "./pages/PledgeWall";
import { LegalFAQ } from "./pages/LegalFAQ";
import { Dashboard } from "./pages/Dashboard";
import { Contact } from "./pages/Contact";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { ForgotPassword } from "./pages/ForgotPassword";
import { BloodCompatibility } from "./pages/BloodCompatibility";
import { BloodBankDirectory } from "./pages/BloodBankDirectory";
import { Statistics } from "./pages/Statistics";
import { SuccessStories } from "./pages/SuccessStories";
import { AdminDashboard } from "./pages/AdminDashboard";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#060d1f" }}>
      <div className="text-center">
        <p style={{ fontSize: "80px", fontWeight: 900, color: "rgba(255,255,255,0.05)" }}>404</p>
        <p style={{ fontSize: "24px", fontWeight: 700, color: "white", marginTop: "-20px" }}>Page not found</p>
        <a href="/" style={{ fontSize: "14px", color: "#93c5fd", display: "block", marginTop: "12px" }}>
          ← Return to JivanSetu
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Landing },
      { path: "login", Component: Login },
      { path: "forgot-password", Component: ForgotPassword },
      { path: "register", Component: RegistrationFlow },
      { path: "dashboard", Component: Dashboard },
      { path: "urgency", Component: UrgencyDashboard },
      { path: "seva-ai", Component: SevaAIPage },
      { path: "donor-card", Component: DonorCard },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "privacy", Component: Privacy },
      { path: "terms", Component: Terms },
      { path: "heatmap", Component: LiveHeatmap },
      { path: "alerts", Component: ProximityAlerts },
      { path: "report-scanner", Component: ReportScanner },
      { path: "doctor-portal", Component: DoctorPortal },
      { path: "notto-guide", Component: NOTTOGuide },
      { path: "pledge-wall", Component: PledgeWall },
      { path: "legal-faq", Component: LegalFAQ },
      { path: "blood-compatibility", Component: BloodCompatibility },
      { path: "blood-banks", Component: BloodBankDirectory },
      { path: "statistics", Component: Statistics },
      { path: "stories", Component: SuccessStories },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
]);
