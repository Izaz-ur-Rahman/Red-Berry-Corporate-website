// import { Routes, Route, Navigate } from "react-router-dom";
// import { Provider } from "react-redux";
// import { HelmetProvider } from "react-helmet-async";
// import { store } from "./store";

// import Index from "./routes/index";
// import AboutIndex from "./routes/about.index";
// import AboutSlug from "./routes/about.$slug";
// import AboutContact from "./routes/about.contact";
// import AmbitionsIndex from "./routes/ambitions.index";
// import AmbitionsSlug from "./routes/ambitions.$slug";
// import InfrastructureIndex from "./routes/infrastructure.index";
// import InfrastructureSlug from "./routes/infrastructure.$slug";
// import BlueprintTool from "./routes/blueprint-tool";
// import BlueprintIndex from "./routes/blueprint.index";
// import BlueprintSlug from "./routes/blueprint.$slug";
// import BlogSlug from "./routes/blog.$slug";
//  import ResourcesHubIndex from "./routes/resources-hub.index";
//  import ResourcesHubSlug from "./routes/resources-hub.$slug";
// // import AmbitionLibraryIndex from "./routes/resources-hub.ambition-library.index";
// //import TheAmbitionLibraryIndex from "./routes/resources-hub.the-ambition-library.index";
// // import InvestorResourcesIndex from "./routes/resources-hub.investor-resources.index";
// // import FamilyOfficeResourcesIndex from "./routes/resources-hub.family-office-resources.index";
// // import FounderResourcesIndex from "./routes/resources-hub.founder-resources.index";
// // import SovereignFreedomOpenWorldIndex from "./routes/resources-hub.sovereign-freedom-open-world.index";
// // import SovereignFreedomAndTheOpenWorldIndex from "./routes/resources-hub.sovereign-freedom-&-the-open-world.index";
// // import TechnologyIndex from "./routes/resources-hub.technology.index";
// // import FinanceIndex from "./routes/resources-hub.finance.index";
// // import AzfaIndex from "./routes/resources-hub.azfa.index";
// // import BusinessTetingIndex from "./routes/resources-hub.business-teting.index";
// // import TestingWebDesignCategoryIndex from "./routes/resources-hub.testing-web-design-category.index";
// //import HowToBuildAmbitiouslyUAE from "./routes/resources-hub.ambition-library.how-to-build-ambitiously-in-uae";
// import LaunchABusiness from "./routes/launch-a-business";
// import ExpandIntoGCC from "./routes/expand-into-gcc";
// import GrowAndProtectWealth from "./routes/grow-and-protect-wealth";
// import CreateFamilySecurity from "./routes/create-family-security";
// import IncreaseGlobalFreedom from "./routes/increase-global-freedom";
// import BuildAHospitalityVenture from "./routes/build-a-hospitality-venture";
// import FoundationBuild from "./routes/foundation-build";
// import FinancialInfrastructure from "./routes/financial-infrastructure";
// import WealthStructureDesign from "./routes/wealth-structure-design";
// import IdentityFoundation from "./routes/identity-foundation";
// import VentureArchitecture from "./routes/venture-architecture";
// import SovereignFreedom from "./routes/sovereign-freedom";
// import LegacyLifeArchitecture from "./routes/legacy-life-architecture";
// import ContactThankYou from "./routes/contact-thank-you";
// import PrivacyPolicy from "./routes/privacy-policy";
// import TermsAndConditions from "./routes/terms-and-conditions";
// import { NotFoundPage } from "@/components/site/NotFoundPage";

// export default function App() {
//   return (
//     <Provider store={store}>
//       <HelmetProvider>
//         <Routes>
//           <Route path="/" element={<Index />} />

//           <Route path="/about" element={<AboutIndex />} />
//           <Route path="/about/contact" element={<AboutContact />} />
//           <Route path="/about/:slug" element={<AboutSlug />} />

//           <Route path="/ambitions" element={<AmbitionsIndex />} />
//           <Route path="/ambitions/:slug" element={<AmbitionsSlug />} />

//           <Route path="/infrastructure" element={<InfrastructureIndex />} />
//           <Route path="/infrastructure/:slug" element={<InfrastructureSlug />} />

