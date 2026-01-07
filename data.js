// data.js: 모듈 시스템
// 다른 파일(ex. script.js)에서 쓸 수 있도록 데이터를 내보내는 모듈

// export: 이 변수를 다른 파일에서도 사용할 수 있게 공개
// const: 한 번 선언되면 바뀌지 않는 상수
export const quizData = [ // 문제 은행
    {
        id: 1, // 문제 고유 번호
        category: "Cafe Etiquette", // 카테고리
        scenario: "You agreed to meet a friend at a nice cafe in Seoul. Your friend arrived 30 minutes early and is already drinking a coffee.You arrive and sit down at the table across from them.You aren't very thirsty.\n\nWhat is the proper etiquette in this situation?", // 상황
        options: [ // 보기 4개 (배열)
            "Just sit and chat without ordering anything.",
            "Go to the counter and order your own drink.",
            "Ask the staff for a free glass of tap water and sit down.",
            "Take a sip of your friend’s drink."
        ],
        correctIndex: 1, // 정답의 위치 (배열의 두 번째 항목이 정답임을 의미)
        explanation: "In Korea, most cafes operate on a '1 Person, 1 Menu' (1인 1메뉴) rule. Since you are using the cafe's space, it is considered rude to occupy a seat without ordering anything for yourself." // 정답 또는 오답 후 보여줄 해설
    },
    {
        id: 2,
        category: "Dining",
        scenario: "You are at a restaurant with three Korean friends. Everyone ordered different dishes. Your Bibimbap arrived first, but your friends' food hasn't come out yet. The steam is rising from your delicious food.\n\nWhat is the most polite action?",
        options: [
            "Start eating immediately before it gets cold.",
            "Eat the side dishes (Banchan) only, but wait to touch your main dish.",
            "Wait until everyone’s food has been served before you start eating.",
            "Ask the waiter why the other food is late."
        ],
        correctIndex: 2,
        explanation: "In Korean communal dining culture, it is polite to wait until the oldest person starts eating or until everyone has been served. Waiting is the standard polite default!"
    },
    {
        id: 3,
        category: "Dining",
        scenario: "You walk into a busy, casual Korean BBQ restaurant. The staff are running around very busy, and there isn't a 'Host' standing at the door with a list. You see two empty tables in the corner.\n\nHow should you get a table?",
        options: [
            "Stand stiffly at the entrance and wait 10 minutes for someone to guide you.",
            "Walk in, make eye contact with a staff member, hold up your fingers to show how many people, and move to the empty table.",
            "Sit at a table that hasn't been cleaned yet because it has a good view.",
            "Walk into the kitchen to find the owner."
        ],
        correctIndex: 1,
        explanation: "Unlike Western fine dining where you must 'Wait to be Seated,' many casual Korean restaurants operate on a quick, semi-self-service basis. Signal your party size and head toward an open table once the staff nods."
    },
    {
        id: 4,
        category: "Transportation",
        scenario: "You are riding a city bus in Seoul. It is getting crowded, but you spot a bright Yellow seat near the front. Later, you transfer to the subway and see an empty Pink seat. You are young and healthy, but your legs are a bit tired.\n\nCan you sit in these seats?",
        options: [
            "Yes, if they are empty, anyone can sit there.",
            "You can sit, but you must pretend to be asleep.",
            "No. You should avoid these seats even if they are empty.",
            "You can sit on the Yellow seat, but not the Pink one."
        ],
        correctIndex: 2,
        explanation: "The Pink seats are for pregnant women. The Yellow seats are for the elderly and disabled. It is a strong social norm for young, healthy people to leave these seats empty at all times."
    },
    {
        id: 5,
        category: "House Etiquette",
        scenario: "You are invited to dinner at your Korean friend 'Min-su's' house. As soon as you open the front door, you see the living room. The floor looks very clean.\n\nWhat is the most appropriate action with your sneakers?",
        options: [
            "Walk naturally to the living room sofa while wearing your sneakers.",
            "Take off your sneakers at the entrance (genkan) and enter barefoot or in socks.",
            "Take off your sneakers, hold them in your hands, and place them on the dining table.",
            "Ask your friend, 'Can I keep my shoes on?'"
        ],
        correctIndex: 1,
        explanation: "Korean housing culture is based on 'Ondol' (floor heating), so you must take off your shoes when entering a home. Walking inside with shoes on is considered very rude and unhygienic!"
    },
    {
        id: 6,
        category: "Dining",
        scenario: "You entered a Korean restaurant. You’ve picked your menu items and are ready to order, but the server is far away doing other tasks. 10 minutes pass, and no one comes to your table. You are very hungry.\n\nWhat is the correct way to place your order?",
        options: [
            "Wait quietly until a server makes eye contact with you.",
            "Put a tip on the table and wave your hand.",
            "Press the 'Call Bell' on the table or shout 'Jeogiyo!' (Excuse me!) loudly.",
            "Walk into the kitchen and tell the chef what you want."
        ],
        correctIndex: 2,
        explanation: "In the West, shouting for a waiter might be rude, but in Korea, it is very normal. Many tables have a 'Call Bell.' If there isn't one, raise your hand and confidently call out 'Jeogiyo!'"
    },
    {
        id: 7,
        category: "Transportation",
        scenario: "You are traveling in Seoul on the subway. Your legs hurt and you want to sit down. You notice one empty seat at the end of the car that is pink. There are many people standing nearby, but no one is sitting there.\n\nWhat should you do?",
        options: [
            "Lucky! Run over and sit down immediately.",
            "Leave it empty unless you are pregnant.",
            "Put your heavy bag on the seat and stand next to it.",
            "Sit down and share half the seat with your friend."
        ],
        correctIndex: 1,
        explanation: "The pink seats are designated as 'Priority Seats for Pregnant Women.' In Korea, it is good manners to leave these seats empty for potential pregnant passengers, even if the train is crowded."
    },
    {
        id: 8,
        category: "Money & Tipping",
        scenario: "You just had delicious Bulgogi at a restaurant, and the staff kindly grilled the meat for you. You are touched by the service and want to show your appreciation after paying.\n\nWhich action might cause a misunderstanding in Korea?",
        options: [
            "Bow and say 'Jal meogeot-seumnida' (Thank you for the meal) as you leave.",
            "Quietly leave a 10,000 won bill on the table and walk out.",
            "Tell the cashier, 'The food was amazing.'",
            "Just take the receipt and leave."
        ],
        correctIndex: 1,
        explanation: "Korea does not have a tipping culture. If you leave money on the table, the staff might think you lost your money. The best tip is a sincere 'Thank you.'"
    },
    {
        id: 9,
        category: "Recycling",
        scenario: "You finished a takeaway Iced Americano on the street. Inside the plastic cup, there is still some ice and a little bit of coffee left. You found a trash bin!\n\nWhat is the perfect way to dispose of this cup?",
        options: [
            "Throw the whole cup (with ice and liquid) into the bin.",
            "Pour the remaining ice and coffee into a designated liquid waste bin, then put the cup in the 'Plastic' bin.",
            "Take the cup home and use it as a decoration.",
            "Crush the cup with your foot to save space and throw it in 'General Waste'."
        ],
        correctIndex: 1,
        explanation: "Korea is very strict about recycling. You must separate liquids/food waste from recyclables to avoid contaminating other items."
    },
    {
        id: 10,
        category: "Drinking Culture",
        scenario: "You are having dinner with your Korean boss or an older Korean friend. They pick up a bottle of Soju to pour a drink for you. You want to be polite and show respect.\n\nHow should you receive the drink?",
        options: [
            "Hold your glass out with one hand casually.",
            "Leave the glass on the table so they don't spill.",
            "Hold the glass with two hands (or support your right wrist with your left hand).",
            "Refuse the drink saying, 'I can pour it myself.'"
        ],
        correctIndex: 2,
        explanation: "In Korea, the 'Two Hands Rule' is crucial. Receiving something with two hands is a sign of respect towards the other person."
    }
];

export const resultLevels = [ // 결과 등급표
    {
        level: 1,
        minScore: 0, // 0 ~ 3점 (최소 점수 기준)
        title: "Tourist", // 등급 제목
        description: "Welcome to Korea! You are just starting your journey. Keep observing!", // 결과 멘트
        image: "level_1.png" // 보여줄 이미지 파일명
    },
    {
        level: 2,
        minScore: 4, // 4 ~ 6점
        title: "Loading Nunchi...",
        description: "You're getting there! You know the basics but need a bit more 'Nunchi'.",
        image: "level_2.png"
    },
    {
        level: 3,
        minScore: 7, // 7 ~ 8점
        title: "K-life Pro",
        description: "Impressive! You can handle most daily situations in Korea like a pro.",
        image: "level_3.png"
    },
    {
        level: 4,
        minScore: 9, // 9 ~ 10점
        title: "Almost Korean",
        description: "Perfect! Your Nunchi is level 100. Are you sure you aren't Korean?",
        image: "level_4.png"
    }
];