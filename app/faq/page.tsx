import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ | Solisfortitudo",
  description:
    "Frequently asked questions about our fitness calculators and nutrition information.",
};

const faqs = [
  {
    question: "How is BMI calculated?",
    answer:
      "BMI is calculated by dividing your weight in kilograms by your height in meters squared (kg/m²). While it's a useful screening tool, it doesn't directly measure body fat or overall health.",
  },
  {
    question: "Why does age matter for BMI interpretation?",
    answer:
      "Age can affect how BMI should be interpreted. For example, older adults often have more body fat than younger adults with the same BMI. Children and teens use different BMI categories based on age and gender percentiles.",
  },
  {
    question: "What are the limitations of BMI?",
    answer:
      "BMI doesn't distinguish between weight from muscle and weight from fat. Athletes or muscular individuals might have a high BMI but not be overweight. It also doesn't account for age, gender, ethnicity, or body composition.",
  },
  {
    question: "How accurate are the calorie calculations?",
    answer:
      "Our calculators use scientifically validated formulas (like Mifflin-St Jeor for BMR) but provide estimates. Individual results may vary based on factors like genetics, body composition, and activity level.",
  },
  {
    question: "What is the best protein intake for muscle building?",
    answer:
      "Research suggests 1.6-2.2g of protein per kg of body weight for muscle building. This can vary based on training intensity, overall calories, and individual factors. The calculator offers different options to match your goals.",
  },
  {
    question: "How should I adjust my calories for weight loss?",
    answer:
      "A moderate calorie deficit of 10-20% below maintenance is recommended for sustainable weight loss. This typically results in 0.5-1kg loss per week. Larger deficits might lead to faster initial results but can be harder to maintain.",
  },
  {
    question: "What's the difference between BMR and TDEE?",
    answer:
      "BMR (Basal Metabolic Rate) is the calories burned at complete rest. TDEE (Total Daily Energy Expenditure) includes BMR plus calories burned through activity, exercise, and digestion.",
  },
  {
    question: "How often should I recalculate my needs?",
    answer:
      "Recalculate every 5-10 pounds of weight change or if you significantly change your activity level. Regular adjustments help maintain progress toward your goals.",
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our calculators and nutrition
            basics.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center text-sm text-muted-foreground pt-8 border-t">
          <p>
            Can&apos;t find what you&apos;re looking for?{" "}
            <a
              href="mailto:support@solisfortitudo.com"
              className="text-primary hover:underline"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
