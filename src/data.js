/* ===== BitPromo demo data (all fictional) ===== */
const BG = [['#2453FF','#8EA8FF'],['#FF7A59','#FFC7AE'],['#0F9F6E','#8EE3BF'],['#F2A20C','#FFE0A1'],['#0EA5B7','#A2EAF2'],['#E0466E','#FFB6C8'],['#1F2A44','#5A6A94'],['#7A5CFA','#C7B9FF']];
const SKIN = ['#E2AF88','#CC9468','#B27B52','#956240','#7E4F31'];
const SHADE = ['#C99472','#B47D56','#98663F','#7C5033','#663F26'];

// s: look style, k: skin index, sh: shirt, hc: hair/hijab colour, bg: BG index
const CREATORS = [
 {id:'c1',name:'Ayesha Rahman',cats:['Actor','Presenter','Content Creator'],city:'Dhaka',langs:['Bangla','English'],rating:4.9,revs:112,orders:127,followers:1200000,price:5000,avail:true,look:{s:'f-long',k:1,sh:'#1F2A44',hc:'#1B1410',bg:0},tag:'Warm, polished on-camera promos for food, fashion and lifestyle brands.',eng:'6.8%',resp:'1 hour',plat:{Facebook:46,Instagram:31,YouTube:15,TikTok:8}},
 {id:'c2',name:'Fahim Hasan',cats:['YouTuber','Industry Expert'],city:'Dhaka',langs:['Bangla','English'],rating:4.8,revs:96,orders:143,followers:860000,price:6000,avail:true,look:{s:'m-short',k:2,sh:'#2453FF',hc:'#120D0A',bg:6},tag:'Honest tech and app reviews that explain your product in plain Bangla.',eng:'5.1%',resp:'2 hours',plat:{YouTube:58,Facebook:27,Instagram:9,TikTok:6}},
 {id:'c3',name:'Nusrat Ahmed',cats:['Influencer','Instagram Creator'],city:'Chattogram',langs:['Bangla','English'],rating:4.9,revs:88,orders:104,followers:540000,price:4500,avail:true,look:{s:'f-bun',k:1,sh:'#E0466E',hc:'#2A1A12',bg:5},tag:'Beauty and lifestyle reels with a loyal 18–30 audience.',eng:'7.9%',resp:'1 hour',plat:{Instagram:54,TikTok:22,Facebook:18,YouTube:6}},
 {id:'c4',name:'Arif Mahmud',cats:['Actor'],city:'Dhaka',langs:['Bangla','English','Hindi'],rating:5.0,revs:61,orders:72,followers:2100000,price:25000,avail:true,look:{s:'m-beard',k:2,sh:'#0A1020',hc:'#100B08',bg:3},tag:'Screen actor for brand films, TVCs and ambassador campaigns.',eng:'4.2%',resp:'4 hours',plat:{Facebook:61,Instagram:24,YouTube:11,TikTok:4}},
 {id:'c5',name:'Samiul Khan',cats:['Comedian','TikTok Creator'],city:'Sylhet',langs:['Bangla','English'],rating:4.8,revs:140,orders:188,followers:1600000,price:7000,avail:true,look:{s:'m-short',k:3,sh:'#F2A20C',hc:'#0F0B08',bg:1},tag:'Short comedy skits that make your brand the punchline people share.',eng:'9.4%',resp:'2 hours',plat:{TikTok:49,Facebook:33,Instagram:12,YouTube:6}},
 {id:'c6',name:'Mehedi Hasan',cats:['Athlete'],city:'Rajshahi',langs:['Bangla'],rating:4.7,revs:39,orders:46,followers:310000,price:12000,avail:false,look:{s:'m-short',k:3,sh:'#0F9F6E',hc:'#0F0B08',bg:2},tag:'National-level cricketer (fictional) for sports and energy brands.',eng:'5.6%',resp:'6 hours',plat:{Facebook:52,Instagram:34,YouTube:8,TikTok:6}},
 {id:'c7',name:'Tahsin Ara',cats:['Food Creator','Facebook Creator'],city:'Dhaka',langs:['Bangla','English'],rating:4.9,revs:151,orders:212,followers:980000,price:5500,avail:true,look:{s:'f-hijab',k:2,sh:'#0F9F6E',hc:'#0E7A57',bg:3},tag:'Dhaka food reviews and cooking videos that bring customers to your door.',eng:'8.2%',resp:'1 hour',plat:{Facebook:57,YouTube:21,Instagram:15,TikTok:7}},
 {id:'c8',name:'Rafiq Chowdhury',cats:['Voice Artist'],city:'Chattogram',langs:['Bangla','English'],rating:4.9,revs:203,orders:260,followers:45000,price:2500,avail:true,look:{s:'m-beard',k:1,sh:'#5A6A94',hc:'#3A3330',bg:6},tag:'Deep, trusted Bangla voice-overs for ads, explainers and IVR.',eng:'3.1%',resp:'30 minutes',plat:{YouTube:40,Facebook:40,Instagram:15,TikTok:5}},
 {id:'c9',name:'Lamia Islam',cats:['Model','Fashion Creator'],city:'Dhaka',langs:['Bangla','English','Hindi'],rating:4.8,revs:74,orders:91,followers:720000,price:9000,avail:true,look:{s:'f-long',k:0,sh:'#7A5CFA',hc:'#2B1B12',bg:7},tag:'Lookbooks and styling reels for clothing and jewellery labels.',eng:'6.0%',resp:'3 hours',plat:{Instagram:62,TikTok:18,Facebook:16,YouTube:4}},
 {id:'c10',name:'Imran Kabir',cats:['YouTuber'],city:'Dhaka',langs:['Bangla','English'],rating:4.7,revs:58,orders:66,followers:430000,price:6500,avail:true,look:{s:'m-short',k:1,sh:'#0EA5B7',hc:'#120D0A',bg:4},tag:'Gadget unboxings and fintech app walkthroughs.',eng:'4.8%',resp:'2 hours',plat:{YouTube:64,Facebook:22,Instagram:9,TikTok:5}},
 {id:'c11',name:'Sadia Akter',cats:['Singer'],city:'Khulna',langs:['Bangla','Hindi'],rating:4.9,revs:47,orders:53,followers:390000,price:10000,avail:true,look:{s:'f-long',k:2,sh:'#E0466E',hc:'#120D0A',bg:5},tag:'Custom jingles and sung shoutouts for launches and festivals.',eng:'5.9%',resp:'5 hours',plat:{YouTube:44,Facebook:38,Instagram:12,TikTok:6}},
 {id:'c12',name:'Tanvir Alam',cats:['Presenter'],city:'Dhaka',langs:['Bangla','English'],rating:4.8,revs:82,orders:97,followers:210000,price:8000,avail:true,look:{s:'m-short',k:0,sh:'#1F2A44',hc:'#1B1410',bg:0},tag:'Confident presenter for event promos, explainers and university ads.',eng:'3.9%',resp:'2 hours',plat:{Facebook:48,YouTube:30,Instagram:16,TikTok:6}},
 {id:'c13',name:'Farzana Haque',cats:['Influencer','Beauty'],city:'Sylhet',langs:['Bangla','English'],rating:4.8,revs:66,orders:79,followers:480000,price:5000,avail:true,look:{s:'f-hijab',k:1,sh:'#E0466E',hc:'#B23A5C',bg:5},tag:'Modest-fashion and skincare tutorials with honest product talk.',eng:'7.1%',resp:'1 hour',plat:{Instagram:44,Facebook:36,TikTok:14,YouTube:6}},
 {id:'c14',name:'Zubair Hossain',cats:['TikTok Creator'],city:'Cumilla',langs:['Bangla'],rating:4.6,revs:120,orders:158,followers:1100000,price:3500,avail:true,look:{s:'m-short',k:3,sh:'#F2A20C',hc:'#0F0B08',bg:3},tag:'Trend-driven TikToks for e-commerce drops and app installs.',eng:'10.2%',resp:'1 hour',plat:{TikTok:71,Facebook:17,Instagram:9,YouTube:3}},
 {id:'c15',name:'Mithila Sarkar',cats:['Actress'],city:'Dhaka',langs:['Bangla','English','Hindi'],rating:4.9,revs:44,orders:51,followers:1800000,price:22000,avail:true,look:{s:'f-bun',k:0,sh:'#0A1020',hc:'#1B1410',bg:7},tag:'Elegant brand films for real estate, jewellery and premium labels.',eng:'4.6%',resp:'5 hours',plat:{Facebook:52,Instagram:37,YouTube:8,TikTok:3}},
 {id:'c16',name:'Rakib Ahmed',cats:['Athlete','Fitness'],city:'Chattogram',langs:['Bangla','English'],rating:4.7,revs:52,orders:60,followers:260000,price:4000,avail:true,look:{s:'m-beard',k:3,sh:'#0F9F6E',hc:'#0F0B08',bg:2},tag:'Fitness coach for gyms, supplements and sportswear.',eng:'6.4%',resp:'2 hours',plat:{Instagram:46,Facebook:34,YouTube:12,TikTok:8}},
 {id:'c17',name:'Nabila Chowdhury',cats:['Content Creator','Travel'],city:'Sylhet',langs:['Bangla','English'],rating:4.9,revs:70,orders:84,followers:650000,price:7500,avail:true,look:{s:'f-long',k:1,sh:'#0EA5B7',hc:'#3A2416',bg:4},tag:'Travel vlogs for resorts, airlines and tour packages.',eng:'6.6%',resp:'3 hours',plat:{YouTube:41,Instagram:35,Facebook:19,TikTok:5}},
 {id:'c18',name:'Shakil Rahman',cats:['Industry Expert'],city:'Dhaka',langs:['Bangla','English'],rating:4.8,revs:31,orders:38,followers:95000,price:9500,avail:true,look:{s:'m-beard',k:0,sh:'#5A6A94',hc:'#4A4440',bg:6},tag:'Real-estate and finance explainer videos that build buyer trust.',eng:'3.4%',resp:'4 hours',plat:{YouTube:46,Facebook:44,Instagram:7,TikTok:3}},
 {id:'c19',name:'Priya Das',cats:['Instagram Creator'],city:'Khulna',langs:['Bangla','English'],rating:4.7,revs:49,orders:57,followers:330000,price:4000,avail:true,look:{s:'f-bun',k:2,sh:'#F2A20C',hc:'#120D0A',bg:1},tag:'Aesthetic product reels for cafés, home décor and handmade brands.',eng:'7.4%',resp:'2 hours',plat:{Instagram:58,Facebook:24,TikTok:13,YouTube:5}},
 {id:'c20',name:'Junaid Siddique',cats:['Comedian'],city:'Rajshahi',langs:['Bangla'],rating:4.8,revs:77,orders:95,followers:740000,price:5000,avail:false,look:{s:'m-short',k:2,sh:'#7A5CFA',hc:'#0F0B08',bg:7},tag:'Relatable family-comedy sketches for FMCG and telecom brands.',eng:'8.8%',resp:'3 hours',plat:{Facebook:59,TikTok:25,YouTube:11,Instagram:5}},
];

