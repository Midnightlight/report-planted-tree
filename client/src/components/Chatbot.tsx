import React, { useState } from 'react';
import styled from 'styled-components';

const ChatbotContainer = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: ${({ visible }) => (visible ? '300px' : '60px')};
  height: ${({ visible }) => (visible ? '400px' : '60px')};
  background-color: ${({ visible }) => (visible ? '#dcfce7' : '')};
  color: #000;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: ${({ visible }) => (visible ? 'flex-start' : 'center')};
  align-items: ${({ visible }) => (visible ? 'stretch' : 'center')};
  cursor: ${({ visible }) => (visible ? 'default' : 'pointer')};
  transition: all 0.3s ease;

  /* Add z-index only when visible */
  z-index: ${({ visible }) => (visible ? 9999 : 'auto')}; /* Ensures it's above other elements when open */

  @media (max-width: 768px) {
    width: ${({ visible }) => (visible ? '250px' : '50px')};
    height: ${({ visible }) => (visible ? '350px' : '50px')};
  }

  @media (max-width: 480px) {
    width: ${({ visible }) => (visible ? '200px' : '50px')};
    height: ${({ visible }) => (visible ? '300px' : '50px')};
  }
`;


const ChatHeader = styled.div`
  background-color: #16a34a;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #ccc;
  }

  @media (max-width: 768px) {
    font-size: 10px;
  }

  @media (max-width: 480px) {
    font-size: 8px;
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    padding: 8px;
  }

  @media (max-width: 480px) {
    padding: 6px;
  }
`;

const ChatBubble = styled.div`
  align-self: flex-start;
  background-color: #e0f2e0;
  color: #000;
  border-radius: 16px;
  padding: 8px 12px;
  max-width: 80%;
  word-wrap: break-word;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  white-space: pre-line; /* This ensures line breaks are respected */

  &:nth-child(odd) {
    align-self: flex-end;
    background-color: #16a34a;
    color: #fff;
  }

  &:hover {
    background-color: #cce5cc;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 10px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 4px 8px;
  }
`;

const PlaceholderMessage = styled.div`
  color: #999;
  text-align: center;
`;

const ExampleText = styled.div`
  margin-bottom: 20px;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 12px;
  }
`;


const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
  background-color: #dcfce7;
  border-top: 1px solid #ccc;

  @media (max-width: 768px) {
    padding: 8px;
  }

  @media (max-width: 480px) {
    padding: 6px;
  }
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 8px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 6px;
  }
`;

const SendButton = styled.button`
  background-color: #16a34a;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0 15px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #2ba94c;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 0 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 0 10px;
  }
`;

const ToggleButton = styled.div`
  width: 50px;
  height: 50px;
  background-color: #16a34a;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #fff;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 20px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
`;

