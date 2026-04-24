export default {
  appName: "જીવનસેતુ",
  tagline: "જીવનનો પુલ",
  taglineFull: "બચાવેલ દરેક અંગ એક પરિવારને ફરી મળાવે છે",
  subTagline: "ભારતનું વિશ્વસનીય અંગ અને રક્ત દાન મેળ પ્લેટફોર્મ",
  nav: { home: "હોમ", urgency: "SOS ડેશબોર્ડ", sevaAI: "સેવા AI", about: "અમારા વિશે", login: "લૉગિન", donorCard: "મારું ડોનર કાર્ડ" },
  personas: { title: "હું ઇચ્છું છું...", organDonor: "અંગ દાન કરવું", organDonorSub: "અંગ દાતા તરીકે નોંધણી કરો", organReceiver: "અંગ જોઈએ છે", organReceiverSub: "તમારી તબીબી જરૂરત નોંધો", bloodDonor: "રક્ત દાન કરવું", bloodDonorSub: "સ્વૈચ્છિક રક્ત દાન સુનિશ્ચિત કરો", bloodReceiver: "રક્ત જોઈએ છે", bloodReceiverSub: "નજીકના રક્ત દાતા શોધો" },
  stats: { donors: "નોંધાયેલ દાતાઓ", livesSaved: "બચાવેલ જીવ", hospitals: "ભાગીદાર હોસ્પિટલ", cities: "આવરેલ શહેરો" },
  sos: { title: "લાઇવ SOS", ticker: "તાત્કાલિક", critical: "ગંભીર", needsBlood: "ને", urgently: "તાત્કાલિક જોઈએ", at: "ખાતે", hoursAgo: "કલાક પહેલાં", minutesAgo: "મિનિટ પહેલાં", respond: "હવે સહાય કરો", viewAll: "તમામ SOS વિનંતીઓ જુઓ", severity: { critical: "ગંભીર", high: "ઉચ્ચ", moderate: "મધ્યમ" } },
  sevaAI: { name: "સેવા AI", greeting: "નમસ્કાર! હું સેવા છું, જીવનસેતુ પર તમારો માર્ગદર્શક. આજે હું તમને કેવી રીતે મદદ કરી શકું?", placeholder: "અંગ દાન, રક્ત પ્રકાર, નોંધણી વિશે પૂછો...", suggestions: ["અંગ દાતા તરીકે કેવી રીતે નોંધણી કરવી?", "કઈ દસ્તાવેજો જોઈએ?", "નજીકની બ્લડ બેંક શોધો", "શું ભારતમાં અંગ દાન કાયદેસર છે?"], typing: "સેવા ટાઇપ કરી રહ્યું છે..." , 
    answers: {
      "register": "અંગ દાતા તરીકે નોંધણી કરવા માટે:\n\n1. માન્ય આધાર કાર્ડ\n2. આધાર સાથે જોડાયેલ મોબાઈલ નંબર\n\nનોંધણી માટે 'અંગ દાન કરો' પર ક્લિક કરો.",
      "organ": "દાન કરી શકાતા અંગો:\n❤️ હૃદય\n🫁 ફેફસાં\n🫀 કિડની\n🧠 લીવર\n👁️ આંખો\n🩺 સ્વાદુપિંડ",
      "legal": "હા, અંગ દાન સંપૂર્ણપણે કાનૂની છે. અંગોનું વેચાણ ગેરકાયદેસર છે.",
      "blood": "રક્તદાતાઓ શોધવા માટે તમારું સ્થાન શેર કરો.",
      "document": "જરૂરી દસ્તાવેજો: આધાર કાર્ડ, ફોટો, ડૉક્ટરનું પ્રમાણપત્ર.",
      "notto": "NOTTO એ સર્વોચ્ચ સંસ્થા છે. વેબસાઇટ: notto.mohfw.gov.in",
      "default": "હું સેવા છું, જીવનસેતુ પર તમારો માર્ગદર્શક. હું તમને કેવી રીતે મદદ કરી શકું?"
},
    chips: {
      "bloodBank": "બ્લડ બેંક",
      "registerDonor": "નોંધણી કરો",
      "documents": "દસ્તાવેજો"
}
  },
  registration: { steps: { personal: "વ્યક્તિગત માહિતી", verify: "OTP ચકાસણી", medical: "તબીબી વિગતો", documents: "દસ્તાવેજો", done: "પૂર્ણ" }, fullName: "પૂરું નામ", mobile: "મોબાઇલ નંબર", aadhaar: "આધાર નંબર", dob: "જન્મ તારીખ", bloodType: "બ્લડ ગ્રૂપ", city: "શહેર", state: "રાજ્ય", sendOTP: "OTP મોકલો", verifyOTP: "OTP ચકાસો", otpSent: "OTP તમારા આધાર-સંલગ્ન મોબાઇલ પર મોકલ્યો", enterOTP: "6-અંકનો OTP દાખલ કરો", uploadDoc: "ડૉક્ટરનો અભિપ્રાય અપલોડ કરો", uploadCert: "તબીબી પ્રમાણપત્ર અપલોડ કરો", submitBtn: "નોંધણી સબમિટ કરો", successTitle: "નોંધણી સફળ!", successMsg: "તમારું ડોનર કાર્ડ હવે સક્રિય છે. તમે એક નાયક છો.", organs: { heart: "હૃદય", kidneys: "કિડની", liver: "યકૃત", lungs: "ફેફસાં", corneas: "કૉર્નિયા", pancreas: "સ્વાદુપિંડ", smallIntestine: "નાની આંતરડી" } },
  compliance: { title: "THOTA અને NOTTO અનુરૂપ", body: "જીવનસેતુ એક મેળ અને જાગૃતિ પ્લેટફોર્મ છે, બજારક્ષેત્ર નહીં." },
  footer: { tagline: "એક-એક જીવ બચાવીએ.", compliance: "THOTA 1994 અનુરૂપ | NOTTO સંલગ્ન | ડેટા સુરક્ષિત", emergency: "રાષ્ટ્રીય અંગ પ્રત્યારોપણ હેલ્પલાઇન: 1800-11-NOTTO" },
};
