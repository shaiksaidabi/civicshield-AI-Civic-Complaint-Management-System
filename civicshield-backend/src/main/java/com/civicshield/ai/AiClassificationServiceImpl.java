package com.civicshield.ai;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AiClassificationServiceImpl implements AiClassificationService {

    private final ChatClient chatClient;
    private final SafetyClassificationValidator safetyValidator;

    public AiClassificationServiceImpl(
            ChatClient.Builder builder,
            SafetyClassificationValidator safetyValidator) {

        this.chatClient = builder.build();
        this.safetyValidator = safetyValidator;
    }

    @Override
    public ReportAnalysis analyzeComplaint(String complaint) {

        String prompt = """
                You are CivicShield AI, a government complaint classification system.

                Analyze the citizen complaint carefully.

                Choose exactly ONE category:

                IMMEDIATE_SAFETY
                INFRASTRUCTURE
                TRAFFIC
                MUNICIPAL
                ELECTRICITY
                HEALTH

                Choose exactly ONE urgency:

                CRITICAL
                HIGH
                MEDIUM
                LOW

                Classification rules:

                IMMEDIATE_SAFETY:
                Use this for harassment, eve teasing, assault,
                threats, stalking, abuse, violence, or immediate
                danger to a person's safety.

                INFRASTRUCTURE:
                Use this for potholes, damaged roads, broken bridges,
                damaged public infrastructure, etc.

                TRAFFIC:
                Use this for traffic violations, traffic signals,
                congestion, illegal parking, and traffic-related issues.

                MUNICIPAL:
                Use this for garbage, sanitation, street cleanliness,
                drainage, and general municipal services.

                ELECTRICITY:
                Use this for power outages, electric poles,
                transformers, exposed electrical wires, etc.

                HEALTH:
                Use this for public health, medical sanitation,
                disease outbreaks, and health-related civic issues.

                Urgency rules:

                CRITICAL:
                Immediate danger, violence, harassment, assault,
                serious threats, or situations requiring urgent action.

                HIGH:
                Significant public safety or infrastructure issue.

                MEDIUM:
                Important issue but not immediately dangerous.

                LOW:
                Minor issue with limited immediate impact.

                Return ONLY a JSON object with exactly these fields:

                category
                urgency
                summary

                Do not use markdown.
                Do not use code fences.
                Do not add explanations.

                Complaint:
                %s
                """.formatted(complaint);

        ReportAnalysis aiResult = chatClient
                .prompt()
                .user(prompt)
                .call()
                .entity(ReportAnalysis.class);

        return safetyValidator.validate(complaint, aiResult);
    }
}