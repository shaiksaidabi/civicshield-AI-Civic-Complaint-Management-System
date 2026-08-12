package com.civicshield.ai;

import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
public class SafetyClassificationValidator {

    public ReportAnalysis validate(
            String complaint,
            ReportAnalysis aiResult) {

        String text = complaint.toLowerCase(Locale.ROOT);

        // 1. Electricity-related safety issue
        // Route to ELECTRICITY but keep CRITICAL urgency.
        if (containsElectricityKeyword(text)) {

            return new ReportAnalysis(
                    "ELECTRICITY",
                    "CRITICAL",
                    getSummary(aiResult,
                            "Dangerous electrical issue reported requiring immediate attention.")
            );
        }

        // 2. Direct personal safety issues
        // These should be routed to IMMEDIATE_SAFETY.
        if (containsImmediateSafetyKeyword(text)) {

            return new ReportAnalysis(
                    "IMMEDIATE_SAFETY",
                    "CRITICAL",
                    getSummary(aiResult,
                            "Immediate personal safety concern reported.")
            );
        }

        // 3. Otherwise trust the AI classification.
        return aiResult;
    }

    private boolean containsElectricityKeyword(String text) {

        String[] keywords = {
                "electricity",
                "electrical",
                "electric pole",
                "electricity pole",
                "power outage",
                "power cut",
                "transformer",
                "exposed wire",
                "exposed wires",
                "live wire",
                "live wires",
                "electrical wire",
                "electric wire"
        };

        return containsAny(text, keywords);
    }

    private boolean containsImmediateSafetyKeyword(String text) {

        String[] keywords = {
                "harassment",
                "harassed",
                "eve teasing",
                "eve-teasing",
                "molestation",
                "molested",
                "sexual harassment",
                "assault",
                "attacked",
                "attack",
                "threat",
                "threatening",
                "rape",
                "stalking",
                "stalked",
                "abuse",
                "abused"
        };

        return containsAny(text, keywords);
    }

    private boolean containsAny(String text, String[] keywords) {

        for (String keyword : keywords) {

            if (text.contains(keyword)) {
                return true;
            }
        }

        return false;
    }

    private String getSummary(
            ReportAnalysis aiResult,
            String defaultSummary) {

        if (aiResult != null
                && aiResult.summary() != null
                && !aiResult.summary().isBlank()) {

            return aiResult.summary();
        }

        return defaultSummary;
    }
}