import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebSocketService } from '../../service/WebSocketService';

@Component({
  selector: 'app-json-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './json-view.component.html',
  styleUrls: ['./json-view.component.css']
})
export class JsonViewComponent {
  serverUrl: string = 'http://localhost:8081';  // Default server URL
  toolsUrl: string = `${this.serverUrl}/actuator/tools4ai-tools`;  // Default server URL
  modelsUrl: string = `${this.serverUrl}/actuator/tools4ai-models`;
  groups: string[] = [];
  selectedGroup: string = 'ALL';
  groupedActions: { [key: string]: any[] } = {};
  actions: any[] = []; // Holds the currently selected actions
  query: string = ''; // The user's query for the chatbox
  chatMessages: { sender: string, text: string ,jsonStr: string, methodName: string}[] = []; // Holds chat messages (query and response)
  models: any[] = []; // Stores the models received from the API
  selectedInferenceModel: string = '';

  // Voting Models and Weightages
  selectedVotingModels: { [key: string]: boolean } = {};  // Checkboxes for voting models
  modelWeights: { [key: string]: number } = {};
  constructor(private http: HttpClient, private webSocketService: WebSocketService) {}

  // Connect to server and fetch all groups and actions
  connect() {
    this.webSocketService.connect('ws://localhost:8080/chat').subscribe((response) => {
      console.log('Received from WebSocket:', response);
      console.log('Received from WebSocket:', response.jsonStr);
      let responseMessage;
      // Add the response message to the chat
      // Assuming the response is in the same format as the input
      if (typeof response === 'string') {
        responseMessage = JSON.parse(response);
      } else {
        responseMessage = response; // It's already an object
      }
      this.chatMessages.push({ sender: 'bot', text: responseMessage.message ,jsonStr: responseMessage.jsonStr, methodName: responseMessage.methodName});
    });  // WebSocket URL
    if (!this.serverUrl) {
      alert('Please enter a server URL!');
      return;
    }

    this.http.get<any[]>(this.toolsUrl).subscribe(
      (data) => {
        console.log('Raw Data tools:', data);

        // Group actions by `actionGroup`
        this.groupedActions = data.reduce((acc, action) => {
          const group = action.actionGroup || 'Uncategorized';
          if (!acc[group]) acc[group] = [];
          acc[group].push({ ...action, expanded: false });
          return acc;
        }, {});

        // Extract group names and add 'ALL' at the top once
        this.groups = Object.keys(this.groupedActions);
        this.groups.unshift('ALL'); // Add 'ALL' at the beginning
        console.log('Grouped Actions:', this.groupedActions);

        // Load actions for the default 'ALL' selection
        this.loadActions();
      },
      (error) => {
        console.error('Error connecting to server:', error);
        alert('Failed to connect to server.');
      }
    );

    this.http.get<any[]>(this.modelsUrl).subscribe(
      (data) => {
        console.log('Raw Data:', data);
        this.models = data;

        // Initialize voting models and weights
        this.models.forEach(model => {
          this.selectedVotingModels[model.modelName] = false;  // Default unchecked
          this.modelWeights[model.modelName] = 50;             // Default weight to 50
        });

        // Set the first model as the default inference model
        if (this.models.length > 0) {
          this.selectedInferenceModel = this.models[0].modelName;
        }
      },
      (error) => {
        console.error('Error connecting to server:', error);
        alert('Failed to connect to server.');
      }
    );
  }
  updateWeight(modelName: string, event: any) {
    this.modelWeights[modelName] = event.target.value;
  }
  // When the group changes, filter and display actions
  loadActions() {
    if (this.selectedGroup === 'ALL') {
      // If 'ALL' is selected, return actions from all groups
      this.actions = Object.values(this.groupedActions).flat();
    } else {
      this.actions = this.groupedActions[this.selectedGroup] || [];
    }
  }

  // Toggle collapse/expand for actions
  toggleAction(action: any) {
    action.expanded = !action.expanded;
  }

  // Send query to WebSocket and handle response
  sendQuery() {
    if (!this.query.trim()) {
      alert('Please enter a query!');
      return;
    }

    // Create a message object in the required format
    const message = {
      permission: "granted",  // You can dynamically set this based on your app logic
      actualMessage: this.query,
      action: "query"
    };

    // Add the user's message to the chat
    this.chatMessages.push({ sender: 'User', text: this.query ,jsonStr: '', methodName: ''});

    // Send the formatted message via WebSocket
    this.webSocketService.sendQuery(message);

    // Listen for the response from WebSocket

  }

  tools() {
    if (!this.query.trim()) {
      alert('Please enter a query!');
      return;
    }

    // Create a message object in the required format
    const message = {
      permission: "granted",  // You can dynamically set this based on your app logic
      actualMessage: this.query,
      action: "tools"
    };

    // Add the user's message to the chat
    this.chatMessages.push({ sender: 'User', text: this.query ,jsonStr: '', methodName: ''});

    // Send the formatted message via WebSocket
    this.webSocketService.sendQuery(message);

    // Listen for the response from WebSocket

  }

  executeJson(jsonStr: string, methodName: string): void {



    const executePayload = {
      action: "execute",
      method: methodName,
      data: jsonStr
    };

    console.log("Sending JSON back with execute action:", executePayload);
    this.chatMessages.push({ sender: 'user', text: jsonStr ,jsonStr: '', methodName: ''});

    // Send the formatted message via WebSocket
    this.webSocketService.sendQuery(executePayload);
    // Use sendQuery() instead of direct API call

  }

  formatJson(json: any): string {
    try {
      return typeof json === 'object' ? JSON.stringify(json, null, 2) : json;
    } catch (error) {
      console.error('Error formatting JSON:', error);
      return json;
    }
  }
}