const CATS = [
 {k:'actors',n:'Actors',ic:'film',m:['Actor','Actress']},
 {k:'presenters',n:'Presenters',ic:'mic',m:['Presenter']},
 {k:'influencers',n:'Influencers',ic:'phone',m:['Influencer','Instagram Creator','TikTok Creator','Facebook Creator','Content Creator']},
 {k:'youtubers',n:'YouTubers',ic:'tv',m:['YouTuber']},
 {k:'models',n:'Models',ic:'camera',m:['Model']},
 {k:'musicians',n:'Musicians',ic:'music',m:['Singer']},
 {k:'athletes',n:'Athletes',ic:'trophy',m:['Athlete','Fitness']},
 {k:'comedians',n:'Comedians',ic:'smile',m:['Comedian']},
 {k:'voice',n:'Voice Artists',ic:'volume',m:['Voice Artist']},
 {k:'experts',n:'Industry Experts',ic:'briefcase',m:['Industry Expert']},
 {k:'fashion',n:'Fashion Creators',ic:'shirt',m:['Fashion Creator','Model','Beauty']},
 {k:'food',n:'Food Creators',ic:'utensils',m:['Food Creator']},
];

const BUSINESSES = [
 {id:'b1',name:'Bhoj Kitchen',type:'Restaurant',city:'Dhaka',col:'#FF7A59'},
 {id:'b2',name:'Nakshi Threads',type:'Fashion brand',city:'Dhaka',col:'#7A5CFA'},
 {id:'b3',name:'PayDhara',type:'Fintech startup',city:'Dhaka',col:'#2453FF'},
 {id:'b4',name:'Sobuj Homes',type:'Real estate',city:'Chattogram',col:'#0F9F6E'},
 {id:'b5',name:'ShopKori.com',type:'E-commerce',city:'Dhaka',col:'#F2A20C'},
 {id:'b6',name:'Ghuri Travels',type:'Travel agency',city:'Sylhet',col:'#0EA5B7'},
 {id:'b7',name:'PoroBD',type:'Education platform',city:'Dhaka',col:'#1F2A44'},
 {id:'b8',name:'Glow Lab',type:'Beauty brand',city:'Dhaka',col:'#E0466E'},
 {id:'b9',name:'Mishti Mukh',type:'Sweets & food brand',city:'Rajshahi',col:'#B8860B'},
 {id:'b10',name:'Northgate University',type:'University',city:'Dhaka',col:'#5A6A94'},
 {id:'b11',name:'Bay Pearl Resort',type:'Hotel',city:"Cox's Bazar",col:'#0E7A8A'},
 {id:'b12',name:'FitZone Gym',type:'Fitness',city:'Chattogram',col:'#0F9F6E'},
 {id:'b13',name:'Rong Fashion',type:'Clothing brand',city:'Khulna',col:'#C2410C'},
 {id:'b14',name:'DeshiCha',type:'Tea brand',city:'Sylhet',col:'#4D7C0F'},
 {id:'b15',name:'Swift Courier',type:'Logistics',city:'Cumilla',col:'#2453FF'},
];

