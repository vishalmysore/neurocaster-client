# 🧠 **Neurocaster-Client - Angular-based Client for Model Integration Protocol (MIP)**

**Neurocaster-Client** is an **LLM-independent, Angular-based application** designed for seamless interaction with multiple LLMs, offering **greater control and extensibility**.

It supports **dynamic chat** and **tool invocation** by integrating with **Model Integration Protocol (MIP)**. The client can work with various LLMs for both **conversational AI** and executing tools exposed via **Spring Boot services** or other backends.

## Features
- **LLM Independence**: Works with multiple LLMs for flexible conversational AI and tool invocation.
- **Model Integration Protocol (MIP)**: Seamlessly integrates with services powered by MIP.
- **Dynamic Chat**: Engage in real-time conversations powered by LLMs.
- **Tool Invocation**: Execute tools exposed via Spring Boot services or other backends. Call Spring Boot services annotated with `@Agent` and `@Action` directly through the client interface.
- **Extensibility**: Modular architecture allows easy customization and addition of new capabilities.
- **Fine-Grained Control**: Provides enhanced control over tool execution and LLM interactions.

## Benefits
- **Modular and Extensible Architecture**: Easy to customize and extend with new functionalities.
- **Adaptable to Diverse Workflows**: Suitable for various use cases, from conversational AI to complex tool integrations.
- **Seamless LLM Interactions**: Integrates with multiple LLMs for powerful AI-driven workflows.

---

## 📦 **Prerequisites**
Tools4AI is here [Tools4AI](https://github.com/vishalmysore/Tools4AI)  
Server is here [Neurocaster-Server](https://github.com/vishalmysore/neurocaster-server)   
Client is here [Neurocaster-Client](https://github.com/vishalmysore/neurocaster-client)    



## ⚙️ **Setting Up Neurocaster-Client**

### 📥 **Installation Steps**

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/neurocaster-client.git
    ```

2. Navigate to the project directory:
    ```bash
    cd neurocaster-client
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

---

### 🧠 **Running the Client**

To run the Angular client, execute the following command:

```bash
ng serve
```

This will start the Angular development server. You can access the client at: http://localhost:4200

💬 Chat with the System
Once the client is running, you can initiate a chat with the system. Simply type your query in the chat interface, and the LLM will respond based on the available services exposed via MIP.

🔧 Call Tools
The client allows you to invoke tools exposed by the Neurocaster backend. For example, if you have a service like @Action(description = "Customer repair service"), you can call it directly from the client interface.

Type in your query for the tool, such as:

```  "Create a repair ticket for John Doe's laptop"
```
The client will automatically map the request to the appropriate tool method based on the MIP-enabled backend.


### Screenshots

![Connect](connect.png)

![Chat](client2.png)

![Chat](client3.png)

![Chat](client4.png)

![Chat](client5.png)

![Chat](client6.png)

