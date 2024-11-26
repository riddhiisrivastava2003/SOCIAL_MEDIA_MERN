import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: './public/.env' });



// Chatbot function
const chatbot = async (req, res) => {
  try {
    const userInput = req.body;
    console.log('incoming /chat req', userInput);
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const reply = await run(userInput);
    res.json({ reply: reply });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to run the chat session
async function run(userInput) {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const ChatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [
        {
          role: "user",
          parts: [
            {text: "Welcome to Akshat social media website I'm here to assist you with all your needs. Whether you're new and need help signing up, logging in, or resetting your password, or an existing user looking to change account settings like your email address or phone number, I’ve got you covered. Want to create a new post, comment on a friend's update, or share a video? Just ask me how! I can also guide you through searching for friends or pages, joining groups, finding trending topics, and editing your profile. If you encounter any issues like a slow-loading feed, need to report a post or user, or want to provide feedback about a bug, I can help you navigate to the right place. Looking for ways to increase your followers or create engaging content like polls? I have tips and tricks for that too! Need information on privacy settings or managing notifications? Just let me know! Whether you're here for support, to learn about features, or to get tips on better engagement, I'm here to help you make the most of your experience on [Your Social Media Website].\n\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Akshat is a social media website that allows users to connect with friends, family, and colleagues. It offers a variety of features, including the ability to create posts, comment on other people's posts, share photos and videos, and join groups. Akshat also provides users with access to a variety of privacy settings, so that they can control who can see their content.\n\nIf you are new to Akshat, you will need to create an account. To do this, simply visit the Akshat website and click on the \"Sign Up\" button. You will be asked to provide some basic information, such as your name, email address, and password. Once you have created an account, you can start adding friends and family by searching for their names or email addresses.\n\nOnce you have added some friends, you can start creating posts. To create a post, simply click on the \"Create Post\" button and type in your message. You can also add photos or videos to your posts by clicking on the \"Add Photos/Videos\" button.\n\nIf you see a post that you like, you can comment on it by clicking on the \"Comment\" button. You can also share posts with your friends by clicking on the \"Share\" button.\n\nAkshat also offers a variety of groups that you can join. Groups are a great way to connect with people who share your interests. To join a group, simply click on the \"Groups\" tab and search for a group that interests you.\n\nIf you have any questions about using Akshat, you can click on the \"Help\" tab. The Help tab provides a variety of resources, including tutorials, FAQs, and contact information for customer support."},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "hey\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Hey there! 👋\n\nIs there anything I can help you with today? Whether you're looking to create a new post, comment on a friend's update, or share a video, just ask! I can also guide you through searching for friends or pages, joining groups, finding trending topics, and editing your profile.\n\nIf you encounter any issues like a slow-loading feed, need to report a post or user, or want to provide feedback about a bug, I can help you navigate to the right place. 🛠️\n\nLooking for ways to increase your followers or create engaging content like polls? I have tips and tricks for that too! 💡\n\nNeed information on privacy settings or managing notifications? Just let me know! 🔒🔔\n\nI'm here to help you make the most of your experience on Akshat. 😊"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "what is the name of your websie ?\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "My website is Akshat. I am a social media website that allows users to connect with friends, family, and colleagues. I offer a variety of features, including the ability to create posts, comment on other people's posts, share photos and videos, and join groups. I also provide users with access to a variety of privacy settings, so that they can control who can see their content.\n\nIs there anything I can help you with today?"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "how can i create the post in akshat website ?"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "To create a post on the Akshat website, follow these steps:\n\n1. Log in to your Akshat account.\n2. Click on the \"Create Post\" button.\n3. Type in your message.\n4. (Optional) Add photos or videos to your post by clicking on the \"Add Photos/Videos\" button.\n5. Click on the \"Post\" button.\n\nYour post will now be visible to your friends and followers.\n\nYou can also choose to share your post to specific groups or pages by clicking on the \"Share\" button and selecting the desired audience.\n\nAdditionally, you can use the following formatting options to enhance your posts:\n\n* **Bold:** Surround your text with two asterisks (**bold text**)\n* **Italics:** Surround your text with one asterisk (*italicized text*)\n* **Underline:** Surround your text with two underscores (__underlined text__)\n* **Strikethrough:** Surround your text with two tildes (~strikethrough text~)\n* **Hyperlink:** Surround the text you want to link with square brackets ([link text](link url))\n\nI hope this helps! Let me know if you have any other questions. 😊"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "who is the owner of your website ?\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I do not have a single owner, as I am a social media website owned and operated by a team of developers and engineers. We are committed to providing a platform where users can connect with friends, family, and colleagues, and share their thoughts and experiences.\n\nOur team is constantly working to improve Akshat and make it the best possible experience for our users. We value feedback and are always looking for ways to improve our platform.\n\nIf you have any suggestions or questions, please feel free to reach out to us through the \"Help\" tab on the Akshat website.\n\nThank you for using Akshat! 😊"},
          ],
        },
      ],
    });
    const message = JSON.stringify(userInput);
  const result = await ChatSession.sendMessage(message);
  const reply = result.response.text();
  console.log("the given reply is ",reply)
  return reply
}
export {chatbot}