// creator, title, price, delivery days, platform
const SERVICES = [
 ['c1','30-second restaurant promotion',10000,5,'Facebook'],['c7','Restaurant food review with your signature dish',8000,4,'Facebook'],
 ['c9','Fashion brand product promotion',9000,5,'Instagram'],['c18','Real-estate promotional video',19000,7,'YouTube'],
 ['c10','App promotion with screen walkthrough',6500,4,'YouTube'],['c2','Honest product review video',12000,6,'YouTube'],
 ['c12','Event promotion announcement',8000,3,'Facebook'],['c3','Instagram Reel for your brand',4500,3,'Instagram'],
 ['c14','TikTok promotional video',3500,2,'TikTok'],['c4','Brand ambassador video',50000,10,'Facebook'],
 ['c14','Unboxing video for e-commerce drops',4000,3,'TikTok'],['c17','Hotel and resort walkthrough',15000,7,'YouTube'],
 ['c12','University admission promo',12000,5,'Facebook'],['c8','Bangla voice-over for your ad',2500,2,'Any'],
 ['c16','Gym and fitness brand shoutout',4000,3,'Instagram'],['c13','Beauty product tutorial',5000,4,'Instagram'],
 ['c7','Cooking video featuring your product',11000,6,'Facebook'],['c17','Travel package promo',7500,5,'Instagram'],
 ['c1','Eid campaign video',15000,6,'Facebook'],['c2','Startup launch announcement',9000,4,'YouTube'],
 ['c19','Testimonial-style product reel',4000,3,'Instagram'],['c5','Comedy skit featuring your brand',14000,6,'TikTok'],
 ['c11','Custom jingle performance',20000,8,'YouTube'],['c12','Live event shoutout video',5000,2,'Facebook'],
 ['c6','Sports gear promotion',12000,6,'Facebook'],['c15','Premium brand film for real estate',44000,10,'YouTube'],
 ['c10','Fintech app explainer',13000,5,'YouTube'],['c11','Pohela Boishakh campaign song',18000,7,'Facebook'],
 ['c9','Clothing lookbook reel',9000,4,'Instagram'],['c20','Family-comedy ad for FMCG brands',10000,5,'Facebook'],
].map((s,i)=>({id:'s'+(i+1),c:s[0],title:s[1],price:s[2],days:s[3],plat:s[4]}));

