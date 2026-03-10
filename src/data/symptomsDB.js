export const symptomsDB = [
    // COMMON
    { id: "fever", name: "Fever", icon: "fa-temperature-high", meds: "Paracetamol 650mg", diet: "Hydration, Soup, Coconut Water", advice: "Tepid sponge bath, complete rest." },
    { id: "cold", name: "Common Cold", icon: "fa-snowflake", meds: "Cetirizine 10mg, Steam Inhalation", diet: "Ginger Tea, Warm Soup", advice: "Steam inhalation twice daily, avoid cold water." },
    { id: "flu", name: "Flu (Influenza)", icon: "fa-head-side-virus", meds: "Oseltamivir 75mg (Prescription)", diet: "Kiwi, Leafy Greens", advice: "Isolate to prevent spread, rest." },
    { id: "headache", name: "Headache", icon: "fa-brain", meds: "Ibuprofen 400mg / Aspirin 300mg", diet: "Coffee, Water, Magnesium rich foods", advice: "Rest in a dark quiet room, massage temples." },
    { id: "migraine", name: "Migraine", icon: "fa-bolt", meds: "Sumatriptan 50mg / Naproxen 500mg", diet: "Avoid caffeine/cheese trigger foods", advice: "Sleep in total darkness, cold compress.", critical: true, disease: "Migraine Episode" },

    // RESPIRATORY
    { id: "chest_pain", name: "Chest Pain / Heartburn", icon: "fa-heartbeat", meds: "Aspirin 300mg (Chewable)", diet: "Avoid heavy meals", advice: "Call Ambulance immediately if pain spreads to arm.", critical: true, disease: "Myocardial Infarction / Angina" },
    { id: "cough_dry", name: "Dry Cough", icon: "fa-lungs", meds: "Dextromethorphan Syrup", diet: "Honey with warm water", advice: "Salt water gargle 3 times a day." },
    { id: "cough_wet", name: "Wet Cough", icon: "fa-viruses", meds: "Expectorant Syrup", diet: "Avoid milk/dairy", advice: "Steam inhalation to loosen mucus." },
    { id: "sore_throat", name: "Sore Throat", icon: "fa-biohazard", meds: "Analgesic Lozenges", diet: "Warm broth, Soft foods", advice: "Salt water gargle, voice rest." },
    { id: "asthma_mild", name: "Mild Asthma", icon: "fa-lungs-virus", meds: "Salbutamol Inhaler (100mcg)", diet: "Magnesium rich foods", advice: "Sit upright, deep controlled breathing.", critical: true, disease: "Asthma Attack" },
    { id: "sinus", name: "Sinusitis", icon: "fa-head-side-mask", meds: "Pseudoephedrine 60mg", diet: "Spicy food (clears sinus)", advice: "Hot towel compress on face." },

    // DIGESTIVE
    { id: "stomach", name: "Stomach Pain", icon: "fa-stomach", meds: "Dicyclomine 10mg", diet: "BRAT Diet (Banana, Rice, Toast)", advice: "Hot water bag compress on belly." },
    { id: "acidity", name: "Acidity / GERD", icon: "fa-fire", meds: "Pantoprazole 40mg", diet: "Cold Milk, Avoid Spice", advice: "Walk after meals, sleep on left side." },
    { id: "diarrhea", name: "Diarrhea", icon: "fa-poop", meds: "Loperamide 2mg, ORS Zinc", diet: "Curd Rice, Bananas", advice: "Hydrate aggresively with ORS." },
    { id: "constipation", name: "Constipation", icon: "fa-toilet", meds: "Psyllium Husk / Bisacodyl 5mg", diet: "Papaya, High Fiber, Water", advice: "Walk for 20 mins, squat position." },
    { id: "nausea", name: "Nausea/Vomiting", icon: "fa-dizzy", meds: "Ondansetron 4mg", diet: "Ginger Ale, Crackers", advice: "Sip water slowly, avoid strong smells." },
    { id: "bloating", name: "Bloating/Gas", icon: "fa-wind", meds: "Simethicone 80mg", diet: "Peppermint Tea", advice: "Walk after eating, avoid carbonated drinks." },

    // PAIN & ORTHO
    { id: "backpain", name: "Back Pain", icon: "fa-user-injured", meds: "Volini Gel / Ibuprofen 400mg", diet: "Calcium & Vit D foods", advice: "Use hard mattress, correct posture, heat pack." },
    { id: "neck", name: "Neck Pain", icon: "fa-user-md", meds: "Chlorzoxazone 250mg", diet: "Anti-inflammatory foods", advice: "Neck stretches, avoid looking down at phone." },
    { id: "knee", name: "Knee Pain", icon: "fa-bone", meds: "Diclofenac Gel / Etoricoxib 90mg", diet: "Fish Oil, Walnuts", advice: "Knee brace support, rest." },
    { id: "muscle", name: "Muscle Spasm", icon: "fa-running", meds: "Magnesium 250mg", diet: "Bananas, Electrolytes", advice: "Gentle stretching, massage." },
    { id: "joint", name: "Joint Pain", icon: "fa-hand-rock", meds: "Omega-3 1000mg", diet: "Turmeric Milk, Fish", advice: "Low impact exercise (swimming)." },

    // DENTAL & ENT
    { id: "tooth", name: "Toothache", icon: "fa-tooth", meds: "Ketorolac 10mg / Clove Oil", diet: "Soft cold foods (Ice cream)", advice: "Cold compress on cheek, visit dentist." },
    { id: "ear", name: "Ear Ache", icon: "fa-deaf", meds: "Otogesic Ear Drops", diet: "Soft chewing foods", advice: "Warm compress behind ear, keep dry." },
    { id: "ulcers", name: "Mouth Ulcers", icon: "fa-meh-rolling-eyes", meds: "Oralsore Gel / B-Complex", diet: "B-Complex, Avoid Spice", advice: "Ice cube application, salt rinse." },

    // SKIN
    { id: "acne", name: "Acne/Pimples", icon: "fa-dot-circle", meds: "Benzoyl Peroxide 2.5%", diet: "Low sugar, lots of water", advice: "Do not pop, wash face twice daily." },
    { id: "rash", name: "Skin Rash", icon: "fa-allergies", meds: "Calamine Lotion / Levocetirizine 5mg", diet: "Cooling foods", advice: "Cold compress, avoid scratching." },
    { id: "burn_minor", name: "Minor Burn", icon: "fa-fire-alt", meds: "Silver Sulfadiazine Cream", diet: "Protein for healing", advice: "Run cool water for 20 mins immediately." },
    { id: "cut", name: "Cut/Wound", icon: "fa-band-aid", meds: "Povidone Iodine Ointment", diet: "High Protein", advice: "Clean with water, apply pressure." },
    { id: "bite", name: "Insect Bite", icon: "fa-bug", meds: "Hydrocortisone Cream", diet: "Avoid allergens", advice: "Remove stinger if any, ice pack." },

    // OTHERS
    { id: "insomnia", name: "Insomnia", icon: "fa-bed", meds: "Melatonin 3mg", diet: "Warm Milk, Chamomile Tea", advice: "No screens 1hr before bed, dark room." },
    { id: "anxiety", name: "Anxiety", icon: "fa-user-friends", meds: "Ashwagandha 250mg", diet: "Dark Chocolate, Green Tea", advice: "4-7-8 Breathing technique, meditation." },
    { id: "fatigue", name: "Fatigue/Weakness", icon: "fa-battery-quarter", meds: "Multivitamins / Iron 100mg", diet: "Iron rich foods, nuts", advice: "8 hours sleep, hydration check." },
    { id: "dizziness", name: "Dizziness", icon: "fa-sync-alt", meds: "Betahistine 8mg", diet: "Salted Lemon Water", advice: "Sit down immediately, focus on one point.", critical: true, disease: "Vertigo / Hypotension" },
    { id: "sunburn", name: "Sunburn", icon: "fa-sun", meds: "Aloe Vera Gel", diet: "Cucumber, Watermelon", advice: "Avoid sun, cool shower." },
    { id: "hiccups", name: "Hiccups", icon: "fa-comment-dots", meds: "Granulated Sugar", diet: "Ice water", advice: "Hold breath for 10 seconds." },
    { id: "eye_strain", name: "Eye Strain", icon: "fa-glasses", meds: "Carboxymethylcellulose Drops", diet: "Carrots, Vit A", advice: "20-20-20 Rule (Look 20ft away every 20mins)." },
    { id: "allergy", name: "Seasonal Allergy", icon: "fa-seedling", meds: "Levocetirizine 5mg", diet: "Local Honey", advice: "Shower after outdoors, windows closed." },

    // NEUROLOGICAL
    { id: "seizure", name: "Seizure / Convulsion", icon: "fa-bolt", meds: "SEIZURE_PROTOCOL", diet: "Ketogenic Diet (medical supervision), Magnesium-rich foods, avoid alcohol & caffeine", advice: "Do NOT restrain the person. Turn them on their side (recovery position), clear the area of sharp objects, time the seizure. Call 102 immediately if seizure lasts >5 minutes or if it is the first ever seizure.", critical: true, disease: "Epileptic Seizure / Convulsive Episode" }
];
