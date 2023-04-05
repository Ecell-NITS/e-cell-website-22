import React, { useEffect } from 'react'
import Collaboration from '../../components/Home/collaboration/Collaboration'
import Hero from '../../components/Home/HeroSection_homepage/Hero'
import Testimonial from '../../components/Home/Testimonial/Testimonial'
import Aboutus from '../../components/Home/About Us/About_us'
import Events from '../../components/Home/Events/Events'
import Pillars from '../../components/Home/Pillars_of_Ecell/Pillars'
import Timeline from '../../components/Home/Timeline/Timeline'
import Footer from '../../components/shared/Footer/Footer'
import Footerconstant from '../../components/shared/FooterConstant/Footerconstant'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import { createChatBotMessage } from 'react-chatbot-kit';
import Hello from './hello'
const config = {
  initialMessages: [createChatBotMessage(`Hi I'm Ecell Bot and I'm here to help you. What do you want to know?`,
    { widget: "options", delay: 500 }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Hello{...props} />,
    },
  ],
};

const messages = ["Name", "alumini name", "question", "Email", "Message"];
var index = 0;

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const processMessage = () => {
    var message;
    if (index == messages.length) message = createChatBotMessage('Thank you for your response. We will get back to you soon. Have a nice day.', { delay: 500 })
    else message = createChatBotMessage(messages[index], { delay: 500 })
    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            processMessage
          },
        });
      })}
    </div>
  );
};
var data = {};

const MessageParser = ({ children, actions }) => {
  const parseContact = (message) => {
    actions.processMessage();
    if (typeof (message) == "object") index++;
    else if (index < messages.length) {
      data[messages[index - 1]] = message;
      index++;
    }
    else console.log(data);
  };

  const parse = (message) => {
    actions.processMessage();
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {
            parse,
            parseContact
          },
        });
      })}
    </div>
  );
};


const Home = () => {
  useEffect(() => {
    document.title = "ECELL | NITS";
  }, []);
  return (
    <>
      <Hero />
      <Collaboration />
      <Aboutus />
      <Pillars />
      <Events />
      <Timeline />
      <Testimonial />
      <Footerconstant />
      <Footer />
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </>
  )
}

export default Home;