//           <Route path="/blueprint-tool" element={<BlueprintTool />} />
//           <Route path="/blueprint" element={<BlueprintIndex />} />
//           <Route path="/blueprint/:slug" element={<BlueprintSlug />} />

//           {/* Blog routes - only detail pages accessible */}
//           <Route path="/blog" element={<Navigate to="/resources-hub/ambition-library" replace />} />
//           <Route path="/blog/:slug" element={<BlogSlug />} />

//           {/* <Route path="/resources-hub" element={<ResourcesHubIndex />} />
//           <Route path="/resources-hub/ambition-library" element={<AmbitionLibraryIndex />} />
//           {/* <Route path="/resources-hub/the-ambition-library" element={<TheAmbitionLibraryIndex />} /> }
//           <Route path="/resources-hub/investor-resources" element={<InvestorResourcesIndex />} />
//           <Route path="/resources-hub/family-office-resources" element={<FamilyOfficeResourcesIndex />} />
//           <Route path="/resources-hub/founder-resources" element={<FounderResourcesIndex />} />
//           <Route path="/resources-hub/sovereign-freedom-open-world" element={<SovereignFreedomOpenWorldIndex />} />
//           <Route path="/resources-hub/sovereign-freedom-&-the-open-world" element={<SovereignFreedomAndTheOpenWorldIndex />} />
//           <Route path="/resources-hub/technology" element={<TechnologyIndex />} />
//           <Route path="/resources-hub/finance" element={<FinanceIndex />} />
//           <Route path="/resources-hub/azfa" element={<AzfaIndex />} />
//           <Route path="/resources-hub/business-teting" element={<BusinessTetingIndex />} />
//           <Route path="/resources-hub/testing-web-design-category" element={<TestingWebDesignCategoryIndex />} /> */}
//           {/* <Route
//             path="/resources-hub/ambition-library/how-to-build-ambitiously-in-uae"
//             element={<HowToBuildAmbitiouslyUAE />}
//           /> */}
//    {/* Resources Hub - completely CMS driven */}
// <Route
//   path="/resources-hub"
//   element={<ResourcesHubIndex />}
// />

// <Route
//   path="/resources-hub/:slug"
//   element={<ResourcesHubSlug />}
// />

//           <Route path="/launch-a-business" element={<LaunchABusiness />} />
//           <Route path="/expand-into-gcc" element={<ExpandIntoGCC />} />
//           <Route path="/grow-and-protect-wealth" element={<GrowAndProtectWealth />} />
//           <Route path="/create-family-security" element={<CreateFamilySecurity />} />
//           <Route path="/increase-global-freedom" element={<IncreaseGlobalFreedom />} />
//           <Route path="/build-a-hospitality-venture" element={<BuildAHospitalityVenture />} />

//           <Route path="/foundation-build" element={<FoundationBuild />} />
//           <Route path="/financial-infrastructure" element={<FinancialInfrastructure />} />
//           <Route path="/wealth-structure-design" element={<WealthStructureDesign />} />
//           <Route path="/identity-foundation" element={<IdentityFoundation />} />
//           <Route path="/venture-architecture" element={<VentureArchitecture />} />
//           <Route path="/sovereign-freedom" element={<SovereignFreedom />} />
//           <Route path="/legacy-life-architecture" element={<LegacyLifeArchitecture />} />

//           <Route path="/contact-thank-you" element={<ContactThankYou />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

//           {/* Legacy redirects for old TanStack root */}
//           <Route path="*" element={<NotFoundPage />} />
//         </Routes>
//       </HelmetProvider>
//     </Provider>
//   );
// }

import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { store } from "./store";

import Index from "./routes/index";
import AboutIndex from "./routes/about.index";
import AboutSlug from "./routes/about.$slug";
import AboutContact from "./routes/about.contact";

import AmbitionsIndex from "./routes/ambitions.index";
import AmbitionsSlug from "./routes/ambitions.$slug";

import InfrastructureIndex from "./routes/infrastructure.index";
import InfrastructureSlug from "./routes/infrastructure.$slug";

import BlueprintTool from "./routes/blueprint-tool";
import BlueprintIndex from "./routes/blueprint.index";
import BlueprintSlug from "./routes/blueprint.$slug";

import BlogSlug from "./routes/blog.$slug";

