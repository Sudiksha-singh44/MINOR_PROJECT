import React, { useState, useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";
import { 
  MessageCircle, 
  Bot, 
  User, 
  Sparkles, 
  Send, 
  Loader2, 
  Trash2,
  Lightbulb,
  X,
  ChevronRight
} from "lucide-react";
import { CHATBOT_QUESTIONS } from "../../utils/constants";
import { generateResponse, QUICK_ACTIONS, simulateTyping } from "../../utils/chatbotAI";
import { toast } from "sonner";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { 
      sender: "bot", 
      text: "Hi! 👋 I'm your Resume Analyzer assistant. I can help you with ATS optimization, formatting, keywords, scoring, and more. Ask me anything or select a question below!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showQuickActions, setShowQuickActions] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text = null) => {
    const userMessage = text || inputValue.trim();
    
    if (!userMessage) {
      toast.error("Please enter a message");
      return;
    }

    // Add user message
    const newUserMessage = {
      sender: "user",
      text: userMessage,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setShowQuickActions(false);
    setIsTyping(true);

    // Simulate typing delay for realistic experience
    await simulateTyping(() => {
      const botResponse = generateResponse(userMessage, messages);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botResponse,
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    }, 800 + Math.random() * 400); // Random delay between 800-1200ms
  };

  const handleQuestionClick = async (q, a, index) => {
    setSelectedQuestion(index);
    
    // Add user question
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: q, timestamp: new Date() }
    ]);
    
    setShowQuickActions(false);
    setIsTyping(true);

    // Simulate typing delay
    await simulateTyping(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: a, timestamp: new Date() }
      ]);
      setIsTyping(false);
      setSelectedQuestion(null);
    }, 600);
  };

  const handleQuickAction = (action) => {
    setInputValue(action);
    inputRef.current?.focus();
  };

  const handleClearChat = () => {
    setMessages([
      { 
        sender: "bot", 
        text: "Chat cleared! How can I help you today? 😊",
        timestamp: new Date()
      }
    ]);
    setShowQuickActions(true);
    toast.success("Chat cleared");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  };

  const typingIndicator = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 justify-start"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="p-2 bg-primary/10 rounded-full self-start"
      >
        <Bot className="w-4 h-4 text-primary" />
      </motion.div>
      <motion.div
        className="bg-secondary text-foreground rounded-2xl px-4 py-3 max-w-[80%]"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <div className="flex gap-1 items-center">
          <motion.div
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section id="chatbot" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Assistant</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Resume Analyzer Bot
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant, intelligent answers to all your resume questions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Chatbot Messages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="h-[600px] flex flex-col shadow-lg border-2">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-b flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      className="p-2 bg-primary/20 rounded-lg"
                    >
                      <Bot className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div>
                      <CardTitle>AI Chat Assistant</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">Always here to help</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearChat}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
                <div className="flex-1 space-y-4">
                  <AnimatePresence>
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        variants={messageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className={`flex gap-3 ${
                          msg.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {msg.sender === "bot" && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="p-2 bg-primary/10 rounded-full self-start flex-shrink-0"
                          >
                            <Bot className="w-4 h-4 text-primary" />
                          </motion.div>
                        )}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                            msg.sender === "bot"
                              ? "bg-secondary text-foreground"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                          <p className="text-xs opacity-60 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </motion.div>
                        {msg.sender === "user" && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="p-2 bg-primary/20 rounded-full self-start flex-shrink-0"
                          >
                            <User className="w-4 h-4 text-primary" />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isTyping && typingIndicator}
                  
                  {/* Quick Actions */}
                  {showQuickActions && messages.length === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2 mt-4"
                    >
                      <p className="text-xs text-muted-foreground flex items-center gap-2 mb-2">
                        <Lightbulb className="w-3 h-3" />
                        Quick questions you can ask:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {QUICK_ACTIONS.slice(0, 3).map((action, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleQuickAction(action)}
                            className="text-xs px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full border border-primary/20 transition-colors"
                          >
                            {action}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Input Area */}
                <div className="flex-shrink-0 pt-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about resumes..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={isTyping || !inputValue.trim()}
                      size="icon"
                      className="flex-shrink-0"
                    >
                      {isTyping ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Press Enter to send • Ask about ATS, keywords, formatting, and more
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* FAQ Questions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="h-[600px] flex flex-col shadow-lg border-2">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-6 h-6 text-primary" />
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </div>
                  <Badge variant="secondary">{CHATBOT_QUESTIONS.length} Questions</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3">
                  {CHATBOT_QUESTIONS.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={selectedQuestion === index ? "default" : "outline"}
                        className="w-full justify-start text-left h-auto py-4 px-4 group hover:bg-primary/5 transition-all"
                        onClick={() => handleQuestionClick(item.q, item.a, index)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleQuestionClick(item.q, item.a, index);
                          }
                        }}
                      >
                        <div className="flex items-start gap-3 w-full">
                          <Badge 
                            variant={selectedQuestion === index ? "default" : "secondary"} 
                            className="mt-1 flex-shrink-0"
                          >
                            {index + 1}
                          </Badge>
                          <span className="text-sm font-medium flex-1 group-hover:text-primary transition-colors">
                            {item.q}
                          </span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
                
                {/* Quick Actions Panel */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-primary" />
                    <p className="text-sm font-semibold">Quick Actions</p>
                  </div>
                  <div className="space-y-2">
                    {QUICK_ACTIONS.map((action, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleQuickAction(action)}
                        className="w-full text-left text-xs px-3 py-2 bg-background hover:bg-primary/10 rounded-md border border-border transition-colors flex items-center gap-2"
                      >
                        <ChevronRight className="w-3 h-3 text-primary" />
                        <span>{action}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;
