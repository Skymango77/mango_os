const names = {
    male: ["Liam", "Min-jun", "Alessandro", "Wei", "Santiago", "Kenji", "Thomas", "Mateo", "Oliver", "Lucas"],
    female: ["Emma", "Seo-yeon", "Giulia", "Mei", "Isabella", "Hana", "Sophie", "Elena", "Mia", "Amelia"]
};

const jobs = ["Digital Nomad", "Luxury Realtor", "Crypto Trader", "K-Food Chef", "Global Backpacker", "AI Engineer", "Pi Merchant"];
const locations = ["Seoul, Korea", "Singapore", "Zurich, Switzerland", "Milan, Italy", "Bangkok, Thailand", "New York, USA"];

function generate300Characters() {
    const characters = [];
    
    for (let i = 1; i <= 300; i++) {
        const gender = i <= 150 ? 'male' : 'female';
        const nameList = names[gender];
        const randomName = nameList[Math.floor(Math.random() * nameList.length)] + "_" + i;
        const randomJob = jobs[Math.floor(Math.random() * jobs.length)];
        const randomLoc = locations[Math.floor(Math.random() * locations.length)];
        
        characters.push({
            username: randomName.toLowerCase(),
            nickname: `${randomName}`,
            gender: gender,
            occupation: randomJob,
            location: randomLoc,
            pi_balance: (Math.random() * 5000 + 10).toFixed(2), // 10 ~ 5010 Pi 보유
            poa_score: Math.floor(Math.random() * 100), // 활동 지수
            avatar_style: i % 3 === 0 ? "3D_Metallic" : "Glassmorphism_Bio"
        });
    }
    return characters;
}

console.log("300명의 망고 캐릭터가 생성 준비되었습니다.");