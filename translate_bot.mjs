import fs from 'fs';
import path from 'path';

const translations = {
  en: {
    answers: {
      register: "To register as an organ donor in India:\n\n1. You need a valid Aadhaar card\n2. Mobile number linked to Aadhaar\n3. Doctor's eligibility certificate (for receivers)\n\nClick on 'Donate an Organ' on the home page to begin your 5-minute registration. Your consent is completely voluntary and can be revoked at any time.",
      organ: "In India, the organs that can be donated include:\n\n❤️ Heart\n🫁 Lungs (both)\n🫀 Kidneys (both)\n🧠 Liver\n👁️ Corneas\n🩺 Pancreas\n\nLiving donors can donate one kidney or a part of the liver. All other organs are donated after brain death (cadaveric donation), as certified by an NOTTO-registered hospital.",
      legal: "Yes, organ donation is fully legal in India under:\n\n📋 **The Transplantation of Human Organs and Tissues Act (THOTA), 1994** (amended 2011)\n\nKey points:\n• Trading organs is illegal and punishable\n• Only voluntary donation is permitted\n• All transplants must be routed through NOTTO\n• JivanSetu is a matching platform, NOT a marketplace\n\nFor official information: notto.mohfw.gov.in",
      blood: "To find blood donors near you:\n\n1. Share your location below\n2. Enter the required blood type\n3. We'll show you verified donors within 10km\n\nEmergency blood banks:\n• AIIMS Delhi: +91-11-26588500\n• PGI Chandigarh: +91-172-2755555\n• KEM Mumbai: +91-22-24107000\n\nFor national blood bank directory, visit eraktkosh.in",
      document: "Documents required for organ donor registration:\n\n✅ Aadhaar card (identity proof)\n✅ Recent passport photo\n✅ Mobile number linked to Aadhaar\n\nFor organ receivers additionally:\n✅ Doctor's opinion letter (on hospital letterhead)\n✅ Medical fitness certificate\n✅ Referring hospital registration number\n\nAll documents can be uploaded digitally in PDF or JPG format.",
      notto: "NOTTO (National Organ and Tissue Transplant Organization) is India's apex body for organ transplantation.\n\nWebsite: notto.mohfw.gov.in\nHelpline: 1800-11-NOTTO\n\nJivanSetu works in partnership with NOTTO to ensure:\n• All matches are medically verified\n• Transplants happen through authorized hospitals\n• Data privacy is maintained per PDPA 2023",
      default: "I'm Seva, your compassionate guide on JivanSetu. I can help you with:\n\n🩺 Organ donation registration\n🩸 Finding blood donors nearby\n📋 Required documents\n⚖️ Legal information (THOTA/NOTTO)\n❤️ Emotional support & guidance\n\nWhat would you like help with today?"
    },
    chips: { bloodBank: "Find Blood Bank", registerDonor: "Register Donor", documents: "Documents" }
  },
  hi: {
    answers: {
      register: "भारत में अंग दाता के रूप में पंजीकरण करने के लिए:\n\n1. आपको एक वैध आधार कार्ड की आवश्यकता है\n2. आधार से जुड़ा मोबाइल नंबर\n3. डॉक्टर का पात्रता प्रमाण पत्र (प्राप्तकर्ताओं के लिए)\n\nअपना 5 मिनट का पंजीकरण शुरू करने के लिए होम पेज पर 'अंग दान करें' पर क्लिक करें। आपकी सहमति पूरी तरह से स्वैच्छिक है और इसे किसी भी समय वापस लिया जा सकता है।",
      organ: "भारत में जिन अंगों का दान किया जा सकता है उनमें शामिल हैं:\n\n❤️ हृदय\n🫁 फेफड़े (दोनों)\n🫀 गुर्दे (दोनों)\n🧠 यकृत\n👁️ कॉर्निया\n🩺 अग्न्याशय\n\nजीवित दाता एक किडनी या लिवर का एक हिस्सा दान कर सकते हैं। अन्य सभी अंगों का दान ब्रेन डेथ (कैडेवरिक डोनेशन) के बाद किया जाता है, जैसा कि NOTTO-पंजीकृत अस्पताल द्वारा प्रमाणित किया गया है।",
      legal: "हां, भारत में अंग दान पूरी तरह से कानूनी है:\n\n📋 **मानव अंग और ऊतक प्रत्यारोपण अधिनियम (THOTA), 1994** (संशोधित 2011)\n\nमुख्य बिंदु:\n• अंगों का व्यापार अवैध और दंडनीय है\n• केवल स्वैच्छिक दान की अनुमति है\n• सभी प्रत्यारोपण NOTTO के माध्यम से किए जाने चाहिए\n• जीवनसेतु एक मिलान मंच है, बाज़ार नहीं\n\nआधिकारिक जानकारी के लिए: notto.mohfw.gov.in",
      blood: "अपने पास रक्तदाताओं को खोजने के लिए:\n\n1. अपना स्थान नीचे साझा करें\n2. आवश्यक रक्त प्रकार दर्ज करें\n3. हम आपको 10 किमी के भीतर सत्यापित दाता दिखाएंगे\n\nआपातकालीन ब्लड बैंक:\n• AIIMS दिल्ली: +91-11-26588500\n• PGI चंडीगढ़: +91-172-2755555\n• KEM मुंबई: +91-22-24107000\n\nराष्ट्रीय ब्लड बैंक निर्देशिका के लिए, eraktkosh.in पर जाएं",
      document: "अंग दाता पंजीकरण के लिए आवश्यक दस्तावेज:\n\n✅ आधार कार्ड (पहचान प्रमाण)\n✅ हालिया पासपोर्ट फोटो\n✅ आधार से जुड़ा मोबाइल नंबर\n\nअंग प्राप्तकर्ताओं के लिए अतिरिक्त:\n✅ डॉक्टर की राय का पत्र (अस्पताल के लेटरहेड पर)\n✅ चिकित्सा फिटनेस प्रमाण पत्र\n✅ रेफरिंग अस्पताल पंजीकरण संख्या\n\nसभी दस्तावेज पीडीएफ या जेपीजी प्रारूप में डिजिटल रूप से अपलोड किए जा सकते हैं।",
      notto: "NOTTO (राष्ट्रीय अंग और ऊतक प्रत्यारोपण संगठन) अंग प्रत्यारोपण के लिए भारत का सर्वोच्च निकाय है।\n\nवेबसाइट: notto.mohfw.gov.in\nहेल्पलाइन: 1800-11-NOTTO\n\nजीवनसेतु NOTTO के साथ साझेदारी में काम करता है यह सुनिश्चित करने के लिए:\n• सभी मिलान चिकित्सकीय रूप से सत्यापित हैं\n• प्रत्यारोपण अधिकृत अस्पतालों के माध्यम से होते हैं\n• PDPA 2023 के अनुसार डेटा गोपनीयता बनाए रखी जाती है",
      default: "मैं सेवा हूं, जीवनसेतु पर आपका मार्गदर्शक। मैं आपकी मदद कर सकता हूं:\n\n🩺 अंग दान पंजीकरण\n🩸 आस-पास के रक्तदाताओं को खोजना\n📋 आवश्यक दस्तावेज\n⚖️ कानूनी जानकारी (THOTA/NOTTO)\n❤️ भावनात्मक समर्थन और मार्गदर्शन\n\nआज आप किस बारे में मदद चाहेंगे?"
    },
    chips: { bloodBank: "ब्लड बैंक खोजें", registerDonor: "दाता पंजीकरण", documents: "दस्तावेज" }
  },
  ta: {
    answers: {
      register: "இந்தியாவில் உறுப்பு தானியாக பதிவு செய்ய:\n\n1. செல்லுபடியாகும் ஆதார் அட்டை\n2. ஆதாருடன் இணைக்கப்பட்ட மொபைல் எண்\n3. மருத்துவர் சான்றிதழ்\n\nமுகப்பு பக்கத்தில் 'உறுப்பு தானம்' என்பதை கிளிக் செய்யவும்.",
      organ: "தானம் செய்யக்கூடிய உறுப்புகள்:\n❤️ இதயம்\n🫁 நுரையீரல்கள்\n🫀 சிறுநீரகங்கள்\n🧠 கல்லீரல்\n👁️ கண்கள்\n🩺 கணையம்",
      legal: "ஆம், உறுப்பு தானம் முற்றிலும் சட்டப்பூர்வமானது. THOTA 1994 சட்டத்தின் கீழ் உறுப்பு விற்பனை சட்டவிரோதமானது.",
      blood: "இரத்த தானியர்களைக் கண்டறிய உங்கள் இடத்தை பகிரவும். 10கிமீ சுற்றளவில் உள்ளவர்களை காட்டுவோம்.",
      document: "தேவையான ஆவணங்கள்: ஆதார் அட்டை, புகைப்படம், மருத்துவர் சான்றிதழ்.",
      notto: "NOTTO இந்தியாவின் உயர்மட்ட அமைப்பாகும். இணையதளம்: notto.mohfw.gov.in",
      default: "நான் சேவா, ஜீவன்சேதுவில் உங்கள் வழிகாட்டி. நான் உங்களுக்கு எவ்வாறு உதவலாம்?"
    },
    chips: { bloodBank: "இரத்த வங்கி தேடு", registerDonor: "பதிவு செய்", documents: "ஆவணங்கள்" }
  },
  te: {
    answers: {
      register: "భారతదేశంలో అవయవ దాతగా నమోదు చేసుకోవడానికి:\n\n1. చెల్లుబాటు అయ్యే ఆధార్ కార్డ్\n2. ఆధార్‌తో లింక్ చేయబడిన మొబైల్ నంబర్\n\nనమోదు కోసం 'అవయవ దానం' పై క్లిక్ చేయండి.",
      organ: "దానం చేయగల అవయవాలు:\n❤️ గుండె\n🫁 ఊపిరితిత్తులు\n🫀 మూత్రపిండాలు\n🧠 కాలేయం\n👁️ కళ్ళు\n🩺 క్లోమం",
      legal: "అవును, అవయవ దానం పూర్తిగా చట్టబద్ధమైనది. అవయవాల విక్రయం చట్టవిరుద్ధం.",
      blood: "రక్త దాతలను కనుగొనడానికి మీ స్థానాన్ని పంచుకోండి. 10కిమీ పరిధిలో చూపిస్తాము.",
      document: "అవసరమైన పత్రాలు: ఆధార్ కార్డ్, ఫోటో, డాక్టర్ సర్టిఫికెట్.",
      notto: "NOTTO అనేది భారతదేశ అత్యున్నత సంస్థ. వెబ్‌సైట్: notto.mohfw.gov.in",
      default: "నేను సేవా, జీవన్‌సేతులో మీ మార్గదర్శిని. నేను మీకు ఎలా సహాయపడగలను?"
    },
    chips: { bloodBank: "బ్లడ్ బ్యాంక్", registerDonor: "నమోదు", documents: "పత్రాలు" }
  },
  bn: {
    answers: {
      register: "ভারতে অঙ্গ দাতা হিসাবে নিবন্ধন করতে:\n\n1. বৈধ আধার কার্ড\n2. আধার যুক্ত মোবাইল নম্বর\n\nনিবন্ধন শুরু করতে 'অঙ্গ দান করুন' এ ক্লিক করুন।",
      organ: "যে অঙ্গগুলি দান করা যেতে পারে:\n❤️ হৃদয়\n🫁 ফুসফুস\n🫀 কিডনি\n🧠 লিভার\n👁️ চোখ\n🩺 অগ্ন্যাশয়",
      legal: "হ্যাঁ, অঙ্গ দান ভারতে সম্পূর্ণ বৈধ। অঙ্গ কেনাবেচা বেআইনি।",
      blood: "কাছের রক্তদাতা খুঁজতে আপনার অবস্থান শেয়ার করুন।",
      document: "প্রয়োজনীয় নথিপত্র: আধার কার্ড, ছবি, ডাক্তারের শংসাপত্র।",
      notto: "NOTTO হলো ভারতের সর্বোচ্চ সংস্থা। ওয়েবসাইট: notto.mohfw.gov.in",
      default: "আমি সেবা, জীবনসেতুতে আপনার গাইড। আমি আপনাকে কীভাবে সাহায্য করতে পারি?"
    },
    chips: { bloodBank: "রক্ত ব্যাংক", registerDonor: "নিবন্ধন করুন", documents: "নথিপত্র" }
  },
  mr: {
    answers: {
      register: "अवयव दाता म्हणून नोंदणी करण्यासाठी:\n\n1. वैध आधार कार्ड\n2. आधारशी जोडलेला मोबाईल क्रमांक\n\nनोंदणीसाठी 'अवयव दान करा' वर क्लिक करा.",
      organ: "दान करता येणारे अवयव:\n❤️ हृदय\n🫁 फुफ्फुसे\n🫀 मूत्रपिंड\n🧠 यकृत\n👁️ डोळे\n🩺 स्वादुपिंड",
      legal: "होय, अवयवदान भारतात पूर्णपणे कायदेशीर आहे. अवयव विक्री बेकायदेशीर आहे.",
      blood: "रक्तदाते शोधण्यासाठी तुमचे स्थान शेअर करा.",
      document: "आवश्यक कागदपत्रे: आधार कार्ड, फोटो, डॉक्टरांचे प्रमाणपत्र.",
      notto: "NOTTO ही सर्वोच्च संस्था आहे. वेबसाईट: notto.mohfw.gov.in",
      default: "मी सेवा, जीवनसेतूवर तुमचा मार्गदर्शक. मी तुम्हाला कशी मदत करू शकेन?"
    },
    chips: { bloodBank: "ब्लड बँक", registerDonor: "नोंदणी करा", documents: "कागदपत्रे" }
  },
  gu: {
    answers: {
      register: "અંગ દાતા તરીકે નોંધણી કરવા માટે:\n\n1. માન્ય આધાર કાર્ડ\n2. આધાર સાથે જોડાયેલ મોબાઈલ નંબર\n\nનોંધણી માટે 'અંગ દાન કરો' પર ક્લિક કરો.",
      organ: "દાન કરી શકાતા અંગો:\n❤️ હૃદય\n🫁 ફેફસાં\n🫀 કિડની\n🧠 લીવર\n👁️ આંખો\n🩺 સ્વાદુપિંડ",
      legal: "હા, અંગ દાન સંપૂર્ણપણે કાનૂની છે. અંગોનું વેચાણ ગેરકાયદેસર છે.",
      blood: "રક્તદાતાઓ શોધવા માટે તમારું સ્થાન શેર કરો.",
      document: "જરૂરી દસ્તાવેજો: આધાર કાર્ડ, ફોટો, ડૉક્ટરનું પ્રમાણપત્ર.",
      notto: "NOTTO એ સર્વોચ્ચ સંસ્થા છે. વેબસાઇટ: notto.mohfw.gov.in",
      default: "હું સેવા છું, જીવનસેતુ પર તમારો માર્ગદર્શક. હું તમને કેવી રીતે મદદ કરી શકું?"
    },
    chips: { bloodBank: "બ્લડ બેંક", registerDonor: "નોંધણી કરો", documents: "દસ્તાવેજો" }
  },
  kn: {
    answers: {
      register: "ಅಂಗದಾನಿಯಾಗಿ ನೋಂದಾಯಿಸಲು:\n\n1. ಮಾನ್ಯವಾದ ಆಧಾರ್ ಕಾರ್ಡ್\n2. ಆಧಾರ್ ಲಿಂಕ್ ಆದ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ\n\nನೋಂದಣಿಗಾಗಿ 'ಅಂಗದಾನ ಮಾಡಿ' ಕ್ಲಿಕ್ ಮಾಡಿ.",
      organ: "ದಾನ ಮಾಡಬಹುದಾದ ಅಂಗಗಳು:\n❤️ ಹೃದಯ\n🫁 ಶ್ವಾಸಕೋಶ\n🫀 ಮೂತ್ರಪಿಂಡ\n🧠 ಯಕೃತ್ತು\n👁️ ಕಣ್ಣುಗಳು\n🩺 ಮೇದೋಜೀರಕ ಗ್ರಂಥಿ",
      legal: "ಹೌದು, ಅಂಗದಾನ ಸಂಪೂರ್ಣವಾಗಿ ಕಾನೂನುಬದ್ಧವಾಗಿದೆ. ಅಂಗಗಳ ಮಾರಾಟ ಅಕ್ರಮ.",
      blood: "ರಕ್ತದಾನಿಗಳನ್ನು ಹುಡುಕಲು ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.",
      document: "ಅಗತ್ಯ ದಾಖಲೆಗಳು: ಆಧಾರ್ ಕಾರ್ಡ್, ಫೋಟೋ, ವೈದ್ಯರ ಪ್ರಮಾಣಪತ್ರ.",
      notto: "NOTTO ಉನ್ನತ ಸಂಸ್ಥೆಯಾಗಿದೆ. ವೆಬ್‌ಸೈಟ್: notto.mohfw.gov.in",
      default: "ನಾನು ಸೇವಾ, ಜೀವನ್‌ಸೇತುವಿನಲ್ಲಿ ನಿಮ್ಮ ಮಾರ್ಗದರ್ಶಿ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ?"
    },
    chips: { bloodBank: "ರಕ್ತ ಬ್ಯಾಂಕ್", registerDonor: "ನೋಂದಣಿ", documents: "ದಾಖಲೆಗಳು" }
  },
  ml: {
    answers: {
      register: "അവയവ ദാതാവായി രജിസ്റ്റർ ചെയ്യാൻ:\n\n1. സാധുവായ ആധാർ കാർഡ്\n2. ആധാറുമായി ലിങ്ക് ചെയ്ത മൊബൈൽ നമ്പർ\n\nരജിസ്റ്റർ ചെയ്യാൻ 'അവയവം ദാനം ചെയ്യുക' ക്ലിക്ക് ചെയ്യുക.",
      organ: "ദാനം ചെയ്യാവുന്ന അവയവങ്ങൾ:\n❤️ ഹൃദയം\n🫁 ശ്വാസകോശം\n🫀 വൃക്കകൾ\n🧠 കരൾ\n👁️ കണ്ണുകൾ\n🩺 പാൻക്രിയാസ്",
      legal: "അതെ, അവയവദാനം ഇന്ത്യയിൽ പൂർണ്ണമായും നിയമപരമാണ്.",
      blood: "രക്തദാതാക്കളെ കണ്ടെത്താൻ നിങ്ങളുടെ ലൊക്കേഷൻ പങ്കിടുക.",
      document: "ആവശ്യമായ രേഖകൾ: ആധാർ കാർഡ്, ഫോട്ടോ, ഡോക്ടറുടെ സർട്ടിഫിക്കറ്റ്.",
      notto: "NOTTO ആണ് പരമോന്നത സമിതി. വെബ്സൈറ്റ്: notto.mohfw.gov.in",
      default: "ഞാൻ സേവ, ജീവൻസേതുവിലെ നിങ്ങളുടെ വഴികാട്ടി. എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാനാകും?"
    },
    chips: { bloodBank: "ബ്ലഡ് ബാങ്ക്", registerDonor: "രജിസ്റ്റർ ചെയ്യുക", documents: "രേഖകൾ" }
  },
  pa: {
    answers: {
      register: "ਅੰਗ ਦਾਨੀ ਵਜੋਂ ਰਜਿਸਟਰ ਕਰਨ ਲਈ:\n\n1. ਵੈਧ ਆਧਾਰ ਕਾਰਡ\n2. ਆਧਾਰ ਨਾਲ ਜੁੜਿਆ ਮੋਬਾਈਲ ਨੰਬਰ\n\nਰਜਿਸਟਰੀ ਲਈ 'ਅੰਗ ਦਾਨ ਕਰੋ' 'ਤੇ ਕਲਿੱਕ ਕਰੋ।",
      organ: "ਦਾਨ ਕੀਤੇ ਜਾ ਸਕਣ ਵਾਲੇ ਅੰਗ:\n❤️ ਦਿਲ\n🫁 ਫੇਫੜੇ\n🫀 ਗੁਰਦੇ\n🧠 ਜਿਗਰ\n👁️ ਅੱਖਾਂ\n🩺 ਪੈਨਕ੍ਰੀਅਸ",
      legal: "ਹਾਂ, ਅੰਗ ਦਾਨ ਪੂਰੀ ਤਰ੍ਹਾਂ ਕਾਨੂੰਨੀ ਹੈ। ਅੰਗ ਵੇਚਣਾ ਗੈਰ-ਕਾਨੂੰਨੀ ਹੈ।",
      blood: "ਖੂਨਦਾਨੀਆਂ ਨੂੰ ਲੱਭਣ ਲਈ ਆਪਣਾ ਸਥਾਨ ਸਾਂਝਾ ਕਰੋ।",
      document: "ਜ਼ਰੂਰੀ ਦਸਤਾਵੇਜ਼: ਆਧਾਰ ਕਾਰਡ, ਫੋਟੋ, ਡਾਕਟਰ ਦਾ ਸਰਟੀਫਿਕੇਟ।",
      notto: "NOTTO ਭਾਰਤ ਦੀ ਸਰਵਉੱਚ ਸੰਸਥਾ ਹੈ। ਵੈੱਬਸਾਈਟ: notto.mohfw.gov.in",
      default: "ਮੈਂ ਸੇਵਾ ਹਾਂ, ਜੀਵਨਸੇਤੂ 'ਤੇ ਤੁਹਾਡਾ ਮਾਰਗਦਰਸ਼ਕ। ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?"
    },
    chips: { bloodBank: "ਬਲੱਡ ਬੈਂਕ", registerDonor: "ਰਜਿਸਟਰ ਕਰੋ", documents: "ਦਸਤਾਵੇਜ਼" }
  },
  ur: {
    answers: {
      register: "عطیہ دہندہ کے طور پر رجسٹر کرنے کے لیے:\n\n1. درست آدھار کارڈ\n2. آدھار سے منسلک موبائل نمبر\n\nرجسٹریشن کے لیے 'عطیہ کریں' پر کلک کریں۔",
      organ: "عطیہ کیے جانے والے اعضاء:\n❤️ دل\n🫁 پھیپھڑے\n🫀 گردے\n🧠 جگر\n👁️ آنکھیں\n🩺 لبلبہ",
      legal: "ہاں، اعضاء کا عطیہ ہندوستان میں قانونی ہے۔ اعضاء بیچنا غیر قانونی ہے۔",
      blood: "خون کے عطیہ دہندگان تلاش کرنے کے لیے اپنا مقام شیئر کریں۔",
      document: "مطلوبہ دستاویزات: آدھار کارڈ، تصویر، ڈاکٹر کا سرٹیفکیٹ۔",
      notto: "NOTTO اعلیٰ ادارہ ہے۔ ویب سائٹ: notto.mohfw.gov.in",
      default: "میں سیوا ہوں، جیون سیتو پر آپ کا رہنما۔ میں آپ کی کیسے مدد کر سکتا ہوں؟"
    },
    chips: { bloodBank: "بلڈ بینک", registerDonor: "رجسٹر کریں", documents: "دستاویزات" }
  },
  od: {
    answers: {
      register: "ଅଙ୍ଗ ଦାତା ଭାବରେ ପଞ୍ଜିକରଣ କରିବାକୁ:\n\n1. ବୈଧ ଆଧାର କାର୍ଡ\n2. ଆଧାର ସହିତ ଲିଙ୍କ୍ ଥିବା ମୋବାଇଲ୍ ନମ୍ବର\n\nପଞ୍ଜିକରଣ ପାଇଁ 'ଅଙ୍ଗ ଦାନ କରନ୍ତୁ' ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ।",
      organ: "ଦାନ କରାଯାଇପାରିବ ଅଙ୍ଗଗୁଡ଼ିକ:\n❤️ ହୃଦୟ\n🫁 ଫୁସଫୁସ\n🫀 କିଡନୀ\n🧠 ଲିଭର\n👁️ ଆଖି\n🩺 ଅଗ୍ନାଶୟ",
      legal: "ହଁ, ଅଙ୍ଗ ଦାନ ସମ୍ପୂର୍ଣ୍ଣ ଆଇନଗତ। ଅଙ୍ଗ ବିକ୍ରି ବେଆଇନ।",
      blood: "ରକ୍ତଦାତା ଖୋଜିବା ପାଇଁ ଆପଣଙ୍କ ସ୍ଥାନ ସେୟାର କରନ୍ତୁ।",
      document: "ଆବଶ୍ୟକ କାଗଜପତ୍ର: ଆଧାର କାର୍ଡ, ଫଟୋ, ଡାକ୍ତରଙ୍କ ପ୍ରମାଣପତ୍ର।",
      notto: "NOTTO ହେଉଛି ସର୍ବୋଚ୍ଚ ସଂସ୍ଥା। ୱେବସାଇଟ୍: notto.mohfw.gov.in",
      default: "ମୁଁ ସେବା, ଜୀବନସେତୁରେ ଆପଣଙ୍କ ଗାଇଡ୍। ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?"
    },
    chips: { bloodBank: "ବ୍ଲଡ ବ୍ୟାଙ୍କ", registerDonor: "ପଞ୍ଜିକରଣ କରନ୍ତୁ", documents: "କାଗଜପତ୍ର" }
  }
};

const localesDir = path.join(process.cwd(), 'src/app/i18n/locales');
const files = fs.readdirSync(localesDir);

files.forEach(file => {
  if (file.endsWith('.ts')) {
    const langCode = file.replace('.ts', '');
    if (translations[langCode]) {
      let content = fs.readFileSync(path.join(localesDir, file), 'utf-8');
      
      // If already has answers, we can skip or replace
      if (!content.includes('answers: {')) {
        // Regex to match the end of sevaAI object
        // typing: "..." }
        const regex = /(typing:\s*".*?"\s*)\}/;
        content = content.replace(regex, `$1, \n    answers: ${JSON.stringify(translations[langCode].answers, null, 6).trim()},\n    chips: ${JSON.stringify(translations[langCode].chips, null, 6).trim()}\n  }`);
        fs.writeFileSync(path.join(localesDir, file), content);
        console.log(`Updated ${file}`);
      }
    }
  }
});