const CAMPAIGNS = [
 {id:'k1',b:'b1',title:'Looking for a Food Creator',budget:15000,city:'Dhaka',content:'30-second restaurant promotion',days:7,apps:12,cat:'Food Creators',plat:'Facebook'},
 {id:'k2',b:'b2',title:'Eid collection lookbook reels',budget:40000,city:'Dhaka',content:'3 Instagram Reels, 20–30 sec',days:10,apps:21,cat:'Fashion Creators',plat:'Instagram'},
 {id:'k3',b:'b3',title:'App install campaign for students',budget:25000,city:'Any',content:'TikTok video with app walkthrough',days:5,apps:34,cat:'Influencers',plat:'TikTok'},
 {id:'k4',b:'b4',title:'Presenter for apartment project tour',budget:30000,city:'Chattogram',content:'60-second walkthrough video',days:14,apps:8,cat:'Presenters',plat:'YouTube'},
 {id:'k5',b:'b6',title:'Sylhet tea-garden travel vlog',budget:22000,city:'Sylhet',content:'2-minute travel vlog + 1 Reel',days:12,apps:15,cat:'Influencers',plat:'YouTube'},
 {id:'k6',b:'b7',title:'Exam-season motivation video',budget:12000,city:'Any',content:'45-second Facebook video',days:6,apps:19,cat:'Presenters',plat:'Facebook'},
 {id:'k7',b:'b8',title:'Skincare launch tutorial',budget:18000,city:'Dhaka',content:'Tutorial video + Story set',days:8,apps:27,cat:'Fashion Creators',plat:'Instagram'},
 {id:'k8',b:'b12',title:'Fitness challenge ambassador',budget:16000,city:'Chattogram',content:'4 short workout videos',days:20,apps:9,cat:'Athletes',plat:'Instagram'},
 {id:'k9',b:'b14',title:'Comedy skit for tea brand',budget:20000,city:'Any',content:'60-second comedy skit',days:9,apps:13,cat:'Comedians',plat:'Facebook'},
 {id:'k10',b:'b11',title:'Resort weekend stay promo',budget:35000,city:"Cox's Bazar",content:'Hotel walkthrough + Reel',days:15,apps:11,cat:'Influencers',plat:'Instagram'},
];

