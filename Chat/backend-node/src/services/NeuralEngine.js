/**
 * MANGO NEURAL ENGINE 7.0 - Predictive Intelligence
 * Analyzes User Meta-data vs Ecosystem Nodes
 */

const predictUserNeeds = (userData, nearPioneers) => {
  const suggestions = [];

  nearPioneers.forEach(pioneer => {
    let score = 0;
    let reason = "";
    let action = null;

    // Logic A: High Liquidity + Realty Pioneer Proximity
    // Triggered if Pi balance is high and a verified Realty expert is within radius
    if (userData.pi_balance > 5000 && pioneer.category === 'Realty') {
      score += 45;
      reason = "Strategic Investment Match";
      action = {
        type: "FINANCE",
        label: `Discuss Asset with ${pioneer.name}`,
        draft: `I am interested in your current Realty listings. My Pi liquidity is ready for immediate deposit.`,
        trustBoost: "+12% Portfolio Growth"
      };
    }

    // Logic B: Industry Peer Match
    // Triggered if categories match (e.g., both are in 'Education' or 'Food')
    if (userData.category === pioneer.category && pioneer.status === 'active') {
      score += 30;
      reason = "Peer Network Opportunity";
      action = {
        type: "SOCIAL",
        label: `Meet ${pioneer.name} for Coffee`,
        draft: `Hello fellow ${userData.category} Pioneer! I'm nearby. Would you like to sync?`,
        trustBoost: "+5% Trust Score Build"
      };
    }

    if (score > 25) {
      suggestions.push({
        id: `NEURAL_${Math.random().toString(36).substr(2, 5)}`,
        pioneerName: pioneer.name,
        score,
        reason,
        action
      });
    }
  });

  return suggestions.sort((a, b) => b.score - a.score);
};

module.exports = { predictUserNeeds };