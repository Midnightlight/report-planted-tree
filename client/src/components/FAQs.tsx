import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    max-width: 100%;
  }
`;

const Header = styled.h1`
  color: #2B8E3B;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const FAQSection = styled.div`
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const FAQItem = styled.div`
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;

  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

const Question = styled.div`
  color: #14532d;
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 8px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 6px;
  }
`;

const Answer = styled.div<{ open: boolean }>`
  max-height: ${({ open }) => (open ? '100px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding: ${({ open }) => (open ? '10px' : '0 10px')};

  @media (max-width: 768px) {
    padding: ${({ open }) => (open ? '8px' : '0 8px')};
  }

  @media (max-width: 480px) {
    padding: ${({ open }) => (open ? '6px' : '0 6px')};
  }
`;

const Icon = styled.span<{ open: boolean }>`
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
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
      answer: 'Yes, your data is securely stored and only accessible by TreeTrack administrators.',
    },
    {
      question: 'I don\'t have knowledge about planting tree. Where can I get farming tips?',
      answer: 'You can get farming tips and information anytime through our 24/7 chatbot.',
    },
    {
      question: 'How can I contact TreeTrack team or get support?',
      answer: 'For more information, visit the Contact Us page. Our chatbot is also available 24/7 to assist with farming tips and information.',
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