const Chatbot: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const greetings = ['hi', 'hello', 'hei', 'good morning'];
  const goodbyes = ['bye', 'goodbye', 'hei hei', 'see you', 'take care'];
  const reports = ['tree', 'tree track', 'tree tracker', 'track', 'report'];

  const exampleQuestions = [
    'How do I report a tree?',
    'Give me information about oak trees?',
    'Can you share a farming tip for pine trees?',
  ];

  // Basic Q&A for the chatbot
  const responses: { [key: string]: string } = {
    'greeting': 'Hi! How can I help you with TreeTrack today? 🌱',
    'report': 'To report a tree, go to the "Report a Tree" section on the website!',
    'what is tree track?': 'TreeTrack is an app that helps you track and report trees around you.',
    'goodbye': 'Goodbye! Feel free to reach out if you need any more help. 🌳',
    'oak tips and benefits': `
    🌳 Oak Tree Farming Tips:
    - Plant in full sun with well-drained soil.
    - Water regularly when young.
    - Space 40-60 feet apart.
    
    🌱 Oak Tree Benefits:
    - Provide excellent shade.
    - Offer durable, strong wood for construction.
    - Support diverse wildlife and ecosystems.
    - Stabilize soil, preventing erosion.

    🌳 Happy planting!
    `,
    'pine tips and benefits': `
    🌳 Pine Tree Farming Tips:
    - Plant in full sun and well-drained soil.
    - Once established, pine trees are drought-tolerant.
    - Space 10-30 feet apart.

    🌱 Pine Tree Benefits:
    - Provide fast-growing shade and shelter.
    - Ideal for timber, wood products, and paper production.
    - Attract wildlife like birds and small animals.
    - Pine needles decompose into rich soil, supporting other plant life.

    🌳 Happy planting!
    `,
    'maple tips and benefits': `
    🌳 Maple Tree Farming Tips:
    - Plant in well-drained, slightly acidic soil with partial to full sun.
    - Water regularly when young.
    - Space 30-50 feet apart.

    🌱 Maple Tree Benefits:
    - Produce syrup that is highly valued in many cultures.
    - Provide excellent shade and aesthetic appeal.
    - Support a variety of wildlife, including birds and small mammals.
    - Maple wood is durable, used for furniture and flooring.

    🌳 Happy planting!
    `,
    'default': 'Oops! I didn\'t quite catch that. For further assistance, please reach out to the TreeTrack team via the Contact Us page. 🌳',
  };

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, `${input}`]);
  
      const lowerCaseInput = input.toLowerCase();
  
      let response = '';
      if (lowerCaseInput.includes('oak')) {
        response = responses['oak tips and benefits'];
      } 
      else if (lowerCaseInput.includes('pine')) {
        response = responses['pine tips and benefits'];
      } 
      else if (lowerCaseInput.includes('maple')) {
        response = responses['maple tips and benefits'];
      }
      else if (reports.some(report => lowerCaseInput.includes(report))) {
        response = responses['report'];
      }
      else if (greetings.some(greeting => lowerCaseInput.includes(greeting))) {
        response = responses['greeting'];
      } 
      else if (goodbyes.some(goodbye => lowerCaseInput.includes(goodbye))) {
        response = responses['goodbye'];
      } 
      // Default response
      else {
        response = responses[lowerCaseInput] || responses['default'];
      }
  
      setMessages((prevMessages) => [...prevMessages, `${response}`]);
      setInput('');
    }
  };
  
  const handleExampleClick = (question: string) => {
    setMessages([...messages, question]);
  
    const lowerCaseInput = question.toLowerCase();
  
    let response = '';
    if (lowerCaseInput.includes('oak')) {
      response = responses['oak tips and benefits'];
    } 
    else if (lowerCaseInput.includes('pine')) {
      response = responses['pine tips and benefits'];
    } 
    else if (lowerCaseInput.includes('maple')) {
      response = responses['maple tips and benefits'];
    }
    else if (reports.some(report => lowerCaseInput.includes(report))) {
      response = responses['report'];
    }
    else if (greetings.some(greeting => lowerCaseInput.includes(greeting))) {
      response = responses['greeting'];
    } 
    else if (goodbyes.some(goodbye => lowerCaseInput.includes(goodbye))) {
      response = responses['goodbye'];
    } 
    // Default response
    else {
      response = responses[lowerCaseInput] || responses['default'];
    }
  
    setMessages((prevMessages) => [...prevMessages, `${response}`]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      handleSendMessage();
    }
  };

  return (
    <ChatbotContainer visible={visible}>
      {visible ? (
        <>
          <ChatHeader>
            TreeTrack Assistant 🌱
            <CloseButton onClick={() => setVisible(false)}>X</CloseButton>
          </ChatHeader>
          <ChatMessages>
            {messages.length === 0 ? (
              <PlaceholderMessage>
              <ExampleText>
                Ask me anything about TreeTrack! Here are some example questions:
              </ExampleText>
              {exampleQuestions.map((question, idx) => (
                <ChatBubble key={idx} onClick={() => handleExampleClick(question)}>
                  {question}
                </ChatBubble>
              ))}
            </PlaceholderMessage>
            
            ) : (
              messages.map((msg, idx) => <ChatBubble key={idx}>{msg}</ChatBubble>)
            )}
          </ChatMessages>
          <ChatInputContainer>
            <ChatInput
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question..."
            />
            <SendButton onClick={handleSendMessage}>Send</SendButton>
          </ChatInputContainer>
        </>
      ) : (
        <ToggleButton onClick={() => setVisible(true)}>💬</ToggleButton>
      )}
    </ChatbotContainer>
  );
};

export default Chatbot;
