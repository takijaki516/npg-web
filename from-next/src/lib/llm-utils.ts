import { type Message, type ToolInvocation } from "ai";

interface DBMessage {
  id: string;
  role: string;
  content: any;
}

export function convertToUIMessage({
  messages,
}: {
  messages: DBMessage[];
}): Message[] {
  return messages.reduce((chatMessages: Message[], message) => {
    if (message.role === "tool") {
      return {
        id: message.id,
        role: message.role,
        content: message.content,
      };
    }

    let textContent = '';
    const 
  }, []);
}




export function sanitizeResponseMessage() {

}