/* Resources Hub - CMS driven */
import ResourcesHubIndex from "./routes/resources-hub.index";
import ResourcesHubSlug from "./routes/resources-hub.$slug";

import LaunchABusiness from "./routes/launch-a-business";
import ExpandIntoGCC from "./routes/expand-into-gcc";
import GrowAndProtectWealth from "./routes/grow-and-protect-wealth";
import CreateFamilySecurity from "./routes/create-family-security";
import IncreaseGlobalFreedom from "./routes/increase-global-freedom";
import BuildAHospitalityVenture from "./routes/build-a-hospitality-venture";

import FoundationBuild from "./routes/foundation-build";
import FinancialInfrastructure from "./routes/financial-infrastructure";
import WealthStructureDesign from "./routes/wealth-structure-design";
import IdentityFoundation from "./routes/identity-foundation";
import VentureArchitecture from "./routes/venture-architecture";
import SovereignFreedom from "./routes/sovereign-freedom";
import LegacyLifeArchitecture from "./routes/legacy-life-architecture";

import ContactThankYou from "./routes/contact-thank-you";
import PrivacyPolicy from "./routes/privacy-policy";
import TermsAndConditions from "./routes/terms-and-conditions";

import { NotFoundPage } from "@/components/site/NotFoundPage";

export default function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Index />} />

          {/* About */}
          <Route path="/about" element={<AboutIndex />} />
          <Route path="/about/contact" element={<AboutContact />} />
          <Route path="/about/:slug" element={<AboutSlug />} />

          {/* Ambitions */}
          <Route path="/ambitions" element={<AmbitionsIndex />} />
          <Route path="/ambitions/:slug" element={<AmbitionsSlug />} />

          {/* Infrastructure */}
          <Route path="/infrastructure"element={<InfrastructureIndex />}/>
          <Route
            path="/infrastructure/:slug"
            element={<InfrastructureSlug />}
          />

          {/* Blueprint */}
          <Route
            path="/blueprint-tool"
            element={<BlueprintTool />}
          />
          <Route
            path="/blueprint"
            element={<BlueprintIndex />}
          />
          <Route
            path="/blueprint/:slug"
            element={<BlueprintSlug />}
          />

          {/* Blog */}
          <Route
            path="/blog"
            element={
              <Navigate
                to="/resources-hub"
                replace
              />
            }
          />

          <Route
            path="/blog/:slug"
            element={<BlogSlug />}
          />

          {/* Resources Hub - completely CMS driven */}
          <Route
            path="/resources-hub"
            element={<ResourcesHubIndex />}
          />

          <Route
            path="/resources-hub/:slug"
            element={<ResourcesHubSlug />}
          />

          {/* Outcomes */}
          <Route
            path="/launch-a-business"
            element={<LaunchABusiness />}
          />

          <Route
            path="/expand-into-gcc"
            element={<ExpandIntoGCC />}
          />

          <Route
            path="/grow-and-protect-wealth"
            element={<GrowAndProtectWealth />}
          />

          <Route
            path="/create-family-security"
            element={<CreateFamilySecurity />}
          />

          <Route
            path="/increase-global-freedom"
            element={<IncreaseGlobalFreedom />}
          />

          <Route
            path="/build-a-hospitality-venture"
            element={<BuildAHospitalityVenture />}
          />

          {/* Infrastructure capabilities */}
          <Route
            path="/foundation-build"
            element={<FoundationBuild />}
          />

          <Route
            path="/financial-infrastructure"
            element={<FinancialInfrastructure />}
          />

          <Route
            path="/wealth-structure-design"
            element={<WealthStructureDesign />}
          />

          <Route
            path="/identity-foundation"
            element={<IdentityFoundation />}
          />

          <Route
            path="/venture-architecture"
            element={<VentureArchitecture />}
          />

          <Route
            path="/sovereign-freedom"
            element={<SovereignFreedom />}
          />

          <Route
            path="/legacy-life-architecture"
            element={<LegacyLifeArchitecture />}
          />

          {/* Other */}
          <Route
            path="/contact-thank-you"
            element={<ContactThankYou />}
          />

          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy />}
          />

          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />

          {/* 404 */}
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </HelmetProvider>
    </Provider>
  );
}