const STAGES = ['Order Placed','Brief Submitted','Creator Accepted','Production','Video Submitted','Quality Check','Buyer Review','Completed'];
const STAGE_NOTE = ['Payment is held by BitPromo','Your campaign brief is with the creator','Creator confirmed the brief and deadline','Creator is filming your video','Draft video uploaded by the creator','BitPromo is checking it against your brief','Your turn: approve or request a revision','Video delivered and creator paid'];

// id, business, creator, package idx, title, stage, created, due
const ORDERS = [
 ['BP-24117','b1','c1',1,'30-second restaurant promotion',6,'Sep 27','Oct 05'],
 ['BP-24121','b1','c7',0,'Food review: Kacchi platter',3,'Sep 30','Oct 06'],
 ['BP-24124','b1','c5',1,'Comedy skit: Friday family lunch',1,'Oct 02','Oct 10'],
 ['BP-24096','b1','c3',0,'Instagram Reel: new dessert menu',7,'Sep 12','Sep 17'],
 ['BP-24081','b1','c8',1,'Bangla voice-over for TV spot',7,'Sep 03','Sep 06'],
 ['BP-24064','b1','c1',0,'Ramadan iftar menu teaser',7,'Aug 21','Aug 25'],
 ['BP-24119','b2','c1',2,'Eid collection brand film',3,'Sep 28','Oct 07'],
 ['BP-24122','b8','c1',0,'Skincare first impressions',1,'Oct 01','Oct 04'],
 ['BP-24110','b5','c1',1,'Mega sale announcement',5,'Sep 25','Oct 03'],
 ['BP-24102','b3','c1',1,'PayDhara cashback offer',7,'Sep 18','Sep 23'],
 ['BP-24088','b10','c1',1,'Admission week promo',7,'Sep 08','Sep 13'],
 ['BP-24118','b3','c10',1,'App onboarding walkthrough',4,'Sep 28','Oct 04'],
 ['BP-24115','b4','c18',2,'Apartment project explainer',3,'Sep 26','Oct 08'],
 ['BP-24112','b6','c17',1,'Sylhet tour package vlog',6,'Sep 24','Oct 03'],
 ['BP-24109','b9','c11',0,'Mishti Mukh jingle',7,'Sep 20','Sep 28'],
 ['BP-24105','b12','c16',0,'Gym membership shoutout',7,'Sep 19','Sep 22'],
 ['BP-24100','b13','c9',1,'Winter collection reel',7,'Sep 16','Sep 21'],
 ['BP-24098','b14','c5',2,'Tea brand comedy series',3,'Sep 15','Oct 09'],
 ['BP-24094','b11','c17',2,'Resort weekend vlog',5,'Sep 11','Oct 04'],
 ['BP-24090','b15','c14',0,'Same-day delivery TikTok',7,'Sep 09','Sep 11'],
].map(o=>({id:o[0],b:o[1],c:o[2],pkg:o[3],title:o[4],st:o[5],created:o[6],due:o[7],revUsed:0}));

