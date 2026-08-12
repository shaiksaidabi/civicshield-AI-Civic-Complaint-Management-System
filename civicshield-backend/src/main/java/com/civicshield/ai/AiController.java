package com.civicshield.ai;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiClassificationService aiClassificationService;

    @PostMapping("/analyze")
    public ReportAnalysis analyzeComplaint(@RequestBody String complaint) {

        return aiClassificationService.analyzeComplaint(complaint);
    }
}