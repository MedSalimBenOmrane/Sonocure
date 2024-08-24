import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeminiService } from 'src/app/services/gemini.service';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.css']
})


export class BotComponent implements OnInit {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  showchat: boolean = false;
  messageInput: string = '';
  chatHistory: { role: string, text: string }[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    setTimeout(() => {
      this.addBotMessage('Hello! How can I assist you today?');
    }, 100);
  }

  updateScrollbar(): void {
    const container = this.messagesContainer.nativeElement as HTMLElement;
    container.scrollTop = container.scrollHeight;
  }

  setDate(): void {
    const now = new Date();
    const minutes = now.getMinutes();
    const lastMessage = this.messagesContainer.nativeElement.querySelector('.message:last-child');
    if (lastMessage) {
      const timestamp = document.createElement('div');
      timestamp.className = 'timestamp';
      timestamp.textContent = `${now.getHours()}:${minutes}`;
      lastMessage.appendChild(timestamp);
    }
  }

  insertMessage(): void {
    if (this.messageInput.trim() === '') return;

    const messageContainer = document.createElement('div');
    messageContainer.className = 'message message-personal';
    messageContainer.textContent = this.messageInput;

    const container = this.messagesContainer.nativeElement;
    container.appendChild(messageContainer);
    this.setDate();
    this.chatHistory.push({ role: 'You', text: this.messageInput });
    
    this.updateScrollbar();
    this.getChatbotResponse(this.messageInput);
    this.messageInput = '';
  }

  convertToBold(text: string): string {
    // Regular expression to find text enclosed in ** and replace with <strong></strong>
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }
  convertToBulletPoints(text: string): string {
    const lines = text.split('\n'); // Split the text into lines
    let formattedText = '';
    let isInList = false;

    for (let line of lines) {
      // Check if the line starts with *
      if (line.trim().startsWith('*')) {
        if (!isInList) {
          formattedText += '<ul>'; // Start a new list
          isInList = true;
        }
        // Add the list item
        formattedText += `<li>${line.trim().slice(1).trim()}</li>`;
      } else {
        if (isInList) {
          formattedText += '</ul>'; // Close the list if it was open
          isInList = false;
        }
        // Add the line as a paragraph or plain text
        formattedText += `<p>${line.trim()}</p>`;
      }
    }

    if (isInList) {
      formattedText += '</ul>'; // Close the list if it was still open
    }

    return formattedText;
  }
  addBotMessage(text: string): void {
    let formattedText = this.convertToBold(text);
    formattedText = this.convertToBulletPoints(formattedText);
    const message = document.createElement('div');
    message.className = 'message new';
    message.innerHTML = `<figure class="avatar"><img src="assets/images/bot.png" /></figure>${formattedText}`;
    
    const container = this.messagesContainer.nativeElement;
    container.appendChild(message);
    this.setDate();
    this.chatHistory.push({ role: 'Bot', text: text });
    this.updateScrollbar();
  }
  getChatbotResponse(userMessage: string): void {
    const url = 'http://127.0.0.1:5000/chatbot';  // Replace with your Flask API endpoint
    const container = this.messagesContainer.nativeElement;
  
    // Create and append the loading message
    const loadingMessage = this.createLoadingMessage();
    container.appendChild(loadingMessage);
  
    console.log(userMessage);
    
    this.http.post<{ response: string }>(url, { question: userMessage })
      .subscribe({
        next: (response) => {
          const botResponse = response.response;
          container.removeChild(loadingMessage);  // Remove loading message
          this.addBotMessage(botResponse);
        },
        error: (error) => {
          container.removeChild(loadingMessage);  // Remove loading message
          this.addBotMessage('Sorry, I couldn\'t process your request. Please try again.');
          console.error('Error:', error);
        },
        complete: () => {
          console.log('Chatbot response processing completed.');
        }
      });
  }
  
  private createLoadingMessage(): HTMLElement {
    const message = document.createElement('div');
    message.className = 'message loading new';
   
    // Custom loading indicator using the typing indicator
    message.innerHTML = `
      <figure class="avatar"><img src="assets/images/bot.png" /></figure>
     Thinking ...`;
  
    return message;
  }


  isFightMode = false;

  toggleFightMode() {
    this.isFightMode = !this.isFightMode;
  }

  fnshowchat() {
    this.showchat = !this.showchat;
  }
}