const REVIEWS = [
 {b:'b1',c:'c1',stars:5,date:'Sep 18',text:'Great communication and delivered the video exactly according to the brief. Our weekend bookings went up noticeably.'},
 {b:'b3',c:'c1',stars:5,date:'Sep 24',text:'Ayesha explained our cashback offer better than our own ad team. The BitPromo quality check caught a wrong promo code before it went live.'},
 {b:'b10',c:'c1',stars:5,date:'Sep 14',text:'Professional, on time, and the script suggestions were excellent.'},
 {b:'b2',c:'c1',stars:4,date:'Aug 30',text:'Beautiful result. One revision needed for our logo placement, handled the same day.'},
 {b:'b9',c:'c11',stars:5,date:'Sep 29',text:'The jingle is stuck in everyone’s head. Customers sing it at the counter.'},
 {b:'b12',c:'c16',stars:5,date:'Sep 23',text:'High energy and very real. 40 new member sign-ups in the first week.'},
 {b:'b13',c:'c9',stars:5,date:'Sep 22',text:'Styling was spot on and she suggested a better colour order for the reel.'},
 {b:'b15',c:'c14',stars:4,date:'Sep 12',text:'Fast turnaround and huge reach. Would like a slightly longer version next time.'},
 {b:'b1',c:'c3',stars:5,date:'Sep 18',text:'The dessert reel looked delicious. Delivered a day early.'},
 {b:'b1',c:'c8',stars:5,date:'Sep 07',text:'Perfect Bangla voice for our TV spot. Two takes and we were done.'},
];
const CREATOR_REVIEWS = [
 {b:'b1',stars:5,text:'Clear brief, quick feedback and paid on time. Happy to work with Bhoj Kitchen again.',by:'c1'},
 {b:'b3',stars:5,text:'Very organised team, shared brand guidelines and the app build in advance.',by:'c1'},
];

const VERIFY_QUEUE = [
 {name:'Rumana Akhter',cat:'Food Creator',city:'Dhaka',followers:'212K',look:{s:'f-hijab',k:1,sh:'#F2A20C',hc:'#7A2E10',bg:3},submitted:'Oct 02'},
 {name:'Sabbir Hossain',cat:'YouTuber',city:'Rajshahi',followers:'88K',look:{s:'m-short',k:2,sh:'#0EA5B7',hc:'#0F0B08',bg:4},submitted:'Oct 02'},
 {name:'Tanzila Mim',cat:'Model',city:'Dhaka',followers:'340K',look:{s:'f-long',k:0,sh:'#E0466E',hc:'#2B1B12',bg:5},submitted:'Oct 01'},
 {name:'Kamrul Islam',cat:'Voice Artist',city:'Khulna',followers:'12K',look:{s:'m-beard',k:3,sh:'#1F2A44',hc:'#0F0B08',bg:6},submitted:'Sep 30'},
];
const DISPUTES = [
 {id:'DP-311',order:'BP-24076',b:'b5',c:'c14',reason:'Delivered video was 9:16 but brief asked for 1:1',amt:4000,st:'Open'},
 {id:'DP-309',order:'BP-24059',b:'b13',c:'c19',reason:'Creator missed the agreed deadline by 3 days',amt:8000,st:'Open'},
 {id:'DP-302',order:'BP-24031',b:'b7',c:'c12',reason:'Buyer requested a 4th revision outside package scope',amt:16000,st:'Resolved'},
];

const GMV = [['Apr',6.2],['May',7.9],['Jun',9.4],['Jul',11.8],['Aug',14.1],['Sep',17.6]]; // ৳ lakh
const EARN = [['Apr',38],['May',46],['Jun',52],['Jul',61],['Aug',74],['Sep',88]]; // creator net, ৳ thousand

const BRANDS_FOR_DEMO = ['Bhoj Kitchen','Nakshi Threads','PayDhara','ShopKori.com','Glow Lab','DeshiCha','Ghuri Travels','FitZone Gym'];
