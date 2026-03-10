export function calculateDosage(medString, age) {
    // SEIZURE PROTOCOL — age-specific anticonvulsant regimen
    if (medString === "SEIZURE_PROTOCOL") {
        if (age < 2) {
            return "⚠️ EMERGENCY — Call Ambulance (102). While waiting: Phenobarbital IM 20mg/kg (Hospital only). First-aid: Recovery position, do NOT put anything in mouth, do NOT restrain.";
        } else if (age < 6) {
            return "⚠️ EMERGENCY — Call Ambulance (102). Diazepam Rectal Solution 5mg (0.5mg/kg) — to be given by trained caregiver. Hospital follow-up for Phenobarbital Syrup 3–5mg/kg/day. Do NOT give tablets.";
        } else if (age < 12) {
            return "⚠️ EMERGENCY — Call Ambulance (102). Diazepam Rectal Gel 10mg (if available) for acute seizure. Long-term: Clobazam 5mg (half-tablet) or Valproic Acid Syrup 10mg/kg/day (as prescribed by Neurologist).";
        } else if (age < 18) {
            return "⚠️ EMERGENCY — Call Ambulance (102). Acute: Diazepam 10mg IV/IM (hospital). Long-term (Neurologist prescribed): Sodium Valproate 200mg twice daily OR Levetiracetam 250mg twice daily. No driving/heights until seizure-free for 1 year.";
        } else if (age < 60) {
            return "⚠️ EMERGENCY — Call Ambulance (102). Acute: Lorazepam 4mg IV (hospital) OR Diazepam 10mg IV. Long-term (Neurologist prescribed): Sodium Valproate 500mg twice daily OR Levetiracetam 500mg twice daily OR Carbamazepine 200mg twice daily. Avoid alcohol, ensure 8hrs sleep.";
        } else {
            return "⚠️ EMERGENCY — Call Ambulance (102). Acute: Lorazepam 2mg IV (hospital, reduced dose for elderly). Long-term (Neurologist prescribed): Levetiracetam 250mg twice daily (preferred in elderly — fewer drug interactions) OR Lamotrigine 25mg (titrate slowly). Monitor for drowsiness & fall risk.";
        }
    }

    const isExternal = medString.includes("Gel") || medString.includes("Cream") || medString.includes("Drops") || medString.includes("Ointment") || medString.includes("Spray") || medString.includes("Inhaler") || medString.includes("Mask");
    if (isExternal) {
        if (age < 2) return medString + " (Apply very sparingly / Consult Pediatrician)";
        if (age < 12) return medString + " (Apply sparingly)";
        return medString;
    }

    if (age < 2) {
        if (medString.includes("Paracetamol") || medString.includes("Ibuprofen")) {
            return "Paracetamol Paediatric Drops (15mg/kg) - Consult Doctor for exact dose";
        }
        if (medString.includes("Cetirizine")) {
            return "Cetirizine Drops (2.5mg)";
        }
        if (medString.includes("Syrup") || medString.includes("solution")) {
            return medString.split(' ')[0] + " Drops (0.5ml - Consult Doctor)";
        }
        return "Consult Pediatrician (Tablet unsafe)";
    }

    if (age >= 2 && age < 6) {
        if (medString.includes("Paracetamol")) return "Paracetamol Syrup (120mg/5ml) - 5ml";
        if (medString.includes("Ibuprofen")) return "Ibuprofen Syrup (100mg/5ml) - 5ml";
        if (medString.includes("Cetirizine")) return "Cetirizine Syrup (2.5mg/5ml) - 2.5ml";
        const mgRegex = /(\d+)\s?mg/gi;
        return medString.replace(mgRegex, (match, p1) => {
            let dose = parseInt(p1);
            return Math.round(dose * 0.25) + "mg (Syrup form preferred)";
        });
    }

    if (age >= 6 && age < 12) {
        const mgRegex = /(\d+)\s?mg/gi;
        let calculated = medString.replace(mgRegex, (match, p1) => {
            let dose = parseInt(p1);
            return Math.round(dose * 0.5) + "mg";
        });
        if (calculated === medString) return medString + " (Junior Dose / Syrup)";
        return calculated + " (Junior Tablet/Syrup)";
    }

    if (age >= 60) {
        const mgRegex = /(\d+)\s?mg/gi;
        let calculated = medString.replace(mgRegex, (match, p1) => {
            let dose = parseInt(p1);
            return Math.round(dose * 0.8) + "mg";
        });
        return calculated + " (Geriatric Adjustment)";
    }

    return medString;
}

export function getMedication(symptom, age, isPregnant, history = []) {
    let med = symptom.meds;

    if (history.includes('kidney') || history.includes('ulcers')) {
        if (med.includes("Ibuprofen") || med.includes("Aspirin") || med.includes("Naproxen") || med.includes("Diclofenac") || med.includes("Ketorolac")) {
            med = "Paracetamol 500mg";
        }
    }

    if (history.includes('liver')) {
        if (med.includes("Paracetamol")) {
            med = "Paracetamol 250mg (Liver Caution)";
        }
    }

    if (history.includes('diabetes')) {
        if (med.includes("Syrup")) {
            med = med.replace("Syrup", "Syrup (Sugar-Free)");
        }
    }

    if (history.includes('bp') || history.includes('heart')) {
        if (med.includes("Decongestants")) {
            med = "Saline Nasal Spray";
        }
    }

    if (history.includes('asthma')) {
        if (med.includes("Ibuprofen") || med.includes("Aspirin")) {
            med = "Paracetamol 500mg";
        }
    }

    if (isPregnant) {
        if (symptom.id === "fever" || symptom.id === "headache") return "Paracetamol 500mg (Safe in Pregnancy)";
        if (symptom.id === "acidity") return "Antacids (Gelusil)";
        if (symptom.id === "seizure") return "⚠️ EMERGENCY — Call Ambulance (102). MOST anticonvulsants (Valproate, Phenytoin) are teratogenic. ONLY Levetiracetam 500mg or Lamotrigine 50mg are relatively safer — but MUST be managed by a Neurologist + Gynecologist together. Do NOT self-medicate.";

        const isExternal = med.includes("Gel") || med.includes("Cream") || med.includes("Drops") || med.includes("Ointment") || med.includes("Spray");
        if (isExternal) return med;

        return "Consult Gynecologist (Meds may be unsafe)";
    }

    return calculateDosage(med, age);
}
