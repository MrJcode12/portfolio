// import { useState } from 'react';
// import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

// export default function Chatbot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showWelcome, setShowWelcome] = useState(true);
//   const [messages, setMessages] = useState([
//     {
//       role: 'assistant',
//       content: `Hello! I'm here to help you learn about Jericho Gabarda - his skills, projects, experience, and professional background.

// **For Recruiters:** If you have a job description or role requirements, feel free to paste it here and I'll provide a detailed match analysis showing how Jericho's skills and experience align with your needs.

// **For Visitors:** You can ask me about Jericho's technical skills, notable projects, work experience, or anything else you'd like to know. How can I assist you today?`,
//       timestamp: '10:39 AM'
//     }
//   ]);
//   const [inputValue, setInputValue] = useState('');

//   const suggestedQuestions = [
//     "What are Jericho Gabarda's skills and experience?",
//     "Tell me about Jericho Gabarda's projects",
//     "How can I contact Jericho Gabarda?"
//   ];

//   const handleStartChat = () => {
//     setShowWelcome(false);
//     setIsOpen(true);
//   };

//   const handleSendMessage = () => {
//     if (!inputValue.trim()) return;

//     // Add user message
//     const userMessage = {
//       role: 'user',
//       content: inputValue,
//       timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
//     };

//     setMessages([...messages, userMessage]);
//     setInputValue('');

//     // Simulate AI response (you can replace this with actual AI integration)
//     setTimeout(() => {
//       const aiResponse = {
//         role: 'assistant',
//         content: "Thank you for your question! This is a demo response. In a production environment, this would be connected to an AI service to provide detailed information about Jericho Gabarda's skills, experience, and projects.",
//         timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
//       };
//       setMessages(prev => [...prev, aiResponse]);
//     }, 1000);
//   };

//   const handleSuggestedQuestion = (question: string) => {
//     setInputValue(question);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//     setShowWelcome(true);
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       {/* Welcome Popup */}
//       {showWelcome && !isOpen && (
//         <div className="absolute bottom-20 right-0 w-[280px] bg-[#1a1a1a] text-white rounded-2xl p-5 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
//           <button
//             onClick={() => setShowWelcome(false)}
//             className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
//           >
//             <X className="w-4 h-4" />
//           </button>

//           <div className="flex items-center gap-2 mb-3">
//             <Sparkles className="w-5 h-5" />
//             <div>
//               <h3 className="font-semibold text-[15px]">AI Assistant</h3>
//               <h3 className="font-semibold text-[15px]">Available</h3>
//             </div>
//           </div>

//           <p className="text-[13px] text-gray-300 leading-relaxed mb-4">
//             Hi! I'm an AI-powered assistant here to help you learn about Jericho Gabarda. Ask me about his skills, projects, experience, or paste a job description for a match analysis!
//           </p>

//           <button
//             onClick={handleStartChat}
//             className="w-full bg-white text-black py-2.5 px-4 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
//           >
//             <MessageCircle className="w-4 h-4" />
//             <span>Start Chatting</span>
//           </button>

//           {/* Arrow pointer */}
//           <div className="absolute -bottom-2 right-8 w-4 h-4 bg-[#1a1a1a] rotate-45"></div>
//         </div>
//       )}

//       {/* Chat Interface */}
//       {isOpen && (
//         <div className="absolute bottom-20 right-0 w-[440px] h-[600px] bg-[#0a0a0a] text-white rounded-2xl shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b border-gray-800">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
//                 <MessageCircle className="w-5 h-5 text-black" />
//               </div>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <span className="font-semibold text-[15px]">AI Assistant</span>
//                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 </div>
//                 <span className="text-[12px] text-gray-400">Active • Ask me anything</span>
//               </div>
//             </div>
//             <button
//               onClick={handleClose}
//               className="text-gray-400 hover:text-white transition-colors"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto p-4 space-y-4">
//             {messages.map((message, index) => (
//               <div key={index} className={`${message.role === 'user' ? 'ml-auto' : ''}`}>
//                 <div
//                   className={`${message.role === 'user'
//                       ? 'bg-white text-black ml-auto'
//                       : 'bg-[#1a1a1a] text-gray-200'
//                     } p-4 rounded-2xl max-w-[85%] ${message.role === 'user' ? 'ml-auto' : ''}`}
//                 >
//                   <p className="text-[13px] leading-relaxed whitespace-pre-line">
//                     {message.content}
//                   </p>
//                 </div>
//                 <div className={`text-[11px] text-gray-500 mt-1 ${message.role === 'user' ? 'text-right' : ''}`}>
//                   {message.timestamp}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Suggested Questions */}
//           {messages.length === 1 && (
//             <div className="px-4 pb-3">
//               <p className="text-[12px] text-gray-400 mb-2">Suggested questions:</p>
//               <div className="space-y-2">
//                 {suggestedQuestions.map((question, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleSuggestedQuestion(question)}
//                     className="w-full text-left text-[13px] bg-[#1a1a1a] hover:bg-[#252525] text-white p-3 rounded-lg transition-colors"
//                   >
//                     {question}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Input */}
//           <div className="p-4 border-t border-gray-800">
//             <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-full p-1.5 pr-2">
//               <input
//                 type="text"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                 placeholder="Type your message..."
//                 className="flex-1 bg-transparent text-[14px] text-white placeholder-gray-500 px-4 py-2 outline-none"
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="w-9 h-9 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors"
//               >
//                 <Send className="w-4 h-4 text-white" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Chat Button */}
//       {!isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="w-14 h-14 bg-white text-black rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:scale-105"
//         >
//           <MessageCircle className="w-6 h-6" />
//         </button>
//       )}
//     </div>
//   );
// }
