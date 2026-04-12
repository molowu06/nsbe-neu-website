"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is the difference between BESS and NSBE?",
    answer:
      "BESS is the Northeastern University chapter of the National Society of Black Engineers, also known as NSBE-NEU. NSBE is an organization compiled of all collegiate, pre-collegiate, and professional chapters all across the world.",
  },
  {
    question: "How do I join?",
    answer:
      "You can join BESS simply by attending our programming and accumulating membership points.",
  },
  {
    question: "I'm not an engineering major, can I join?",
    answer: "BESS accepts all majors — engineering or not.",
  },
  {
    question: "How do I learn more about conferences?",
    answer:
      'You can learn about NSBE conferences by attending our general body meetings or speaking with current executive board members. You can also do your own research by searching "NSBE Annual Conference."',
  },
  {
    question: "What are the advantages of NSBE?",
    answer:
      "NSBE provides a network and community for all members studying in any STEM major. Whether it's connecting with professionals and recruiters, attending general body meetings and Lunch & Learns, or simply finding a community of Black engineers taking the same classes as you — there are many benefits that NSBE has to offer.",
  },
  {
    question: "What programs does BESS offer?",
    answer:
      "Our programs include general body meetings typically every Thursday evening, PCI programs that connect collegiate members with Greater Boston students in grades 6–12, TORCH programs that connect our members with the local Boston and Roxbury community, and Lunch & Learns where our corporate sponsors come to campus to talk about their company and potential job opportunities for students looking for internships, co-ops, and full-time jobs.",
  },
  {
    question: "How can I get involved beyond BESS?",
    answer:
      "Beyond our BESS chapter, there are plenty of ways to be involved. NSBE is compiled of 6 regions, each with their own executive board and committees — great ways to gain leadership experience. Within each region there are zones that also have their own boards and committees. BESS is in Region 1 in the New England Zone, so being part of these respective boards and committees beyond our chapter is a great way to stay involved.",
  },
  {
    question: "How can I become a corporate sponsor?",
    answer:
      "You can become a corporate sponsor by reaching out to our treasurer, the leader of our finance zone, at bess.nsbe.treasurer@gmail.com.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="faq-heading">Frequently Asked Questions</h2>

      <div className="faq-list">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`faq-item ${isOpen ? "faq-item-open" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <span className={`faq-icon ${isOpen ? "faq-icon-open" : ""}`}>
                  +
                </span>
              </button>
              <div className={`faq-answer-wrapper ${isOpen ? "faq-answer-open" : ""}`}>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}