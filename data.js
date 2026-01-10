// data.js

export const quizData = [
    {
        id: 1,
        category: "Cafe Etiquette",
        img: "./images/q1.png",
        scenario: "You agreed to meet a friend at a nice cafe in Seoul. Your friend arrived 30 minutes early and is already drinking a coffee. You arrive and sit down at the table across from them. You aren't very thirsty.\n\nWhat is the proper etiquette in this situation?",
        options: [
            "Just sit and chat without ordering anything.",
            "Go to the counter and order your own drink.",
            "Ask the staff for a free glass of tap water and sit down.",
            "Take a sip of your friend’s drink."
        ],
        correctIndex: 1,
        explanation: "In Korea, most cafes operate on a '1 Person, 1 Menu' (1인 1메뉴) rule. Since you are using the cafe's space, it is considered rude to occupy a seat without ordering anything for yourself."
    },
    {
        id: 2,
        category: "Dining",
        img: "./images/q2.png",
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
        img: "./images/q3.png",
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
        img: "./images/q4.png",
        scenario: "You are riding a bus. It is getting crowded, but you spot a bright Yellow seat near the front. Later, you transfer to the subway and see an empty Pink seat. You are young and healthy, but your legs are a bit tired.\n\nCan you sit in these seats?",
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
        img: "./images/q5.png",
        scenario: "You are invited to dinner at your Korean friend's house. As soon as you open the front door, you see the living room. The floor looks very clean.\n\nWhat is the most appropriate action with your sneakers?",
        options: [
            "Walk naturally to the living room sofa while wearing your sneakers.",
            "Take off your sneakers at the entrance and enter barefoot or in socks.",
            "Take off your sneakers, hold them in your hands, and place them on the dining table.",
            "Ask your friend, 'Can I keep my shoes on?'"
        ],
        correctIndex: 1,
        explanation: "Korean housing culture is based on 'Ondol' (floor heating), so you must take off your shoes when entering a home. Walking inside with shoes on is considered very rude and unhygienic!"
    },
    {
        id: 6,
        category: "Dining",
        img: "./images/q6.png",
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
        img: "./images/q7.png",
        scenario: "You board a very crowded subway train in Seoul. You are very tired. You notice that the section with three seats at the far end of the car is completely empty, even though people are standing in the aisle.\n\nWhat is the safest action for a traveler?",
        options: [
            "Lucky! Rush over and sit down immediately.",
            "Sit down and close your eyes to pretend you are asleep.",
            "Remain standing in the aisle and leave those specific seats empty.",
            "Put your heavy backpack on the seat to reserve it."
        ],
        correctIndex: 3,
        explanation: "The seats at the far ends of each subway car are designated for the elderly, disabled, and pregnant women. In Korea, there is a social norm to leave these seats completely empty at all times, even if the train is packed. If a young, healthy person sits there, it can make elderly passengers feel uncomfortable or hesitant to approach the seat. Therefore, the most respectful action is to simply remain standing in the aisle."
    },
    {
        id: 8,
        category: "Money & Tipping",
        img: "./images/q8.png",
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
        img: "./images/q9.png",
        scenario: "You finished a takeaway Iced Americano on the street. Inside the plastic cup, there is still some ice and a little bit of coffee left. You found a trash bin!\n\nWhat is the perfect way to dispose of this cup?",
        options: [
            "Throw the whole cup (with ice and liquid) into the bin.",
            "Pour the remaining ice and coffee on the grass or in a storm drain, then put the cup in the 'Plastic' bin.",
            "Take the cup home and use it as a decoration.",
            "Crush the cup with your foot to save space and throw it in 'General Waste'."
        ],
        correctIndex: 1,
        explanation: "Korea is very strict about recycling. You must separate liquids/food waste from recyclables to avoid contaminating other items."
    },
    {
        id: 10,
        category: "Drinking Culture",
        img: "./images/q10.png",
        scenario: "You are having dinner with your Korean boss or an older Korean friend. They pick up a bottle of Soju to pour a drink for you. You want to be polite and show respect.\n\nHow should you receive the drink?",
        options: [
            "Hold your glass out with one hand casually.",
            "Leave the glass on the table so they don't spill.",
            "Hold the glass with two hands (or support your right wrist with your left hand).",
            "Refuse the drink saying, 'I can pour it myself.'"
        ],
        correctIndex: 2,
        explanation: "In Korea, the 'Two Hands Rule' is crucial. Receiving something with two hands is a sign of respect towards the other person."
    },

    {
        id: 11,
        category: "Drinking Culture",
        img: "./images/q11.png",
        scenario: "You are drinking with a senior mentor you respect very much. You want to pour them a glass of Soju to show your gratitude. You pick up the bottle with two hands.\n\nWhat is the most sophisticated and polite detail to add while pouring?",
        options: [
            "Shake the bottle vigorously to mix it.",
            "Pour it with only your right hand to look cool.",
            "Cover the bottle's label (logo) with your hand while pouring.",
            "Fill the glass only halfway to leave room for air."
        ],
        correctIndex: 2,
        explanation: "In formal drinking culture, it is considered very polite to cover the brand label with your hand while pouring. This signifies humility and prevents the guest from judging the 'price' or 'brand' of the alcohol being served."
    },
    {
        id: 12,
        category: "Social Etiquette",
        img: "./images/q12.png",
        scenario: "You just had a great lunch with a Korean friend. You tried to pay, but your friend insisted and paid for the whole meal. They refuse to take your cash when you try to pay them back.\n\nWhat is the best way to return the favor?",
        options: [
            "Say 'Thank you' and just go home.",
            "Force the cash into their pocket or bag.",
            "Say, 'Then I'll get the coffee!' and take them to a cafe.",
            "Calculate exactly 50% of the bill and bank transfer it to them immediately."
        ],
        correctIndex: 2,
        explanation: "Koreans often take turns paying. If someone buys '1-cha' (the meal), it is an unspoken rule that the other person buys '2-cha' (coffee or dessert). This is seen as much warmer and friendlier than a cold Dutch pay transaction."
    },
    {
        id: 13,
        category: "Public Etiquette",
        img: "./images/q13.png",
        scenario: "You are in a quiet library or an elevator. The Korean person standing next to you suddenly sneezes loudly. 'Achoo!!'\n\nWhat is the proper reaction in Korea?",
        options: [
            "Say 'Bless you!' with a smile.",
            "Say 'Gesundheit!'",
            "Ask them, 'Do you have a cold?'",
            "Pretend nothing happened and stay quiet."
        ],
        correctIndex: 3,
        explanation: "Unlike in Western cultures where 'Bless you' is automatic, Korea has no standard response to a sneeze. In fact, drawing attention to someone's bodily function (even to be nice) can make them feel embarrassed. The polite thing to do is to ignore it completely!"
    }
];

export const resultLevels = [
    {
        level: 1,
        minScore: 0,
        title: "Tourist 🎒",
        description: "Welcome to Korea! Time to learn Nunchi!",
        image: "images/level_1.png"
    },
    {
        level: 2,
        minScore: 3,
        title: "Loading Nunchi... 👀",
        description: "You're learning — keep observing!",
        image: "images/level_2.png"
    },
    {
        level: 3,
        minScore: 6,
        title: "K-life Pro 💼",
        description: "You read the room like a local!",
        image: "images/level_3.png"
    },
    {
        level: 4,
        minScore: 11,
        title: "Almost Korean 🇰🇷✨",
        description: "Perfect! Your Nunchi is level 100. Are you sure you aren't Korean?",
        image: "images/level_4.png"
    }
];
