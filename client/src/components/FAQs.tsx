import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const Header = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FAQSection = styled.div`
  margin-bottom: 40px;
`;

const FAQItem = styled.div`
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
`;

const Question = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Answer = styled.div<{ open: boolean }>`
  max-height: ${({ open }) => (open ? '100px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding: ${({ open }) => (open ? '10px' : '0 10px')};
`;

const Icon = styled.span<{ open: boolean }>`
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

const FAQs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: 'What is TreeTrack?',
      answer:
        'TreeTrack is a platform that allows you to record and monitor your tree-planting activities, helping you visualize your impact on reforestation efforts.',
    },
    {
      question: 'How do I report a planted tree?',
      answer: 'Use the Report a Tree feature in your dashboard to log your recently planted tree.',
    },
    {
      question: 'Can I track the growth of my planted trees?',
      answer: 'Yes, you can visualize the growth over time using our growth tracking tools.',
    },
    {
      question: 'Is my data private?',
      answer: 'All your data is securely stored and only accessible to you.',
    },
    {
      question: 'How can I get involved in community planting events?',
      answer: 'Check our events page for upcoming community planting opportunities.',
    },
  ];

  return (
    <Container>
      <Header>Frequently Asked Questions</Header>
      <FAQSection>
        {faqData.map((faq, index) => (
          <FAQItem key={index}>
            <Question onClick={() => toggle(index)}>
              {faq.question}
              <Icon open={openIndex === index}>⌃</Icon>
            </Question>
            <Answer open={openIndex === index}>
              {faq.answer}
            </Answer>
          </FAQItem>
        ))}
      </FAQSection>
    </Container>
  );
};

export default FAQs;
